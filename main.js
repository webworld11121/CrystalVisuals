/* ============================================
   CRYSTALVISUALS
   модули взяты из ModuleManager.init()
   ============================================ */
(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };

  /* ---------- ДАННЫЕ МОДУЛЕЙ ---------- */
  var M = [
    /* Visuals */
    { n:'Ambience', c:'visuals', d:'живое небо, туман, свечение', t:'амбиенс атмосфера небо' },
    { n:'AspectRatio', c:'visuals', d:'соотношение сторон кадра', t:'аспект соотношение' },
    { n:'BetterMinecraft', c:'visuals', d:'упрощенный вид мира', t:'лучший майнкрафт' },
    { n:'BlockOverlay', c:'visuals', d:'подсветка блока в прицеле', t:'блок оверлей' },
    { n:'BrewViewer', c:'visuals', d:'просмотр зелий', t:'зелья брю' },
    { n:'ChinaHat', c:'visuals', d:'кастомная шляпа', t:'китайская шляпа' },
    { n:'Crosshair', c:'visuals', d:'прицел, своя форма и цвет', t:'кроссхейр прицел' },
    { n:'CustomPet', c:'visuals', d:'свой питомец', t:'питомец пет' },
    { n:'CustomSwords', c:'visuals', d:'кастомные мечи и модели', t:'мечи' },
    { n:'Customization', c:'visuals', d:'настройка внешнего вида', t:'кастомизация' },
    { n:'Emotions', c:'visuals', d:'эмоции и анимации персонажа', t:'эмоции' },
    { n:'ExplosionWave', c:'visuals', d:'волна взрывов', t:'взрыв' },
    { n:'FakePlayer', c:'visuals', d:'фейковый игрок', t:'фейк игрок' },
    { n:'FogBlur', c:'visuals', d:'размытие тумана', t:'туман' },
    { n:'GlassVapor', c:'visuals', d:'стеклянный пар', t:'стекло пар' },
    { n:'GlowEsp', c:'visuals', d:'подсветка сквозь стены', t:'глоу есп' },
    { n:'HitBubbles', c:'visuals', d:'пузырьки при попадании', t:'попадание' },
    { n:'HitColor', c:'visuals', d:'цвет попадания', t:'цвет' },
    { n:'HitParticles', c:'visuals', d:'частицы при попадании', t:'частицы' },
    { n:'Hitboxes', c:'visuals', d:'отображение хитбоксов', t:'хитбокс' },
    { n:'HpCounter', c:'visuals', d:'счетчик HP над сущностями', t:'хп хпс' },
    { n:'ItemHighlight', c:'visuals', d:'подсветка предметов', t:'предметы' },
    { n:'ItemPhysics', c:'visuals', d:'физика падения предметов', t:'физика' },
    { n:'JumpCircle', c:'visuals', d:'круг прыжка', t:'прыжок' },
    { n:'KillEffect', c:'visuals', d:'эффект убийства', t:'килл' },
    { n:'LootView', c:'visuals', d:'просмотр лута контейнеров', t:'лут' },
    { n:'LyricsTextModule', c:'visuals', d:'текст песни на экране', t:'текст песни' },
    { n:'ModelCollapse', c:'visuals', d:'коллапс моделей', t:'модель' },
    { n:'NameTags', c:'visuals', d:'ники, HP, дистанция', t:'неймтегс ники' },
    { n:'NoRender', c:'visuals', d:'отключение лишнего рендера', t:'но рендер' },
    { n:'PortalLive', c:'visuals', d:'портал в реальном времени', t:'портал' },
    { n:'ProjectileHelper', c:'visuals', d:'помощник по снарядам', t:'снаряд' },
    { n:'SeeInvisible', c:'visuals', d:'видеть невидимых игроков', t:'невидимые' },
    { n:'SelfPredictions', c:'visuals', d:'предсказание своего движения', t:'предсказание' },
    { n:'SelfTag', c:'visuals', d:'свой тег над головой', t:'свой тег' },
    { n:'ShaderHands', c:'visuals', d:'шейдерные руки', t:'руки шейдер' },
    { n:'SwingAnimation', c:'visuals', d:'анимация замаха', t:'замах' },
    { n:'TargetESP', c:'visuals', d:'ESP цели', t:'цель есп' },
    { n:'Trails', c:'visuals', d:'следы за сущностями', t:'следы' },
    { n:'ViewModel', c:'visuals', d:'вид от первого лица', t:'вьюмодель' },
    { n:'WastedDeath', c:'visuals', d:'эффект смерти', t:'смерть' },
    { n:'WorldParticles', c:'visuals', d:'частицы мира', t:'частицы' },

    /* Display */
    { n:'Armor', c:'display', d:'отображение брони', t:'броня' },
    { n:'ArrayList', c:'display', d:'список активных модулей', t:'аррейлист список' },
    { n:'ClickGui', c:'display', d:'главное меню', t:'меню гуи' },
    { n:'Cooldowns', c:'display', d:'таймеры кулдаунов', t:'кулдаун' },
    { n:'CustomHotbar', c:'display', d:'кастомный хотбар', t:'хотбар' },
    { n:'HPFocus', c:'display', d:'увеличенный HP-бар', t:'хп бар' },
    { n:'HotKeys', c:'display', d:'подсказки клавиш', t:'хоткеи клавиши' },
    { n:'Info', c:'display', d:'версия, задержка, игроки', t:'инфо' },
    { n:'Interface', c:'display', d:'общие настройки HUD', t:'интерфейс' },
    { n:'Inventory', c:'display', d:'улучшенный инвентарь', t:'инвентарь' },
    { n:'KeyStrokes', c:'display', d:'индикатор WASD', t:'кейстроуки васд' },
    { n:'MediaPlayer', c:'display', d:'плеер музыки', t:'плеер музыка' },
    { n:'Notifications', c:'display', d:'уведомления', t:'уведомления' },
    { n:'Potions', c:'display', d:'эффекты зелий', t:'зелья эффекты' },
    { n:'TargetHud', c:'display', d:'HP цели в углу', t:'таргет' },
    { n:'Watermark', c:'display', d:'водяной знак', t:'ватермарка' },

    /* Utils */
    { n:'AutoCommands', c:'utils', d:'автовыполнение команд', t:'авто команды' },
    { n:'AutoDuel', c:'utils', d:'автоматическая дуэль', t:'авто дуэль' },
    { n:'AutoResell', c:'utils', d:'автоматическая продажа', t:'авто продажа' },
    { n:'AutoSprint', c:'utils', d:'автоспринт', t:'авто спринт' },
    { n:'AutoSwap', c:'utils', d:'автосвап слота', t:'авто свап' },
    { n:'AutoTpAccept', c:'utils', d:'автопринятие телепорта', t:'авто тп' },
    { n:'CameraSettings', c:'utils', d:'настройки камеры', t:'камера' },
    { n:'Cards', c:'utils', d:'работа с картами', t:'карты' },
    { n:'ClickPearl', c:'utils', d:'автоклик по жемчугу', t:'клик перл жемчуг' },
    { n:'ClientSounds', c:'utils', d:'звуки клиента', t:'звуки' },
    { n:'CrystalOptimizer', c:'utils', d:'оптимизатор кристаллов', t:'кристаллы оптимизация' },
    { n:'DeathCoords', c:'utils', d:'координаты места смерти', t:'смерть координаты' },
    { n:'ElytraSwap', c:'utils', d:'свап элитры', t:'элитра' },
    { n:'Freelook', c:'utils', d:'свободный обзор', t:'фрилук обзор' },
    { n:'Globals', c:'utils', d:'глобальные настройки', t:'глобалы' },
    { n:'HandSwap', c:'utils', d:'свап руки', t:'рука свап' },
    { n:'HitSound', c:'utils', d:'звук попадания', t:'звук удар' },
    { n:'HolyWorldHelper', c:'utils', d:'помощник HolyWorld', t:'холи ворлд' },
    { n:'ItemScroller', c:'utils', d:'прокрутка предметов', t:'скролл предметы' },
    { n:'Optimization', c:'utils', d:'оптимизация клиента', t:'оптимизация' },
    { n:'Party', c:'utils', d:'управление пати', t:'пати' },
    { n:'Pitbike', c:'utils', d:'модуль Pitbike', t:'питбайк' },
    { n:'ShulkerPreview', c:'utils', d:'превью содержимого шалкера', t:'шалкер' },
    { n:'StreamerMode', c:'utils', d:'скрытие информации для стримов', t:'стрим' },
    { n:'TalTracker', c:'utils', d:'трекер TAL', t:'тал' },
    { n:'TapeMouse', c:'utils', d:'эмуляция мыши', t:'мышь' },
    { n:'VoiceControl', c:'utils', d:'голосовое управление', t:'голос' }
  ];

  /* ---------- ПОИСК С РАСКЛАДКОЙ RU -> EN ---------- */
  var RU = 'йцукенгшщзхъфывапролджэячсмитьбюё';
  var EN = "qwertyuiop[]asdfghjkl;'zxcvbnm,.`";

  function norm(s) {
    var o = '';
    for (var i = 0; i < s.length; i++) {
      var k = RU.indexOf(s.charAt(i));
      o += k >= 0 ? EN.charAt(k) : s.charAt(i);
    }
    return o;
  }

  M.forEach(function (m) {
    m._s = (m.n.toLowerCase() + ' ' + m.t);
    m._n = norm(m._s);
    m._c = m._s.replace(/\s/g, '');
    m._k = m._n.replace(/\s/g, '');
  });

  function hit(m, q) {
    if (!q) return true;
    var qn = norm(q);
    var qc = q.replace(/\s/g, '');
    var qk = qn.replace(/\s/g, '');
    return m._s.indexOf(q) !== -1 || m._n.indexOf(q) !== -1 ||
           m._n.indexOf(qn) !== -1 || m._c.indexOf(qc) !== -1 ||
           m._k.indexOf(qk) !== -1;
  }

  try {
    var yEl = $('#year');
    if (yEl) yEl.textContent = new Date().getFullYear();

    /* ---------- ФОН ---------- */
    (function () {
      var cv = $('#sky');
      if (!cv) return;
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) { cv.style.display = 'none'; return; }
      var ctx = cv.getContext('2d');
      var w, h, dpr, st = [], mo = [], raf;

      function size() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = cv.width = innerWidth * dpr;
        h = cv.height = innerHeight * dpr;
        cv.style.width = innerWidth + 'px';
        cv.style.height = innerHeight + 'px';
        st = [];
        var n = Math.round(innerWidth * innerHeight / 9000);
        for (var i = 0; i < n; i++) {
          st.push({ x:Math.random()*w, y:Math.random()*h*.8,
            r:(Math.random()*1.4+.4)*dpr, a:Math.random()*.5+.12,
            t:(Math.random()*.018+.004)*(Math.random()<.5?-1:1) });
        }
        mo = [];
        var k = Math.min(40, Math.round(innerWidth / 34));
        for (var j = 0; j < k; j++) {
          mo.push({ x:Math.random()*w, y:Math.random()*h,
            r:(Math.random()*2+.9)*dpr,
            vx:(Math.random()-.5)*.13*dpr, vy:-(Math.random()*.2+.04)*dpr,
            o:Math.random()*.3+.08, c:Math.random()<.5?'167,139,250':'61,77,255' });
        }
      }

      function draw() {
        var g = ctx.createLinearGradient(0, 0, 0, h);
        g.addColorStop(0, 'rgba(16,12,44,.9)');
        g.addColorStop(.5, 'rgba(10,10,30,.78)');
        g.addColorStop(1, 'rgba(6,6,20,.95)');
        ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
        for (var i = 0; i < st.length; i++) {
          var s = st[i]; s.a += s.t;
          if (s.a > .78 || s.a < .08) s.t = -s.t;
          ctx.fillStyle = 'rgba(214,205,255,' + s.a + ')';
          ctx.fillRect(s.x, s.y, s.r, s.r);
        }
        for (var j = 0; j < mo.length; j++) {
          var m = mo[j]; m.x += m.vx; m.y += m.vy;
          if (m.y < -20) { m.y = h + 20; m.x = Math.random() * w; }
          if (m.x < -20) m.x = w + 20;
          if (m.x > w + 20) m.x = -20;
          ctx.beginPath(); ctx.arc(m.x, m.y, m.r, 0, 6.2832);
          ctx.fillStyle = 'rgba(' + m.c + ',' + m.o + ')';
          ctx.shadowBlur = 14 * dpr; ctx.shadowColor = 'rgba(123,92,255,.9)';
          ctx.fill();
        }
        ctx.shadowBlur = 0;
        raf = requestAnimationFrame(draw);
      }

      document.addEventListener('visibilitychange', function () {
        if (document.hidden) cancelAnimationFrame(raf); else raf = requestAnimationFrame(draw);
      });
      size(); draw();
      addEventListener('resize', size);
    })();

    /* ---------- HEADER ---------- */
    var hdr = $('#hdr'), top = $('#topbar');
    function onScroll() {
      var y = window.pageYOffset;
      if (hdr) hdr.classList.toggle('is-on', y > 18);
      if (top) {
        var max = document.body.scrollHeight - innerHeight;
        top.style.width = (max > 0 ? y / max * 100 : 0) + '%';
      }
    }
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    var bg = $('#burger'), nav = $('#nav');
    if (bg && nav) {
      var closeNav = function () {
        nav.classList.remove('is-on');
        bg.classList.remove('is-x');
        document.body.style.overflow = '';
      };
      bg.addEventListener('click', function () {
        var on = nav.classList.toggle('is-on');
        bg.classList.toggle('is-x', on);
        document.body.style.overflow = on ? 'hidden' : '';
      });
      $$('#nav a').forEach(function (a) { a.addEventListener('click', closeNav); });
      addEventListener('resize', function () { if (innerWidth > 760) closeNav(); });
    }

    /* ---------- SCROLLSPY ---------- */
    if ('IntersectionObserver' in window) {
      var map = {};
      $$('#nav a').forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
      var spy = new IntersectionObserver(function (en) {
        en.forEach(function (e) {
          if (!e.isIntersecting) return;
          $$('#nav a').forEach(function (a) { a.classList.remove('is-on'); });
          if (map[e.target.id]) map[e.target.id].classList.add('is-on');
        });
      }, { rootMargin: '-45% 0px -50%' });
      $$('main section[id]').forEach(function (s) { spy.observe(s); });
    }

    /* ---------- COUNTERS ---------- */
    if ('IntersectionObserver' in window) {
      var RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
      var co = new IntersectionObserver(function (en, ob) {
        en.forEach(function (e) {
          if (!e.isIntersecting) return;
          var el = e.target, end = +el.getAttribute('data-count') || 0;
          if (RM) { el.textContent = end; ob.unobserve(el); return; }
          var t0 = performance.now(), dur = 1200;
          (function tk(now) {
            var p = Math.min((now - t0) / dur, 1);
            el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
            if (p < 1) requestAnimationFrame(tk);
          })(t0);
          ob.unobserve(el);
        });
      }, { threshold: .5 });
      $$('[data-count]').forEach(function (el) { co.observe(el); });
    }

    /* ---------- TICKER ---------- */
    var tk = $('#ticker');
    if (tk) {
      var chunk = '82 МОДУЛЯ<span>&#9670;</span>GLASS UI<span>&#9670;</span>' +
                  'MINECRAFT 1.21.11<span>&#9670;</span>AMBIENCE<span>&#9670;</span>' +
                  '550 РУБ НАВСЕГДА<span>&#9670;</span>БЕЗ ПОДПИСКИ<span>&#9670;</span>';
      var t = '';
      for (var i = 0; i < 6; i++) t += chunk;
      tk.innerHTML = t;
    }

    /* ---------- ЗВУКИ (как в клиенте) ---------- */
    var Snd = (function () {
      var ac = null;
      function get() {
        if (!ac) {
          var A = window.AudioContext || window.webkitAudioContext;
          if (!A) return null;
          ac = new A();
        }
        if (ac.state === 'suspended') ac.resume();
        return ac;
      }
      function tone(f, d, type, v, delay) {
        var a = get(); if (!a) return;
        var t = a.currentTime + (delay || 0);
        var o = a.createOscillator(), g = a.createGain();
        o.type = type || 'sine';
        o.frequency.setValueAtTime(f, t);
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(v == null ? .055 : v, t + .012);
        g.gain.exponentialRampToValueAtTime(.0001, t + d);
        o.connect(g); g.connect(a.destination);
        o.start(t); o.stop(t + d + .02);
      }
      return {
        open:   function () { tone(520, .1, 'sine', .05); tone(780, .13, 'sine', .04, .05); },
        close:  function () { tone(700, .1, 'sine', .045); tone(420, .14, 'sine', .035, .05); },
        select: function () { tone(880, .06, 'square', .02); },
        toggle: function () { tone(660, .07, 'triangle', .028); }
      };
    })();

    /* ---------- ТОСТ ---------- */
    var toast = $('#toast'), tt;
    function say(msg) {
      if (!toast) return;
      toast.textContent = msg;
      toast.classList.add('is-on');
      clearTimeout(tt);
      tt = setTimeout(function () { toast.classList.remove('is-on'); }, 2400);
    }

    /* ---------- БРАУЗЕР МОДУЛЕЙ ---------- */
    var mList = $('#mList');
    if (mList) {
      mList.innerHTML = M.map(function (m) {
        return '<div class="mchip" data-c="' + m.c + '"><b>' + m.n + '</b>' +
               '<span>' + m.d + '</span></div>';
      }).join('');

      var chips = $$('.mchip', mList);
      var input = $('#mSearch');
      var empty = $('#mEmpty');
      var f = 'all';

      function apply() {
        var q = (input && input.value ? input.value : '').trim().toLowerCase();
        var n = 0;
        chips.forEach(function (c, i) {
          var okC = f === 'all' || c.getAttribute('data-c') === f;
          var okQ = hit(M[i], q);
          var on = okC && okQ;
          c.classList.toggle('is-off', !on);
          c.classList.toggle('is-hi', on && !!q);
          if (on) n++;
        });
        if (empty) empty.hidden = n !== 0;
      }

      $$('.mtab').forEach(function (b) {
        b.addEventListener('click', function () {
          $$('.mtab').forEach(function (x) { x.classList.remove('is-on'); });
          b.classList.add('is-on');
          f = b.getAttribute('data-f');
          Snd.select();
          apply();
        });
      });

      if (input) {
        var deb;
        input.addEventListener('input', function () {
          clearTimeout(deb);
          deb = setTimeout(apply, 120);
        });
      }
      apply();
    }

    /* ---------- GUI: МОДАЛКА ---------- */
    var ov = $('#guiOv');
    if (ov) {
      var pan = $('#guiPan');
      var drag = $('#guiDrag');
      var gSearch = $('#gSearch');
      var gGrid = $('#guiGrid');
      var gPh = $('#guiPh');
      var gPhTxt = $('#guiPhTxt');
      var gNone = $('#guiNone');
      var pop = $('#guiPop');
      var bindPop = $('#guiBind');
      var bindKey = $('#guiBindKey');

      var on = {};        // включенные модули
      var binds = {};     // бинды
      var cur = null;     // активная категория
      var z = 1;
      var last = null;

      try {
        var saved = localStorage.getItem('cv:on');
        if (saved) on = JSON.parse(saved);
      } catch (e) {}

      function save() {
        try { localStorage.setItem('cv:on', JSON.stringify(on)); } catch (e) {}
      }

      /* открытие / закрытие */
      function openGui() {
        ov.hidden = false;
        document.body.style.overflow = 'hidden';
        Snd.open();
        paint();
      }
      function closeGui() {
        ov.hidden = true;
        document.body.style.overflow = '';
        Snd.close();
        closePops();
      }
      var openBtn = $('#openGui'), fab = $('#fab'), xBtn = $('#guiX');
      if (openBtn) openBtn.addEventListener('click', openGui);
      if (fab) fab.addEventListener('click', openGui);
      if (xBtn) xBtn.addEventListener('click', closeGui);
      ov.addEventListener('click', function (e) {
        if (e.target.hasAttribute('data-close')) closeGui();
      });
      document.addEventListener('keydown', function (e) {
        if (ov.hidden) return;
        if (e.key === 'Escape') { e.preventDefault(); closeGui(); }
      });

      /* сайдбар */
      var rows = $$('.guiRow', pan);
      rows.forEach(function (r) {
        r.addEventListener('click', function () {
          var c = r.getAttribute('data-c');
          cur = (cur === c) ? null : c;
          if (gSearch) gSearch.value = '';
          Snd.select();
          paint();
        });
      });

      function closePops() {
        if (pop) pop.hidden = true;
        if (bindPop) bindPop.hidden = true;
      }

      /* главный рендер */
      function paint() {
        rows.forEach(function (r) {
          r.classList.toggle('is-on', r.getAttribute('data-c') === cur);
        });
        closePops();

        var isMod = cur === 'visuals' || cur === 'display' || cur === 'utils';

        if (!isMod) {
          if (gGrid) { gGrid.hidden = true; gGrid.innerHTML = ''; }
          if (gNone) gNone.hidden = true;
          if (gPh) {
            gPh.hidden = false;
            if (gPhTxt) {
              gPhTxt.textContent =
                cur === 'themes'  ? 'Выбери тему оформления' :
                cur === 'configs' ? 'Здесь хранятся твои профили' :
                cur === 'events'  ? 'Доступно на поддерживаемых серверах' :
                cur === 'mines'   ? 'Доступно на поддерживаемых серверах' :
                'Откройте категорию чтобы начать';
            }
          }
          return;
        }

        if (gPh) gPh.hidden = true;
        var q = (gSearch && gSearch.value ? gSearch.value : '').trim().toLowerCase();
        var list = M.filter(function (m) { return m.c === cur && hit(m, q); });

        if (!list.length) {
          if (gGrid) { gGrid.hidden = true; gGrid.innerHTML = ''; }
          if (gNone) gNone.hidden = false;
          return;
        }
        if (gNone) gNone.hidden = true;
        if (!gGrid) return;
        gGrid.hidden = false;
        gGrid.innerHTML = '';

        list.forEach(function (m) {
          var c = document.createElement('button');
          c.type = 'button';
          c.className = 'gcard' + (on[m.n] ? ' is-on' : '') + (q ? ' is-hi' : '');
          c.innerHTML = '<b>' + m.n + '</b>' +
            (binds[m.n] ? '<em>' + binds[m.n] + '</em>' : '') +
            (on[m.n] ? '<i></i>' : '');
          c.title = m.d;

          c.addEventListener('click', function (ev) {
            on[m.n] = !on[m.n];
            if (!on[m.n]) delete binds[m.n];
            save();
            Snd.toggle();
            paint();
          });

          c.addEventListener('contextmenu', function (ev) {
            ev.preventDefault();
            Snd.open();
            var t = $('#guiPopName');
            if (t) t.textContent = m.n;
            if (pop) {
              pop.hidden = false;
              $$('.sw', pop).forEach(function (s) {
                s.onclick = function () {
                  s.classList.toggle('is-on');
                  Snd.toggle();
                };
              });
              $$('[data-close]', pop).forEach(function (b) {
                b.onclick = closePops;
              });
            }
          });

          c.addEventListener('mousedown', function (ev) {
            if (ev.button !== 1) return;
            ev.preventDefault();
            Snd.open();
            if (bindKey) bindKey.textContent = binds[m.n] || 'нажми клавишу';
            if (bindPop) {
              bindPop.hidden = false;
              var unb = $('#guiUnbind');
              if (unb) unb.onclick = function () {
                delete binds[m.n];
                save();
                closePops(); paint();
              };
              $$('[data-close]', bindPop).forEach(function (b) {
                b.onclick = function () { closePops(); paint(); };
              });
              last = m.n;
            }
          });

          gGrid.appendChild(c);
        });
      }

      /* назначение бинда клавишей */
      document.addEventListener('keydown', function (e) {
        if (ov.hidden) return;
        if (bindPop && !bindPop.hidden && last) {
          e.preventDefault();
          if (e.key === 'Escape') { delete binds[last]; closePops(); paint(); return; }
          if (e.key === 'Backspace' || e.key === 'Delete') { delete binds[last]; }
          else if (e.key.length === 1) {
            binds[last] = e.key.toUpperCase();
          } else {
            binds[last] = e.key;
          }
          save();
          closePops(); paint();
        }
      });

      if (gSearch) {
        var d2;
        gSearch.addEventListener('input', function () {
          clearTimeout(d2);
          d2 = setTimeout(paint, 120);
        });
      }

      /* зум: Ctrl + колесо */
      function setZ(v) {
        z = Math.max(.75, Math.min(1.35, Math.round(v * 100) / 100));
        if (pan) pan.style.setProperty('--z', z);
        var zv = $('#zVal');
        if (zv) zv.textContent = Math.round(z * 100) + '%';
      }
      pan.addEventListener('wheel', function (e) {
        if (!e.ctrlKey && !e.metaKey) return;
        e.preventDefault();
        setZ(z + (e.deltaY < 0 ? .08 : -.08));
      }, { passive: false });
      var zi = $('#zIn'), zo = $('#zOut');
      if (zi) zi.onclick = function () { setZ(z + .08); Snd.select(); };
      if (zo) zo.onclick = function () { setZ(z - .08); Snd.select(); };
      setZ(1);

      /* перетаскивание панели */
      if (drag && pan) {
        var sx = 0, sy = 0, ox = 0, oy = 0, dragging = false;
        drag.addEventListener('mousedown', function (e) {
          if (e.target.tagName === 'BUTTON') return;
          dragging = true;
          sx = e.clientX; sy = e.clientY;
          var r = pan.getBoundingClientRect();
          var cs = getComputedStyle(pan);
          ox = r.left - (parseFloat(cs.left) || 0) - (parseFloat(cs.marginLeft) || 0);
          oy = r.top - (parseFloat(cs.top) || 0) - (parseFloat(cs.marginTop) || 0);
          pan.classList.add('is-drag');
          e.preventDefault();
        });
        addEventListener('mousemove', function (e) {
          if (!dragging) return;
          var r = pan.getBoundingClientRect();
          var nx = e.clientX - r.left - ox;
          var ny = e.clientY - r.top - oy;
          pan.style.marginLeft = Math.round(nx) + 'px';
          pan.style.marginTop = Math.round(ny) + 'px';
        });
        addEventListener('mouseup', function () {
          if (!dragging) return;
          dragging = false;
          pan.classList.remove('is-drag');
        });
      }

      /* клик по пустышке сбрасывает категорию */
      if (gPh) gPh.addEventListener('click', function () {
        cur = null; paint();
      });

      /* клик вне панели закрывает попапы */
      pan.addEventListener('mousedown', function (e) {
        if (!pop && !bindPop) return;
        if (pop && !pop.hidden && !pop.contains(e.target)) pop.hidden = true;
        if (bindPop && !bindPop.hidden && !bindPop.contains(e.target)) bindPop.hidden = true;
      });
    }

    /* ---------- КОТИК ---------- */
    (function () {
      var el = $('#guiKity');
      if (!el) return;
      var list = ['kity.gif', 'cat.gif', 'kity.png', 'cat.png'];
      list.forEach(function (src) {
        var im = new Image();
        im.onload = function () {
          el.style.backgroundImage = 'url("' + src + '")';
          el.classList.add('has-gif');
        };
        im.src = src;
      });
    })();

    /* ---------- REDIRECT ---------- */
    var redir = $('#redir'), rfill = $('#redirFill');
    $$('a[data-buy]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var url = a.href;
        if (!redir || !rfill) { window.open(url, '_blank', 'noopener'); return; }
        redir.hidden = false;
        rfill.style.width = '0%';
        var p = 0;
        var tm = setInterval(function () {
          p = Math.min(100, p + 14 + Math.random() * 10);
          rfill.style.width = p + '%';
          if (p >= 100) {
            clearInterval(tm);
            setTimeout(function () {
              redir.hidden = true;
              window.open(url, '_blank', 'noopener');
              say('Discord открыт в новой вкладке');
            }, 320);
          }
        }, 110);
      });
    });

    /* ---------- LIGHTBOX ---------- */
    var lb = $('#lbox'), lbImg = $('#lbImg'), lbT = $('#lbT');
    var shots = $$('.shot');
    var si = 0;

    if (lb && lbImg && shots.length) {
      function show(i) {
        si = (i + shots.length) % shots.length;
        lbImg.src = shots[si].getAttribute('data-img') || '';
        lbImg.alt = shots[si].getAttribute('data-title') || '';
        if (lbT) lbT.textContent = shots[si].getAttribute('data-title') || '';
      }
      function shut() {
        lb.hidden = true; lbImg.src = ''; document.body.style.overflow = '';
      }
      shots.forEach(function (s, i) {
        s.addEventListener('click', function () {
          show(i); lb.hidden = false; document.body.style.overflow = 'hidden';
        });
      });
      var lx = $('#lbX'), lp = $('#lbP'), ln = $('#lbN');
      if (lx) lx.onclick = shut;
      if (lp) lp.onclick = function () { show(si - 1); };
      if (ln) ln.onclick = function () { show(si + 1); };
      lb.addEventListener('click', function (e) { if (e.target === lb) shut(); });
      document.addEventListener('keydown', function (e) {
        if (lb.hidden) return;
        if (e.key === 'Escape') shut();
        if (e.key === 'ArrowLeft') show(si - 1);
        if (e.key === 'ArrowRight') show(si + 1);
      });
    }

  } catch (err) {
    if (window.console) console.error(err);
  }
})();
