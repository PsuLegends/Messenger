// auth/script.js

// Код для анимации переключения панелей (остается без изменений)
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
signUpButton.addEventListener('click', () => { container.classList.add("right-panel-active"); });
signInButton.addEventListener('click', () => { container.classList.remove("right-panel-active"); });

// Находим формы
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');

// АДРЕС ВАШЕГО WEBSOCKET-СЕРВЕРА (его должен дать напарник)
// Формат: ws://<адрес>:<порт>
// Например: 'ws://localhost:9002'
const WEBSOCKET_URL = 'http://25.46.84.110:9001'; // <-- ЗАМЕНИ НА ВАШ АДРЕС

// --- Наша функция для анимации и перехода (вызывается только при успехе) ---
function animateAndRedirect() {
    container.classList.add('disappearing');
    setTimeout(() => {
        window.location.href = '../main/index.html';
    }, 500);
}

// --- ОБЩАЯ ФУНКЦИЯ для отправки данных через WebSocket ---
function sendDataViaWebSocket(dataToSend) {
    console.log("Попытка подключения к WebSocket:", WEBSOCKET_URL);
    
    // 1. Создаем новое WebSocket-соединение
    const socket = new WebSocket(WEBSOCKET_URL);

    // 2. Сработает, когда соединение будет успешно установлено
    socket.onopen = function() {
        console.log("Соединение установлено! Отправка данных...");
        // Отправляем наши данные в виде JSON-строки
        socket.send(JSON.stringify(dataToSend));
    };

    // 3. Сработает, когда от сервера придет ответ
    socket.onmessage = function(event) {
        console.log("Получен ответ от сервера:", event.data);
        
        try {
            const serverResponse = JSON.parse(event.data);

            if (serverResponse.success) {
                // УСПЕХ!
                console.log("Сервер подтвердил успех. Запускаем анимацию.");
                animateAndRedirect();
            } else {
                // НЕУДАЧА!
                console.error("Сервер вернул ошибку:", serverResponse.message);
                alert("Ошибка: " + serverResponse.message);
            }
        } catch (e) {
            console.error("Не удалось разобрать ответ сервера (не JSON):", event.data);
            alert("Произошла ошибка при обработке ответа сервера.");
        }
        
        // Закрываем соединение, т.к. задача выполнена
        socket.close();
    };

    // 4. Сработает, если произошла ошибка при подключении
    socket.onerror = function(error) {
        console.error("Ошибка WebSocket:", error);
        alert("Не удалось подключиться к серверу. Убедитесь, что сервер запущен.");
    };

    // 5. Информационное сообщение о закрытии соединения
    socket.onclose = function() {
        console.log("Соединение WebSocket закрыто.");
    };
}


// --- Обработка формы РЕГИСТРАЦИИ ---
if (registerForm) {
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const dataToSend = { action: 'register', name, email, password };

        // Вызываем нашу общую функцию для отправки
        sendDataViaWebSocket(dataToSend);
    });
}

// --- Обработка формы ВХОДА ---
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const dataToSend = { action: 'login', email, password };

        // Вызываем нашу общую функцию для отправки
        sendDataViaWebSocket(dataToSend);
    });
}