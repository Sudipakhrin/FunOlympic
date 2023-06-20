document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    let user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        alert('Invalid username or password.');
        return;
    }

    localStorage.setItem('loggedInUser', JSON.stringify(user));

    alert('Login successful!');
    window.location.href = 'select-broadcasts.html';
});
