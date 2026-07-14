# Installing the Marva email signature in Gmail

## Before you start
- **Do this after the website is deployed**, or the logo will show as a broken
  image icon until then. The signature still works either way (Gmail caches the
  HTML you paste, not the image itself) — the logo just fills in once
  `https://marva-water.com/sig/marva-mark-sig.png` is live.
- **Turn off "Plain text mode" first.** If Gmail's compose window is in plain
  text mode, pasting a formatted signature strips all the HTML — you'd get a
  jumble of unstyled text instead of the table layout. Plain text mode is a
  per-compose-window toggle (⋮ menu in the compose window), not a signature
  setting, so just make sure it's off before you copy/paste below.

## Steps
1. Open `signature.html` in a browser (double-click the file, or drag it into
   Chrome/Edge). You'll see the rendered signature — logo, name, contact line,
   tagline.
2. Click anywhere on the page, then **select all** (`Ctrl+A` on Windows,
   `Cmd+A` on Mac) and **copy** (`Ctrl+C` / `Cmd+C`).
   - Important: copy the **rendered page** (what you see in the browser
     window), not the HTML source. If you view-source and copy the raw tags,
     Gmail will paste literal `<table>` text instead of a formatted signature.
3. In Gmail, click the gear icon (top right) → **See all settings**.
4. Stay on the **General** tab and scroll to the **Signature** section.
5. Click **Create new**, give it a name (e.g. "Marva"), then click inside the
   empty signature editing box.
6. **Paste** (`Ctrl+V` / `Cmd+V`). The signature should appear fully
   formatted — logo on the left, sage divider line, name/title/contact/tagline
   on the right.
7. Just below the signature box, under **signature defaults**, set this
   signature for both **"For new emails use"** and **"On reply/forward use"**
   (unless you'd rather leave replies signature-free — your call).
8. Scroll to the bottom and click **Save Changes**.
9. Send yourself a test email to confirm it looks right in an actual inbox
   (formatting in the settings preview can differ slightly from a real
   message).

## Notes
- The job title on line 1 ("Co-Founder, Marva") is a placeholder — edit it in
  Gmail's signature box directly (click into the text, retype) if it's not
  accurate.
- If you ever need to update the signature (new phone, new tagline, etc.),
  easiest path is: edit `signature.html`, reopen it in the browser, and repeat
  steps 2–8 to replace the old one.
