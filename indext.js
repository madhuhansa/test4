document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    // Get user input
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Fetch the JSON file and validate credentials
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const users = data.users;
            let validUser = false;

            // Check if the username and password match any user in the JSON data
            for (let user of users) {
                if (user.username === username && user.password === password) {
                    validUser = true;
                    break;
                }
            }

            if (validUser) {
                localStorage.setItem('username', username);
                // Redirect to the Home page
                window.location.href = "Home.html"; 
            } else {
                alert("Invalid username or password. Please try again.");
            }
        })
        .catch(error => {
            console.error('Error fetching the JSON file:', error);
        });
});
