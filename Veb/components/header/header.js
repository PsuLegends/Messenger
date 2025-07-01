// components/header/header.js (Версия с иконками в меню)

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
                        <!-- ИЗМЕНЕНО: Добавлены иконки к каждому пункту меню -->
                        <a href="#">
                            <svg class="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            Профиль
                        </a>
                        <a href="#" id="theme-menu-item">
                            <svg class="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                            Тема
                        </a>
                        <a href="#" id="settings-menu-item">
                            <svg class="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            Настройки
                        </a>
                        <div class="dropdown-divider"></div>
                        <a href="#" id="logout-menu-item" class="logout-link">
                            <svg class="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                            Выйти
                        </a>
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
    const logoutMenuItem = document.getElementById('logout-menu-item');

    // Проверяем, что все элементы найдены
    if (!menuButton || !dropdownMenu || !settingsMenuItem || !themeMenuItem || !logoutMenuItem) {
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

    // Обработчик для пункта "Выйти"
    logoutMenuItem.addEventListener('click', (event) => {
        event.preventDefault(); // Отменяем стандартное действие ссылки
        console.log('Пользователь нажал "Выйти". Перезагрузка страницы...');
        // Перезагружаем страницу, чтобы вернуться к экрану входа
        window.location.reload();
    });
}

// Главная экспортная функция
export function initHeader() {
    loadStyles();
    render();
    addEventListeners();
}