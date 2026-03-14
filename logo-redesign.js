const fs = require('fs');
const path = require('path');
const dir = '/Users/derrickworthington/nlmbc-web';

const files = ['index.html','about.html','services.html','leadership.html','media.html','new-visitor.html','contact.html'];

// ─── 1. Upgrade nav logo → logo + brand text in all files ───────────────────
const navOld = `<a href="index.html" class="nav-logo">
        <img src="logo.png" alt="New Light Missionary Baptist Church" class="nav-logo-img" />
      </a>`;

const navNew = `<a href="index.html" class="nav-logo">
        <img src="logo.png" alt="New Light Missionary Baptist Church" class="nav-logo-img" />
        <span class="nav-brand-text">
          <span class="nav-brand-name">New Light</span>
          <span class="nav-brand-sub">Missionary Baptist Church</span>
        </span>
      </a>`;

// ─── 2. Upgrade footer logo → larger + centered in all files ────────────────
const footerBrandOld = `          <div class="footer-brand">
            <img src="logo.png" alt="New Light Missionary Baptist Church" class="footer-logo-img" />
          </div>`;

const footerBrandNew = `          <div class="footer-brand">
            <a href="index.html">
              <img src="logo.png" alt="New Light Missionary Baptist Church" class="footer-logo-img" />
            </a>
          </div>`;

// ─── 3. Redesign index.html hero → split layout ─────────────────────────────
const heroOld = `  <section class="hero" id="home">
    <div class="hero-content">
      <div class="hero-logo-wrap">
        <img src="logo.png" alt="New Light Missionary Baptist Church" class="hero-logo-img" />
      </div>
      <p class="hero-eyebrow">Serving Greensboro Since 1891</p>
      <h1 class="hero-title">New Light Missionary<br />Baptist Church</h1>
      <p class="hero-tagline">Exalting the Savior &bull; Equipping the Saints &bull; Evangelizing the Sinners</p>
      <div class="hero-actions">
        <a href="new-visitor.html" class="btn btn-primary">Plan Your Visit</a>
        <a href="services.html" class="btn btn-outline">View Service Times</a>
      </div>
    </div>
    <div class="hero-scroll-hint">
      <span>Scroll</span>
      <div class="scroll-line"></div>
    </div>
  </section>`;

const heroNew = `  <section class="hero" id="home">
    <div class="hero-split">
      <!-- Left: Logo feature panel -->
      <div class="hero-logo-panel">
        <div class="hero-logo-badge">
          <img src="logo.png" alt="New Light Missionary Baptist Church" class="hero-logo-full" />
          <div class="hero-est-badge">Est. 1891</div>
        </div>
      </div>
      <!-- Right: Content panel -->
      <div class="hero-content-panel">
        <p class="hero-eyebrow">Serving Greensboro for 131+ Years</p>
        <h1 class="hero-title">New Light Missionary<br />Baptist Church</h1>
        <p class="hero-tagline">Exalting the Savior &bull; Equipping the Saints &bull; Evangelizing the Sinners</p>
        <div class="hero-service-preview">
          <div class="hsp-item"><span class="hsp-day">Sunday</span><span class="hsp-time">7:30 &amp; 10:45 AM</span></div>
          <div class="hsp-item"><span class="hsp-day">Wednesday</span><span class="hsp-time">12 PM &amp; 7 PM</span></div>
          <div class="hsp-item"><span class="hsp-day">Prayer Line Thu</span><span class="hsp-time">8:00 PM</span></div>
        </div>
        <div class="hero-actions">
          <a href="new-visitor.html" class="btn btn-primary">Plan Your Visit</a>
          <a href="services.html" class="btn btn-outline">View Service Times</a>
        </div>
      </div>
    </div>
    <div class="hero-scroll-hint">
      <span>Scroll</span>
      <div class="scroll-line"></div>
    </div>
  </section>`;

// ─── Apply changes ────────────────────────────────────────────────────────────
files.forEach(file => {
  const fp = path.join(dir, file);
  let html = fs.readFileSync(fp, 'utf8');
  let changes = [];

  if (html.includes(navOld)) {
    html = html.replaceAll(navOld, navNew);
    changes.push('nav brand text');
  }
  while (html.includes(footerBrandOld)) {
    html = html.replace(footerBrandOld, footerBrandNew);
    changes.push('footer logo link');
  }
  if (file === 'index.html' && html.includes(heroOld)) {
    html = html.replace(heroOld, heroNew);
    changes.push('hero split layout');
  }

  fs.writeFileSync(fp, html);
  console.log(`✓ ${file}: ${changes.join(', ') || 'no changes'}`);
});
console.log('\nDone!');
