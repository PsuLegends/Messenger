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