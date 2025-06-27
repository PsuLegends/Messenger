// Находим кнопку выхода по ее ID
const logoutButton = document.getElementById('logoutButton');

// Проверяем, нашлась ли кнопка
if (logoutButton) {
    // Если да, вешаем на нее "слушателя" кликов
    logoutButton.addEventListener('click', () => {
        console.log('Пользователь нажал "Выйти"');

        // Возвращаем пользователя на страницу входа
        window.location.href = '../auth/index.html';
    });
}