document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.querySelector('.sign-up-container form');
    const loginForm = document.querySelector('.login-container form');

    const handleSubmit = (form, endpoint, callback) => event => {
        event.preventDefault();
        const formData = new FormData(form);
        const formValues = Object.fromEntries(formData.entries());
        const xhr = new XMLHttpRequest();
        xhr.open('POST', endpoint);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    callback(xhr.responseText);
                } else {
                    console.error('Erreur lors de la requête :', xhr.status);
                }
            }
        };
        xhr.send(JSON.stringify(formValues));
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
