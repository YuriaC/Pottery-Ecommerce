const BASE_URL = `http://localhost:5500`;

// Check if user is logged in
const token = window.localStorage.getItem('token');
fetch(`${BASE_URL}/user/verifyToken`, {
    headers: {
        Authorization: `Bearer ${token}`, // for appending token back into the request header
    },
    credentials: 'include', // for sending token through the cookie
    }).then((res) => {
    if (res.ok) {
        window.location.href = '/view/index.html';
    }
});

// const token = window.localStorage.getItem('token');
// console.log(token) // debug
// fetch(`${BASE_URL}/user/verifyToken`, {
//     headers: {
//         Authorization: `Bearer ${token}`,
//     },
//     credentials: 'include',
// }).then((res) => {
//     console.log('Response status:', res.status); // Log response status
//     const contentType = res.headers.get('content-type');
//     console.log('Content-Type:', contentType); // Debug: Check the content type
    
//     if (contentType && contentType.includes('application/json')) {
//         return res.json();
//     } else {
//         throw new Error('Response is not JSON. It might be an error page.');
//     }
// }).then((data) => {
//     if (data && data.username) {
//         window.location.href = '/view/index.html';
//     } else {
//         console.error('Unexpected response data:', data);
//     }
// }).catch((err) => {
//     console.error('Fetch error:', err);
// });


// Select needed DOM elements
const form = document.getElementById('login-form');
const credentialInput = document.getElementById('credential');
const passwordInput = document.getElementById('password');

const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing
    const credential = credentialInput.value;
    const password = passwordInput.value;

    try {
        const response = await fetch(`${BASE_URL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                credential,
                password,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const result = await response.json();
        window.localStorage.setItem('token', result.data);  // Store the token after login
        // window.location.href = '/view/index.html'; // Redirect to the home page

    } catch (error) {
        console.error('Login Error:', error.message);
        alert(error.message); // Display the error message from the backend
    }
};

// Attach the event listener after ensuring the DOM is fully loaded
form.addEventListener('submit', handleSubmit);
