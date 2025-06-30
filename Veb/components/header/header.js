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