document.getElementById('viewInteractions').addEventListener('click', function(event) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    console.log(users); // This will log the users data in the browser console.
    // In a real application, you'd display this data in a more user-friendly way.
});

document.getElementById('resetPasswords').addEventListener('click', function(event) {
    let users = JSON.parse(localStorage.getItem('users')) || [];

    users.forEach(user => {
        user.password = 'password'; // Reset all passwords to 'password'.
    });

    localStorage.setItem('users', JSON.stringify(users));

    alert('All passwords reset successfully!');
});
