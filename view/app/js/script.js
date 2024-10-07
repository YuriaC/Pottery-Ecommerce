const BASE_URL = 'http://localhost:5500';

// select necessary elements
const btnContainer = document.getElementById('btn-container');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const logoutBtn = document.getElementById('logout-btn');
const greeting = document.getElementById('greeting');
// const warning = document.getElementById('warning');
const container = document.getElementById('product-display');

// display products
fetchProducts();

async function fetchProducts(page = 1, limit = 9) {
    try {
        const response = await fetch(`${BASE_URL}/product/?page=${page}&limit=${limit}`);
        if (!response.ok) {
            throw new Error('Failed to fetch paginated data');
        }

        const data = await response.json();
        console.log('data fetched!')
        displayProducts(data.results);
        displayPaginationButtons(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayProducts(products) {
    container.innerHTML = ''; // Clear any previous products
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <a href="#">
                <img 
                    src = ${product.img}
                    alt = ${product.imgDescription}
                />
            </a>
            <p>${product.name}</p>
        `;
        container.appendChild(productElement);
    });
}

function displayPaginationButtons(data) {
    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer.innerHTML = ''; // Clear previous buttons

    // Previous Page Button
    if (data.previous) {
        const prevButton = document.createElement('button');
        prevButton.innerText = 'Previous';
        prevButton.addEventListener('click', () => {
            fetchPaginatedData(data.previous.page, data.previous.limit);
        });
        paginationContainer.appendChild(prevButton);
    }

    // Next Page Button
    if (data.next) {
        const nextButton = document.createElement('button');
        nextButton.innerText = 'Next';
        nextButton.addEventListener('click', () => {
            fetchPaginatedData(data.next.page, data.next.limit);
        });
        paginationContainer.appendChild(nextButton);
    }
}

// check if user is logged in
const token = window.localStorage.getItem('token');
fetch(`${BASE_URL}/user/verifyToken`, {
    headers: {
        // for appending token in the request header
        Authorization: `Bearer ${token}`,
    },
    // for sending token through the cookie
    credentials: 'include',
})
    .then((res) => {
        if (!res.ok) {
            throw new Error('Error Verifying Token');
        }
        return res.json();
    })
    .then(
        ({ username }) => {
            // hide login/signup buttons
            loginBtn.style.display = 'none';
            signupBtn.style.display = 'none';
            warning.style.display = 'none';

            // display needed content
            greeting.innerText = `Hello ${username}`;
            logoutBtn.style.display = 'inline';

            // getTodos();
        }, 
        () => {
      // show login/signup buttons
            loginBtn.style.display = 'inline';
            signupBtn.style.display = 'inline';
            // warning.style.display = 'block';

            // hide un-wanted content
            // greeting.innerText = '';
            logoutBtn.style.display = 'none';
        },
    );

const logoutHandler = () => {
    fetch(`${BASE_URL}/user/logout`)
        .then((res) => {
            if (!res.ok) {
                alert('Error Logging Out');
                return;
            }
            return res.json();
        })
        .then((data) => {
            console.log(data);
            // after logging out, remove token and username from localStorage
            window.localStorage.removeItem('token');
        })
        .then(() => window.location.reload()) // refresh the page to reflect the page changes
        .catch((err) => {
            alert(err.message);
        });
};
logoutBtn.addEventListener('click', logoutHandler);


// Call the function to fetch the first page initially

