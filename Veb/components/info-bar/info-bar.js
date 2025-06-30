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