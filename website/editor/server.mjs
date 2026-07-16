// marva-editor server — Express, ESM, Node 24.
//
// Serves a local content editor UI (./public) and a small JSON API that reads/writes
// the three data files the Astro site reads at build/render time. Also auto-starts
// the Astro dev server (npm run dev, port 4321) so a preview iframe can hot-reload.

import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { spawn, spawnSync, execFile } from 'node:child_process';
import { promisify } from 'node:util';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const PORT = process.env.MARVA_EDITOR_PORT || 5599;
const DATA_DIR = process.env.MARVA_DATA_DIR
  || path.resolve(import.meta.dirname, '../app/src/data');
const APP_DIR = path.resolve(import.meta.dirname, '../app');
const NO_DEV = process.env.MARVA_NO_DEV === '1';

// Root of the git repository. Overridable so tests can point publish's git
// operations at a throwaway repo instead of the real one.
const REPO_DIR = process.env.MARVA_REPO_DIR
  || path.resolve(import.meta.dirname, '../../');

// Repo-relative paths of the three files the editor is allowed to publish.
// Publish must NEVER touch anything outside this list.
const CONTENT_REPO_PATHS = [
  'website/app/src/data/content.he.json',
  'website/app/src/data/content.en.json',
  'website/app/src/data/sections.json',
];

const execFileAsync = promisify(execFile);

const FILES = {
  he: 'content.he.json',
  en: 'content.en.json',
  sections: 'sections.json',
};

// ---------------------------------------------------------------------------
// Dev-child state (Astro dev server this process may have spawned)
// ---------------------------------------------------------------------------

let devChild = null;
let devManaged = false;
let devLogRingBuffer = [];
let shuttingDown = false;
let respawnTimestamps = [];

const RESPAWN_WINDOW_MS = 5 * 60 * 1000;
const RESPAWN_MAX = 3;

function pushDevLog(line) {
  devLogRingBuffer.push(line);
  if (devLogRingBuffer.length > 200) devLogRingBuffer.shift();
}

// Overridable so the smoke suite can point the probe at a dead port and get a
// deterministic astroDev:false even while a real dev server runs on 4321.
const ASTRO_PORT = process.env.MARVA_ASTRO_PORT || 4321;

