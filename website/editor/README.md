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
