const BASE_URL = `http://localhost:5500`;

// Check if user is logged in

// const checkToken = async (e) => {
//     const token = window.localStorage.getItem('token');
//     try {
//         const response = await fetch(`${BASE_URL}/user/verifyToken`, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//             credentials: 'include',
//         })
//         if (!response.ok) {
//             const errorData = await response.json(); // Get error details from response
//             window.localStorage.removeItem(token);  // danger?
//             throw new Error(errorData.message); // Throw an error with the backend message
//         }

//         const result = await response.json();
//         window.location.href = '/';
//     } catch (error) {
//         console.error('Authentication Error:', error.message);
//         alert(error.message); // Display the error message from the backend
//     }
// };

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
        window.location.href = '/view/index.html'; // Redirect to the home page

    } catch (error) {
        console.error('Login Error:', error.message);
        alert(error.message); // Display the error message from the backend
    }
};

// Attach the event listener after ensuring the DOM is fully loaded
form.addEventListener('submit', handleSubmit);
