// ===== Sticky header on scroll =====
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ===== Mobile nav toggle =====
const toggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

function closeNav() {
  navLinks.classList.remove('open');
  toggle.classList.remove('active');
  const spans = toggle.querySelectorAll('span');
  spans[0].style.transform = '';
  spans[1].style.opacity = '';
  spans[2].style.transform = '';
}

toggle.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = navLinks.classList.toggle('open');
  toggle.classList.toggle('active', isOpen);
  const spans = toggle.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    closeNav();
  }
});

// Mobile dropdown toggle
document.querySelectorAll('.has-dropdown > a').forEach(link => {
  link.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      link.parentElement.classList.toggle('open');
    }
  });
});

// Close nav on link click
navLinks.querySelectorAll('a:not(.has-dropdown > a)').forEach(link => {
  link.addEventListener('click', closeNav);
});

// Close nav on outside click
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('open') && !header.contains(e.target)) {
    closeNav();
  }
});

// ===== Fade-in on scroll =====
const fadeSelectors = [
  '.time-card', '.quick-card', '.service-card', '.ministry-card',
  '.expect-card', '.staff-card', '.platform-card', '.milestone',
  '.pillar', '.pastor-full-card', '.first-lady-card'
];

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = entry.target.style.transform.replace('translateY(20px)', 'translateY(0)');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll(fadeSelectors.join(',')).forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.5s ease ${(i % 4) * 0.08}s, transform 0.5s ease ${(i % 4) * 0.08}s`;
  observer.observe(el);
});

// ===== Active nav link for current page =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});
