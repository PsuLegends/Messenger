# Проект из папки: /home/antony/Messenger/Veb

## Файл: `index.html`

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- НОВОЕ: Подключаем шрифт Poppins. Он будет использоваться только там, где мы укажем в CSS. -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <title>Astralis App</title>
    
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="header"></div>
    <div id="root"></div>
    <div id="info-bar"></div>
    <script type="module" src="main.js"></script>
</body>
</html>
```

## Файл: `main.js`

```javascript
// main.js (обновленная версия)

import { initInfoBar } from './components/info-bar/info-bar.js';
// НОВОЕ: Импортируем функцию для инициализации формы
import { initAuthForm } from './components/auth/auth.js';

import { initHeader } from './components/header/header.js';
import { initThemeSwitcher } from './components/theme-switcher/theme-switcher.js';
import { initSettingsModal } from './components/settings-modal/settings-modal.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('App Shell is ready. Initializing components...');

    initThemeSwitcher();
    initHeader();

    // Запускаем инфо-бар
    initInfoBar();

    // НОВОЕ: Запускаем отрисовку формы аутентификации
    initAuthForm();

    initSettingsModal();
    
});
```

## Файл: `style.css`

```css
/* style.css (ПОЛНОСТЬЮ ОБНОВЛЕННЫЙ ФАЙЛ) */

/* Глобальный сброс */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Базовые стили */
html, body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    background-color: var(--bg-primary); /* ИЗМЕНЕНО */
    color: var(--text-primary);        /* ИЗМЕНЕНО */
    height: 100%;
    overflow: hidden; 
}

/*
  ==== ГЛАВНЫЕ ИЗМЕНЕНИЯ В МАКЕТЕ ====
  Превращаем body в flex-контейнер, чтобы расположить элементы по вертикали.
*/
body {
    display: flex;
    flex-direction: column;
    height: 100vh; /* Заставляем body занять 100% высоты ОКНА БРАУЗЕРА */
}

/* Задаем жесткую высоту для шапки: 10% от высоты окна */
#header {
    height: 7vh;
    flex-shrink: 0; /* Запрещаем шапке сжиматься, если контента много */
}

/* 
   Главный контейнер для контента (#root) занимает ВСЁ ОСТАВШЕЕСЯ МЕСТО.
   - height рассчитывается: 100% - 10% (шапка) - 2.5% (инфо-бар) = 87.5%
   - overflow-y: auto; добавляет вертикальную прокрутку ТОЛЬКО для этого блока,
     если его содержимое не помещается. Шапка и инфо-бар всегда остаются на месте.
*/
#root {
    height: 90.5vh;
    overflow-y: auto;
}

