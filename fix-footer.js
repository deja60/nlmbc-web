const fs = require('fs');
const path = require('path');
const dir = '/Users/derrickworthington/nlmbc-web';
const files = ['index.html','about.html','services.html','leadership.html','media.html','new-visitor.html','contact.html'];

// Wrap the footer-brand section in a footer-brand-bar div
const oldBrandSection = `      <div class="footer-top">
        <div class="footer-brand-col">
          <div class="footer-brand">
            <a href="index.html">
              <img src="logo.png" alt="New Light Missionary Baptist Church" class="footer-logo-img" />
            </a>
          </div>
          <p class="footer-tagline">Exalting the Savior &bull; Equipping the Saints &bull; Evangelizing the Sinners</p>
          <div class="social-links" style="margin-top:1rem">
            <a href="https://twitter.com/NLMBCGSO" target="_blank" rel="noopener" class="social-btn">Twitter / X</a>
            <a href="https://www.facebook.com/pages/New-Light-Missionary-Baptist-Church-NLMBC/515124625273264" target="_blank" rel="noopener" class="social-btn">Facebook</a>
            <a href="https://www.youtube.com/channel/UC5Y4dRVFUz2XJPBI5qWHDgA" target="_blank" rel="noopener" class="social-btn">YouTube</a>
          </div>
        </div>`;

const newBrandSection = `      <!-- Logo brand bar — full width, centered -->
      <div class="footer-brand-bar">
        <div class="footer-brand">
          <a href="index.html">
            <img src="logo.png" alt="New Light Missionary Baptist Church" class="footer-logo-img" />
          </a>
        </div>
        <p class="footer-tagline">Exalting the Savior &bull; Equipping the Saints &bull; Evangelizing the Sinners</p>
        <p class="footer-est">Serving Greensboro, NC Since 1891</p>
        <div class="social-links" style="margin-top:1.25rem; justify-content:center">
          <a href="https://twitter.com/NLMBCGSO" target="_blank" rel="noopener" class="social-btn">Twitter / X</a>
          <a href="https://www.facebook.com/pages/New-Light-Missionary-Baptist-Church-NLMBC/515124625273264" target="_blank" rel="noopener" class="social-btn">Facebook</a>
          <a href="https://www.youtube.com/channel/UC5Y4dRVFUz2XJPBI5qWHDgA" target="_blank" rel="noopener" class="social-btn">YouTube</a>
        </div>
      </div>
      <!-- Footer info grid -->
      <div class="footer-top">
        <div class="footer-brand-col" style="display:none"><!-- moved to brand bar --></div>`;

files.forEach(f => {
  const fp = path.join(dir, f);
  let html = fs.readFileSync(fp, 'utf8');
  if (html.includes(oldBrandSection)) {
    html = html.replace(oldBrandSection, newBrandSection);
    console.log(`✓ ${f}`);
  } else {
    console.log(`  ${f}: pattern not found`);
  }
  fs.writeFileSync(fp, html);
});
console.log('Done!');
