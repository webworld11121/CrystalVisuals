/* ═══════════════════════════════════════════════
   CRYSTALVISUALS
   данные модулей — из ModuleManager.init()
   геометрия макета — из UI (430x290, sidebar 110, r=12)
   ═══════════════════════════════════════════════ */
(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };

  // страховка: даже если что-то сломается — контент покажем
  setTimeout(function () {
    $$('.reveal').forEach(function (e) { e.classList.add('is-in'); });
  }, 2600);

  try {
    document.documentElement.classList.add('js');
    var RM = matchMedia('(prefers-reduced-motion: reduce)').matches;

    var yEl = $('#year');
    if (yEl) yEl.textContent = new Date().getFullYear();

    /* ═══════════ ДАННЫЕ МОДУЛЕЙ ═══════════ */
    // c: visuals | display | utils
    // t: поисковые синонимы (в т.ч. русские)
    var MODULES = [
      // ─────────── VISUALS (40) ───────────
      { n:'Ambience',       c:'visuals', d:'живое небо, туман, свечение',            t:'амбиенс атмосфера небо' },
      { n:'AspectRatio',    c:'visuals', d:'соотношение сторон кадра',               t:'аспект соотношение' },
      { n:'BetterMinecraft',c:'visuals', d:'упрощённый вид мира',                    t:'лучший майнкрафт' },
      { n:'BlockOverlay',   c:'visuals', d:'подсветка блока в прицеле',              t:'блок оверлей' },
      { n:'ChinaHat',       c:'visuals', d:'кастомная шляпа',                       t:'китайская шляпа' },
      { n:'Crosshair',      c:'visuals', d:'прицел, своя форма и цвет',              t:'кроссхейр прицел' },
      { n:'CustomSwords',   c:'visuals', d:'кастомные мечи и модели',                t:'мечи' },
      { n:'Emotions',       c:'visuals', d:'эмоции и анимации персонажа',            t:'эмоции' },
      { n:'ExplosionWave',  c:'visuals', d:'волна взрывов',                          t:'взрыв' },
      { n:'FakePlayer',     c:'visuals', d:'фейковый игрок',                         t:'фейк игрок' },
      { n:'FogBlur',        c:'visuals', d:'размытие тумана',                        t:'туман' },
      { n:'GlassVapor',     c:'visuals', d:'стеклянный пар',                         t:'стекло пар' },
      { n:'GlowEsp',        c:'visuals', d:'подсветка сущностей сквозь стены',       t:'глоу есп' },
      { n:'HitBubbles',     c:'visuals', d:'пузырьки при попадании',                 t:'попадание' },
      { n:'HitColor',       c:'visuals', d:'цвет попадания',                         t:'цвет' },
      { n:'HitParticles',   c:'visuals', d:'частицы при попадании',                  t:'частицы' },
      { n:'Hitboxes',       c:'visuals', d:'отображение хитбоксов',                  t:'хитбокс' },
      { n:'HpCounter',      c:'visuals', d:'счётчик HP над сущностями',              t:'хп хпс' },
      { n:'ItemHighlight',  c:'visuals', d:'подсветка предметов',                    t:'предметы' },
      { n:'ItemPhysics',    c:'visuals', d:'физика падения предметов',                t:'физика' },
      { n:'JumpCircle',     c:'visuals', d:'круг прыжка',                            t:'прыжок' },
      { n:'KillEffect',     c:'visuals', d:'эффект убийства',                        t:'килл' },
      { n:'LootView',       c:'visuals', d:'просмотр лута контейнеров',              t:'лут' },
      { n:'LyricsTextModule',c:'visuals',d:'текст песни на экране',                  t:'текст песни' },
      { n:'ModelCollapse',  c:'visuals', d:'коллапс моделей',                        t:'модель' },
      { n:'NameTags',       c:'visuals', d:'ники, HP, дистанция',                    t:'неймтегс ники' },
      { n:'NoRender',       c:'visuals', d:'отключение лишнего рендера',             t:'но рендер' },
      { n:'PortalLive',     c:'visuals', d:'портал в реальном времени',              t:'портал' },
      { n:'ProjectileHelper',c:'visuals',d:'помощник по снарядам',                    t:'снаряд' },
      { n:'SeeInvisible',   c:'visuals', d:'видеть невидимых игроков',               t:'невидимые' },
      { n:'SelfPredictions',c:'visuals', d:'предсказание своего движения',           t:'предсказание' },
      { n:'SelfTag',        c:'visuals', d:'свой тег над головой',                   t:'свой тег' },
      { n:'ShaderHands',    c:'visuals', d:'шейдерные руки',                         t:'руки шейдер' },
      { n:'SwingAnimation', c:'visuals', d:'анимация замаха',                        t:'замах анимация' },
      { n:'TargetESP',      c:'visuals', d:'ESP цели',                              t:'цель есп' },
      { n:'Trails',         c:'visuals', d:'следы за сущностями',                    t:'следы' },
      { n:'ViewModel',      c:'visuals', d:'вид от первого лица',                    t:'вьюмодель' },
      { n:'WastedDeath',    c:'visuals', d:'эффект смерти',                          t:'смерть' },
      { n:'WorldParticles', c:'visuals', d:'частицы мира',                           t:'частицы' },
      { n:'BrewViewer',     c:'visuals', d:'просмотр зелий',                         t:'зелья брю' },

      // ─────────── DISPLAY (16) ───────────
      { n:'Armor',          c:'display', d:'отображение брони',                      t:'броня' },
      { n:'ArrayList',      c:'display', d:'список активных модулей',                t:'аррейлист список' },
      { n:'ClickGui',       c:'display', d:'главное меню',                           t:'меню гуи' },
      { n:'Cooldowns',      c:'display', d:'таймеры кулдаунов',                       t:'кулдаун' },
      { n:'CustomHotbar',   c:'display', d:'кастомный хотбар',                        t:'хотбар' },
      { n:'HPFocus',        c:'display', d:'увеличенный HP-бар',                      t:'хп бар' },
      { n:'HotKeys',        c:'display', d:'подсказки клавиш',                       t:'хоткеи клавиши' },
      { n:'Info',           c:'display', d:'версия, задержка, игроки',                t:'инфо' },
      { n:'Interface',      c:'display', d:'общие настройки HUD',                    t:'интерфейс' },
      { n:'Inventory',      c:'display', d:'улучшенный инвентарь',                    t:'инвентарь' },
      { n:'KeyStrokes',     c:'display', d:'индикатор WASD',                         t:'кейстроуки васд' },
      { n:'MediaPlayer',    c:'display', d:'плеер музыки',                           t:'плеер музыка' },
      { n:'Notifications',  c:'display', d:'уведомления',                            t:'уведомления' },
      { n:'Potions',        c:'display', d:'эффекты зелий',                          t:'зелья эффекты' },
      { n:'TargetHud',      c:'display', d:'HP цели в углу',                         t:'таргет' },
      { n:'Watermark',      c:'display', d:'водяной знак',                           t:'ватермарка' },

      // ─────────── UTILS (27) ───────────
      { n:'AutoCommands',   c:'utils', d:'автовыполнение команд',                   t:'авто команды' },
      { n:'AutoDuel',       c:'utils', d:'автоматическая дуэль',                    t:'авто дуэль' },
      { n:'AutoResell',     c:'utils', d:'автоматическая продажа',                  t:'авто продажа' },
      { n:'AutoSprint',     c:'utils', d:'автоспринт',                              t:'авто спринт' },
      { n:'AutoSwap',       c:'utils', d:'автосвап слота',                          t:'авто свап' },
      { n:'AutoTpAccept',   c:'utils', d:'автопринятие телепорта',                  t:'авто тп' },
      { n:'CameraSettings', c:'utils', d:'настройки камеры',                        t:'камера' },
      { n:'Cards',          c:'utils', d:'работа с картами',                        t:'карты' },
      { n:'ClickPearl',     c:'utils', d:'автоклик по жемчугу',                     t:'клик перл жемчуг' },
      { n:'ClientSounds',   c:'utils', d:'звуки клиента',                           t:'звуки' },
      { n:'CrystalOptimizer',c:'utils',d:'оптимизатор кристаллов',                  t:'кристаллы оптимизация' },
      { n:'DeathCoords',    c:'utils', d:'координаты места смерти',                  t:'смерть координаты' },
      { n:'ElytraSwap',     c:'utils', d:'свап элитры',                             t:'элитра' },
      { n:'Freelook',       c:'utils', d:'свободный обзор',                         t:'фрилук обзор' },
      { n:'Globals',        c:'utils', d:'глобальные настройки',                    t:'глобалы' },
      { n:'HandSwap',       c:'utils', d:'свап руки',                               t:'рука свап' },
      { n:'HitSound',       c:'utils', d:'звук попадания',                           t:'звук удар' },
      { n:'HolyWorldHelper',c:'utils', d:'помощник HolyWorld',                      t:'холи ворлд' },
      { n:'ItemScroller',   c:'utils', d:'прокрутка предметов',                     t:'скролл предметы' },
      { n:'Optimization',   c:'utils', d:'оптимизация клиента',                     t:'оптимизация' },
      { n:'Party',          c:'utils', d:'управление пати',                         t:'пати' },
      { n:'Pitbike',        c:'utils', d:'модуль Pitbike',                          t:'питбайк' },
      { n:'ShulkerPreview', c:'utils', d:'превью содержимого шалкера',              t:'шалкер' },
      { n:'StreamerMode',   c:'utils', d:'скрытие информации для стримов',          t:'стрим' },
      { n:'TalTracker',     c:'utils', d:'трекер TAL',                              t:'тал' },
      { n:'TapeMouse',      c:'utils', d:'эмуляция мыши',                           t:'мышь' },
      { n:'VoiceControl',   c:'utils', d:'голосовое управление',                    t:'голос' }
    ];

    var COUNT = {
      all:      MODULES.length,
      visuals:  MODULES.filter(function (m) { return m.c === 'visuals'; }).length,
      display:  MODULES.filter(function (m) { return m.c === 'display'; }).length,
      utils:    MODULES.filter(function (m) { return m.c === 'utils';   }).length
    };

    /* ═══════════ ПОИСК С РАСКЛАДКОЙ RU→EN ═══════════ */
    // из UI.layoutNormalize: физические клавиши совпадают на разных раскладках
    var RU = 'йцукенгшщзхъфывапролджэячсмитьбюё';
    var EN = 'qwertyuiop[]asdfghjkl;\'zxcvbnm,.`';

    function layoutNormalize(s) {
      var out = '';
      for (var i = 0; i < s.length; i++) {
        var idx = RU.indexOf(s[i]);
        out += idx >= 0 ? EN.charAt(idx) : s[i];
      }
      return out;
    }

    // формируем поле поиска один раз
    function makeIndex(m) {
      var name = m.n.toLowerCase();
      return {
        full:  name + ' ' + m.t,
        norm:  layoutNormalize(name) + ' ' + layoutNormalize(m.t),
        // склеенный без пробелов — как в клиенте
        compact:  (name + m.t).replace(/\s/g, ''),
        normCompact: (layoutNormalize(name) + layoutNormalize(m.t)).replace(/\s/g, '')
      };
    }
    MODULES.forEach(function (m) { m._i = makeIndex(m); });

    function match(m, q) {
      if (!q) return true;
      return m._i.full.indexOf(q) !== -1 ||
             m._i.norm.indexOf(q) !== -1 ||
             m._i.compact.indexOf(q.replace(/\s/g, '')) !== -1 ||
             m._i.normCompact.indexOf(q.replace(/\s/g, '')) !== -1;
    }

    /* ═══════════ ФИОЛЕТОВОЕ НЕБО ═══════════ */
    (function sky() {
      var cv = document.getElementById('sky');
      if (!cv || RM) { if (cv) cv.style.display = 'none'; return; }
      var ctx = cv.getContext('2d');
      var w, h, dpr, stars = [], motes = [], raf;

      function size() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = cv.width = innerWidth * dpr;
        h = cv.height = innerHeight * dpr;
        cv.style.width = innerWidth + 'px';
        cv.style.height = innerHeight + 'px';
        stars = [];
        var ns = Math.round(innerWidth * innerHeight / 8000);
        for (var i = 0; i < ns; i++) {
          stars.push({
            x: Math.random() * w, y: Math.random() * h * 0.8,
            r: (Math.random() * 1.4 + 0.4) * dpr,
            a: Math.random() * 0.55 + 0.12,
            tw: (Math.random() * 0.018 + 0.004) * (Math.random() < .5 ? -1 : 1)
          });
        }
        motes = [];
        var nm = Math.min(44, Math.round(innerWidth / 32));
        for (var j = 0; j < nm; j++) {
          motes.push({
            x: Math.random() * w, y: Math.random() * h,
            r: (Math.random() * 2.2 + 0.9) * dpr,
            vx: (Math.random() - 0.5) * 0.14 * dpr,
            vy: -(Math.random() * 0.2 + 0.04) * dpr,
            o: Math.random() * 0.32 + 0.08,
            c: Math.random() < 0.5 ? '167,139,250' : '61,77,255'
          });
        }
      }

      function frame() {
        var g = ctx.createLinearGradient(0, 0, 0, h);
        g.addColorStop(0, 'rgba(16,12,44,0.9)');
        g.addColorStop(0.5, 'rgba(10,10,30,0.75)');
        g.addColorStop(1, 'rgba(6,6,20,0.95)');
        ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
        for (var i = 0; i < stars.length; i++) {
          var s = stars[i]; s.a += s.tw;
          if (s.a > 0.8 || s.a < 0.08) s.tw = -s.tw;
          ctx.fillStyle = 'rgba(214,205,255,' + s.a + ')';
          ctx.fillRect(s.x, s.y, s.r, s.r);
        }
        for (var j = 0; j < motes.length; j++) {
          var m = motes[j]; m.x += m.vx; m.y += m.vy;
          if (m.y < -20) { m.y = h + 20; m.x = Math.random() * w; }
          if (m.x < -20) m.x = w + 20;
          if (m.x > w + 20) m.x = -20;
          ctx.beginPath(); ctx.arc(m.x, m.y, m.r, 0, 6.2832);
          ctx.fillStyle = 'rgba(' + m.c + ',' + m.o + ')';
          ctx.shadowBlur = 14 * dpr; ctx.shadowColor = 'rgba(123,92,255,0.9)';
          ctx.fill();
        }
        ctx.shadowBlur = 0;
        raf = requestAnimationFrame(frame);
      }

      document.addEventListener('visibilitychange', function () {
        if (document.hidden) cancelAnimationFrame(raf); else raf = requestAnimationFrame(frame);
      });
      size(); frame();
      addEventListener('resize', size);
    })();

    /* ═══════════ ЗВУКИ (как в клиенте: gui_open/close/select) ═══════════ */
    var Snd = (function () {
      var ac = null;
      function ctx() {
        if (!ac) {
          var AC = window.AudioContext || window.webkitAudioContext;
          if (!AC) return null;
          ac = new AC();
        }
        if (ac.state === 'suspended') ac.resume();
        return ac;
      }
      function tone(freq, dur, type, vol, delay) {
        var a = ctx(); if (!a) return;
        var t0 = a.currentTime + (delay || 0);
        var o = a.createOscillator(), g = a.createGain();
        o.type = type || 'sine';
        o.frequency.setValueAtTime(freq, t0);
        g.gain.setValueAtTime(0, t0);
        g.gain.linearRampToValueAtTime(vol == null ? 0.06 : vol, t0 + 0.012);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
        o.connect(g); g.connect(a.destination);
        o.start(t0); o.stop(t0 + dur + 0.02);
      }
      return {
        open:   function () { tone(520, 0.1, 'sine', 0.05); tone(780, 0.13, 'sine', 0.04, 0.05); },
        close:  function () { tone(700, 0.1, 'sine', 0.045); tone(420, 0.14, 'sine', 0.035, 0.05); },
        select: function () { tone(880, 0.06, 'square', 0.022); },
        toggle: function () { tone(660, 0.07, 'triangle', 0.03); },
        unbind: function () { tone(300, 0.1, 'sawtooth', 0.025); }
      };
    })();

    /* ═══════════ HEADER + SCROLLBAR ═══════════ */
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

    /* ═══════════ MOBILE NAV ═══════════ */
    var bg = $('#burger'), nav = $('#nav');
    if (bg && nav) {
      var closeNav = function () {
        nav.classList.remove('is-on'); bg.classList.remove('is-x');
        bg.setAttribute('aria-expanded', 'false'); document.body.style.overflow = '';
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

    /* ═══════════ REVEAL ═══════════ */
    if ('IntersectionObserver' in window) {
      var rev = new IntersectionObserver(function (en, ob) {
        en.forEach(function (e, i) {
          if (!e.isIntersecting) return;
          setTimeout(function () { e.target.classList.add('is-in'); }, i * 55);
          ob.unobserve(e.target);
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px' });
      $$('.reveal').forEach(function (el) { rev.observe(el); });
    } else {
      $$('.reveal').forEach(function (el) { el.classList.add('is-in'); });
    }

    /* ═══════════ COUNTERS ═══════════ */
    if ('IntersectionObserver' in window) {
      var cnt = new IntersectionObserver(function (en, ob) {
        en.forEach(function (e) {
          if (!e.isIntersecting) return;
          var el = e.target, end = +el.dataset.count || 0;
          if (RM) { el.textContent = end; ob.unobserve(el); return; }
          var t0 = performance.now(), dur = 1200;
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

    /* ═══════════ SCROLLSPY ═══════════ */
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

    /* ═══════════ TICKER ═══════════ */
    var tk = $('#ticker');
    if (tk) {
      var chunk = '83 МОДУЛЯ<span>◆</span>GLASS UI<span>◆</span>MINECRAFT 1.21.11<span>◆</span>' +
                  'AMBIENCE<span>◆</span>550 ₽ НАВСЕГДА<span>◆</span>БЕЗ ПОДПИСКИ<span>◆</span>';
      var t = '';
      for (var i = 0; i < 6; i++) t += chunk;
      tk.innerHTML = t;
    }

    /* ═══════════════════════════════════════════
       МАКЕТ GUI
       категории: MAIN(VISUALS/DISPLAY/UTILS) + Server + Client
       ═══════════════════════════════════════════ */
    var mockWin = $('#mockWin');
    var gMain = $('#gMain'), gServer = $('#gServer'), gClient = $('#gClient');
    var gList = $('#gList'), gEmpty = $('#gEmpty'), gPh = $('#gPlaceholder');
    var gSearch = $('#gSearch');

    var CATS = [
      { key:'visuals', label:'Visuals', box:gMain,   n:COUNT.visuals },
      { key:'display', label:'Display', box:gMain,   n:COUNT.display },
      { key:'utils',   label:'Utils',   box:gMain,   n:COUNT.utils },
      { key:'events',  label:'Events',  box:gServer, n:null },
      { key:'mines',   label:'Mines',   box:gServer, n:null },
      { key:'configs', label:'Configs', box:gClient, n:null },
      { key:'themes',  label:'Themes',  box:gClient, n:null }
    ];

    if (mockWin && gMain) {
      var active = null;
      var enabled = {};        // включённые модули в макете
      var bound = {};          // бинды

      // ── рендер сайдбара ──
      CATS.forEach(function (c) {
        var b = document.createElement('button');
        b.className = 'grow';
        b.type = 'button';
        b.dataset.cat = c.key;
        b.innerHTML = '<i></i><span>' + c.label + '</span>' +
                      (c.n ? '<b>' + c.n + '</b>' : '');
        b.addEventListener('click', function () {
          Snd.select();
          if (active === c.key) { active = null; }
          else { active = c.key; }
          if (gSearch) gSearch.value = '';
          paint();
        });
        c.el = b;
        if (c.box) c.box.appendChild(b);
      });

      function paint() {
        CATS.forEach(function (c) {
          if (c.el) c.el.classList.toggle('is-act', c.key === active);
        });

        // Configs / Themes / Events / Mines — не модули, показываем заглушку
        var isModuleCat = active === 'visuals' || active === 'display' || active === 'utils';

        if (!isModuleCat) {
          if (gList) { gList.hidden = true; gList.innerHTML = ''; }
          if (gEmpty) gEmpty.hidden = true;
          if (gPh) {
            gPh.hidden = false;
            var lbl = gPh.querySelector('p');
            if (lbl && active) {
              lbl.textContent = active === 'themes' ? 'Выбери тему оформления'
                              : active === 'configs' ? 'Здесь хранятся твои профили'
                              : active === 'events'  ? 'Доступно на поддерживаемых серверах'
                              : active === 'mines'   ? 'Доступно на поддерживаемых серверах'
                              : 'Откройте категорию чтобы начать';
            }
          }
          return;
        }

        if (gPh) gPh.hidden = true;
        var q = ((gSearch && gSearch.value) || '').trim().toLowerCase();
        var list = MODULES.filter(function (m) { return m.c === active && match(m, q); });

        if (!list.length) {
          if (gList) { gList.hidden = true; gList.innerHTML = ''; }
          if (gEmpty) gEmpty.hidden = false;
          return;
        }
        if (gEmpty) gEmpty.hidden = true;
        if (!gList) return;
        gList.hidden = false;
        gList.innerHTML = '';

        list.forEach(function (m) {
          var card = document.createElement('button');
          card.className = 'gcard' + (enabled[m.n] ? ' is-on' : '') + (q ? ' is-hl' : '');
          card.type = 'button';
          card.innerHTML = '<b>' + m.n + '</b>' + (enabled[m.n] ? '<i></i>' : '');
          card.title = m.d + (bound[m.n] ? '  ·  ' + bound[m.n] : '');

          // ЛКМ — toggle
          card.addEventListener('click', function (e) {
            // Ctrl+клик по найденному = перейти в его категорию
            if ((e.ctrlKey || e.metaKey) && q) {
              var other = MODULES.filter(function (x) { return x.n === m.n; })[0];
              if (other && other.c !== active) {
                active = other.c;
                Snd.select();
                paint();
              }
              return;
            }
            enabled[m.n] = !enabled[m.n];
            if (!enabled[m.n]) delete bound[m.n];
            Snd.toggle();
            paint();
          });

          // ПКМ — настройки
          card.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            Snd.open();
            openPop($('#gPop'), m.n);
          });

          // СКМ — бинд
          card.addEventListener('mousedown', function (e) {
            if (e.button !== 1) return;
            e.preventDefault();
            Snd.open();
            openBind(m.n);
          });

          gList.appendChild(card);
        });
      }

      /* ── попап настроек ── */
      var pop = $('#gPop');
      function openPop(el, name) {
        if (!el) return;
        closePops();
        var t = $('#gPopName');
        if (t) t.textContent = name;
        el.hidden = false;
        el.querySelectorAll('.gsw').forEach(function (s) {
          s.addEventListener('click', function () { s.classList.toggle('is-on'); Snd.toggle(); });
        });
        el.querySelectorAll('[data-close]').forEach(function (b) {
          b.addEventListener('click', closePops);
        });
      }

      /* ── попап бинда ── */
      var bindPop = $('#gBind'), bindKey = $('#gBindKey');
      var listening = null;
      function openBind(name) {
        if (!bindPop) return;
        closePops();
        listening = name;
        bindPop.hidden = false;
        if (bindKey) {
          bindKey.textContent = bound[name] || '—';
          bindKey.classList.add('is-listen');
        }
        var ub = bindPop.querySelector('[data-unbind]');
        if (ub) ub.addEventListener('click', function () {
          delete bound[name];
          Snd.unbind();
          closePops(); paint();
        });
        bindPop.querySelectorAll('[data-close]').forEach(function (b) {
          b.addEventListener('click', function () { listening = null; closePops(); paint(); });
        });
      }

      function closePops() {
        if (pop) pop.hidden = true;
        if (bindPop) { bindPop.hidden = true; listening = null; }
        if (bindKey) bindKey.classList.remove('is-listen');
      }

      // Esc — закрыть попап, как в клиенте
      mockWin.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { closePops(); e.stopPropagation(); }
      });
      document.addEventListener('mousedown', function (e) {
        if (!mockWin.contains(e.target)) closePops();
      });

      // клик по пустке сбрасывает (category == null как в selectCategory)
      gPh && gPh.addEventListener('click', function () { active = null; paint(); });

      if (gSearch) {
        var deb;
        gSearch.addEventListener('input', function () {
          clearTimeout(deb);
          deb = setTimeout(paint, 120);
        });
      }

      /* ── зум: Ctrl + колесо (как UiScale в клиенте) ── */
      var z = 1, zVal = $('#zVal');
      function setZ(v) {
        z = Math.max(0.8, Math.min(1.4, Math.round(v * 100) / 100));
        if (mockWin) mockWin.style.setProperty('--z', z);
        if (zVal) zVal.textContent = Math.round(z * 100) + '%';
      }
      mockWin.addEventListener('wheel', function (e) {
        if (!e.ctrlKey && !e.metaKey) return;
        e.preventDefault();
        setZ(z + (e.deltaY < 0 ? 0.1 : -0.1));
      }, { passive: false });
      var zIn = $('#zIn'), zOut = $('#zOut');
      if (zIn)  zIn.addEventListener('click',  function () { setZ(z + 0.1); Snd.select(); });
      if (zOut) zOut.addEventListener('click', function () { setZ(z - 0.1); Snd.select(); });
      setZ(1);

      paint();

      // стартовый звук при первом клике в макет
      mockWin.addEventListener('pointerdown', function once() {
        Snd.open();
        mockWin.removeEventListener('pointerdown', once);
      });
    }

    /* ═══════════ КОТИК ═══════════ */
    (function kity() {
      var el = $('#gKity');
      if (!el) return;
      ['kity.gif', 'cat.gif', 'kity.png', 'cat.png'].forEach(function (src) {
        var im = new Image();
        im.onload = function () {
          el.style.backgroundImage = 'url("' + src + '")';
          el.classList.add('has-gif');
        };
        im.src = src;
      });
    })();

    /* ═══════════ АВАТАР (опционально avatar.png) ═══════════ */
    (function ava() {
      var el = $('#gAvatar');
      if (!el) return;
      var im = new Image();
      im.onload = function () {
        el.style.backgroundImage = 'url("avatar.png")';
      };
      im.src = 'avatar.png';
    })();

    /* ═══════════ БРАУЗЕР МОДУЛЕЙ (секция 02) ═══════════ */
    var mList = $('#mList'), mEmpty = $('#mEmpty');
    if (mList) {
      var mFilter = 'all';
      mList.innerHTML = MODULES.map(function (m) {
        return '<div class="mchip" data-c="' + m.c + '" data-n="' +
          (m.n.toLowerCase() + ' ' + m.t) + '">' +
          '<b>' + m.n + '</b><span>' + m.d + '</span></div>';
      }).join('');

      var mChips = $$('.mchip', mList);
      var mSearch = $('#mSearch'), mHint = $('#mHint');
      var mIdx = MODULES.map(function (m) { return { m: m, i: makeIndex(m) }; });

      function applyM() {
        var raw = ((mSearch && mSearch.value) || '').trim().toLowerCase();
        // нормализуем и русскую раскладку тоже
        var q = raw, qn = layoutNormalize(raw);
        var shown = 0;

        mChips.forEach(function (c, i) {
          var okCat = mFilter === 'all' || c.dataset.c === mFilter;
          var rec = mIdx[i];
          var okQ = !raw ||
            rec.i.full.indexOf(q) !== -1 ||
            rec.i.norm.indexOf(q) !== -1 ||
            rec.i.norm.indexOf(qn) !== -1 ||
            rec.i.compact.indexOf(q.replace(/\s/g, '')) !== -1 ||
            rec.i.normCompact.indexOf(qn.replace(/\s/g, '')) !== -1;
          var show = okCat && okQ;
          c.classList.toggle('is-hide', !show);
          c.classList.toggle('is-hl', show && !!raw);
          if (show) shown++;
        });

        if (mEmpty) mEmpty.hidden = shown !== 0;
        if (mHint) {
          if (raw && shown) { mHint.textContent = shown; mHint.classList.add('is-on'); }
          else mHint.classList.remove('is-on');
        }
      }

      $$('.mtab').forEach(function (btn) {
        btn.addEventListener('click', function () {
          $$('.mtab').forEach(function (b) { b.classList.remove('is-act'); });
          btn.classList.add('is-act');
          mFilter = btn.dataset.f;
          Snd.select();
          applyM();
        });
      });

      if (mSearch) {
        var deb2;
        mSearch.addEventListener('input', function () {
          clearTimeout(deb2);
          deb2 = setTimeout(applyM, 120);
        });
      }
      applyM();
    }

    /* ═══════════ TOAST ═══════════ */
    var toast = $('#toast'), tt;
    function showToast(msg) {
      if (!toast) return;
      toast.textContent = msg;
      toast.classList.add('is-on');
      clearTimeout(tt);
      tt = setTimeout(function () { toast.classList.remove('is-on'); }, 2400);
    }

    /* ═══════════ REDIRECT ═══════════ */
    var redir = $('#redir'), rfill = $('#redirFill');
    $$('a[data-buy]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var url = a.href;
        if (!redir || !rfill) { open(url, '_blank', 'noopener'); return; }
        redir.hidden = false; rfill.style.width = '0%';
        var p = 0;
        var tm = setInterval(function () {
          p = Math.min(100, p + 14 + Math.random() * 10);
          rfill.style.width = p + '%';
          if (p >= 100) {
            clearInterval(tm);
            setTimeout(function () {
              redir.hidden = true;
              open(url, '_blank', 'noopener');
              showToast('Discord открыт в новой вкладке');
            }, 320);
          }
        }, 110);
      });
    });

    /* ═══════════ МЕНЮ ПО R ═══════════ */
    var KEY = 'cv:modules';
    var gui = $('#mcgui'), grid = $('#mcGrid'), cntOut = $('#mcCount'), kh = $('#cvOpen');
    if (gui && grid) {
      var btns = $$('.mcb', grid);
      var st = {};
      try { st = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) {}

      function renderM() {
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

      var openG  = function () { Snd.open();  gui.hidden = false; document.body.style.overflow = 'hidden'; };
      var closeG = function () { Snd.close(); gui.hidden = true;  document.body.style.overflow = ''; };

      btns.forEach(function (b) {
        b.addEventListener('click', function () {
          var n = b.firstChild.textContent.trim();
          st[n] = !st[n];
          try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {}
          Snd.toggle();
          renderM();
        });
      });

      if (kh) kh.addEventListener('click', openG);
      gui.addEventListener('click', function (e) { if (e.target.hasAttribute('data-close')) closeG(); });

      document.addEventListener('keydown', function (e) {
        var typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable;
        if (typing || e.ctrlKey || e.metaKey || e.altKey) return;
        if (e.key === 'r' || e.key === 'R' || e.key === 'к' || e.key === 'К') {
          e.preventDefault();
          if (gui.hidden) openG(); else closeG();
        }
      });
      renderM();
    }

    /* ═══════════ LIGHTBOX ═══════════ */
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
      function openLb(i) { show(i); lb.hidden = false; document.body.style.overflow = 'hidden'; }
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
    console.error(err);
    $$('.reveal').forEach(function (e) { e.classList.add('is-in'); });
  }
})();
