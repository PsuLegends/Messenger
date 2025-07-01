// Вспомогательная функция для загрузки CSS, чтобы не повторять код
function loadStyleSheet(id, href) {
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
}

// Главная функция загрузки всех стилей для этой страницы
function loadStyles() {
    // 1. Загружаем главный CSS для макета
    loadStyleSheet('main-page-styles', 'components/main-page/main-page.css');
    
    // 2. Загружаем CSS для каждой из трех колонок
    loadStyleSheet('nav-panel-styles', 'components/main-page/nav-panel/nav-panel.css');
    loadStyleSheet('chat-panel-styles', 'components/main-page/chat-panel/chat-panel.css');
    loadStyleSheet('list-panel-styles', 'components/main-page/list-panel/list-panel.css');
}

function render() {
    const root = document.getElementById('root');
    if (!root) {
        console.error('#root element not found!');
        return;
    }

    root.innerHTML = `
        <div class="main-page-wrapper">
            <div class="main-nav">
                <!-- НОВОЕ: Добавляем первый пункт меню -->
                <a href="#" class="nav-item">
                    <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
                    <span>Лента</span>
                </a>
            </div>
            <div class="chat-area">
                <!-- Контент центральной области с чатом будет здесь -->
            </div>
            <div class="chat-list">
                <!-- Контент правой панели со списком чатов будет здесь -->
            </div>
        </div>
    `;
}

// Главная экспортная функция.
export function initMainPage(userData) {
    console.log('Инициализация главной страницы со структурой из трех блоков...');
    loadStyles();
    render();
    // В будущем мы можем передать userData в render, чтобы наполнить блоки
}