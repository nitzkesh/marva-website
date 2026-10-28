// Render the approved, self-contained live-site brand reference.
// Prerequisite: npm install playwright ; npx playwright install chromium
const { chromium } = require('playwright');
const path = require('path');
const { pathToFileURL } = require('url');
(async () => {
 const browser = await chromium.launch();
 try {
  const page = await browser.newPage();
  await page.goto(pathToFileURL(path.join(__dirname, 'Marva_Brand_Book_source.html')).href);
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: path.join(__dirname, 'Marva_Brand_Book_2026-10-28.pdf'), printBackground: true, preferCSSPageSize: true });
 } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
