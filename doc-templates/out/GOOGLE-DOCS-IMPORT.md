# Using the Marva templates in Google Docs

The 8 `.docx` files in this folder are Word templates. Google Docs can use them
too — you just import each one once, mark it as a template, and then copy it
every time you need a new document.

## One-time import (per template)

1. **Upload to Drive** — go to [drive.google.com](https://drive.google.com),
   click **New > File upload**, and pick the `.docx` file (for example
   `Marva-Quote-HE.docx`). Repeat for the templates you use.
2. **Open with Google Docs** — double-click the uploaded file in Drive, then
   click **Open with Google Docs** at the top.
3. **Convert it** — in the opened document, go to **File > Save as Google
   Doc**. This creates a real Google Doc next to the uploaded `.docx` (you can
   delete the `.docx` copy from Drive afterwards, or keep it as a backup).
4. **Rename it as a template** — click the title and rename it, keeping the
   name but adding a marker, for example: `Marva-Quote-HE [TEMPLATE]`.
   The marker reminds everyone to never type into this file directly.

## Every time you need a new document

Open the `[TEMPLATE]` file and choose **File > Make a copy**. Name the copy
(for example `Marva-Quote-HE - Cafe Dizengoff - 2026-07`), and work only in
the copy. The template stays clean.

## Fonts — if anything looks wrong after import

The templates use **Rubik** (headings), **Assistant** (Hebrew body), and
**Work Sans** (English body). All three are Google Fonts, and Google Docs has
them built in. If any text imports with a substituted font (it can happen):
select the affected text, open the **font picker** in the toolbar, and choose
the correct font by name — Rubik, Assistant, and Work Sans are all in the
list (use **More fonts** at the top of the picker if one is not shown yet).

## Two things to spot-check after conversion (known soft spots)

Google's `.docx` conversion is good but not perfect. After step 3, check:

1. **The thin green line under the header** (and above the footer) — confirm
   it survived on every page and still spans the full text width.
2. **The footer contact line** — phone should sit at the left edge, email in
   the center, website at the right edge, all on one line. This alignment is
   built with tab stops, which conversions sometimes shift. If it wrapped or
   bunched up, fix the tab stops or just re-space that one line.

Also glance at the page number under the contact line — it should stay
centered and keep counting automatically (it is a live field, not typed text).

## The 8 templates

| File | What it is |
|---|---|
| `Marva-Report-HE.docx` / `Marva-Report-EN.docx` | Report with a clean title page (Hebrew / English) |
| `Marva-Letter-HE.docx` / `Marva-Letter-EN.docx` | One-page business letter |
| `Marva-Memo-HE.docx` / `Marva-Memo-EN.docx` | Internal memo |
| `Marva-Quote-HE.docx` / `Marva-Quote-EN.docx` | Price quote (**not** a tax invoice — a חשבונית מס must come from licensed bookkeeping software) |
