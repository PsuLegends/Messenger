// components/auth/auth.js

// Функция для загрузки стилей этого компонента
function loadStyles() {
    if (document.getElementById('auth-styles')) return;
    const link = document.createElement('link');
    link.id = 'auth-styles';
    link.rel = 'stylesheet';
    link.href = 'components/auth/auth.css';
    document.head.appendChild(link);
}

// Функция для "отрисовки" HTML-кода формы
function render() {
    // Находим корневой элемент, куда будем всё вставлять
    const root = document.getElementById('root');
    if (!root) {
        console.error('#root element not found!');
        return;
    }

    // Создаем HTML-структуру формы с помощью шаблонной строки
    root.innerHTML = `
        <div class="auth-container">
            <div class="auth-form">
                <h1>Вход</h1>
                <input type="email" class="form-input" placeholder="Email">
                <input type="password" class="form-input" placeholder="Пароль">
                <button class="form-button">Войти</button>
            </div>
        </div>
    `;
}

// Главная экспортная функция, которую будет вызывать main.js
export function initAuthForm() {
    loadStyles();
    render();
    // TODO: Здесь позже добавим обработчики событий для инпутов и кнопки
}