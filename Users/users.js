document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the username from localStorage
    const username = localStorage.getItem('username');

    if (username) {
        const greetingElement = document.getElementById('greeting');
        greetingElement.textContent = `Hi ${username}`;
    } else {
        // Handle case where username is not found in localStorage
        console.error("Username not found in localStorage. Redirecting to login page.");
        // Optionally, redirect to login page if no user is logged in
        window.location.href = "index.html";
    }

});
