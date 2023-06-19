document.getElementById('broadcastForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    let broadcasts = [];

    if (document.getElementById('event1').checked) {
        broadcasts.push('event1');
    }
    if (document.getElementById('event2').checked) {
        broadcasts.push('event2');
    }
    // Add additional checks for more events as needed.

    loggedInUser.broadcasts = broadcasts;

    let users = JSON.parse(localStorage.getItem('users'));
    let userIndex = users.findIndex(user => user.username === loggedInUser.username);
    users[userIndex] = loggedInUser;

    localStorage.setItem('users', JSON.stringify(users));

    alert('Selection saved successfully!');
});
