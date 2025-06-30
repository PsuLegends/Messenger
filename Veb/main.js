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