const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

document.addEventListener('DOMContentLoaded', function() {
    const loginFormBtn = document.getElementById('login-btn');
    const registerFormBtn = document.getElementById('register-btn');

    loginFormBtn.addEventListener('click', function() {
        window.location.href = '/loginRegister';
    });

    registerFormBtn.addEventListener('click', function() {
        window.location.href = '/loginRegister';
    });
});