// ============================================================
//  NLMBC Announcements — localStorage display layer
//  Manage announcements at: admin.html
// ============================================================
(function () {
  var ANN_KEY = 'nlmbc_announcements';

  var DEFAULTS = [
    {
      id: 1,
      title: 'Welcome to New Light Missionary Baptist Church',
      body: 'We are so glad you are here. Whether joining us in person or online, you are warmly welcomed. Stop by the Welcome Center after service — we would love to meet you!',
      date: new Date().toISOString().slice(0, 10),
      category: 'general',
      link: 'new-visitor.html',
      linkText: 'Plan Your Visit',
      active: true
    },
    {
      id: 2,
      title: 'MidWeek Manna — Wednesday Bible Study',
      body: 'Join us every Wednesday at 12:00 PM and 7:00 PM for MidWeek Manna worship and Bible Study in the Sanctuary. All are welcome.',
      date: new Date().toISOString().slice(0, 10),
      category: 'worship',
      link: 'services.html',
      linkText: 'Service Details',
      active: true
    }
  ];

  function getAll() {
    try {
      var s = localStorage.getItem(ANN_KEY);
      if (s) return JSON.parse(s);
    } catch (e) { /* fall through */ }
    return DEFAULTS;
  }

  function seed() {
    if (!localStorage.getItem(ANN_KEY)) {
      localStorage.setItem(ANN_KEY, JSON.stringify(DEFAULTS));
    }
  }

  var CAT_META = {
    general: { label: 'Announcement',   color: 'navy'   },
    event:   { label: 'Upcoming Event', color: 'gold'   },
    urgent:  { label: 'Urgent',         color: 'urgent' },
    worship: { label: 'Worship',        color: 'navy'   },
    prayer:  { label: 'Prayer',         color: 'navy'   }
  };

  function catMeta(c) { return CAT_META[c] || CAT_META.general; }

  function formatDate(d) {
    if (!d) return '';
    return new Date(d + 'T00:00:00').toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric'
    });
  }

  function esc(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function render() {
    var container = document.getElementById('announcements-list');
    var section   = document.getElementById('announcements-section');
    if (!container || !section) return;

    seed();
    var all    = getAll();
    var active = all
      .filter(function (a) { return a.active; })
      .sort(function (a, b) { return new Date(b.date) - new Date(a.date); });

    if (active.length === 0) {
      section.style.display = 'none';
      return;
    }
    section.style.display = '';

    container.innerHTML = active.map(function (ann) {
      var m = catMeta(ann.category);
      var linkHtml = ann.link
        ? '<a href="' + esc(ann.link) + '" class="ann-link"' +
          (ann.link.indexOf('http') === 0 ? ' target="_blank" rel="noopener"' : '') +
          '>' + esc(ann.linkText || 'Learn More') + ' \u2192</a>'
        : '';
      return [
        '<div class="ann-card ann-card--' + m.color + '">',
        '  <div class="ann-card-head">',
        '    <span class="ann-badge ann-badge--' + m.color + '">' + m.label + '</span>',
        '    <span class="ann-date">' + formatDate(ann.date) + '</span>',
        '  </div>',
        '  <h3 class="ann-title">' + esc(ann.title) + '</h3>',
        '  <p class="ann-body">' + esc(ann.body) + '</p>',
        '  ' + linkHtml,
        '</div>'
      ].join('');
    }).join('');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
