// Smoke test for marva-editor's server.mjs.
//
// Copies the miniature fixtures into a throwaway temp directory, starts the real
// server against that temp directory (isolated port, MARVA_NO_DEV=1 so it never
// tries to launch the real Astro dev server), and exercises the API's success and
// validation-failure paths. Run with: node test/smoke.mjs

import { spawn, execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const HERE = import.meta.dirname;
const FIXTURES_DIR = path.join(HERE, 'fixtures');
const SERVER_PATH = path.join(HERE, '..', 'server.mjs');
const PORT = 5641;
const BASE = `http://127.0.0.1:${PORT}`;
const PUBLISH_PORT = 5642;
const PUBLISH_BASE = `http://127.0.0.1:${PUBLISH_PORT}`;

let passCount = 0;
let failCount = 0;
let firstFailure = null;

function check(name, cond, detail) {
  if (cond) {
    passCount += 1;
    console.log(`  ok   - ${name}`);
  } else {
    failCount += 1;
    const msg = `FAIL - ${name}${detail ? `: ${detail}` : ''}`;
    console.log(`  ${msg}`);
    if (!firstFailure) firstFailure = msg;
  }
}

async function waitForUp(timeoutMs, base) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(`${base}/api/status`);
      if (res.ok) return true;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 100));
  }
  return false;
}

async function fetchJson(url, opts) {
  const res = await fetch(url, opts);
  const data = await res.json();
  return { status: res.status, data };
}

// ---------------------------------------------------------------------------
// Part 1 — the original content/sections API tests
// ---------------------------------------------------------------------------

