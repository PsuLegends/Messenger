// components/auth/auth.js (Версия с логикой сбора данных и переходом на главную страницу)

import { initMainPage } from '../main-page/main-page.js';

// Функция для динамической загрузки стилей этого компонента
function loadStyles() {
    if (document.getElementById('auth-styles')) return;
    const link = document.createElement('link');
    link.id = 'auth-styles';
    link.rel = 'stylesheet';
    link.href = 'components/auth/auth.css';
    document.head.appendChild(link);
}

// Функция для "отрисовки" HTML-кода формы внутрь элемента #root
function render() {
    const root = document.getElementById('root');
    if (!root) {
        console.error('#root element not found!');
        return;
    }

    // Вся HTML-структура формы. Она будет вставлена в #root.
    root.innerHTML = `
        <div class="auth-component-wrapper">
            <div class="container" id="auth-main-container">
                <!-- Форма регистрации -->
                <div class="form-container sign-up-container">
                    <form action="#" id="sign-up-form">
                        <h1>Create Account</h1>
                        <div class="social-container">
                            <a href="#" class="social"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04C6.5 2.04 2 6.53 2 12s4.5 9.96 10 9.96c5.5 0 10-4.46 10-9.96S17.5 2.04 12 2.04zm2.23 12.35h-1.63v5.9h-2.33v-5.9H9.1v-2.02h1.17v-1.3c0-1 .56-2.58 2.58-2.58h1.8v2.02h-1.09c-.31 0-.75.16-.75.82v1.04h1.88l-.25 2.02z"/></svg></a>
                            <a href="#" class="social"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M21.35 11.1h-9.17v2.73h5.21c-.45 2.73-2.96 4.55-5.21 4.55-3.18 0-5.77-2.59-5.77-5.77s2.59-5.77 5.77-5.77c1.73 0 2.86.73 3.55 1.36l2.18-2.18C16.91 4.23 14.64 3 12.18 3 7.82 3 4.27 6.55 4.27 10.91s3.55 7.91 7.91 7.91c4.55 0 7.64-3.18 7.64-7.64 0-.55-.05-1.09-.15-1.58z"/></svg></a>
                            <a href="#" class="social"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M13.162 18.994c.609 0 .858-.407.858-.937v-4.04h1.732c.56 0 .749-.292.885-.987l.255-1.428c.15-.84-.183-1.185-1.04-1.185h-1.83v-2.146c0-.58.216-.87.648-.87h1.22c.577 0 .826-.33.826-.937V4.92c0-.608-.25-1.026-.826-1.026h-1.748c-1.336 0-2.288.523-2.81 1.57-.45.89-.69 2.15-.69 3.79v1.5H9.42c-.56 0-.81.33-.81.936v1.428c0 .608.25.937.81.937h1.008v4.04c0 .53.25.937.858.937h.876z"/></svg></a>
                        </div>
                        <span>or use your email for registration</span>
                        <input type="text" name="name" placeholder="Name" required />
                        <input type="email" name="email" placeholder="Email" required />
                        <input type="password" name="password" placeholder="Password" required />
                        <button type="submit">Sign Up</button>
                    </form>
                </div>

                <!-- Форма входа -->
                <div class="form-container sign-in-container">
                    <form action="#" id="sign-in-form">
                        <h1>Sign In</h1>
                        <div class="social-container">
                             <a href="#" class="social"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04C6.5 2.04 2 6.53 2 12s4.5 9.96 10 9.96c5.5 0 10-4.46 10-9.96S17.5 2.04 12 2.04zm2.23 12.35h-1.63v5.9h-2.33v-5.9H9.1v-2.02h1.17v-1.3c0-1 .56-2.58 2.58-2.58h1.8v2.02h-1.09c-.31 0-.75.16-.75.82v1.04h1.88l-.25 2.02z"/></svg></a>
                            <a href="#" class="social"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M21.35 11.1h-9.17v2.73h5.21c-.45 2.73-2.96 4.55-5.21 4.55-3.18 0-5.77-2.59-5.77-5.77s2.59-5.77 5.77-5.77c1.73 0 2.86.73 3.55 1.36l2.18-2.18C16.91 4.23 14.64 3 12.18 3 7.82 3 4.27 6.55 4.27 10.91s3.55 7.91 7.91 7.91c4.55 0 7.64-3.18 7.64-7.64 0-.55-.05-1.09-.15-1.58z"/></svg></a>
                            <a href="#" class="social"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M13.162 18.994c.609 0 .858-.407.858-.937v-4.04h1.732c.56 0 .749-.292.885-.987l.255-1.428c.15-.84-.183-1.185-1.04-1.185h-1.83v-2.146c0-.58.216-.87.648-.87h1.22c.577 0 .826-.33.826-.937V4.92c0-.608-.25-1.026-.826-1.026h-1.748c-1.336 0-2.288.523-2.81 1.57-.45.89-.69 2.15-.69 3.79v1.5H9.42c-.56 0-.81.33-.81.936v1.428c0 .608.25.937.81.937h1.008v4.04c0 .53.25.937.858.937h.876z"/></svg></a>
                        </div>
                        <span>or use your account</span>
                        <input type="email" name="email" placeholder="Email" required />
                        <input type="password" name="password" placeholder="Password" required />
                        <a href="#">forgot your password?</a>
                        <button type="submit">Sign In</button>
                    </form>
                </div>

                <!-- Декоративная панель (Overlay) -->
                <div class="overlay-container">
                    <div class="overlay">
                        <div class="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button class="ghost" id="auth-signIn-btn">Sign in</button>
                        </div>
                        <div class="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start your journey with us</p>
                            <button class="ghost" id="auth-signUp-btn">Sign up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Функция для добавления обработчиков событий
function addEventListeners() {
    const root = document.getElementById('root');
    const container = root.querySelector('#auth-main-container');
    const signUpButton = root.querySelector('#auth-signUp-btn');
    const signInButton = root.querySelector('#auth-signIn-btn');
    const signInForm = root.querySelector('#sign-in-form');
    const signUpForm = root.querySelector('#sign-up-form');

    if (!container || !signUpButton || !signInButton || !signInForm || !signUpForm) {
        console.error("Не удалось найти управляющие элементы или формы внутри компонента аутентификации.");
        return;
    }

    // Этот блок для анимации переключения панелей
    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });
    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });
    
    // 1. Обработчик для формы ВХОДА
    signInForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        
        const formData = new FormData(signInForm);
        const data = Object.fromEntries(formData.entries());

        console.log("--- Данные для ВХОДА (JSON) ---");
        console.log(JSON.stringify(data, null, 2));
        
        // ==============================================================================
        // ВОТ ЭТА СТРОКА-ЗАТЫЧКА, КОТОРАЯ ИМИТИРУЕТ ПЕРЕХОД НА ГЛАВНУЮ СТРАНИЦУ
        initMainPage(data);
        // ==============================================================================
    });

    // 2. Обработчик для формы РЕГИСТРАЦИИ
    signUpForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const formData = new FormData(signUpForm);
        const data = Object.fromEntries(formData.entries());

        console.log("--- Данные для РЕГИСТРАЦИИ (JSON) ---");
        console.log(JSON.stringify(data, null, 2));
        
        // ==============================================================================
        // ЗДЕСЬ НАХОДИТСЯ ВТОРАЯ ТАКАЯ ЖЕ ЗАТЫЧКА ДЛЯ ФОРМЫ РЕГИСТРАЦИИ
        initMainPage(data);
        // ==============================================================================
    });
}


// Главная экспортная функция, которую вызывает main.js
export function initAuthForm() {
    loadStyles();
    render();
    addEventListeners();
}