document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let email = document.getElementById('email').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    let existingUser = users.find(user => user.username === username);
    if (existingUser) {
        alert('Username already exists. Choose a different one.');
        return;
    }

    let user = { username, password, email, broadcasts: [] };
    users.push(user);

    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful!');
    window.location.href = 'login.html';
});
