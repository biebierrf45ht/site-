document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.querySelector('.sign-up-container form');
    const loginForm = document.querySelector('.login-container form');

    const usernameInputRegister = registerForm.querySelector('input[name="username"]');
    const emailInputRegister = registerForm.querySelector('input[name="email"]');
    const passwordInputRegister = registerForm.querySelector('input[name="password"]');
    const emailInputLogin = loginForm.querySelector('input[name="email"]');
    const passwordInputLogin = loginForm.querySelector('input[name="password"]');

    const handleSubmit = (form, endpoint, callback) => event => {
        event.preventDefault();
        const formData = new FormData(form);
        const formValues = Object.fromEntries(formData.entries());
        const endpoint = '/register'; // Or '/login' depending

        })
        .then(response => response.text())
        .then(callback)
        .catch(error => console.error('Erreur lors de la requête :', error));
    };

    const handleRegisterResponse = message => {
        alert(message);
        registerForm.reset();
    };

    const handleLoginResponse = message => {
        alert(message);
        loginForm.reset();
    };

    registerForm.addEventListener('submit', handleSubmit(registerForm, 'https://biebierrf45ht.github.io/site-/users.json', handleRegisterResponse));
    loginForm.addEventListener('submit', handleSubmit(loginForm, 'https://biebierrf45ht.github.io/site-/users.json', handleLoginResponse));
});