/* Задаем жесткую высоту для инфо-бара: 2.5% от высоты окна */
#info-bar {
    height: 2.5vh;
    flex-shrink: 0; /* Запрещаем инфо-бару сжиматься */
}
```

## Файл: `Colors/dark_theme/Gradients.txt`

```
этот крут /* -- СТРУКТУРА 1: РАДИАЛЬНЫЙ "ПРОЖЕКТОР" -- */
--auth-overlay-left-gradient: radial-gradient(circle, #92E1E2, #18A5A7, #0D4671); 

этот тоже /* -- СТРУКТУРА 4: МНОГОСЛОЙНЫЙ ГРАДИЕНТ "АВРОРА" -- */
--auth-overlay-left-gradient: 
    radial-gradient(at 0% 0%, #BFFFC7 0px, transparent 50%),
    radial-gradient(at 90% 95%, #54ACBF 0px, transparent 50%),
    radial-gradient(at 50% 50%, #18A5A7 0px, transparent 50%),
    linear-gradient(120deg, #0D4671, #26658C); 

/* -- СТРУКТУРА 5: "ЖАЛЮЗИ" ИЗ ГРАДИЕНТА -- */
--auth-overlay-left-gradient: linear-gradient(160deg, 
    #0D4671 0% 20%, 
    #26658C 20% 40%, 
    #18A5A7 40% 70%, 
    #92E1E2 70% 100%
); это тоже интересно, можно запомнить не для этого а для фона, можно будет добавить у аутентификации, чтобы не просто чёрный был

/* -- СТРУКТУРА 2: "ХРУСТАЛЬНЫЕ ГРАНИ" -- */
--auth-overlay-left-gradient:
    linear-gradient(27deg, rgba(24, 165, 167, 0.8), rgba(24, 165, 167, 0) 70%),
    linear-gradient(135deg, rgba(84, 172, 191, 0.7), rgba(84, 172, 191, 0) 80%),
    linear-gradient(220deg, rgba(38, 101, 140, 0.9), rgba(38, 101, 140, 0) 75%),
    #0D4671; /* Сплошной цвет фона под градиентами */

    /* -- СТРУКТУРА 3: "ШЕЛКОВАЯ ТКАНЬ" -- */
--auth-overlay-left-gradient:
    radial-gradient(ellipse at 70% 20%, #A7EBF2, transparent 60%),
    radial-gradient(ellipse at 20% 80%, #18A5A7, transparent 70%),
    radial-gradient(ellipse at 100% 100%, #26658C, transparent 80%),
    #0D4671; - ну ок, но не очень

    
```

## Файл: `Colors/dark_theme/gradients.html`

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Галерея Градиентов</title>
    <style>
        /* --- ОБЩИЕ СТИЛИ СТРАНИЦЫ-ШПАРГАЛКИ --- */
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            color: #f0f0f0;
            padding: 3rem 2rem;
            background-color: #0D4671;
            background-image: linear-gradient(160deg, #0D4671 0%, #26658C 40%, #18A5A7 80%, #0D4671 100%);
            background-size: 200%;
            animation: background-pan 20s linear infinite;
        }

        @keyframes background-pan {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        .main-title {
            text-align: center;
            font-size: 3rem;
            margin-bottom: 3rem;
            font-weight: 800;
            background: linear-gradient(90deg, #A7EBF2, #BFFFC7);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 15px rgba(183, 255, 199, 0.3);
        }

        /* --- СТИЛИ ГАЛЕРЕИ --- */
        .gallery-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2.5rem;
            max-width: 1600px;
            margin: 0 auto;
        }

        .gradient-card {
            background-color: rgba(13, 19, 42, 0.7);
            border: 1px solid rgba(146, 225, 226, 0.2);
            border-radius: 15px;
            padding: 1.5rem;
            backdrop-filter: blur(10px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            display: flex;
            flex-direction: column;
        }

        .gradient-card h2 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            border-bottom: 1px solid rgba(146, 225, 226, 0.2);
            padding-bottom: 0.8rem;
        }

        .gradient-preview {
            width: 100%;
            height: 200px;
            border-radius: 10px;
            margin-bottom: 1.5rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .code-block {
            background-color: #0c101f;
            border-radius: 8px;
            padding: 1rem;
            overflow-x: auto;
            font-family: 'Courier New', Courier, monospace;
            font-size: 0.9rem;
            white-space: pre-wrap;
            color: #d1d5db;
            border: 1px solid rgba(146, 225, 226, 0.1);
        }

        /* --- ОПРЕДЕЛЯЕМ НАШИ ГРАДИЕНТЫ --- */

        .gradient-1 { background: radial-gradient(circle, #92E1E2, #18A5A7, #0D4671); }
        .gradient-2 { background: radial-gradient(at 0% 0%, #BFFFC7 0px, transparent 50%), radial-gradient(at 90% 95%, #54ACBF 0px, transparent 50%), radial-gradient(at 50% 50%, #18A5A7 0px, transparent 50%), linear-gradient(120deg, #0D4671, #26658C); }
        .gradient-3 { background: linear-gradient(27deg, rgba(24,165,167,0.8), transparent 70%), linear-gradient(135deg, rgba(84,172,191,0.7), transparent 80%), linear-gradient(220deg, rgba(38,101,140,0.9), transparent 75%), #0D4671; }
        .gradient-4 { background: repeating-conic-gradient(#18A5A7 0% 25%, #0D4671 0% 50%) top left / 40px 40px; }
        .gradient-5 { background: linear-gradient(135deg, #0D4671 0% 49.9%, #54ACBF 50.1% 100%); }
        
        /* -- Новые варианты -- */
        .gradient-6 { background: repeating-linear-gradient(45deg, #0D4671, #0D4671 10px, #18A5A7 10px, #18A5A7 20px, #26658C 20px, #26658C 25px); }
        .gradient-7 { background: radial-gradient(ellipse at 10% 90%, #92E1E2, transparent 50%), radial-gradient(ellipse at 80% 80%, #54ACBF, transparent 60%), radial-gradient(ellipse at 20% 15%, #A7EBF2, transparent 70%), linear-gradient(to top, #0D4671, #26658C); }
        .gradient-8 { background: linear-gradient(to right, rgba(84, 172, 191, 0.5), rgba(84, 172, 191, 0) 80%), linear-gradient(to bottom, rgba(24, 165, 167, 0.6), rgba(24, 165, 167, 0) 70%), linear-gradient(90deg, #0D4671, #26658C); }
        .gradient-9 { background: repeating-conic-gradient(from 45deg, #A7EBF2 0deg 5deg, transparent 5deg 360deg), linear-gradient(#0D4671, #18A5A7); }
        .gradient-10 { background: repeating-linear-gradient(45deg, rgba(0,0,0,0.02) 0px, rgba(0,0,0,0.02) 1px, transparent 1px, transparent 4px), linear-gradient(135deg, #0D4671, #92E1E2); }


    </style>
</head>
<body>

    <h1 class="main-title">Галерея Продвинутых Градиентов</h1>

    <div class="gallery-container">
        <!-- КАРТОЧКА 1 -->
        <div class="gradient-card">
            <h2>Радиальный "Прожектор"</h2>
            <div class="gradient-preview gradient-1"></div>
            <div class="code-block">background: radial-gradient(circle, #92E1E2, #18A5A7, #0D4671);</div>
        </div>
        
        <!-- КАРТОЧКА 2 -->
        <div class="gradient-card">
            <h2>Многослойный "Аврора"</h2>
            <div class="gradient-preview gradient-2"></div>
            <div class="code-block">background:
    radial-gradient(at 0% 0%, #BFFFC7 0px, transparent 50%),
    radial-gradient(at 90% 95%, #54ACBF 0px, transparent 50%),
    radial-gradient(at 50% 50%, #18A5A7 0px, transparent 50%),
    linear-gradient(120deg, #0D4671, #26658C);</div>
        </div>

        <!-- КАРТОЧКА 3 -->
        <div class="gradient-card">
            <h2>"Хрустальные грани"</h2>
            <div class="gradient-preview gradient-3"></div>
            <div class="code-block">background:
    linear-gradient(27deg, rgba(24,165,167,0.8), transparent 70%),
    linear-gradient(135deg, rgba(84,172,191,0.7), transparent 80%),
    linear-gradient(220deg, rgba(38,101,140,0.9), transparent 75%),
    #0D4671;</div>
        </div>
        
        <!-- КАРТОЧКА 6 -->
        <div class="gradient-card">
            <h2>Векторные сканирующие линии</h2>
            <div class="gradient-preview gradient-6"></div>
            <div class="code-block">background: repeating-linear-gradient(45deg, #0D4671, #0D4671 10px, #18A5A7 10px, #18A5A7 20px, #26658C 20px, #26658C 25px);</div>
        </div>

        <!-- КАРТОЧКА 7 -->
        <div class="gradient-card">
            <h2>Биолюминесценция</h2>
            <div class="gradient-preview gradient-7"></div>
            <div class="code-block">background:
    radial-gradient(ellipse at 10% 90%, #92E1E2, transparent 50%),
    radial-gradient(ellipse at 80% 80%, #54ACBF, transparent 60%),
    radial-gradient(ellipse at 20% 15%, #A7EBF2, transparent 70%),
    linear-gradient(to top, #0D4671, #26658C);</div>
        </div>
        
        <!-- КАРТОЧКА 8 -->
        <div class="gradient-card">
            <h2>Цифровая шотландка</h2>
            <div class="gradient-preview gradient-8"></div>
            <div class="code-block">background:
    linear-gradient(to right, rgba(84, 172, 191, 0.5), transparent 80%),
    linear-gradient(to bottom, rgba(24, 165, 167, 0.6), transparent 70%),
    linear-gradient(90deg, #0D4671, #26658C);</div>
        </div>

        <!-- КАРТОЧКА 9 -->
        <div class="gradient-card">
            <h2>Лучи из бездны</h2>
            <div class="gradient-preview gradient-9"></div>
            <div class="code-block">background: 
    repeating-conic-gradient(from 45deg, #A7EBF2 0deg 5deg, transparent 5deg 360deg),
    linear-gradient(#0D4671, #18A5A7);</div>
        </div>

        <!-- КАРТОЧКА 10 -->
        <div class="gradient-card">
            <h2>Статическая дымка</h2>
            <div class="gradient-preview gradient-10"></div>
            <div class="code-block">background: 
    repeating-linear-gradient(45deg, rgba(0,0,0,0.02) 0, rgba(0,0,0,0.02) 1px, transparent 1px, transparent 4px),
    linear-gradient(135deg, #0D4671, #92E1E2);</div>
        </div>

    </div>

</body>
</html>
```

## Файл: `components/info-bar/info-bar.css`

```css
/* components/info-bar/info-bar.css (ВОЗВРАЩАЕМ СТАТИЧНЫЙ СТИЛЬ) */

#info-bar {
    height: 2.5vh;
    min-height: 20px;
    padding: 0 15px;
    /* ИЗМЕНЕНО: Возвращаем градиент и конкретные цвета */
    background: linear-gradient(to right, #1e1e1e, #1e1e2d, #1e1e1e);
    border-top: 1px solid #333;
    font-size: 12px;
    font-family: 'Courier New', Courier, monospace;
    color: #888;
    
    display: flex;
    align-items: center;
    justify-content: space-around;
    
    flex-wrap: wrap; 
    gap: 15px;
    overflow: hidden;
    
    transition: all 0.3s ease;
} 

#info-bar.hidden {
    display: none;
}
```

## Файл: `components/info-bar/info-bar.js`

```javascript
// components/info-bar/info-bar.js (финальная версия)

const infoBarContainer = document.getElementById('info-bar');

function loadStyles() {
    if (document.getElementById('info-bar-styles')) return;
    const link = document.createElement('link');
    link.id = 'info-bar-styles';
    link.rel = 'stylesheet';
    link.href = 'components/info-bar/info-bar.css';
    document.head.appendChild(link);
}

// НОВАЯ ФУНКЦИЯ для "умного" парсинга User Agent
function getBrowserInfo() {
    const ua = navigator.userAgent;
    let browser = "Unknown";
    let os = "Unknown";

    // Определяем ОС
    if (/Windows/.test(ua)) os = "Windows";
    else if (/Mac OS/.test(ua)) os = "macOS";
    else if (/Linux/.test(ua)) os = "Linux";
    else if (/Android/.test(ua)) os = "Android";
    else if (/iPhone|iPad|iPod/.test(ua)) os = "iOS";

    // Определяем браузер
    if (/Firefox/.test(ua)) browser = "Firefox";
    else if (/SamsungBrowser/.test(ua)) browser = "Samsung Internet";
    else if (/Opera|OPR/.test(ua)) browser = "Opera";
    else if (/Edge/.test(ua)) browser = "Edge";
    else if (/Chrome/.test(ua)) browser = "Chrome";
    else if (/Safari/.test(ua)) browser = "Safari";
    
    return `${browser} on ${os}`;
}


function updateInfo() {
    if (!infoBarContainer) return;

    const dpr = window.devicePixelRatio || 1;
    
    // Вызываем нашу новую функцию
    const browserInfo = getBrowserInfo();

    infoBarContainer.innerHTML = `
        <span>Window: ${window.innerWidth}x${window.innerHeight}</span>
        <span>Screen: ${screen.width}x${screen.height}</span>
        <span>DPR: ${dpr.toFixed(2)}</span>
        <span>${browserInfo}</span>
        <span>Lang: ${navigator.language}</span>
        <span>Online: ${navigator.onLine ? '✔' : '❌'}</span>
    `;
}

// ==== НОВАЯ ФУНКЦИЯ-ПЕРЕКЛЮЧАТЕЛЬ ====
// Она будет управлять видимостью панели. Мы ее экспортируем.
// Принимает один аргумент: true (показать) или false (скрыть).
export function toggleInfoBarVisibility(isVisible) {
    if (!infoBarContainer) return;

    if (isVisible) {
        // Если нужно показать, убираем класс 'hidden'
        infoBarContainer.classList.remove('hidden');
    } else {
        // Если нужно скрыть, добавляем класс 'hidden'
        infoBarContainer.classList.add('hidden');
    }
}

export function initInfoBar() {
    loadStyles();
    updateInfo();
    window.addEventListener('resize', updateInfo);
}
```

## Файл: `components/theme-switcher/theme-switcher.js`

```javascript
// components/theme-switcher/theme-switcher.js

const THEME_STORAGE_KEY = 'astralis-theme'; // Ключ для сохранения в localStorage

// Загружаем файл со стилями тем
function loadStyles() {
    if (document.getElementById('theme-styles')) return;
    const link = document.createElement('link');
    link.id = 'theme-styles';
    link.rel = 'stylesheet';
    link.href = 'components/theme-switcher/theme.css';
    document.head.appendChild(link);
}

// Применяет указанную тему (добавляет/убирает класс и сохраняет выбор)
function applyTheme(themeName) {
    document.body.classList.toggle('light-theme', themeName === 'light');
    localStorage.setItem(THEME_STORAGE_KEY, themeName);
}

// Загружает сохраненную тему при старте приложения
function loadSavedTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'dark'; // По умолчанию темная
    applyTheme(savedTheme);
}

// Функция для переключения темы (ее мы будем вызывать из шапки)
export function toggleTheme() {
    // Проверяем, есть ли сейчас светлая тема, и выбираем противоположную
    const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
}

// Главная функция инициализации
export function initThemeSwitcher() {
    loadStyles();
    loadSavedTheme();
}
```

## Файл: `components/theme-switcher/theme.css`

```css
/* components/theme-switcher/theme.css (С НОВЫМИ, ВЫРАЗИТЕЛЬНЫМИ ГРАДИЕНТАМИ) */

:root {
  /* Основные переменные темы */
  --bg-primary: #121212;
  --bg-secondary: #1e1e1e;
  --bg-tertiary: #2b2b2b;
  --text-primary: #e0e0e0;
  --text-secondary: #a0a0a0;
  --text-on-accent: #ffffff;
  --border-color: #333;
  --border-color-strong: #444;
  --accent-color: #0d6efd;
  --accent-color-hover: #0b5ed7;
  --shadow-color: rgba(0, 0, 0, 0.5);

  /* 
    ==== ГРАДИЕНТ "ШТИЛЬ НА МОРЕ" для ТЕМНОЙ темы ====
    От глубокого синего к бирюзовому.
/* -- ОТЗЕРКАЛЕННАЯ ВЕРСИЯ "АВРОРЫ" -- */
/* -- ОТЗЕРКАЛЕННАЯ ВЕРСИЯ "АВРОРЫ" (ИСПРАВЛЕННАЯ) -- */
--auth-overlay-left-gradient: 
    /* Левая панель остается как есть */
    radial-gradient(at 0% 0%, #BFFFC7 0px, transparent 50%),
    radial-gradient(at 90% 95%, #54ACBF 0px, transparent 50%),
    radial-gradient(at 50% 50%, #18A5A7 0px, transparent 50%),
    linear-gradient(120deg, #26658C, #0D4671);

--auth-overlay-right-gradient: 
    /* 
      ИСПРАВЛЕНИЕ: Все три блика на месте. 
      Положения изменены для создания гармоничного, но не идентичного узора.
    */
    radial-gradient(at 100% 0%, #BFFFC7 0px, transparent 50%),
    radial-gradient(at 0% 95%, #54ACBF 0px, transparent 50%),
    radial-gradient(at 50% 50%, #18A5A7 0px, transparent 50%),
    linear-gradient(to right, #0D4671, #26658C); 
}


body.light-theme {
  /* Переопределение основных переменных */
  --bg-primary: #f8f9fa;
  --bg-secondary: #ffffff;
  --bg-tertiary: #f1f3f5;
  --text-primary: #212529;
  --text-secondary: #6c757d;
  --text-on-accent: #ffffff;
  --border-color: #dee2e6;
  --border-color-strong: #ced4da;
  --accent-color: #0d6efd;
  --accent-color-hover: #0b5ed7;
  --shadow-color: rgba(0, 0, 0, 0.15);
  
  /* 
    ==== ГРАДИЕНТ "МЯКОТЬ ГРЕЙПФРУТА" для СВЕТЛОЙ темы ====
    От насыщенного фиолетового к яркому красно-оранжевому.
  */
--auth-overlay-left-gradient: linear-gradient(to right, #ff7e5f, #feb47b);
--auth-overlay-right-gradient: linear-gradient(to right, #f857a6, #ff5858);
}
```

## Файл: `components/auth/auth.css`

```css
/* components/auth/auth.css (ВЕРСИЯ С ПРАВИЛЬНЫМИ ЗЕРКАЛЬНЫМИ ГРАДИЕНТАМИ) */

.auth-component-wrapper {
    font-family: 'Poppins', sans-serif;
    background: var(--bg-primary);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
}

.auth-component-wrapper * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.auth-component-wrapper h1 {
    font-weight: 700;
    margin: 0 0 10px;
    font-size: 2.2rem;
    color: var(--text-primary);
}

.auth-component-wrapper .overlay-panel h1 {
    color: var(--text-on-accent);
}

.auth-component-wrapper p {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
}

.auth-component-wrapper span,
.auth-component-wrapper a {
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
    color: var(--text-secondary);
    transition: color 0.2s ease-in-out;
}

.auth-component-wrapper a:hover {
    color: var(--accent-color);
}

.auth-component-wrapper button {
    position: relative;
    overflow: hidden;
    border-radius: 20px;
    border: 2px solid var(--accent-color);
    background-color: var(--accent-color);
    color: var(--text-on-accent);
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    transition: transform 80ms ease-in, background-color 0.3s ease, color 0.3s ease;
}

.auth-component-wrapper button:active {
    transform: scale(0.95);
}

.auth-component-wrapper button:focus {
    outline: none;
}

.auth-component-wrapper button:not(.ghost):hover {
    background-color: var(--accent-color-hover);
    border-color: var(--accent-color-hover);
}

.auth-component-wrapper button.ghost {
    background-color: transparent;
    border-color: #ffffff; /* Кнопки на "шторке" всегда белые */
    color: #ffffff;
}
.auth-component-wrapper button.ghost:hover {
    background-color: rgba(255,255,255,0.15);
}

.auth-component-wrapper form {
    background-color: var(--bg-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;
}

.auth-component-wrapper input {
    background-color: var(--bg-tertiary);
    border: 1px solid var(--border-color);
    color: var(--text-primary);
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
    border-radius: 15px;
    font-family: 'Poppins', sans-serif;
    transition: border-color 0.3s, box-shadow 0.3s;
}

.auth-component-wrapper input:focus {
    border-color: var(--accent-color);
    outline: none;
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-color) 20%, transparent);
}

.auth-component-wrapper .social-container a {
    height: 40px;
    width: 40px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background-color: var(--bg-tertiary);
    border: 1px solid var(--border-color);
    color: var(--text-secondary);
    border-radius: 8px;
    transition: all 0.3s ease;
}

.auth-component-wrapper .social-container a:hover {
    color: var(--text-primary);
    border-color: var(--accent-color);
}

.auth-component-wrapper .social-container svg {
    width: 50%;
    height: 50%;
}

.auth-component-wrapper .container {
    background-color: var(--bg-secondary);
    box-shadow: var(--shadow-color) 0 14px 28px, var(--shadow-color) 0 10px 10px;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
}

.auth-component-wrapper .form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 3s ease-in-out;
}
.auth-component-wrapper .sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
}

.auth-component-wrapper .sign-up-container form {
    /* Делаем фон формы регистрации прозрачным, чтобы видеть шторку под ней */
    background-color: transparent;
}

.auth-component-wrapper .overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    z-index: 100;
    transition: transform 3s ease-in-out;
}

/* 
  ==== ИСПРАВЛЕНИЕ #1: Убираем фон с родительского `.overlay` ====
  Теперь он просто прозрачная "платформа" для движущихся панелей.
*/
.auth-component-wrapper .overlay {
    color: #ffffff; 
    position: relative;
    left: -100%;
    height: 100%;
    width: 201%; /* <-- ИСПРАВЛЕНИЕ: Делаем чуть шире для перекрытия шва */
    transform: translateX(0);
    transition: transform 3s ease-in-out;
}

.auth-component-wrapper .overlay-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    /* Добавляем плавный переход для фона */
    transition: background 3s ease-in-out;
}

/* 
  ==== ИСПРАВЛЕНИЕ #2: Задаем каждой панели свой градиент ====
*/
.auth-component-wrapper .overlay-left {
    /* transform: translateX(-20%); */ /* <-- УБИРАЕМ */
    background: var(--auth-overlay-left-gradient);
}

.auth-component-wrapper .overlay-right {
    right: 0;
    /* transform: translateX(0); */ /* <-- УБИРАЕМ */
    background: var(--auth-overlay-right-gradient);
}


/* ... Анимация остается без изменений ... */
.auth-component-wrapper .container.right-panel-active .overlay-container {
    transform: translateX(-100%);
}

.auth-component-wrapper .container.right-panel-active .overlay {
    transform: translateX(50%);
}

.auth-component-wrapper .container.right-panel-active .overlay-left {
    transform: translateX(0);
}

/*
.auth-component-wrapper .container.right-panel-active .overlay-left {
    transform: translateX(0);
}

.auth-component-wrapper .container.right-panel-active .overlay-right {
    transform: translateX(20%);
}
*/

.auth-component-wrapper .container.right-panel-active .sign-in-container {
    transform: translateX(100%);
}

.auth-component-wrapper .container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: auth-show 0.6s;
}

@keyframes auth-show {
    0%, 49.99% {
        opacity: 0;
        z-index: 1;
    }
    50%, 100% {
        opacity: 1;
        z-index: 5;
    }
}
```

## Файл: `components/auth/auth.js`

```javascript
// components/auth/auth.js (ПРАВИЛЬНАЯ, ИНКАПСУЛИРОВАННАЯ ВЕРСИЯ ДЛЯ ВАШЕГО ПРОЕКТА)

// Функция для динамической загрузки стилей этого компонента
function loadStyles() {
    if (document.getElementById('auth-styles')) return;
    const link = document.createElement('link');
    link.id = 'auth-styles';
    link.rel = 'stylesheet';
    link.href = 'components/auth/auth.css';
    document.head.appendChild(link);
}

// Функция для "отрисовки" HTML-кода формы внутрь элемента #root
function render() {
    const root = document.getElementById('root');
    if (!root) {
        console.error('#root element not found!');
        return;
    }

    // Вся HTML-структура формы. Она будет вставлена в #root.
    // Иконки заменены на SVG для независимости от файлов.
    root.innerHTML = `
        <div class="auth-component-wrapper">
            <div class="container" id="auth-main-container">
                <!-- Форма регистрации -->
                <div class="form-container sign-up-container">
                    <form action="#">
                        <h1>Create Account</h1>
                        <div class="social-container">
                            <a href="#" class="social"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04C6.5 2.04 2 6.53 2 12s4.5 9.96 10 9.96c5.5 0 10-4.46 10-9.96S17.5 2.04 12 2.04zm2.23 12.35h-1.63v5.9h-2.33v-5.9H9.1v-2.02h1.17v-1.3c0-1 .56-2.58 2.58-2.58h1.8v2.02h-1.09c-.31 0-.75.16-.75.82v1.04h1.88l-.25 2.02z"/></svg></a>
                            <a href="#" class="social"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M21.35 11.1h-9.17v2.73h5.21c-.45 2.73-2.96 4.55-5.21 4.55-3.18 0-5.77-2.59-5.77-5.77s2.59-5.77 5.77-5.77c1.73 0 2.86.73 3.55 1.36l2.18-2.18C16.91 4.23 14.64 3 12.18 3 7.82 3 4.27 6.55 4.27 10.91s3.55 7.91 7.91 7.91c4.55 0 7.64-3.18 7.64-7.64 0-.55-.05-1.09-.15-1.58z"/></svg></a>
                            <a href="#" class="social"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M13.162 18.994c.609 0 .858-.407.858-.937v-4.04h1.732c.56 0 .749-.292.885-.987l.255-1.428c.15-.84-.183-1.185-1.04-1.185h-1.83v-2.146c0-.58.216-.87.648-.87h1.22c.577 0 .826-.33.826-.937V4.92c0-.608-.25-1.026-.826-1.026h-1.748c-1.336 0-2.288.523-2.81 1.57-.45.89-.69 2.15-.69 3.79v1.5H9.42c-.56 0-.81.33-.81.936v1.428c0 .608.25.937.81.937h1.008v4.04c0 .53.25.937.858.937h.876z"/></svg></a>
                        </div>
                        <span>or use your email for registration</span>
                        <input type="text" placeholder="Имя" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Пароль" />
                        <button>Sign Up</button>
                    </form>
                </div>

                <!-- Форма входа -->
                <div class="form-container sign-in-container">
                    <form action="#">
                        <h1>Sign In</h1>
                        <div class="social-container">
                             <a href="#" class="social"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04C6.5 2.04 2 6.53 2 12s4.5 9.96 10 9.96c5.5 0 10-4.46 10-9.96S17.5 2.04 12 2.04zm2.23 12.35h-1.63v5.9h-2.33v-5.9H9.1v-2.02h1.17v-1.3c0-1 .56-2.58 2.58-2.58h1.8v2.02h-1.09c-.31 0-.75.16-.75.82v1.04h1.88l-.25 2.02z"/></svg></a>
                            <a href="#" class="social"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M21.35 11.1h-9.17v2.73h5.21c-.45 2.73-2.96 4.55-5.21 4.55-3.18 0-5.77-2.59-5.77-5.77s2.59-5.77 5.77-5.77c1.73 0 2.86.73 3.55 1.36l2.18-2.18C16.91 4.23 14.64 3 12.18 3 7.82 3 4.27 6.55 4.27 10.91s3.55 7.91 7.91 7.91c4.55 0 7.64-3.18 7.64-7.64 0-.55-.05-1.09-.15-1.58z"/></svg></a>
                            <a href="#" class="social"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M13.162 18.994c.609 0 .858-.407.858-.937v-4.04h1.732c.56 0 .749-.292.885-.987l.255-1.428c.15-.84-.183-1.185-1.04-1.185h-1.83v-2.146c0-.58.216-.87.648-.87h1.22c.577 0 .826-.33.826-.937V4.92c0-.608-.25-1.026-.826-1.026h-1.748c-1.336 0-2.288.523-2.81 1.57-.45.89-.69 2.15-.69 3.79v1.5H9.42c-.56 0-.81.33-.81.936v1.428c0 .608.25.937.81.937h1.008v4.04c0 .53.25.937.858.937h.876z"/></svg></a>
                        </div>
                        <span>or use your account</span>
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <a href="#">forgot your password?</a>
                        <button>Sign In</button>
                    </form>
                </div>

                <!-- Декоративная панель (Overlay) -->
                <div class="overlay-container">
                    <div class="overlay">
                        <div class="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button class="ghost" id="auth-signIn-btn">Sign in</button>
                        </div>
                        <div class="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start your journey with us</p>
                            <button class="ghost" id="auth-signUp-btn">Sign up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Функция для добавления обработчиков событий
function addEventListeners() {
    // ВАЖНО: Мы ищем элементы внутри #root, чтобы не конфликтовать с другими частями страницы
    const root = document.getElementById('root');
    const container = root.querySelector('#auth-main-container');
    const signUpButton = root.querySelector('#auth-signUp-btn');
    const signInButton = root.querySelector('#auth-signIn-btn');

    if (!container || !signUpButton || !signInButton) {
        console.error("Не удалось найти управляющие элементы внутри компонента аутентификации.");
        return;
    }

    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });
}


// Главная экспортная функция, которую вызывает main.js
export function initAuthForm() {
    loadStyles();
    render();
    addEventListeners();
}
```

## Файл: `components/auth/index.html`

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Astralis App</title>
    <!-- Основные стили для всей оболочки -->
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- 
        #root - это главный контейнер, куда JS будет "рисовать" 
        наши компоненты (сначала форму входа, потом приложение).
    -->
    <div id="root"></div>

    <!-- 
        #info-bar - это отдельный контейнер для нашей 
        отладочной информации. Он вне #root, т.к. это служебный элемент.
    -->
    <div id="info-bar"></div>

    <!-- 
        Подключаем главный JS-файл как модуль, 
        это позволит нам использовать import/export.
    -->
    <script type="module" src="main.js"></script>
</body>
</html>
```

## Файл: `components/settings-modal/settings-modal.css`

```css
/* components/settings-modal/settings-modal.css (ПОЛНОСТЬЮ ИСПРАВЛЕННЫЙ ФАЙЛ) */

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* Оверлей оставляем полупрозрачным черным, это стандарт для всех тем */
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.3s ease, visibility 0.3s ease;
}

.modal-overlay.show {
    visibility: visible;
    opacity: 1;
}

.modal-content {
    background-color: var(--bg-secondary); /* ИЗМЕНЕНО */
    padding: 25px;
    border-radius: 8px;
    border: 1px solid var(--border-color); /* ИЗМЕНЕНО */
    box-shadow: 0 10px 30px var(--shadow-color); /* ИЗМЕНЕНО */
    width: 90%;
    max-width: 420px;
    position: relative;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--border-color); /* ИЗМЕНЕНО */
    padding-bottom: 12px;
}

.modal-header h2 {
    font-size: 1.5rem;
    color: var(--text-primary); /* ИЗМЕНЕНО */
    margin: 0;
}

.modal-close-button {
    background: none;
    border: none;
    color: var(--text-secondary); /* ИЗМЕНЕНО */
    font-size: 1.8rem;
    cursor: pointer;
    line-height: 1;
    transition: color 0.2s ease;
}

.modal-close-button:hover {
    color: var(--text-primary); /* ИЗМЕНЕНО */
}

.modal-body {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

/* Стили для переключателя (toggle switch) */
.settings-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    color: var(--text-primary); /* ИЗМЕНЕНО */
}

.toggle-switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 28px;
}

.toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--border-color-strong); /* ИЗМЕНЕНО */
    border-radius: 28px;
    transition: .4s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 4px;
    /* ИЗМЕНЕНО: Фон кружка теперь тоже зависит от темы для контраста */
    background-color: var(--bg-secondary);
    border-radius: 50%;
    transition: .4s;
}

input:checked + .slider {
    background-color: var(--accent-color); /* ИЗМЕНЕНО */
}

input:checked + .slider:before {
    /* ИЗМЕНЕНО: фон кружка при включении оставляем белым для контраста с синим */
    background-color: white; 
    transform: translateX(22px);
}
```

## Файл: `components/settings-modal/settings-modal.js`

```javascript
// components/settings-modal/settings-modal.js

// Импортируем функцию управления инфо-баром!
import { toggleInfoBarVisibility } from '../info-bar/info-bar.js';

let modalOverlay = null;

function loadStyles() {
    if (document.getElementById('settings-modal-styles')) return;
    const link = document.createElement('link');
    link.id = 'settings-modal-styles';
    link.rel = 'stylesheet';
    link.href = 'components/settings-modal/settings-modal.css';
    document.head.appendChild(link);
}

function render() {
    // Модальное окно добавляется прямо в body, чтобы быть поверх всего
    const container = document.body;

    // Создаем HTML, но пока он будет скрыт
    container.insertAdjacentHTML('beforeend', `
        <div class="modal-overlay" id="settings-modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Настройки</h2>
                    <button class="modal-close-button" id="modal-close-btn">×</button>
                </div>
                <div class="modal-body">
                    <div class="settings-item">
                        <span>Информационная панель</span>
                        <label class="toggle-switch">
                            <input type="checkbox" id="infobar-toggle" checked>
                            <span class="slider"></span>
                        </label>
                    </div>
                    <!-- Здесь можно будет добавить другие настройки -->
                </div>
            </div>
        </div>
    `);

    modalOverlay = document.getElementById('settings-modal-overlay');
}

function addEventListeners() {
    const closeButton = document.getElementById('modal-close-btn');
    const infoBarToggle = document.getElementById('infobar-toggle');
    const modalContent = modalOverlay.querySelector('.modal-content');

    // Закрыть по клику на крестик
    closeButton.addEventListener('click', hideSettingsModal);

    // Закрыть по клику на темный фон
    modalOverlay.addEventListener('click', hideSettingsModal);

    // НЕ закрывать по клику на само окно
    modalContent.addEventListener('click', (event) => event.stopPropagation());

    // Логика переключателя инфо-бара
    infoBarToggle.addEventListener('change', (event) => {
        const isVisible = event.target.checked;
        toggleInfoBarVisibility(isVisible);
    });
}

// Функции, которые мы будем вызывать из других компонентов
export function showSettingsModal() {
    if (modalOverlay) {
        modalOverlay.classList.add('show');
    }
}

export function hideSettingsModal() {
    if (modalOverlay) {
        modalOverlay.classList.remove('show');
    }
}

// Главная функция инициализации
export function initSettingsModal() {
    // Проверяем, не создано ли окно ранее
    if (document.getElementById('settings-modal-overlay')) return;

    loadStyles();
    render();
    addEventListeners();
}
```

## Файл: `components/header/header.css`

```css
/* components/header/header.css (ОБНОВЛЕННАЯ ВЕРСИЯ) */

.header-content {
    /* ИЗМЕНЕНО: Заставляем контент занять всю высоту родительского блока #header (10vh) */
    height: 100%; 
    padding: 10px 25px;
    background-color: var(--bg-secondary); /* ИЗМЕНЕНО */
    border-bottom: 1px solid var(--border-color); /* ИЗМЕНЕНО */
    display: flex;
    align-items: center;
    justify-content: space-between;
}

/* ... остальные стили остаются без изменений ... */
.header-left, .header-right {
    display: flex;
    align-items: center;
    gap: 15px; 
}
/* ... и так далее, скопируй сюда остаток твоего файла header.css ... */

/* Убедись, что остальная часть файла такая же, как была в твоем проекте */
.menu-container {
    position: relative;
}
.menu-button {
    background: none;
    border: none;
    padding: 5px;
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary); /* ИЗМЕНЕНО */
    transition: background-color 0.2s, color 0.2s;
}
.menu-button:hover {
    background-color: var(--border-color); /* ИЗМЕНЕНО */
    color: var(--text-primary);          /* ИЗМЕНЕНО */
}
.dropdown-menu {
    display: none;
    position: absolute;
    top: 100%;
    right: 0; 
    margin-top: 10px;
    background-color: var(--bg-tertiary);        /* ИЗМЕНЕНО */
    border: 1px solid var(--border-color-strong); /* ИЗМЕНЕНО */
    border-radius: 8px;
    box-shadow: 0 8px 16px var(--shadow-color); /* ИЗМЕНЕНО */
    min-width: 160px;
    z-index: 1000;
    overflow: hidden;
}
.dropdown-menu.show {
    display: block;
}
.dropdown-menu a {
    color: var(--text-primary); /* ИЗМЕНЕНО */
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    transition: background-color 0.2s;
}
.dropdown-menu a:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
}
.dropdown-menu a:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
}
.dropdown-menu a:hover {
    background-color: var(--border-color); /* ИЗМЕНЕНО */
}
.profile-stub, .header-left {
    color: var(--text-secondary); /* ИЗМЕНЕНО */
    transition: color 0.2s;
}
.header-left:hover {
    color: var(--text-primary); /* ИЗМЕНЕНО */
}
@media (max-width: 480px) {
    .header-content {
        padding: 10px 15px;
    }
    .header-left, .header-right {
        gap: 10px;
    }
    .header-left svg {
        width: 28px;
        height: 28px;
    }
    .profile-stub svg {
        width: 24px;
        height: 24px;
    }
}
```

## Файл: `components/header/header.js`

```javascript
// components/header/header.js (ПОЛНОСТЬЮ ОБНОВЛЕННЫЙ ФАЙЛ)

// Импортируем функции для модального окна и смены темы
import { showSettingsModal } from '../settings-modal/settings-modal.js';
import { toggleTheme } from '../theme-switcher/theme-switcher.js';

// Функция для загрузки стилей этого компонента
function loadStyles() {
    if (document.getElementById('header-styles')) return;
    const link = document.createElement('link');
    link.id = 'header-styles';
    link.rel = 'stylesheet';
    link.href = 'components/header/header.css';
    document.head.appendChild(link);
}

// Функция для отрисовки HTML
function render() {
    const headerContainer = document.getElementById('header');
    if (!headerContainer) {
        console.error('#header element not found!');
        return;
    }

    // Вставляем HTML-структуру шапки с id для интерактивных элементов меню
    headerContainer.innerHTML = `
        <div class="header-content">
            <div class="header-left">
                 <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z"></path>
                </svg>
            </div>
            <div class="header-center"></div>
            <div class="header-right">
                <div class="profile-stub">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                    </svg>
                </div>
                <div class="menu-container">
                    <button id="menu-button" class="menu-button">
                        <svg viewBox="0 0 100 100" fill="currentColor" width="24" height="24">
                            <circle cx="50" cy="20" r="10"></circle>
                            <circle cx="50" cy="50" r="10"></circle>
                            <circle cx="50" cy="80" r="10"></circle>
                        </svg>
                    </button>
                    <div id="dropdown-menu" class="dropdown-menu">
                        <a href="#">Профиль</a>
                        <a href="#" id="theme-menu-item">Тема</a>
                        <a href="#" id="settings-menu-item">Настройки</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Функция для добавления обработчиков событий
function addEventListeners() {
    // Находим все необходимые элементы
    const menuButton = document.getElementById('menu-button');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const settingsMenuItem = document.getElementById('settings-menu-item');
    const themeMenuItem = document.getElementById('theme-menu-item');

    // Проверяем, что все элементы найдены
    if (!menuButton || !dropdownMenu || !settingsMenuItem || !themeMenuItem) {
        console.error('Header menu elements not found for event listeners');
        return;
    }

    // Показываем/скрываем меню по клику на кнопку (три точки)
    menuButton.addEventListener('click', (event) => {
        event.stopPropagation();
        dropdownMenu.classList.toggle('show');
    });

    // Скрываем меню по клику вне его
    window.addEventListener('click', () => {
        if (dropdownMenu.classList.contains('show')) {
            dropdownMenu.classList.remove('show');
        }
    });

    // Обработчик для пункта "Настройки"
    settingsMenuItem.addEventListener('click', (event) => {
        event.preventDefault();
        showSettingsModal();
        dropdownMenu.classList.remove('show');
    });

    // Обработчик для пункта "Тема"
    themeMenuItem.addEventListener('click', (event) => {
        event.preventDefault();
        toggleTheme();
        // Меню не скрываем, чтобы пользователь видел изменение темы
    });
}

// Главная экспортная функция
export function initHeader() {
    loadStyles();
    render();
    addEventListeners();
}
```

