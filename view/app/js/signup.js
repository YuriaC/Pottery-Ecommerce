const BASE_URL = 'http://localhost:5500';

// Check if user is logged in
const token = window.localStorage.getItem('token');
fetch(`${BASE_URL}/user/verifyToken`, {
    headers: {
        // For appending token in the request header
        Authorization: `Bearer ${token}`,
    },
    // For sending token through the cookie
    credentials: 'include',
}).then((res) => {
    if (res.ok) {
        window.location.href = '/view/index.html';
    }
});

// Select needed elements
const form = document.getElementById('signup-form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const rePasswordInput = document.getElementById('rePassword');

const handleSubmit = async (e) => {
    e.preventDefault();
    const userName = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const rePassword = rePasswordInput.value;

    try {
        const response = await fetch(`${BASE_URL}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName,
                email,
                password,
                rePassword,
            }),
        });

        // Check if the response is not OK (e.g., status code 400)
        if (!response.ok) {
            const errorData = await response.json(); // Get error details from response
            throw new Error(errorData.message); // Throw an error with the backend message
        }

        const result = await response.json();
        window.localStorage.setItem('token', result.data);  // Store the token after signup
        window.location.href = '/view/index.html'; // Redirect to the home page

    } catch (error) {
        console.error('Signup Error:', error.message);
        alert(error.message); // Display the error message from the backend
    }
};

form.addEventListener('submit', handleSubmit);
