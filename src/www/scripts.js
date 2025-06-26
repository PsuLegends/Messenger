// Находим кнопки и главный контейнер по их ID
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

// Добавляем обработчик события на кнопку "Sign Up"
signUpButton.addEventListener('click', () => {
    // При клике добавляем класс 'right-panel-active' к контейнеру
    container.classList.add("right-panel-active");
});

// Добавляем обработчик события на кнопку "Sign In"
signInButton.addEventListener('click', () => {
    // При клике убираем класс 'right-panel-active'
    container.classList.remove("right-panel-active");
});