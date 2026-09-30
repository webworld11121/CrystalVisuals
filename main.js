/* ═══════════════════════════════════════
   CRYSTALVISUALS
   ═══════════════════════════════════════ */
(function () {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;

  $('#year').textContent = new Date().getFullYear();

  /* ───────── HEADER + SCROLLBAR ───────── */
  const hdr = $('#hdr'), bar = $('#scrollBar');
  const onScroll = () => {
    const y = scrollY;
    hdr.classList.toggle('is-on', y > 18);
    const max = document.body.scrollHeight - innerHeight;
    bar.style.width = (max > 0 ? y / max * 100 : 0) + '%';
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ───────── MOBILE NAV ───────── */
  const bg = $('#burger'), nav = $('#nav');
  const closeNav = () => {
    nav.classList.remove('is-on'); bg.classList.remove('is-x');
    bg.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };
  bg.addEventListener('click', () => {
    const on = nav.classList.toggle('is-on');
    bg.classList.toggle('is-x', on);
    bg.setAttribute('aria-expanded', String(on));
    document.body.style.overflow = on ? 'hidden' : '';
  });
  $$('#nav a').forEach(a => a.addEventListener('click', closeNav));
  addEventListener('keydown', e => e.key === 'Escape' && closeNav());
  addEventListener('resize', () => { if (innerWidth > 760) closeNav(); });

  /* ───────── REVEAL ───────── */
  const rev = new IntersectionObserver((en, ob) => {
    en.forEach((e, i) => {
      if (!e.isIntersecting) return;
      setTimeout(() => e.target.classList.add('is-in'), i * 60);
      ob.unobserve(e.target);
    });
  }, { threshold: .1, rootMargin: '0px 0px -50px' });
  $$('.reveal').forEach(el => rev.observe(el));

  /* ───────── COUNTERS ───────── */
  const cnt = new IntersectionObserver((en, ob) => {
    en.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, end = +el.dataset.count || 0;
      if (RM) { el.textContent = end; ob.unobserve(el); return; }
      const t0 = performance.now(), dur = 1100;
      (function tick(now) {
        const p = Math.min((now - t0) / dur, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
      ob.unobserve(el);
    });
  }, { threshold: .5 });
  $$('[data-count]').forEach(el => cnt.observe(el));

  /* ───────── SCROLLSPY ───────── */
  const links = new Map($$('#nav a[href^="#"]').map(a => [a.getAttribute('href').slice(1), a]));
  const spy = new IntersectionObserver(en => {
    en.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(a => a.classList.remove('is-act'));
      links.get(e.target.id)?.classList.add('is-act');
    });
  }, { rootMargin: '-45% 0px -50%' });
  $$('main section[id]').forEach(s => spy.observe(s));

  /* ───────── TICKER ───────── */
  const tk = $('#ticker');
  if (tk) {
    tk.innerHTML = [...Array(6)].map(() =>
      '<span>550 ₽ НАВСЕГДА</span><span>◆</span><span>LOADER</span><span>◆</span>' +
      '<span>MINECRAFT 1.21.11</span><span>◆</span><span>9 МОДУЛЕЙ</span><span>◆</span>' +
      '<span>БЕЗ ПОДПИСКИ</span><span>◆</span>'
    ).join('');
  }

  /* ───────── CONSOLE TYPING ───────── */
  const out = $('#console'), timeOut = $('#statTime'), statOk = $('#statOk');
  const LINES = [
    '<b>[loader]</b> crystalvisuals <span class="g">v1.0.0</span>',
    '<b>[loader]</b> target  <span class="y">minecraft 1.21.11</span>',
    '<b>[java ]</b> runtime <span class="d">21</span> — ok',
    '<b>[deps ]</b> fetch fabric-api... <span class="g">done</span>',
    '<b>[deps ]</b> fetch joml...      <span class="g">done</span>',
    '<b>[cfg  ]</b> profile <span class="d">default</span> loaded',
    '<b>[gui  ]</b> 9 modules registered',
    '<b>[gui  ]</b> press <span class="y">R</span> to open menu',
    '<span class="g">[ ok  ]</span> ready — enjoy'
  ];

  if (out) {
    let li = 0, ci = 0, t0 = performance.now();
    if (RM) {
      out.innerHTML = LINES.join('\n');
      if (timeOut) timeOut.textContent = '0.0s';
    } else {
      (function type() {
        if (li >= LINES.length) {
          if (statOk) statOk.textContent = 'ГОТОВО';
          return;
        }
        const line = LINES[li];
        ci += 1;
        out.innerHTML = LINES.slice(0, li).join('\n') +
          (ci > 2 ? '\n' + line.slice(0, ci) : line.slice(0, ci));
        if (ci >= line.length) { li++; ci = 0; }
        setTimeout(type, ci === 0 ? 160 : 12);
      })();
      setTimeout(() => {
        if (timeOut) timeOut.textContent = ((performance.now() - t0) / 1000).toFixed(1) + 's';
      }, 1900);
    }
  }

  /* ───────── TOAST ───────── */
  const toast = $('#toast');
  let tt;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('is-on');
    clearTimeout(tt);
    tt = setTimeout(() => toast.classList.remove('is-on'), 2400);
  }

  /* ───────── REDIRECT TO DISCORD ───────── */
  const redir = $('#redir'), fill = $('#redirFill');
  $$('a[data-buy]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const url = a.href;
      redir.hidden = false;
      fill.style.width = '0%';
      let p = 0;
      const tm = setInterval(() => {
        p = Math.min(100, p + 14 + Math.random() * 10);
        fill.style.width = p + '%';
        if (p >= 100) {
          clearInterval(tm);
          setTimeout(() => {
            redir.hidden = true;
            open(url, '_blank', 'noopener');
            showToast('Discord открыт в новой вкладке');
          }, 350);
        }
      }, 110);
    });
  });

  /* ───────── HOTBAR ───────── */
  const hb = $('#hotbar');
  if (hb) {
    $$('.slot', hb).forEach(s => s.addEventListener('click', () => {
      $$('.slot', hb).forEach(x => x.classList.remove('is-sel'));
      s.classList.add('is-sel');
    }));
  }

  /* ───────── IN-GAME MENU (R) ───────── */
  const KEY = 'cv:modules';
  const gui = $('#mcgui'), grid = $('#mcGrid'), cntOut = $('#mcCount'), kh = $('#cvOpen');
  if (gui && grid) {
    const btns = $$('.mcb', grid);
    let st = {};
    try { st = JSON.parse(localStorage.getItem(KEY)) || {}; } catch {}

    function render() {
      let on = 0;
      btns.forEach(b => {
        const n = b.firstChild.textContent.trim();
        const act = !!st[n];
        b.classList.toggle('is-on', act);
        b.querySelector('em').textContent = act ? 'ON' : 'OFF';
        if (act) on++;
      });
      if (cntOut) cntOut.textContent = on;
    }

    const openG = () => { gui.hidden = false; document.body.style.overflow = 'hidden'; };
    const closeG = () => { gui.hidden = true; document.body.style.overflow = ''; };

    btns.forEach(b => b.addEventListener('click', () => {
      const n = b.firstChild.textContent.trim();
      st[n] = !st[n];
      try { localStorage.setItem(KEY, JSON.stringify(st)); } catch {}
      render();
    }));

    kh.addEventListener('click', openG);
    gui.addEventListener('click', e => { if (e.target.hasAttribute('data-close')) closeG(); });

    document.addEventListener('keydown', e => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable;
      if (typing || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === 'r' || e.key === 'R' || e.key === 'к' || e.key === 'К') {
        e.preventDefault();
        gui.hidden ? openG() : closeG();
      }
    });
    render();
  }

  /* ───────── LIGHTBOX ───────── */
  const lb = $('#lbox'), lbImg = $('#lbImg'), lbT = $('#lbT');
  const shots = $$('.shot');
  let cur = 0;

  function show(i) {
    if (!shots.length) return;
    cur = (i + shots.length) % shots.length;
    lbImg.src = shots[cur].dataset.img;
    lbImg.alt = shots[cur].dataset.title || '';
    lbT.textContent = shots[cur].dataset.title || '';
  }
  function openLb(i) {
    show(i); lb.hidden = false; document.body.style.overflow = 'hidden';
    $('#lbX').focus();
  }
  function closeLb() { lb.hidden = true; lbImg.src = ''; document.body.style.overflow = ''; }

  shots.forEach((s, i) => {
    s.setAttribute('tabindex', '0');
    s.addEventListener('click', () => openLb(i));
    s.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLb(i); }
    });
  });
  $('#lbX').addEventListener('click', closeLb);
  $('#lbP').addEventListener('click', () => show(cur - 1));
  $('#lbN').addEventListener('click', () => show(cur + 1));
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  addEventListener('keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') show(cur - 1);
    if (e.key === 'ArrowRight') show(cur + 1);
  });
})();
