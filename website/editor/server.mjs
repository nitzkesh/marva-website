// marva-editor server — Express, ESM, Node 24.
//
// Serves a local content editor UI (./public) and a small JSON API that reads/writes
// the three data files the Astro site reads at build/render time. Also auto-starts
// the Astro dev server (npm run dev, port 4321) so a preview iframe can hot-reload.

import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const PORT = process.env.MARVA_EDITOR_PORT || 5599;
const DATA_DIR = process.env.MARVA_DATA_DIR
  || path.resolve(import.meta.dirname, '../app/src/data');
const APP_DIR = path.resolve(import.meta.dirname, '../app');
const NO_DEV = process.env.MARVA_NO_DEV === '1';

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

function pushDevLog(line) {
  devLogRingBuffer.push(line);
  if (devLogRingBuffer.length > 200) devLogRingBuffer.shift();
}

async function probeAstro() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 700);
  try {
    await fetch('http://localhost:4321/', { signal: controller.signal });
    return true;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

async function maybeStartAstroDev() {
  const up = await probeAstro();
  if (up) {
    console.log('[marva-editor] astro dev: already running on :4321');
    return;
  }
  devChild = spawn('npm', ['run', 'dev'], { cwd: APP_DIR, shell: true });
  devManaged = true;
  console.log(`[marva-editor] astro dev: starting (pid ${devChild.pid})`);

  const onOutput = (chunk) => {
    const lines = chunk.toString().split(/\r?\n/).filter((l) => l.length > 0);
    for (const line of lines) {
      pushDevLog(line);
      console.log(`[astro] ${line}`);
    }
  };
  devChild.stdout?.on('data', onOutput);
  devChild.stderr?.on('data', onOutput);
  devChild.on('exit', (code, signal) => {
    pushDevLog(`[process exited] code=${code} signal=${signal}`);
  });
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

process.on('SIGINT', () => { killDevTree(); process.exit(0); });
process.on('SIGTERM', () => { killDevTree(); process.exit(0); });
process.on('exit', () => { killDevTree(); });

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

app.listen(PORT, '127.0.0.1', async () => {
  console.log(`[marva-editor] ready → http://localhost:${PORT}`);
  console.log(`[marva-editor] data dir: ${DATA_DIR}`);
  if (!NO_DEV) {
    await maybeStartAstroDev();
  }
});
