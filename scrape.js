const { webkit } = require('playwright');
const fs = require('fs');

const BASE = 'https://nlmbc.com';
const PAGES = [
  { name: 'home',         url: `${BASE}/home` },
  { name: 'new_to_nlmbc', url: `${BASE}/i_am_new_to_nlmbc` },
  { name: 'history',      url: `${BASE}/our_history_` },
  { name: 'pulpit',       url: `${BASE}/our_pulpit` },
  { name: 'mission',      url: `${BASE}/mission` },
  { name: 'ministries',   url: `${BASE}/ministries_` },
  { name: 'pastor',       url: `${BASE}/our_pastor` },
  { name: 'staff',        url: `${BASE}/staff` },
  { name: 'media',        url: `${BASE}/media` },
  { name: 'contact',      url: `${BASE}/contact_us` },
];

(async () => {
  const browser = await webkit.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36'
  });

  const results = {};

  for (const page of PAGES) {
    console.log(`Scraping: ${page.url}`);
    const p = await context.newPage();
    try {
      await p.goto(page.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await p.waitForTimeout(1500);

      const data = await p.evaluate(() => {
        // Remove nav, header, footer, scripts, styles
        ['script','style','nav','header','footer','.nav-bar','.top-bar'].forEach(sel => {
          document.querySelectorAll(sel).forEach(el => el.remove());
        });

        // Get all meaningful text blocks
        const sections = [];
        document.querySelectorAll('h1,h2,h3,h4,p,li,blockquote,figcaption,td,th').forEach(el => {
          const text = el.innerText?.trim();
          if (text && text.length > 10) {
            sections.push({ tag: el.tagName, text });
          }
        });

        // Get all images with alt text or src
        const images = [];
        document.querySelectorAll('img').forEach(img => {
          if (img.src && !img.src.includes('spacer') && img.naturalWidth > 50) {
            images.push({ src: img.src, alt: img.alt || '' });
          }
        });

        return { title: document.title, sections, images };
      });

      results[page.name] = data;
      console.log(`  ✓ ${data.sections.length} text blocks, ${data.images.length} images`);
    } catch (err) {
      console.log(`  ✗ Error: ${err.message}`);
      results[page.name] = { error: err.message };
    }
    await p.close();
  }

  await browser.close();
  fs.writeFileSync('/Users/derrickworthington/nlmbc-web/site-content.json', JSON.stringify(results, null, 2));
  console.log('\nDone! Content saved to site-content.json');
})();
