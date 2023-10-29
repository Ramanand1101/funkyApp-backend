

// const url = "http://localhost:3000"
const url = "https://backend-funky.onrender.com"

localStorage.getItem("token") || []


/* toogle code given here */
function toggleForm(formId) {
    const forms = document.querySelectorAll('.form-page');
    forms.forEach(form => {
        if (form.id === formId) {
            form.classList.add('active');
        } else {
            form.classList.remove('active');
        }
    });
}

document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const role = document.getElementById('role').value || 'customer';

    // Check if all required fields are provided
    if (!email || !username || !password) {
        Swal.fire({
            title: 'Error!',
            text: 'Please provide all the fields',
            icon: 'error'
        });
        return;
    }

    // Prepare the request body
    const formData = {
        username: username,
        email: email,
        password: password,
        role: role
    };

    try {
        // Check for duplicate email and username

        const duplicateCheckResponse = await fetch(`${url}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const duplicateCheckData = await duplicateCheckResponse.json();

        if (duplicateCheckResponse.ok) {
            if (duplicateCheckData.message) {
                // Duplicate email or username found
                Swal.fire({
                    title: 'Error!',
                    text: 'This Email or Username is already taken.',
                    icon: 'error'
                });
            } else {
                // No duplicates found, registration successful
                Swal.fire({
                    title: 'Success!',
                    text: 'User has been registered successfully!',
                    icon: 'success'
                });
            }
        } else {
            // Registration failed
            Swal.fire({
                title: 'Error!',
                text: duplicateCheckData.error || 'An error occurred while processing your request.',
                icon: 'error'
            });
        }
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            title: 'Error!',
            text: 'An error occurred while processing your request.',
            icon: 'error'
        });
    }
});

/* --------------------------------------------------- Login Functionality done here ------------------------------------------- */

document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from submitting in the traditional way
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const role = document.getElementById('role').value || 'customer';
    localStorage.getItem("token") || []
    try {
        const response = await fetch(`${url}/user/login`, { // Corrected URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })

        });

        const data = await response.json();
        if (response.ok) {
            // Login successful          
            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: data.msg,
                showConfirmButton: false,
                timer: 1500 // Automatically close the alert after 1.5 seconds

            })
            console.log(email)
            console.log(role)
            if(role=="admin"){
                window.location.href="./admin.html";
            }
            else if(role=="customer") {
                window.location.href="./index.html"
            }
            localStorage.setItem("username", email || username1);
            // Store tokens in cookies
            localStorage.setItem("token", (data.accessToken));
            document.cookie = `access_token=${data.accessToken}; max-age=${15 * 60}`;
            document.cookie = `refresh_token=${data.refreshToken}; max-age=${30 * 24 * 60 * 60}`;


            // Check user role and redirect accordingly

        } else {
            // Login failed
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: data.msg
            });
        }
    } catch (error) {
        console.error('Error during login:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while processing your request. Please try again later.'
        });
    }
});




/* ----------------------------------------------- LogOut functionality done here ------------------------------------- */



// Call the function to handle the token


const googleLoginButton = document.getElementById('google');

googleLoginButton.addEventListener('click', function () {
    // Redirect to the Google OAuth login endpoint on the server
    window.location.href = 'http://localhost:3000/oauth/auth/google';
});

