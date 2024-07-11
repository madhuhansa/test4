document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the username from localStorage
    const username = localStorage.getItem('username');

    if (username) {
        document.getElementById('username').textContent = username;

        // Set the profile image based on the username
        const profileImage = document.getElementById('profile-image');
        profileImage.src = `imgs/${username}.jpg`;
        profileImage.alt = `${username}'s Profile Photo`;

        // Fetch data from data.json
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                // Extract user posts
                const userPosts = data.feed.filter(post => post.user === username);
                const totalPosts = userPosts.length;
                
                // Extract total likes for the user
                const userLikesData = data["Total-likes"].find(userLike => userLike.username === username);
                const totalLikes = userLikesData ? parseInt(userLikesData.totle, 10) : 0;
                
                // Update stats
                document.getElementById('total-posts').textContent = `${totalPosts}`;
                document.getElementById('total-likes').textContent = `${totalLikes}`;
                
                // Display user posts
                const postsContainer = document.getElementById('posts-container');
                userPosts.forEach(post => {
                    const postElement = document.createElement('div');
                    postElement.classList.add('post');
                    postElement.innerHTML = `
                        <p><strong>${post.user}</strong></p>
                        <p>${post.content}</p>
                        <button class="like-button" data-post-id="${post.id}">
                            <p class="likes">Likes: ${post.like}</p>
                        </button>
                    `;
                    postsContainer.appendChild(postElement);
                });

                // Add event listener to like buttons
                document.querySelectorAll('.like-button').forEach(button => {
                    button.addEventListener('click', function() {
                        const postId = this.getAttribute('data-post-id');
                        handleLikeButtonClick(postId, username, data);
                    });
                });

            })
            .catch(error => console.error('Error fetching the JSON file:', error));
    } else {
        // Handle case where username is not found in localStorage
        console.error("Username not found in localStorage. Redirecting to login page.");
        // Optionally, redirect to login page if no user is logged in
        window.location.href = "index.html";
    }
});

function handleLikeButtonClick(postId, username, data) {
    // Find the post and user in the data
    const post = data.feed.find(p => p.id == postId);
    const userLikeData = data["Total-likes"].find(u => u.username === post.user);

    if (post["liked_users"].includes(username)) {
        // User has already liked the post, so unlike it
        post.like--;
        post["liked_users"] = post["liked_users"].filter(user => user !== username);
        userLikeData.totle--;
    } else {
        // User has not liked the post, so like it
        post.like++;
        post["liked_users"].push(username);
        userLikeData.totle++;
    }

    // Update the total likes and likes in the DOM
    document.querySelector(`[data-post-id="${postId}"] .likes`).textContent = `Likes: ${post.like}`;
    document.getElementById('total-likes').textContent = userLikeData.totle;
}
