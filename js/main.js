// LAVA — site interactions
(() => {
  'use strict';

  // ---------- Header scroll state ----------
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ---------- Mobile nav toggle ----------
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    // close on link click
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('open');
      document.body.style.overflow = '';
    }));
  }

  // ---------- Reveal on scroll ----------
  const reveal = document.querySelectorAll('.reveal');
  if (reveal.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    reveal.forEach(el => io.observe(el));
  } else {
    reveal.forEach(el => el.classList.add('is-visible'));
  }

  // ---------- Number counter ----------
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const co = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.dataset.count, 10);
        const dur = 1400;
        const start = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased).toLocaleString();
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        co.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(c => co.observe(c));
  }

  // ---------- Member directory filtering ----------
  const search = document.getElementById('member-search');
  const tabs   = document.querySelectorAll('.filter-tabs button');
  const cards  = document.querySelectorAll('.member-card');
  let activeCat = 'all';

  const filterCards = () => {
    const q = (search?.value || '').trim().toLowerCase();
    cards.forEach(card => {
      const name = card.dataset.name?.toLowerCase() || '';
      const cat  = card.dataset.category || '';
      const matchesQ   = !q || name.includes(q);
      const matchesCat = activeCat === 'all' || cat === activeCat;
      card.style.display = (matchesQ && matchesCat) ? '' : 'none';
    });
  };

  if (search) search.addEventListener('input', filterCards);
  tabs.forEach(t => t.addEventListener('click', () => {
    tabs.forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    activeCat = t.dataset.cat || 'all';
    filterCards();
  }));

  // ---------- Active nav link by path ----------
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('http')) return;
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();
