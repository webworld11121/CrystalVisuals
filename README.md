# CrystalVisuals — сайт

Статический сайт лоадера. Без сборки, без зависимостей: три файла в корне репозитория.

## Файлы

```
index.html      разметка
style.css       стили
main.js         вся логика
kity.gif        гиф с котиком (для макета)
shot-1.png      скриншот клиента
avatar.png      аватар (необязательно)
.nojekyll       для GitHub Pages
```

## Залить на GitHub

1. `Add file → Upload files` — перетащи всё в корень репозитория
2. `Commit changes`
3. `Settings → Pages` → Source: `Deploy from a branch` → ветка `main` → папка `/ (root)` → `Save`
4. Сайт: `https://webworld11121.github.io/CrystalVisuals/`

## Публикация

**Settings → Pages → Source → `Deploy from a branch`**, ветка `main`, папка `/ (root)`.

## Что менять

| Что | Где |
|---|---|
| Цена 550 ₽ | `index.html` — `.trade__num`, `.trade__cur`, заголовки |
| Ссылка на Discord | все `a[data-buy]` в `index.html` |
| Описание модулей | массив `MODULES` в начале `main.js` |
| Ник и роль в макете | `index.html` — `#gNick`, `#gRole` |
| Цвета | `style.css` — переменные в `:root` |

## Данные модулей

Список из 83 модулей взят из `ModuleManager.init()` — массив `MODULE[]`.
Категории: `visuals` (40), `display` (16), `utils` (27).

Раскладка в `main.js`: пакеты `impl.Visuals.*`, `impl.Interface.*`, `impl.Utils.*`.
`MAIN_CATEGORIES` = VISUALS, DISPLAY, UTILS. `OTHER_CATEGORIES` = CONFIGS, THEMES.
`EVENT_SUBS` = Events, Mines — это подразделы Server, а не категории модулей.

> В GUI на скриншоте счётчики показывают 41 / 15 / 26 = 82.
> По коду регистрируется 83 модуля (в `init()` 83 штуки, плюс `CustomPet`
> и `Customization` включаются напрямую и в список не входят).
> На сайте стоит 83 — сверь с живым клиентом и поправь `MODULES`,
> если расходится.

## Поиск

Работает как в клиенте: сравнение по имени + синонимам + **нормализация раскладки RU→EN**
(вместо `с` ищет `c`, вместо `кроссхейр` — `crosshair`). Реализация в
`layoutNormalize()` — та же логика, что в `UI.Companion.layoutNormalize`.

## Макет GUI в hero

Не картинка, а рабочий элемент:

- ЛКМ по модулю — вкл/выкл
- ПКМ — попап настроек
- СКМ — попап бинда
- Ctrl + колесо — зум
- Ctrl + ЛКМ по найденному — переход в его категорию
- клик по пустке — сброс категории
- звуки на Web Audio (`gui_open` / `gui_close` / `select`)

Геометрия взята из класса `UI`: панель 430×290, сайдбар 110, радиус 12.
