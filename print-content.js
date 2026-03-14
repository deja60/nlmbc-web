const d = require('./site-content.json');
const skipWords = ['Email Login', 'Home About Us', 'About Us Our Leadership', 'Our PastorStaff', 'I Am New to NLMBC'];

Object.keys(d).forEach(k => {
  console.log('\n=== ' + k.toUpperCase() + ' ===');
  if (d[k].error) { console.log('ERROR:', d[k].error); return; }
  const seen = new Set();
  d[k].sections.forEach(s => {
    const t = s.text.replace(/\s+/g,' ').trim();
    const skip = t.length < 20 || seen.has(t) || skipWords.some(w => t.includes(w)) || t.startsWith('©');
    if (!skip) {
      seen.add(t);
      console.log('[' + s.tag + '] ' + t.substring(0, 400));
    }
  });
  if (d[k].images && d[k].images.length) {
    console.log('IMAGES:', d[k].images.map(i => i.alt || i.src.split('/').pop()).join(' | '));
  }
});
