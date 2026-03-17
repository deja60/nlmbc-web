// ============================================================
//  NLMBC Announcements — reads live from Firebase Firestore
//  Manage announcements at: admin.html
// ============================================================
(function () {

  // If Firebase SDK isn't loaded or config hasn't been filled in yet, do nothing.
  if (typeof firebase === 'undefined') return;
  if (!window.NLMBC_FIREBASE_CONFIG ||
      window.NLMBC_FIREBASE_CONFIG.apiKey.indexOf('REPLACE_') === 0) return;

  // Initialize Firebase (guard against duplicate initialization)
  if (!firebase.apps.length) {
    firebase.initializeApp(window.NLMBC_FIREBASE_CONFIG);
  }

  var db = firebase.firestore();

  var CAT_META = {
    general: { label: 'Announcement',   color: 'navy'   },
    event:   { label: 'Upcoming Event', color: 'gold'   },
    urgent:  { label: 'Urgent',         color: 'urgent' },
    worship: { label: 'Worship',        color: 'navy'   },
    prayer:  { label: 'Prayer',         color: 'navy'   }
  };

  function catMeta(c) { return CAT_META[c] || CAT_META.general; }

  function esc(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function render(docs) {
    var container = document.getElementById('announcements-list');
    var section   = document.getElementById('announcements-section');
    if (!container || !section) return;

    var active = docs.filter(function (a) { return a.active; });

    if (active.length === 0) {
      section.style.display = 'none';
      return;
    }
    section.style.display = '';

    container.innerHTML = active.map(function (ann) {
      var m = catMeta(ann.category);
      var dateHtml = ann.dateText
        ? '<span class="ann-date">' + esc(ann.dateText) + '</span>'
        : '';
      var linkHtml = ann.link
        ? '<a href="' + esc(ann.link) + '" class="ann-link"' +
          (ann.link.indexOf('http') === 0 ? ' target="_blank" rel="noopener"' : '') +
          '>' + esc(ann.linkText || 'Learn More') + ' \u2192</a>'
        : '';
      return [
        '<div class="ann-card ann-card--' + m.color + '">',
        '  <div class="ann-card-head">',
        '    <span class="ann-badge ann-badge--' + m.color + '">' + m.label + '</span>',
        '    ' + dateHtml,
        '  </div>',
        '  <h3 class="ann-title">' + esc(ann.title) + '</h3>',
        '  <p class="ann-body">' + esc(ann.body) + '</p>',
        '  ' + linkHtml,
        '</div>'
      ].join('');
    }).join('');
  }

  function load() {
    db.collection('announcements')
      .orderBy('createdAt', 'desc')
      .get()
      .then(function (snapshot) {
        var docs = [];
        snapshot.forEach(function (doc) {
          var d = doc.data();
          d._id = doc.id;
          docs.push(d);
        });
        render(docs);
      })
      .catch(function () {
        var section = document.getElementById('announcements-section');
        if (section) section.style.display = 'none';
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
  } else {
    load();
  }

})();
