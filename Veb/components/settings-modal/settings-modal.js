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