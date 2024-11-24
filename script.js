// Helper Function: Redirect to a page
function redirectTo(page) {
    window.location.href = page;
}

// Save user details to sessionStorage
function saveUserDetails() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contact').value;

    if (name && email && contact) {
        sessionStorage.setItem('userDetails', JSON.stringify({ name, email, contact }));
        redirectTo('movie-selection.html');
    } else {
        alert('Please fill in all the fields.');
    }
}

// Save movie selection to sessionStorage
function saveMovieSelection() {
    const movie = document.getElementById('movie-list').value;

    if (movie !== "0") {
        const movies = {
            movie1: { name: 'Avengers', startTime: '3:00 PM', endTime: '5:30 PM' },
            movie2: { name: 'Titanic', startTime: '6:00 PM', endTime: '8:45 PM' },
            movie3: { name: 'Inception', startTime: '9:00 PM', endTime: '11:30 PM' }
        };

        sessionStorage.setItem('selectedMovie', JSON.stringify(movies[movie]));
        redirectTo('seat-selection.html');
    } else {
        alert('Please select a movie.');
    }
}

// Generate seats dynamically
function generateSeats() {
    const seatsContainer = document.getElementById('seats-container');
    const selectedSeats = [];

    for (let i = 1; i <= 200; i++) {
        const seat = document.createElement('div');
        seat.className = 'seat available';
        seat.innerText = i;
        seat.addEventListener('click', () => {
            if (!seat.classList.contains('booked')) {
                seat.classList.toggle('selected');
                if (selectedSeats.includes(i)) {
                    selectedSeats.splice(selectedSeats.indexOf(i), 1);
                } else {
                    selectedSeats.push(i);
                }
            }
        });
        seatsContainer.appendChild(seat);
    }

    document.getElementById('proceed-payment').addEventListener('click', () => {
        if (selectedSeats.length > 0) {
            sessionStorage.setItem('bookedSeats', JSON.stringify(selectedSeats));
            redirectTo('payment.html');
        } else {
            alert('Please select at least one seat.');
        }
    });
}

// Display booking summary on the payment page
function displayBookingSummary() {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    const movie = JSON.parse(sessionStorage.getItem('selectedMovie'));
    const seats = JSON.parse(sessionStorage.getItem('bookedSeats'));
    const seatPrice = 500;

    if (userDetails && movie && seats) {
        document.getElementById('summary').innerHTML = `
            <p>Name: ${userDetails.name}</p>
            <p>Email: ${userDetails.email}</p>
            <p>Movie: ${movie.name} (${movie.startTime} - ${movie.endTime})</p>
            <p>Seats: ${seats.join(', ')}</p>
            <p>Total Price: Ksh ${seats.length * seatPrice}</p>
        `;
        document.getElementById('pay-now').addEventListener('click', () => {
            redirectTo('confirmation.html');
        });
    } else {
        alert('Error retrieving booking details. Please try again.');
        redirectTo('index.html');
    }
}

// Initialize functions for specific pages
function initializePage() {
    const page = document.body.getAttribute('data-page');
    if (page === 'login') {
        document.getElementById('save-user-details').addEventListener('click', saveUserDetails);
    } else if (page === 'movie-selection') {
        document.getElementById('next').addEventListener('click', saveMovieSelection);
    } else if (page === 'seat-selection') {
        generateSeats();
    } else if (page === 'payment') {
        displayBookingSummary();
    }
}
// Generate seats dynamically
function generateSeats() {
    const seatsContainer = document.getElementById('seats-container');
    seatsContainer.innerHTML = ''; // Clear any previous seats
    const selectedSeats = [];

    // Generate seats in rows and columns
    for (let i = 1; i <= 200; i++) {
        const seat = document.createElement('div');
        seat.className = 'seat available';
        seat.innerText = i;
        seat.addEventListener('click', () => {
            if (!seat.classList.contains('booked')) {
                seat.classList.toggle('selected');
                if (selectedSeats.includes(i)) {
                    selectedSeats.splice(selectedSeats.indexOf(i), 1);
                } else {
                    selectedSeats.push(i);
                }
            }
        });
        seatsContainer.appendChild(seat);
    }

    // Add Proceed Button Logic
    document.getElementById('proceed-payment').addEventListener('click', () => {
        if (selectedSeats.length > 0) {
            sessionStorage.setItem('bookedSeats', JSON.stringify(selectedSeats));
            redirectTo('payment.html');
        } else {
            alert('Please select at least one seat.');
        }
    });
}


// Run the initializer when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializePage);
