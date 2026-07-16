// Smoke test for marva-editor's server.mjs.
//
// Copies the miniature fixtures into a throwaway temp directory, starts the real
// server against that temp directory (isolated port, MARVA_NO_DEV=1 so it never
// tries to launch the real Astro dev server), and exercises the API's success and
// validation-failure paths. Run with: node test/smoke.mjs

import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const HERE = import.meta.dirname;
const FIXTURES_DIR = path.join(HERE, 'fixtures');
const PORT = 5641;
const BASE = `http://127.0.0.1:${PORT}`;

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

async function waitForUp(timeoutMs) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(`${BASE}/api/status`);
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

async function main() {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'marva-editor-smoke-'));
  for (const f of ['content.he.json', 'content.en.json', 'sections.json']) {
    fs.copyFileSync(path.join(FIXTURES_DIR, f), path.join(tmpDir, f));
  }

  const serverPath = path.join(HERE, '..', 'server.mjs');
  const child = spawn(process.execPath, [serverPath], {
    env: {
      ...process.env,
      MARVA_EDITOR_PORT: String(PORT),
      MARVA_DATA_DIR: tmpDir,
      MARVA_NO_DEV: '1',
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  let serverOutput = '';
  child.stdout.on('data', (d) => { serverOutput += d.toString(); });
  child.stderr.on('data', (d) => { serverOutput += d.toString(); });

  try {
    const up = await waitForUp(8000);
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
