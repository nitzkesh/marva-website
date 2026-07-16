# marva-editor

A local, offline content editor for the Marva website. It gives Nitzan a form-based
UI to edit the site's copy (in Hebrew and English) and to switch whole sections of
the site on or off, without touching code. It only runs on your own computer
(`localhost`) — nothing here is deployed or exposed to the internet.

It reads and writes three JSON files that the live site already uses:
- `../app/src/data/content.he.json` — all Hebrew copy
- `../app/src/data/content.en.json` — all English copy
- `../app/src/data/sections.json` — on/off switches for each section of each page

## How to run it

```
cd website/editor
npm install     # first time only — downloads the one small dependency (Express)
npm start
```

Then open `http://localhost:5599` in a browser.

The editor automatically starts the site's own local preview server (`npm run dev`
inside `website/app`, normally at `http://localhost:4321`) so the right-hand preview
pane can show your changes live. You do not need to start that yourself.

**To stop everything:** press Ctrl+C in the terminal where you ran `npm start`. This
shuts down both the editor and the preview server it started for you.

## Publishing your changes to the live site

`[ PUBLISH ]` (next to `[ WRITE ]` and `[ REVERT ]` in the header) sends your saved
edits out to the real website. Concretely, it does two things using `git` (the
version-control tool the whole codebase is tracked with):

1. **Commits** the three content files (`content.he.json`, `content.en.json`,
   `sections.json`) — and only those three files, nothing else you or another
   process may have touched.
2. **Pushes** that commit to `origin/main` on GitHub.

Once GitHub has the push, its existing automation (a "GitHub Actions workflow" —
a script GitHub runs for you on every push to `main`) rebuilds and redeploys the
site automatically. That takes about a minute, which is why the confirmation
message says "live in ~1 min".

Publish only ever acts on those three files — it will never pick up unrelated
changes, never touch another branch, and never force-push. Clicking `[ PUBLISH ]`
first shows you exactly what it's about to do (which files, how many commits) in a
strip under the header; nothing is committed or pushed until you click
`[ CONFIRM PUBLISH ]`. If you have unsaved edits (haven't clicked `[ WRITE ]` yet),
it tells you to write first instead of publishing half-finished changes.

`[ WRITE ]` and `[ PUBLISH ]` are deliberately separate: `[ WRITE ]` only saves to
your local disk, `[ PUBLISH ]` is the one that reaches the internet.

## Environment variables

All of these are optional — set them before `npm start` (or `node server.mjs`) only
if you need non-default behavior:

- `MARVA_EDITOR_PORT` — which port the editor itself listens on (default `5599`).
- `MARVA_DATA_DIR` — where to read/write the three content JSON files (default
  `../app/src/data`, i.e. the real site's data folder).
- `MARVA_REPO_DIR` — which git repository `[ PUBLISH ]` commits and pushes in
  (default: this workspace's repo root). Together with `MARVA_DATA_DIR`, this is
  what lets the automated tests run publish against a disposable, offline test
  repo instead of your real one.
- `MARVA_NO_DEV` — set to `1` to stop the editor from auto-starting the site's
  preview server (`npm run dev`). Used by tests; you shouldn't need this normally.

## If the site preview server keeps crashing

The editor auto-starts the site's preview server (`npm run dev` in `website/app`)
and watches it. If that preview server crashes on its own (not because you closed
the editor), the editor will automatically restart it for you after a couple of
seconds — up to 3 times within a 5-minute window. If it crashes a 4th time in that
window, the editor gives up and logs `astro dev: giving up, restart me` — at that
point something is actually wrong with the site code, and restarting the editor
itself won't fix it until that's resolved.

## What "Node", "Express", "npm" mean (new-to-DevOps glossary)

- **Node.js** — the program that runs JavaScript outside a browser, i.e. as a normal
  desktop program. This editor's server (`server.mjs`) is a Node program.
- **npm** — Node's package manager; `npm install` downloads code libraries a project
  depends on, `npm start` runs the script named `start` in `package.json`.
- **Express** — a small, well-known library for building a local web server (handling
  web addresses like `/api/state` and returning JSON or HTML). This is the only thing
  `npm install` downloads.
- **JSON** — a plain-text data format (`{ "key": "value" }`) that's both human-readable
  and easy for programs to read. The three files above are JSON.

## Saving

Edits are only written to disk when you click `[ WRITE ]` (or press Ctrl+S). Until
then your changes live only in the browser tab — closing the tab or clicking
`[ REVERT ]` discards them.

## Troubleshooting

- **Nothing shows in the preview pane / status bar says `astro` is offline** — the
  site's preview server may still be starting up (it can take a few seconds the
  first time). Wait and it should come up on its own.
- **Port 5599 already in use** — set `MARVA_EDITOR_PORT` to a different port before
  running `npm start`.
- **Running the automated smoke test** (`node test/smoke.mjs`) starts its own,
  isolated copy of the server against throwaway test files, and sets `MARVA_NO_DEV=1`
  so it does not also try to launch the real site preview server.
