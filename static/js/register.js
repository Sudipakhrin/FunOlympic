document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let email = document.getElementById('email').value;

    let user = {
        username: username,
        password: password,
        email: email
    };

    localStorage.setItem('user', JSON.stringify(user));

    alert("User registered successfully");
});
