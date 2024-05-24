document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.querySelector('.sign-up-container form');
    const loginForm = document.querySelector('.login-container form');

    const handleSubmit = (form, endpoint, callback) => event => {
        event.preventDefault();
        const formData = new FormData(form);
        const formValues = Object.fromEntries(formData.entries());

        fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formValues)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }
            return response.text();
        })
        .then(callback)
        .catch(error => {
            console.error('Erreur lors de la requête :', error);
        });
    };

    const handleRegisterResponse = message => {
        alert(message);
        registerForm.reset();
    };

    const handleLoginResponse = message => {
        alert(message);
        loginForm.reset();
    };

    registerForm.addEventListener('submit', handleSubmit(registerForm, '/register', handleRegisterResponse));
    loginForm.addEventListener('submit', handleSubmit(loginForm, '/login', handleLoginResponse));
});
