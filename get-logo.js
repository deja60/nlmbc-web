const { webkit } = require('playwright');
const fs = require('fs');
const https = require('https');
const http = require('http');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    lib.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', reject);
  });
}

(async () => {
  const browser = await webkit.launch({ headless: true });
  const context = await browser.newContext();

  for (const path of ['/our_history_', '/mission']) {
    const page = await context.newPage();
    await page.goto('https://nlmbc.com' + path, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(1500);

    const imgs = await page.evaluate(() =>
      Array.from(document.querySelectorAll('img')).map(img => ({
        src: img.src, alt: img.alt, w: img.naturalWidth, h: img.naturalHeight
      })).filter(i => i.src && i.w > 30 && i.h > 30)
    );

    console.log('\nPage:', path);
    imgs.forEach(i => console.log(`  ${i.w}x${i.h} | ${i.alt || '(no alt)'} | ${i.src}`));

    const logo = imgs.find(i =>
      i.src.toLowerCase().includes('logo') ||
      i.alt.toLowerCase().includes('logo') ||
      i.alt.toLowerCase().includes('new light')
    );
    if (logo) {
      console.log('\n>>> Found logo:', logo.src);
      await download(logo.src, '/Users/derrickworthington/nlmbc-web/logo.png');
      console.log('Saved to logo.png');
      await page.close();
      break;
    }
    await page.close();
  }

  await browser.close();
})();