async function probeAstro() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 700);
  try {
    await fetch(`http://localhost:${ASTRO_PORT}/`, { signal: controller.signal });
    return true;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

function attachDevChildHandlers(child) {
  const onOutput = (chunk) => {
    const lines = chunk.toString().split(/\r?\n/).filter((l) => l.length > 0);
    for (const line of lines) {
      pushDevLog(line);
      console.log(`[astro] ${line}`);
    }
  };
  child.stdout?.on('data', onOutput);
  child.stderr?.on('data', onOutput);
  child.on('exit', (code, signal) => {
    pushDevLog(`[process exited] code=${code} signal=${signal}`);
    if (shuttingDown || !devManaged) return;
    devChild = null;

    const now = Date.now();
    respawnTimestamps = respawnTimestamps.filter((t) => now - t < RESPAWN_WINDOW_MS);
    if (respawnTimestamps.length >= RESPAWN_MAX) {
      console.log('[marva-editor] astro dev: giving up, restart me');
      return;
    }
    respawnTimestamps.push(now);
    console.log(`[marva-editor] astro dev: exited unexpectedly (code=${code} signal=${signal}) — respawning in 2s`);
    setTimeout(() => {
      if (shuttingDown) return;
      spawnDevChild();
    }, 2000);
  });
}

function spawnDevChild() {
  devChild = spawn('npm', ['run', 'dev'], { cwd: APP_DIR, shell: true });
  devManaged = true;
  console.log(`[marva-editor] astro dev: starting (pid ${devChild.pid})`);
  attachDevChildHandlers(devChild);
}

async function maybeStartAstroDev() {
  const up = await probeAstro();
  if (up) {
    console.log('[marva-editor] astro dev: already running on :4321');
    return;
  }
  spawnDevChild();
}

function killDevTree() {
  if (!devChild || !devManaged) return;
  if (process.platform === 'win32') {
    spawnSync('taskkill', ['/pid', String(devChild.pid), '/T', '/F']);
  } else {
    try {
      process.kill(-devChild.pid);
    } catch {
      try { devChild.kill(); } catch { /* already gone */ }
    }
  }
  devChild = null;
}

process.on('SIGINT', () => { shuttingDown = true; killDevTree(); process.exit(0); });
process.on('SIGTERM', () => { shuttingDown = true; killDevTree(); process.exit(0); });
process.on('exit', () => { shuttingDown = true; killDevTree(); });

// ---------------------------------------------------------------------------
// File helpers
// ---------------------------------------------------------------------------

function filePath(key) {
  return path.join(DATA_DIR, FILES[key]);
}

function readJsonFile(key) {
  const p = filePath(key);
  let raw;
  try {
    raw = fs.readFileSync(p, 'utf8');
  } catch (e) {
    throw new Error(`${FILES[key]}: cannot read file (${e.message})`);
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    throw new Error(`${FILES[key]}: invalid JSON (${e.message})`);
  }
}

function atomicWriteJson(targetPath, obj) {
  const tmpPath = `${targetPath}.tmp`;
  const data = `${JSON.stringify(obj, null, 2)}\n`;
  fs.writeFileSync(tmpPath, data, 'utf8');
  fs.renameSync(tmpPath, targetPath);
}

function isPlainObject(v) {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function keySetDiff(onDisk, incoming) {
  const onDiskKeys = new Set(Object.keys(onDisk));
  const incomingKeys = new Set(Object.keys(incoming));
  const missing = [...onDiskKeys].filter((k) => !incomingKeys.has(k));
  const added = [...incomingKeys].filter((k) => !onDiskKeys.has(k));
  return { missing, added };
}

function keyDiffMessage({ missing, added }) {
  const parts = [];
  if (missing.length) parts.push(`missing keys: ${missing.join(', ')}`);
  if (added.length) parts.push(`unexpected keys: ${added.join(', ')}`);
  return parts.join('; ');
}

// ---------------------------------------------------------------------------
// Publish (git commit + push of the three content files only)
// ---------------------------------------------------------------------------

let publishInFlight = false;

async function runGit(args) {
  return execFileAsync('git', args, {
    cwd: REPO_DIR,
    timeout: 60000,
    env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
  });
}

// Turns a caught exec error into a short, verbatim-ish message for the client:
// prefer stderr (that's where git puts its human-readable explanation), fall
// back to the error message, and cap it to the last few lines.
function gitErrorMessage(e) {
  const raw = (e && (e.stderr || e.message)) || String(e);
  const lines = String(raw).trim().split(/\r?\n/).filter((l) => l.length > 0);
  return lines.slice(-10).join('\n');
}

// `git status --porcelain -- <paths>` -> basenames of the dirty files among
// just those paths.
function parseDirtyFiles(porcelain) {
  const files = [];
  for (const raw of porcelain.split(/\r?\n/)) {
    if (!raw.trim()) continue;
    // porcelain v1: "XY <path>" (or "XY <old> -> <new>" for renames, which
    // cannot happen for our fixed set of paths, but handle it defensively).
    const filePart = raw.slice(3).trim();
    const arrowIdx = filePart.indexOf(' -> ');
    const finalPath = arrowIdx === -1 ? filePart : filePart.slice(arrowIdx + 4);
    files.push(path.basename(finalPath));
  }
  return files;
}

async function getDirtyContentFiles() {
  const { stdout } = await runGit(['status', '--porcelain', '--', ...CONTENT_REPO_PATHS]);
  return parseDirtyFiles(stdout);
}

async function getAheadCount() {
  try {
    const { stdout } = await runGit(['rev-list', '--count', 'origin/main..HEAD']);
    return { ahead: parseInt(stdout.trim(), 10) || 0 };
  } catch (e) {
    return { ahead: 0, aheadError: gitErrorMessage(e) };
  }
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------

const app = express();
app.use(express.json({ limit: '2mb' }));
app.use(express.static(path.join(import.meta.dirname, 'public')));

app.get('/api/state', (req, res) => {
  try {
    const he = readJsonFile('he');
    const en = readJsonFile('en');
    const sections = readJsonFile('sections');
    res.json({ ok: true, content: { he, en }, sections });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.get('/api/status', async (req, res) => {
  const astroDev = await probeAstro();
  res.json({ ok: true, astroDev, dataDir: DATA_DIR, devManaged });
});

app.get('/api/devlogs', (req, res) => {
  res.json({ ok: true, lines: devManaged ? devLogRingBuffer.slice() : [] });
});

app.put('/api/content/:locale', (req, res) => {
  const { locale } = req.params;
  if (locale !== 'he' && locale !== 'en') {
    return res.status(404).json({ ok: false, error: `unknown locale "${locale}"` });
  }

  const body = req.body;
  if (!isPlainObject(body)) {
    return res.status(400).json({ ok: false, error: 'request body must be a JSON object' });
  }

  let onDisk;
  try {
    onDisk = readJsonFile(locale);
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }

  const diff = keySetDiff(onDisk, body);
  if (diff.missing.length || diff.added.length) {
    return res.status(400).json({ ok: false, error: keyDiffMessage(diff) });
  }

  if (isPlainObject(body.homeHero) && Object.prototype.hasOwnProperty.call(body.homeHero, 'bottleLabelLines')) {
    const lines = body.homeHero.bottleLabelLines;
    const valid = Array.isArray(lines) && lines.length === 3 && lines.every((l) => typeof l === 'string');
    if (!valid) {
      return res.status(400).json({
        ok: false,
        error: 'homeHero.bottleLabelLines must be an array of exactly 3 strings',
      });
    }
  }

  try {
    atomicWriteJson(filePath(locale), body);
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }

  res.json({ ok: true });
});

app.put('/api/sections', (req, res) => {
  const body = req.body;
  if (!isPlainObject(body)) {
    return res.status(400).json({ ok: false, error: 'request body must be a JSON object' });
  }

  let onDisk;
  try {
    onDisk = readJsonFile('sections');
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }

  const diff = keySetDiff(onDisk, body);
  if (diff.missing.length || diff.added.length) {
    return res.status(400).json({ ok: false, error: keyDiffMessage(diff) });
  }

  const badLeaves = [];
  for (const topKey of Object.keys(body)) {
    const sub = body[topKey];
    if (!isPlainObject(sub)) {
      badLeaves.push(`${topKey} (expected an object of booleans)`);
      continue;
    }
    for (const leafKey of Object.keys(sub)) {
      if (typeof sub[leafKey] !== 'boolean') {
        badLeaves.push(`${topKey}.${leafKey}`);
      }
    }
  }
  if (badLeaves.length) {
    return res.status(400).json({
      ok: false,
      error: `non-boolean leaf value(s): ${badLeaves.join(', ')}`,
    });
  }

  try {
    atomicWriteJson(filePath('sections'), body);
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }

  res.json({ ok: true });
});

app.get('/api/publish/status', async (req, res) => {
  try {
    const dirtyFiles = await getDirtyContentFiles();
    const { stdout: branchOut } = await runGit(['rev-parse', '--abbrev-ref', 'HEAD']);
    const branch = branchOut.trim();
    const { ahead, aheadError } = await getAheadCount();

    const result = { ok: true, dirtyFiles, ahead, branch };
    if (aheadError) result.aheadError = aheadError;
    res.json(result);
  } catch (e) {
    res.status(500).json({ ok: false, error: gitErrorMessage(e) });
  }
});

app.post('/api/publish', async (req, res) => {
  if (publishInFlight) {
    return res.status(409).json({ ok: false, error: 'publish already in progress' });
  }
  publishInFlight = true;

  try {
    const dirtyFiles = await getDirtyContentFiles();

    let committed = false;
    if (dirtyFiles.length > 0) {
      // SAFETY: only ever stage the three known content-file paths — never
      // `git add -A` / `git add .`, and never anything derived from the
      // request body (this endpoint takes no body at all).
      await runGit(['add', '--', ...CONTENT_REPO_PATHS]);
      await runGit(['commit', '-m', `content: edits via marva-editor (${dirtyFiles.join(', ')})`]);
      committed = true;
    }

    const { ahead } = await getAheadCount();
    let pushed = false;
    if (ahead > 0) {
      // SAFETY: always the current branch to origin/main — never a force
      // push, never any other branch.
      await runGit(['push', 'origin', 'main']);
      pushed = true;
    }

    const { stdout: hashOut } = await runGit(['rev-parse', '--short', 'HEAD']);
    res.json({ ok: true, committed, pushed, hash: hashOut.trim(), dirtyFiles });
  } catch (e) {
    res.status(500).json({ ok: false, error: gitErrorMessage(e) });
  } finally {
    publishInFlight = false;
  }
});

app.listen(PORT, '127.0.0.1', async () => {
  console.log(`[marva-editor] ready → http://localhost:${PORT}`);
  console.log(`[marva-editor] data dir: ${DATA_DIR}`);
  if (!NO_DEV) {
    await maybeStartAstroDev();
  }
});
