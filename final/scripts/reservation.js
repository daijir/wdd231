document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.querySelector('.hamburger-button');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('nav a');

    hamburgerButton.addEventListener('click', function() {
        mainNav.classList.toggle('open');
        hamburgerButton.classList.toggle('open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 769) {
                mainNav.classList.remove('open');
                hamburgerButton.classList.remove('open');
            }
        });
    });

    const reservationForm = document.getElementById('reservationForm');
    const nameInput = document.getElementById('name');
    const guestsInput = document.getElementById('guests');
    const dateInput = document.getElementById('date');
    const timeSelect = document.getElementById('time');
    const reservationMessage = document.getElementById('reservationMessage');
    const existingReservationsList = document.getElementById('existingReservationsList');

    const BUSINESS_HOURS = [
        { start: '11:30', end: '15:00' },
        { start: '18:00', end: '21:00' }
    ];

    function generateTimeOptions() {
        timeSelect.innerHTML = '<option value="">Select a time</option>';
        const now = new Date();
        const today = now.toISOString().split('T')[0];

        const existingReservations = JSON.parse(localStorage.getItem('reservations')) || [];

        BUSINESS_HOURS.forEach(period => {
            let [startHour, startMinute] = period.start.split(':').map(Number);
            let [endHour, endMinute] = period.end.split(':').map(Number);

            const currentHour = now.getHours();
            const currentMinute = now.getMinutes();
            const currentTimeInMinutes = currentHour * 60 + currentMinute;

            for (let h = startHour; h <= endHour; h++) {
                let minuteStartForLoop = (h === startHour) ? startMinute : 0;
                if (minuteStartForLoop % 30 !== 0) {
                    minuteStartForLoop = Math.ceil(minuteStartForLoop / 30) * 30;
                }

                for (let m = minuteStartForLoop; m < 60; m += 30) {
                    const optionTotalMinutes = h * 60 + m;
                    const endTotalMinutes = endHour * 60 + endMinute;

                    if (optionTotalMinutes >= endTotalMinutes) {
                        continue;
                    }

                    const hourStr = String(h).padStart(2, '0');
                    const minuteStr = String(m).padStart(2, '0');
                    const timeValue = `${hourStr}:${minuteStr}`;

                    let isOptionDisabled = false;
                    let optionText = timeValue;

                    if (dateInput.value === today) {
                        if (optionTotalMinutes <= currentTimeInMinutes + 29) {
                            isOptionDisabled = true;
                            optionText += ' (Past)';
                        }
                    }

                    const isReserved = existingReservations.some(reservation => {
                        return reservation.date === dateInput.value && reservation.time === timeValue;
                    });

                    if (isReserved) {
                        isOptionDisabled = true;
                        optionText += ' (Already Reserved)';
                    }

                    const option = document.createElement('option');
                    option.value = timeValue;
                    option.textContent = optionText;
                    option.disabled = isOptionDisabled;

                    timeSelect.appendChild(option);
                }
            }
        });
    }

    dateInput.addEventListener('change', () => {
        reservationMessage.textContent = '';
        reservationMessage.style.color = 'red';
        generateTimeOptions();
    });

    function displayExistingReservations() {
        const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
        existingReservationsList.innerHTML = '';

        if (reservations.length === 0) {
            existingReservationsList.innerHTML = '<p>No existing reservations to display.</p>';
            return;
        }

        const ul = document.createElement('ul');
        reservations.forEach(reservation => {
            const li = document.createElement('li');
            li.textContent = `Name: ${reservation.name}, Guests: ${reservation.guests}, Date: ${reservation.date}, Time: ${reservation.time}`;
            ul.appendChild(li);
        });
        existingReservationsList.appendChild(ul);
    }

    reservationForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = nameInput.value.trim();
        const guests = guestsInput.value;
        const date = dateInput.value;
        const time = timeSelect.value;

        if (!name || !guests || !date || !time) {
            reservationMessage.textContent = 'Please fill in all fields.';
            reservationMessage.style.color = 'red';
            return;
        }

        const existingReservations = JSON.parse(localStorage.getItem('reservations')) || [];
        const isDuplicate = existingReservations.some(reservation => {
            return reservation.date === date && reservation.time === time;
        });

        if (isDuplicate) {
            reservationMessage.textContent = `Sorry, ${date} at ${time} is already booked. Please select a different date or time.`;
            reservationMessage.style.color = 'red';
            return;
        }

        const [selectedHour, selectedMinute] = time.split(':').map(Number);
        let isValidTime = false;
        BUSINESS_HOURS.forEach(period => {
            const [startHour, startMinute] = period.start.split(':').map(Number);
            const [endHour, endMinute] = period.end.split(':').map(Number);

            const selectedTotalMinutes = selectedHour * 60 + selectedMinute;
            const startTotalMinutes = startHour * 60 + startMinute;
            const endTotalMinutes = endHour * 60 + endMinute;

            if (selectedTotalMinutes >= startTotalMinutes && selectedTotalMinutes < endTotalMinutes) {
                isValidTime = true;
            }
        });

        if (!isValidTime) {
            reservationMessage.textContent = 'Selected time is outside business hours. Please select a time within 11:30 AM - 3:00 PM or 6:00 PM - 9:00 PM.';
            reservationMessage.style.color = 'red';
            return;
        }

        const newReservation = {
            name,
            guests,
            date,
            time
        };

        existingReservations.push(newReservation);
        localStorage.setItem('reservations', JSON.stringify(existingReservations));

        reservationMessage.textContent = 'Reservation completed successfully!';
        reservationMessage.style.color = 'green';

        reservationForm.reset();
        generateTimeOptions();

        displayExistingReservations();
    });

    displayExistingReservations();
    generateTimeOptions();

    dateInput.min = new Date().toISOString().split('T')[0];
});