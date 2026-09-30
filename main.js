/* =========================================
   CrystalVisuals — main.js
   ========================================= */
(function () {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- ГОД ---------- */
  $('#year').textContent = new Date().getFullYear();

  /* ---------- CRYSTAL CANVAS (фон) ---------- */
  (function crystals() {
    const cv = $('#bgCanvas');
    if (!cv || reduceMotion) { if (cv) cv.style.display = 'none'; return; }

    const ctx = cv.getContext('2d');
    let w, h, dpr, shards = [], raf;

    function size() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = cv.width  = innerWidth  * dpr;
      h = cv.height = innerHeight * dpr;
      cv.style.width  = innerWidth  + 'px';
      cv.style.height = innerHeight + 'px';

      const count = Math.min(90, Math.max(26, Math.round(innerWidth / 18)));
      shards = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: (Math.random() * 9 + 3) * dpr,
        vx: (Math.random() - 0.5) * 0.28 * dpr,
        vy: (Math.random() - 0.5) * 0.28 * dpr,
        a: Math.random() * Math.PI,
        s: (Math.random() * 0.014 + 0.004) * (Math.random() < 0.5 ? -1 : 1),
        o: Math.random() * 0.42 + 0.12
      }));
    }

    function diamond(x, y, r, a) {
      ctx.beginPath();
      ctx.moveTo(x, y - r);
      ctx.lineTo(x + r * 0.62, y);
      ctx.lineTo(x, y + r);
      ctx.lineTo(x - r * 0.62, y);
      ctx.closePath();
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);
      const link = 132 * dpr;

      // связи между кристаллами
      ctx.lineWidth = Math.max(0.5, 0.7 * dpr);
      for (let i = 0; i < shards.length; i++) {
        for (let j = i + 1; j < shards.length; j++) {
          const A = shards[i], B = shards[j];
          const dx = A.x - B.x, dy = A.y - B.y;
          const d = Math.hypot(dx, dy);
          if (d < link) {
            ctx.strokeStyle = 'rgba(139,92,246,' + (0.16 * (1 - d / link)) + ')';
            ctx.beginPath();
            ctx.moveTo(A.x, A.y);
            ctx.lineTo(B.x, B.y);
            ctx.stroke();
          }
        }
      }

      // сами кристаллы
      for (const s of shards) {
        s.x += s.vx; s.y += s.vy; s.a += s.s;
        if (s.x < -40) s.x = w + 40; if (s.x > w + 40) s.x = -40;
        if (s.y < -40) s.y = h + 40; if (s.y > h + 40) s.y = -40;

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.a);
        ctx.fillStyle = 'rgba(160,180,255,' + s.o + ')';
        ctx.shadowBlur = 16 * dpr;
        ctx.shadowColor = 'rgba(139,92,246,.85)';
        diamond(0, 0, s.r, s.a);
        ctx.fill();
        ctx.restore();
      }
      raf = requestAnimationFrame(frame);
    }

    // тормозим canvas когда вкладка не в фокусе
    document.addEventListener('visibilitychange', () => {
      document.hidden ? cancelAnimationFrame(raf) : (raf = requestAnimationFrame(frame));
    });

    size();
    frame();
    addEventListener('resize', size);
  })();

  /* ---------- HEADER ---------- */
  const header = $('#header');
  const scrollBar = $('#scrollBar');

  function onScroll() {
    const y = scrollY;
    header.classList.toggle('is-stuck', y > 20);
    const max = document.body.scrollHeight - innerHeight;
    scrollBar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- МОБИЛЬНОЕ МЕНЮ ---------- */
  const burger = $('#burger');
  const nav = $('#nav');

  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  function closeNav() {
    nav.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  $$('#nav a').forEach(a => a.addEventListener('click', closeNav));
  addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });
  addEventListener('resize', () => { if (innerWidth > 760) closeNav(); });

  /* ---------- REVEAL ---------- */
  const revealer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      setTimeout(() => entry.target.classList.add('is-in'), i * 80);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -70px' });
  $$('.reveal').forEach(el => revealer.observe(el));

  /* ---------- СЧЁТЧИКИ ---------- */
  const counters = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const end = parseFloat(el.dataset.count) || 0;
      if (reduceMotion) { el.textContent = end; obs.unobserve(el); return; }

      const dur = 1400, t0 = performance.now();
      (function tick(now) {
        const p = Math.min((now - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(end * eased);
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  $$('[data-count]').forEach(el => counters.observe(el));

  /* ---------- TILT НА КАРТОЧКАХ ---------- */
  if (!reduceMotion && matchMedia('(hover:hover)').matches) {
    $$('.tilt').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.setProperty('--mx', px * 100 + '%');
        card.style.setProperty('--my', py * 100 + '%');
        card.style.transform =
          'perspective(900px) rotateX(' + (0.5 - py) * 9 + 'deg) rotateY(' + (px - 0.5) * 11 + 'deg) translateY(-6px)';
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });

    /* ---------- МАГНИТНАЯ КНОПКА ---------- */
    $$('.magnetic').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.22;
        const y = (e.clientY - r.top - r.height / 2) * 0.32;
        el.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(1.04)';
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- ACTIVE NAV ---------- */
  const links = new Map($$('#nav a').map(a => [a.getAttribute('href').slice(1), a]));
  const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(a => a.classList.remove('is-active'));
      links.get(entry.target.id)?.classList.add('is-active');
    });
  }, { rootMargin: '-45% 0px -50%' });
  $$('main section[id]').forEach(s => spy.observe(s));

  /* ---------- БЕГУЩАЯ СТРОКА (дублируем контент) ---------- */
  const mq = $('#marquee');
  if (mq && !reduceMotion) mq.innerHTML += mq.innerHTML;

  /* ---------- TOAST ---------- */
  const toast = $('#toast');
  let toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('is-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-show'), 2200);
  }

  /* ---------- КОПИРОВАНИЕ ---------- */
  $('#copyBtn')?.addEventListener('click', async () => {
    const text = $('#copyCmd').textContent.trim();
    try {
      await navigator.clipboard.writeText(text);
      showToast('✓ Скопировано');
    } catch {
      showToast('Не удалось скопировать');
    }
  });

  /* ---------- LIGHTBOX ---------- */
  const lb = $('#lightbox');
  const lbImg = $('#lbImg');
  const lbTitle = $('#lbTitle');
  const shots = $$('.shot');
  let cur = 0, lastFocus = null;

  function show(i) {
    if (!shots.length) return;
    cur = (i + shots.length) % shots.length;
    const s = shots[cur];
    lbImg.src = s.dataset.img;
    lbImg.alt = s.dataset.title || '';
    lbTitle.textContent = s.dataset.title || '';
  }

  function openLb(i) {
    lastFocus = document.activeElement;
    show(i);
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    $('#lbClose').focus();
  }

  function closeLb() {
    lb.hidden = true;
    lbImg.src = '';
    document.body.style.overflow = '';
    lastFocus?.focus();
  }

  shots.forEach((s, i) => {
    s.addEventListener('click', () => openLb(i));
    s.setAttribute('tabindex', '0');
    s.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLb(i); } });
  });

  $('#lbClose').addEventListener('click', closeLb);
  $('#lbPrev').addEventListener('click', () => show(cur - 1));
  $('#lbNext').addEventListener('click', () => show(cur + 1));
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  addEventListener('keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') show(cur - 1);
    if (e.key === 'ArrowRight') show(cur + 1);
  });
})();
