document.addEventListener("DOMContentLoaded", function () {
    // Handle Admin Login
    const loginForm = document.getElementById('admin-login');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the default form submission

            // Get input values
            const adminName = document.getElementById('admin-name').value;
            const staffNo = document.getElementById('staff-no').value;
            const adminContact = document.getElementById('admin-contact').value;

            // Store details in sessionStorage (for simplicity, you can replace with actual authentication)
            sessionStorage.setItem('adminName', adminName);
            sessionStorage.setItem('staffNo', staffNo);
            sessionStorage.setItem('adminContact', adminContact);

            // Redirect to the manage bookings page
            window.location.href = 'manage-bookings.html';
        });
    }

    // Check if the admin is logged in when managing bookings
    if (window.location.pathname.includes("manage-bookings.html")) {
        if (!sessionStorage.getItem('adminName')) {
            window.location.href = 'login.html'; // Redirect to login page if not logged in
        }

        // Admin Logout
        const logoutButton = document.getElementById('logout');
        if (logoutButton) {
            logoutButton.addEventListener('click', function () {
                sessionStorage.clear();
                window.location.href = 'login.html'; // Redirect to login page
            });
        }

        // View Bookings
        const viewBookingsButton = document.getElementById('view-bookings');
        if (viewBookingsButton) {
            viewBookingsButton.addEventListener('click', function () {
                document.getElementById('loading-spinner').classList.remove('hidden');
                document.getElementById('booking-list').classList.add('hidden');

                // Simulate loading bookings with a timeout
                setTimeout(function () {
                    // Simulate booking data (replace this with actual data fetch)
                    const bookings = [
                        { seat: 'A1', movie: 'Avengers', user: 'John Doe', contact: '123-456-7890', email: 'john@example.com' },
                        { seat: 'B2', movie: 'Titanic', user: 'Jane Smith', contact: '987-654-3210', email: 'jane@example.com' }
                    ];

                    // Render the bookings to the table
                    const tbody = document.querySelector('#booking-list tbody');
                    tbody.innerHTML = ''; // Clear existing rows

                    bookings.forEach(function (booking) {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${booking.seat}</td>
                            <td>${booking.movie}</td>
                            <td>${booking.user}</td>
                            <td>${booking.contact}</td>
                            <td>${booking.email}</td>
                            <td><button class="btn">Cancel</button></td>
                        `;
                        tbody.appendChild(row);
                    });

                    document.getElementById('loading-spinner').classList.add('hidden');
                    document.getElementById('booking-list').classList.remove('hidden');
                }, 2000); // Simulate 2 seconds delay
            });
        }

        // Reset Bookings
        const resetBookingsButton = document.getElementById('reset-bookings');
        if (resetBookingsButton) {
            resetBookingsButton.addEventListener('click', function () {
                const confirmReset = confirm("Are you sure you want to reset all bookings?");
                if (confirmReset) {
                    // Reset bookings logic (e.g., clear database or session)
                    alert('All bookings have been reset.');
                }
            });
        }
    }
});
document.addEventListener("DOMContentLoaded", function () {
    // Handle Admin Login
    const loginForm = document.getElementById('login-form');
    const adminDashboard = document.getElementById('admin-dashboard');
    const adminLogin = document.getElementById('admin-login');

    // Check if admin is logged in by looking for sessionStorage data
    if (sessionStorage.getItem('adminName')) {
        // If logged in, show the dashboard
        adminLogin.style.display = 'none';  // Hide login form
        adminDashboard.style.display = 'block';  // Show admin dashboard
        document.getElementById('admin-name-display').textContent = sessionStorage.getItem('adminName');
    } else {
        // If not logged in, show the login form
        adminLogin.style.display = 'block';
        adminDashboard.style.display = 'none';
    }

    // Login form submit handler
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the default form submission

            // Get input values
            const adminName = document.getElementById('admin-name').value;
            const staffNo = document.getElementById('staff-no').value;
            const adminContact = document.getElementById('admin-contact').value;

            // Store details in sessionStorage
            sessionStorage.setItem('adminName', adminName);
            sessionStorage.setItem('staffNo', staffNo);
            sessionStorage.setItem('adminContact', adminContact);

            // Redirect to manage bookings page
            window.location.href = 'manage-bookings.html';
        });
    }

    // Handle Logout functionality
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            sessionStorage.clear();
            window.location.href = 'admin.html'; // Redirect to admin login page
        });
    }

    // Button to navigate to the bookings page
    const viewBookingsButton = document.getElementById('view-bookings');
    if (viewBookingsButton) {
        viewBookingsButton.addEventListener('click', function () {
            window.location.href = 'manage-bookings.html'; // Redirect to manage bookings page
        });
    }
});
