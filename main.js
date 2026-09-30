/* ═══════════════════════════════════════
   CRYSTALVISUALS
   ═══════════════════════════════════════ */
(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };

  // страховка: если что-то упадёт — всё равно покажем контент
  setTimeout(function () {
    $$('.reveal').forEach(function (e) { e.classList.add('is-in'); });
  }, 2600);

  try {

    document.documentElement.classList.add('js');

    var yEl = $('#year');
    if (yEl) yEl.textContent = new Date().getFullYear();

    /* ─── ФИОЛЕТОВОЕ НЕБО (CANVAS) ─── */
    (function sky() {
      var cv = document.getElementById('sky');
      if (!cv) return;
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) { cv.style.display = 'none'; return; }

      var ctx = cv.getContext('2d');
      var w, h, dpr, stars = [], motes = [], raf;

      function size() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = cv.width = innerWidth * dpr;
        h = cv.height = innerHeight * dpr;
        cv.style.width = innerWidth + 'px';
        cv.style.height = innerHeight + 'px';

        stars = [];
        var ns = Math.round(innerWidth * innerHeight / 9000);
        for (var i = 0; i < ns; i++) {
          stars.push({
            x: Math.random() * w,
            y: Math.random() * h * 0.75,
            r: (Math.random() * 1.5 + 0.4) * dpr,
            a: Math.random() * 0.7 + 0.15,
            tw: Math.random() * 0.02 + 0.004
          });
        }

        motes = [];
        var nm = Math.min(46, Math.round(innerWidth / 30));
        for (var j = 0; j < nm; j++) {
          motes.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: (Math.random() * 2.4 + 1) * dpr,
            vx: (Math.random() - 0.5) * 0.16 * dpr,
            vy: -(Math.random() * 0.22 + 0.05) * dpr,
            o: Math.random() * 0.35 + 0.1
          });
        }
      }

      function frame() {
        // градиентное небо
        var g = ctx.createLinearGradient(0, 0, 0, h);
        g.addColorStop(0, 'rgba(24,12,58,0.85)');
        g.addColorStop(0.45, 'rgba(12,7,28,0.7)');
        g.addColorStop(1, 'rgba(5,3,14,0.9)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);

        // звёзды
        for (var i = 0; i < stars.length; i++) {
          var s = stars[i];
          s.a += s.tw;
          if (s.a > 0.9 || s.a < 0.1) s.tw = -s.tw;
          ctx.fillStyle = 'rgba(216,200,255,' + s.a + ')';
          ctx.fillRect(s.x, s.y, s.r, s.r);
        }

        // парящие пылинки
        for (var j = 0; j < motes.length; j++) {
          var m = motes[j];
          m.x += m.vx; m.y += m.vy;
          if (m.y < -20) { m.y = h + 20; m.x = Math.random() * w; }
          if (m.x < -20) m.x = w + 20;
          if (m.x > w + 20) m.x = -20;
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.r, 0, 6.2832);
          ctx.fillStyle = 'rgba(192,132,252,' + m.o + ')';
          ctx.shadowBlur = 12 * dpr;
          ctx.shadowColor = 'rgba(139,92,246,0.9)';
          ctx.fill();
        }
        ctx.shadowBlur = 0;
        raf = requestAnimationFrame(frame);
      }

      document.addEventListener('visibilitychange', function () {
        if (document.hidden) cancelAnimationFrame(raf);
        else raf = requestAnimationFrame(frame);
      });

      size();
      frame();
      addEventListener('resize', size);
    })();

    /* ─── HEADER + SCROLLBAR ─── */
    var hdr = $('#hdr'), bar = $('#scrollBar');
    function onScroll() {
      var y = window.scrollY;
      if (hdr) hdr.classList.toggle('is-on', y > 18);
      if (bar) {
        var max = document.body.scrollHeight - innerHeight;
        bar.style.width = (max > 0 ? y / max * 100 : 0) + '%';
      }
    }
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ─── MOBILE NAV ─── */
    var bg = $('#burger'), nav = $('#nav');
    if (bg && nav) {
      var closeNav = function () {
        nav.classList.remove('is-on');
        bg.classList.remove('is-x');
        bg.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      };
      bg.addEventListener('click', function () {
        var on = nav.classList.toggle('is-on');
        bg.classList.toggle('is-x', on);
        bg.setAttribute('aria-expanded', String(on));
        document.body.style.overflow = on ? 'hidden' : '';
      });
      $$('#nav a').forEach(function (a) { a.addEventListener('click', closeNav); });
      addEventListener('keydown', function (e) { if (e.key === 'Escape') closeNav(); });
      addEventListener('resize', function () { if (innerWidth > 760) closeNav(); });
    }

    /* ─── REVEAL ─── */
    if ('IntersectionObserver' in window) {
      var rev = new IntersectionObserver(function (en, ob) {
        en.forEach(function (e, i) {
          if (!e.isIntersecting) return;
          setTimeout(function () { e.target.classList.add('is-in'); }, i * 60);
          ob.unobserve(e.target);
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px' });
      $$('.reveal').forEach(function (el) { rev.observe(el); });
    } else {
      $$('.reveal').forEach(function (el) { el.classList.add('is-in'); });
    }

    /* ─── COUNTERS ─── */
    if ('IntersectionObserver' in window) {
      var RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
      var cnt = new IntersectionObserver(function (en, ob) {
        en.forEach(function (e) {
          if (!e.isIntersecting) return;
          var el = e.target, end = +el.dataset.count || 0;
          if (RM) { el.textContent = end; ob.unobserve(el); return; }
          var t0 = performance.now(), dur = 1100;
          (function tick(now) {
            var p = Math.min((now - t0) / dur, 1);
            el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
            if (p < 1) requestAnimationFrame(tick);
          })(t0);
          ob.unobserve(el);
        });
      }, { threshold: 0.5 });
      $$('[data-count]').forEach(function (el) { cnt.observe(el); });
    }

    /* ─── SCROLLSPY ─── */
    if ('IntersectionObserver' in window) {
      var links = new Map();
      $$('#nav a[href^="#"]').forEach(function (a) {
        links.set(a.getAttribute('href').slice(1), a);
      });
      var spy = new IntersectionObserver(function (en) {
        en.forEach(function (e) {
          if (!e.isIntersecting) return;
          links.forEach(function (a) { a.classList.remove('is-act'); });
          var a = links.get(e.target.id);
          if (a) a.classList.add('is-act');
        });
      }, { rootMargin: '-45% 0px -50%' });
      $$('main section[id]').forEach(function (s) { spy.observe(s); });
    }

    /* ─── TICKER ─── */
    var tk = $('#ticker');
    if (tk) {
      var chunk = '550 ₽ НАВСЕГДА<span>◆</span>ПРОЗРАЧНЫЙ GUI<span>◆</span>MINECRAFT 1.21.11<span>◆</span>' +
                  '9 МОДУЛЕЙ<span>◆</span>AMBIENCE<span>◆</span>БЕЗ ПОДПИСКИ<span>◆</span>';
      var t = '';
      for (var i = 0; i < 6; i++) t += chunk;
      tk.innerHTML = t;
    }

    /* ─── CONSOLE TYPING ─── */
    var out = $('#console'), timeOut = $('#statTime'), statOk = $('#statOk');
    var LINES = [
      '<b>[loader]</b> crystalvisuals <span class="g">v1.0.0</span>',
      '<b>[loader]</b> target  <span class="y">minecraft 1.21.11</span>',
      '<b>[java ]</b> runtime <span class="d">21</span> — ok',
      '<b>[deps ]</b> fetch fabric-api... <span class="g">done</span>',
      '<b>[mods ]</b> ambience      <span class="g">loaded</span>',
      '<b>[ui   ]</b> glass shader   <span class="g">loaded</span>',
      '<b>[cfg  ]</b> profile <span class="d">default</span>',
      '<b>[gui  ]</b> press <span class="y">R</span> to open menu',
      '<span class="g">[ ok  ]</span> ready — enjoy'
    ];
    if (out) {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        out.innerHTML = LINES.join('\n');
        if (timeOut) timeOut.textContent = '0.0s';
      } else {
        var li = 0, ci = 0, t0 = performance.now();
        (function type() {
          if (li >= LINES.length) { if (statOk) statOk.textContent = 'ГОТОВО'; return; }
          var line = LINES[li];
          ci += 1;
          out.innerHTML = LINES.slice(0, li).join('\n') +
            (li > 0 ? '\n' : '') + line.slice(0, ci);
          if (ci >= line.length) { li++; ci = 0; }
          setTimeout(type, ci === 0 ? 170 : 12);
        })();
        setTimeout(function () {
          if (timeOut) timeOut.textContent = ((performance.now() - t0) / 1000).toFixed(1) + 's';
        }, 2000);
      }
    }

    /* ─── TOAST ─── */
    var toast = $('#toast'), tt;
    function showToast(msg) {
      if (!toast) return;
      toast.textContent = msg;
      toast.classList.add('is-on');
      clearTimeout(tt);
      tt = setTimeout(function () { toast.classList.remove('is-on'); }, 2400);
    }

    /* ─── REDIRECT ─── */
    var redir = $('#redir'), fill = $('#redirFill');
    $$('a[data-buy]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var url = a.href;
        if (!redir || !fill) { open(url, '_blank', 'noopener'); return; }
        redir.hidden = false;
        fill.style.width = '0%';
        var p = 0;
        var tm = setInterval(function () {
          p = Math.min(100, p + 14 + Math.random() * 10);
          fill.style.width = p + '%';
          if (p >= 100) {
            clearInterval(tm);
            setTimeout(function () {
              redir.hidden = true;
              open(url, '_blank', 'noopener');
              showToast('Discord открыт в новой вкладке');
            }, 350);
          }
        }, 110);
      });
    });

    /* ─── HOTBAR ─── */
    var hb = $('#hotbar');
    if (hb) {
      $$('.slot', hb).forEach(function (s) {
        s.addEventListener('click', function () {
          $$('.slot', hb).forEach(function (x) { x.classList.remove('is-sel'); });
          s.classList.add('is-sel');
        });
      });
    }

    /* ─── МЕНЮ НА R ─── */
    var KEY = 'cv:modules';
    var gui = $('#mcgui'), grid = $('#mcGrid'), cntOut = $('#mcCount'), kh = $('#cvOpen');
    if (gui && grid) {
      var btns = $$('.mcb', grid);
      var st = {};
      try { st = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) {}

      function render() {
        var on = 0;
        btns.forEach(function (b) {
          var n = b.firstChild.textContent.trim();
          var act = !!st[n];
          b.classList.toggle('is-on', act);
          var em = b.querySelector('em');
          if (em) em.textContent = act ? 'ON' : 'OFF';
          if (act) on++;
        });
        if (cntOut) cntOut.textContent = on;
      }

      var openG = function () { gui.hidden = false; document.body.style.overflow = 'hidden'; };
      var closeG = function () { gui.hidden = true; document.body.style.overflow = ''; };

      btns.forEach(function (b) {
        b.addEventListener('click', function () {
          var n = b.firstChild.textContent.trim();
          st[n] = !st[n];
          try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {}
          render();
        });
      });

      if (kh) kh.addEventListener('click', openG);
      gui.addEventListener('click', function (e) {
        if (e.target.hasAttribute('data-close')) closeG();
      });

      document.addEventListener('keydown', function (e) {
        var typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable;
        if (typing || e.ctrlKey || e.metaKey || e.altKey) return;
        if (e.key === 'r' || e.key === 'R' || e.key === 'к' || e.key === 'К') {
          e.preventDefault();
          if (gui.hidden) openG(); else closeG();
        }
      });
      render();
    }

    /* ─── LIGHTBOX ─── */
    var lb = $('#lbox'), lbImg = $('#lbImg'), lbT = $('#lbT');
    var shots = $$('.shot');
    var cur = 0;

    if (lb && lbImg && shots.length) {
      function show(i) {
        cur = (i + shots.length) % shots.length;
        lbImg.src = shots[cur].dataset.img || '';
        lbImg.alt = shots[cur].dataset.title || '';
        if (lbT) lbT.textContent = shots[cur].dataset.title || '';
      }
      function openLb(i) {
        show(i); lb.hidden = false; document.body.style.overflow = 'hidden';
      }
      function closeLb() { lb.hidden = true; lbImg.src = ''; document.body.style.overflow = ''; }

      shots.forEach(function (s, i) {
        s.setAttribute('tabindex', '0');
        s.addEventListener('click', function () { openLb(i); });
        s.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLb(i); }
        });
      });
      var bx = $('#lbX'), bp = $('#lbP'), bn = $('#lbN');
      if (bx) bx.addEventListener('click', closeLb);
      if (bp) bp.addEventListener('click', function () { show(cur - 1); });
      if (bn) bn.addEventListener('click', function () { show(cur + 1); });
      lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
      addEventListener('keydown', function (e) {
        if (lb.hidden) return;
        if (e.key === 'Escape') closeLb();
        if (e.key === 'ArrowLeft') show(cur - 1);
        if (e.key === 'ArrowRight') show(cur + 1);
      });
    }

  } catch (err) {
    // любая ошибка — просто показываем весь контент
    console.error(err);
    $$('.reveal').forEach(function (e) { e.classList.add('is-in'); });
  }
})();
