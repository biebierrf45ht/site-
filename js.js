document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.querySelector('.sign-up-container form');
    const loginForm = document.querySelector('.login-container form');
    const usernameInput = registerForm.querySelector('input[name="username"]');
    const emailInputRegister = registerForm.querySelector('input[name="email"]');
    const passwordInputRegister = registerForm.querySelector('input[name="password"]');
    const emailInputLogin = loginForm.querySelector('input[name="email"]');
    const passwordInputLogin = loginForm.querySelector('input[name="password"]');

    const handleSubmit = (form, callback) => event => {
        event.preventDefault();
        const formData = new FormData(form);
        const formValues = Object.fromEntries(formData.entries());
        callback(formValues);
    };

    const handleResponse = message => {
        alert(message);
        registerForm.reset();
        loginForm.reset();
    };

    registerForm.addEventListener('submit', handleSubmit(registerForm, data => {
        fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then(handleResponse);
    }));

    loginForm.addEventListener('submit', handleSubmit(loginForm, data => {
        fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then(handleResponse);
    }));
});
