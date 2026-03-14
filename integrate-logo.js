const fs = require('fs');
const path = require('path');

const files = ['index.html','about.html','services.html','leadership.html','media.html','new-visitor.html','contact.html'];

const navOld = `<a href="index.html" class="nav-logo">
        <span class="logo-cross">✦</span>
        <span class="logo-text">New Light MBC</span>
      </a>`;
const navNew = `<a href="index.html" class="nav-logo">
        <img src="logo.png" alt="New Light Missionary Baptist Church" class="nav-logo-img" />
      </a>`;

const footerBrandOld = `          <div class="footer-brand">
            <span class="logo-cross">✦</span>
            <span class="logo-text">New Light Missionary Baptist Church</span>
          </div>`;
const footerBrandNew = `          <div class="footer-brand">
            <img src="logo.png" alt="New Light Missionary Baptist Church" class="footer-logo-img" />
          </div>`;

// Hero logo injection (index.html only)
const heroEyebrowOld = `      <p class="hero-eyebrow">Serving Greensboro Since 1891</p>`;
const heroEyebrowNew = `      <div class="hero-logo-wrap">
        <img src="logo.png" alt="New Light Missionary Baptist Church" class="hero-logo-img" />
      </div>
      <p class="hero-eyebrow">Serving Greensboro Since 1891</p>`;

// Page hero logo injection (inner pages)
const pageHeroOld = `    <div class="page-hero-content">
      <p class="section-eyebrow">`;
const pageHeroNew = `    <div class="page-hero-content">
      <div class="page-hero-logo">
        <img src="logo.png" alt="New Light Missionary Baptist Church" class="page-hero-logo-img" />
      </div>
      <p class="section-eyebrow">`;

const dir = '/Users/derrickworthington/nlmbc-web';

files.forEach(file => {
  const fp = path.join(dir, file);
  let html = fs.readFileSync(fp, 'utf8');
  let changed = 0;

  // Nav logo
  if (html.includes(navOld)) { html = html.replace(navOld, navNew); changed++; }

  // Footer brand (may appear once, some pages have it)
  while (html.includes(footerBrandOld)) { html = html.replace(footerBrandOld, footerBrandNew); changed++; }

  // Hero logo (index only)
  if (file === 'index.html' && html.includes(heroEyebrowOld)) {
    html = html.replace(heroEyebrowOld, heroEyebrowNew); changed++;
  }

  // Page hero logo (inner pages)
  if (file !== 'index.html' && html.includes(pageHeroOld)) {
    html = html.replaceAll(pageHeroOld, pageHeroNew); changed++;
  }

  fs.writeFileSync(fp, html);
  console.log(`✓ ${file}: ${changed} replacement(s)`);
});

console.log('\nDone!');
