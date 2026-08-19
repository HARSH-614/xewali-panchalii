document.addEventListener('DOMContentLoaded', () => {
    const reservationForm = document.getElementById('reservationForm');
    const reservationUI = document.getElementById('reservationUI');
    const confirmationUI = document.getElementById('confirmationUI');
    
    // Set minimum date to today
    const dateInput = document.getElementById('resDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validate Phone Number
            const phone = document.getElementById('resPhone').value;
            if(!/^\d{10}$/.test(phone.replace(/\D/g,''))) {
                alert("Please enter a valid 10-digit phone number.");
                return;
            }

            // Gather data for future backend submission
            const reservationData = {
                id: `SBFV-RES-${Date.now()}`,
                name: document.getElementById('resName').value,
                phone: phone,
                email: document.getElementById('resEmail').value,
                date: document.getElementById('resDate').value,
                time: document.getElementById('resTime').value,
                guests: document.getElementById('resGuests').value,
                seating: document.getElementById('resSeating').value,
                specialRequests: document.getElementById('resRequests').value,
                status: 'PENDING_VERIFICATION',
                timestamp: new Date().toISOString()
            };

            // Simulate backend request (UI transition)
            const submitBtn = reservationForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending Request...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Hide form and show confirmation message
                reservationUI.style.display = 'none';
                confirmationUI.style.display = 'block';
                
                // Populate confirmation details
                document.getElementById('confId').textContent = reservationData.id;
                document.getElementById('confDetails').innerHTML = `
                    <strong>Date:</strong> ${reservationData.date} <br>
                    <strong>Time:</strong> ${reservationData.time} <br>
                    <strong>Guests:</strong> ${reservationData.guests} <br>
                    <strong>Seating:</strong> ${reservationData.seating.replace('_', ' ').toUpperCase()}
                `;

                // Optionally save to sessionStorage for persistence during the session
                sessionStorage.setItem('lastReservationRequest', JSON.stringify(reservationData));
            }, 800);
        });
    }
});
