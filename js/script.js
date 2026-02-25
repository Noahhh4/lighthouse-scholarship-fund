/* --- MOBILE NAV --- */
const toggle = document.getElementById('navToggle');
const links  = document.getElementById('navLinks');

function closeNav() {
  links.classList.remove('open');
  toggle.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  links.setAttribute('aria-hidden', 'true');
}

toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  links.setAttribute('aria-hidden', String(!open));
});

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });
document.addEventListener('click', e => {
  if (!toggle.contains(e.target) && !links.contains(e.target)) closeNav();
});

/* --- ACTIVE NAV LINK --- */
(function() {
  const page = document.body.dataset.page;
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    if (a.dataset.page === page) a.classList.add('active');
  });
})();

/* --- SCROLL FADE REVEAL --- */
function revealPage() {
  const fades = Array.from(document.querySelectorAll('.fade'));
  if (!fades.length) return;
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); o.unobserve(e.target); }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
  fades.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('visible');
    } else {
      obs.observe(el);
    }
  });
}

/* --- COUNT-UP (home page only) --- */
const DUR = 1800;
const ease = t => 1 - Math.pow(1 - t, 3);

function animateCount(el) {
  const target   = parseFloat(el.dataset.target);
  const prefix   = el.dataset.prefix || '';
  const suffix   = el.dataset.suffix || '';
  const decimals = Number.isInteger(target) ? 0 : 1;
  let start = null;
  function tick(ts) {
    if (!start) start = ts;
    const p = Math.min((ts - start) / DUR, 1);
    el.textContent = prefix + (ease(p) * target).toFixed(decimals) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function initCountUp() {
  const els = document.querySelectorAll('.stat-num[data-target]');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(e => {
      if (e.isIntersecting) { animateCount(e.target); o.unobserve(e.target); }
    });
  }, { threshold: 0.4 });
  els.forEach(el => obs.observe(el));
}

/* --- INIT --- */
revealPage();
initCountUp();
