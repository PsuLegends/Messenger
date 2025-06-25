document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.auth-container');
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');
    
    switchToRegister.addEventListener('click', function() {
        container.style.transform = 'translateX(-50%)';
    });
    
    switchToLogin.addEventListener('click', function() {
        container.style.transform = 'translateX(0)';
    });
});