async function runApiTests() {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'marva-editor-smoke-'));
  for (const f of ['content.he.json', 'content.en.json', 'sections.json']) {
    fs.copyFileSync(path.join(FIXTURES_DIR, f), path.join(tmpDir, f));
  }

  const child = spawn(process.execPath, [SERVER_PATH], {
    env: {
      ...process.env,
      MARVA_EDITOR_PORT: String(PORT),
      MARVA_DATA_DIR: tmpDir,
      MARVA_NO_DEV: '1',
      MARVA_ASTRO_PORT: '4999', // dead port — astroDev must probe false even if a real dev server is on 4321
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  let serverOutput = '';
  child.stdout.on('data', (d) => { serverOutput += d.toString(); });
  child.stderr.on('data', (d) => { serverOutput += d.toString(); });

  try {
    const up = await waitForUp(8000, BASE);
    if (!up) {
      console.log('Server did not come up in time. Output so far:\n' + serverOutput);
      process.exitCode = 1;
      return;
    }

    // GET /api/state -> 200, has all three objects
    {
      const { status, data } = await fetchJson(`${BASE}/api/state`);
      check('GET /api/state -> 200', status === 200);
      check(
        'GET /api/state has content.he, content.en, sections',
        !!(data.ok && data.content && data.content.he && data.content.en && data.sections),
      );
    }

    // PUT /api/content/he with a changed string -> 200; file on disk updated,
    // pretty-printed 2-space with trailing newline, no .tmp left behind.
    {
      const { data: stateRes } = await fetchJson(`${BASE}/api/state`);
      const he = stateRes.content.he;
      he.heroBottleAlt = 'שינוי בדיקה';
      const { status, data } = await fetchJson(`${BASE}/api/content/he`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(he),
      });
      check('PUT /api/content/he (valid change) -> 200', status === 200 && data.ok === true, JSON.stringify(data));

      const filePath = path.join(tmpDir, 'content.he.json');
      const onDiskRaw = fs.readFileSync(filePath, 'utf8');
      check('written file contains the change', onDiskRaw.includes('שינוי בדיקה'));
      check('written file is pretty-printed (2-space indent)', onDiskRaw.includes('\n  "heroBottleAlt"'));
      check(
        'written file ends with exactly one trailing newline',
        onDiskRaw.endsWith('\n') && !onDiskRaw.endsWith('\n\n'),
      );
      check('no .tmp file remains', !fs.existsSync(`${filePath}.tmp`));
    }

    // PUT with a MISSING root key -> 400 naming the key
    {
      const { data: stateRes } = await fetchJson(`${BASE}/api/state`);
      const he = stateRes.content.he;
      delete he.whoStatement;
      const { status, data } = await fetchJson(`${BASE}/api/content/he`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(he),
      });
      check('PUT with missing root key -> 400', status === 400 && data.ok === false, JSON.stringify(data));
      check(
        'error names the missing key',
        typeof data.error === 'string' && data.error.includes('whoStatement'),
        data.error,
      );
    }

    // PUT with an ADDED root key -> 400
    {
      const { data: stateRes } = await fetchJson(`${BASE}/api/state`);
      const he = stateRes.content.he;
      he.unexpectedNewKey = 'oops';
      const { status, data } = await fetchJson(`${BASE}/api/content/he`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(he),
      });
      check('PUT with added root key -> 400', status === 400 && data.ok === false, JSON.stringify(data));
      check(
        'error names the added key',
        typeof data.error === 'string' && data.error.includes('unexpectedNewKey'),
        data.error,
      );
    }

    // PUT sections with a non-boolean leaf -> 400
    {
      const { data: stateRes } = await fetchJson(`${BASE}/api/state`);
      const sections = stateRes.sections;
      sections.home.hero = 'yes';
      const { status, data } = await fetchJson(`${BASE}/api/sections`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sections),
      });
      check('PUT /api/sections with non-boolean leaf -> 400', status === 400 && data.ok === false, JSON.stringify(data));
      check(
        'error names the offending leaf',
        typeof data.error === 'string' && data.error.includes('home.hero'),
        data.error,
      );
    }

    // PUT /api/content/he with bottleLabelLines of length 2 -> 400
    {
      const { data: stateRes } = await fetchJson(`${BASE}/api/state`);
      const he = stateRes.content.he;
      he.homeHero.bottleLabelLines = ['only', 'two'];
      const { status, data } = await fetchJson(`${BASE}/api/content/he`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(he),
      });
      check(
        'PUT with bottleLabelLines of length 2 -> 400',
        status === 400 && data.ok === false,
        JSON.stringify(data),
      );
    }

    // GET /api/status -> 200, astroDev: false (nothing listening on 4321 in test env)
    {
      const { status, data } = await fetchJson(`${BASE}/api/status`);
      check('GET /api/status -> 200', status === 200);
      check('astroDev is false', data.astroDev === false, JSON.stringify(data));
    }
  } finally {
    child.kill();
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

// ---------------------------------------------------------------------------
// Part 2 — publish endpoints against a throwaway LOCAL git repo (offline-safe)
// ---------------------------------------------------------------------------

function git(args, cwd) {
  return execFileSync('git', args, { cwd, encoding: 'utf8' });
}

async function runPublishTests() {
  console.log('');
  console.log('-- publish (throwaway local git repo) --');

  const baseDir = fs.mkdtempSync(path.join(os.tmpdir(), 'marva-editor-publish-'));
  const workDir = path.join(baseDir, 'work');
  const bareDir = path.join(baseDir, 'origin.git');
  const dataDir = path.join(workDir, 'website', 'app', 'src', 'data');

  fs.mkdirSync(dataDir, { recursive: true });
  for (const f of ['content.he.json', 'content.en.json', 'sections.json']) {
    fs.copyFileSync(path.join(FIXTURES_DIR, f), path.join(dataDir, f));
  }

  // Build a bare "origin" and a work repo that pushes to it — entirely on
  // local disk, no network involved.
  git(['init', '--bare', '-b', 'main', bareDir], baseDir);
  git(['init', '-b', 'main'], workDir);
  git(['config', 'user.email', 'marva-editor-smoke@example.com'], workDir);
  git(['config', 'user.name', 'marva-editor smoke test'], workDir);
  git(['remote', 'add', 'origin', bareDir], workDir);
  git(['add', '-A'], workDir);
  git(['commit', '-m', 'initial fixture commit'], workDir);
  git(['push', '-u', 'origin', 'main'], workDir);

  const child = spawn(process.execPath, [SERVER_PATH], {
    env: {
      ...process.env,
      MARVA_EDITOR_PORT: String(PUBLISH_PORT),
      MARVA_DATA_DIR: dataDir,
      MARVA_REPO_DIR: workDir,
      MARVA_NO_DEV: '1',
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  let serverOutput = '';
  child.stdout.on('data', (d) => { serverOutput += d.toString(); });
  child.stderr.on('data', (d) => { serverOutput += d.toString(); });

  try {
    const up = await waitForUp(8000, PUBLISH_BASE);
    if (!up) {
      console.log('Publish server did not come up in time. Output so far:\n' + serverOutput);
      process.exitCode = 1;
      return;
    }

    // Clean repo, freshly pushed -> nothing dirty, 0 ahead.
    {
      const { status, data } = await fetchJson(`${PUBLISH_BASE}/api/publish/status`);
      check('GET /api/publish/status (clean) -> 200', status === 200 && data.ok === true, JSON.stringify(data));
      check('clean repo has no dirty files', Array.isArray(data.dirtyFiles) && data.dirtyFiles.length === 0, JSON.stringify(data));
      check('clean repo is 0 ahead', data.ahead === 0, JSON.stringify(data));
      check('branch is main', data.branch === 'main', JSON.stringify(data));
    }

    // Modify a data file directly on disk (as if WRITE had just run) -> status
    // should now report it dirty.
    {
      const heFilePath = path.join(dataDir, 'content.he.json');
      const heObj = JSON.parse(fs.readFileSync(heFilePath, 'utf8'));
      heObj.heroBottleAlt = 'שינוי לבדיקת פרסום';
      fs.writeFileSync(heFilePath, `${JSON.stringify(heObj, null, 2)}\n`, 'utf8');

      const { status, data } = await fetchJson(`${PUBLISH_BASE}/api/publish/status`);
      check('GET /api/publish/status (dirty) -> 200', status === 200 && data.ok === true, JSON.stringify(data));
      check(
        'dirty file is reported',
        Array.isArray(data.dirtyFiles) && data.dirtyFiles.includes('content.he.json'),
        JSON.stringify(data),
      );
    }

    // POST /api/publish -> commits + pushes the change.
    let firstHash = null;
    {
      const { status, data } = await fetchJson(`${PUBLISH_BASE}/api/publish`, { method: 'POST' });
      check('POST /api/publish (dirty) -> 200 ok:true', status === 200 && data.ok === true, JSON.stringify(data));
      check('POST /api/publish committed:true', data.committed === true, JSON.stringify(data));
      check('POST /api/publish pushed:true', data.pushed === true, JSON.stringify(data));
      check('POST /api/publish returns a hash', typeof data.hash === 'string' && data.hash.length > 0, JSON.stringify(data));
      check(
        'POST /api/publish dirtyFiles includes content.he.json',
        Array.isArray(data.dirtyFiles) && data.dirtyFiles.includes('content.he.json'),
        JSON.stringify(data),
      );
      firstHash = data.hash;
    }

    // The bare origin actually received the commit.
    {
      const bareLog = git(['log', '--oneline', '-1'], bareDir);
      check('bare origin log contains the marva-editor commit', bareLog.includes('marva-editor'), bareLog.trim());
      check('bare origin HEAD matches the pushed hash', firstHash ? bareLog.includes(firstHash) : false, bareLog.trim());
    }

    // Publish again with nothing changed -> ok:true but nothing actually done.
    {
      const { status, data } = await fetchJson(`${PUBLISH_BASE}/api/publish`, { method: 'POST' });
      check('POST /api/publish (nothing changed) -> 200 ok:true', status === 200 && data.ok === true, JSON.stringify(data));
      check('POST /api/publish (nothing changed) committed:false', data.committed === false, JSON.stringify(data));
      check('POST /api/publish (nothing changed) pushed:false', data.pushed === false, JSON.stringify(data));
    }

    // NOTE: a POST while one is already in-flight (-> 409) is intentionally
    // not exercised here — reliably racing two requests against the same
    // in-memory flag would be timing-flaky in a test suite.
  } finally {
    child.kill();
    fs.rmSync(baseDir, { recursive: true, force: true });
  }
}

// ---------------------------------------------------------------------------

async function main() {
  await runApiTests();
  await runPublishTests();

  console.log('');
  if (failCount === 0) {
    console.log(`SMOKE PASS ${passCount}/${passCount}`);
    process.exitCode = 0;
  } else {
    console.log(`SMOKE FAIL — first failure: ${firstFailure}`);
    console.log(`(${passCount} passed, ${failCount} failed, ${passCount + failCount} total)`);
    process.exitCode = 1;
  }
}

main();
