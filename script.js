/* ════════════════════════════════════════════════════════════
   GLOW & GLAM — script.js
════════════════════════════════════════════════════════════ */

const isMobile = () => window.innerWidth <= 768;

// ── LOADER ──────────────────────────────────────────────────
const loader = document.getElementById('loader');
window.addEventListener('load', () => {
  setTimeout(() => loader.classList.add('done'), 1600);
});

// ── CUSTOM CURSOR (desktop only) ─────────────────────────────
if (!isMobile()) {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(calc(${mx}px - 50%), calc(${my}px - 50%))`;
  }, { passive: true });

  (function animateCursor() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.transform = `translate(calc(${rx}px - 50%), calc(${ry}px - 50%))`;
    requestAnimationFrame(animateCursor);
  })();
}

// ── HEADER SCROLL STATE ──────────────────────────────────────
const header = document.getElementById('header');
let headerTicking = false;
window.addEventListener('scroll', () => {
  if (!headerTicking) {
    requestAnimationFrame(() => {
      header.classList.toggle('scrolled', window.scrollY > 50);
      headerTicking = false;
    });
    headerTicking = true;
  }
}, { passive: true });

// ── MOBILE MENU ──────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const nav       = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  nav.classList.toggle('open');
  document.body.classList.toggle('nav-open');
});

nav.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
    document.body.classList.remove('nav-open');
  });
});

// ── SCROLL REVEAL (IntersectionObserver — zero scroll cost) ──
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ── HERO PARALLAX (desktop only, rAF-throttled) ──────────────
const heroBg = document.getElementById('heroBg');
if (heroBg && !isMobile()) {
  let parallaxTicking = false;
  window.addEventListener('scroll', () => {
    if (!parallaxTicking) {
      requestAnimationFrame(() => {
        heroBg.style.transform = `scale(1.08) translateY(${window.scrollY * 0.2}px)`;
        parallaxTicking = false;
      });
      parallaxTicking = true;
    }
  }, { passive: true });
}

// ── FOOTER YEAR ──────────────────────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── SMOOTH ANCHOR SCROLL ─────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = isMobile() ? 64 : 76;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
