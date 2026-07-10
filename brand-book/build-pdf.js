// Regenerates the brand book PDF from Marva_Brand_Book_source.html.
// Substitutes __LEAF_SVG__ (public/marva-mark.svg) and __LABEL_PNG_B64__
// (Marva_label_artboards.png) into the source, then prints to PDF via headless Chrome.
//
// Usage: node build-pdf.js <output-filename.pdf>
// Example: node build-pdf.js Marva_Brand_Book_v0.4_HE.pdf

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const DIR = __dirname;
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const outName = process.argv[2];
if (!outName) {
  console.error('Usage: node build-pdf.js <output-filename.pdf>');
  process.exit(1);
}

const sourceHtml = fs.readFileSync(path.join(DIR, 'Marva_Brand_Book_source.html'), 'utf8');

// Leaf mark SVG — strip any width/height attrs (keep viewBox) so it doesn't
// override the CSS container sizing when inlined.
let leafSvg = fs.readFileSync(path.join(DIR, '..', 'website', 'app', 'public', 'marva-mark.svg'), 'utf8');
leafSvg = leafSvg.replace(/\s(width|height)="[^"]*"/g, '');

const labelPngB64 = fs.readFileSync(path.join(DIR, 'Marva_label_artboards.png')).toString('base64');

const filled = sourceHtml
  .split('__LEAF_SVG__').join(leafSvg)
  .split('__LABEL_PNG_B64__').join(labelPngB64);

const tempHtmlPath = path.join(DIR, '_build_temp.html');
fs.writeFileSync(tempHtmlPath, filled, 'utf8');

const outPath = path.join(DIR, outName);
const profileDir = path.join(DIR, '.chrome-profile');

try {
  execFileSync(CHROME, [
    '--headless=new',
    '--disable-gpu',
    `--user-data-dir=${profileDir}`,
    '--virtual-time-budget=6000',
    `--print-to-pdf=${outPath}`,
    '--no-pdf-header-footer',
    tempHtmlPath,
  ], { stdio: 'inherit' });
  console.log('Wrote', outPath);
} finally {
  fs.unlinkSync(tempHtmlPath);
}
