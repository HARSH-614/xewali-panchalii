/**
 * Reservation & Private Booking Form Validation
 */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reservation-form');
    const dateInput = document.getElementById('res-date');
    const timeSelect = document.getElementById('res-time');
    
    // Prevent past dates
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    // Dynamic Time Slot Generation based on config
    function populateTimes() {
        timeSelect.innerHTML = '';
        const slots = [
            "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", 
            "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM"
        ];
        slots.forEach(slot => {
            const option = document.createElement('option');
            option.value = slot;
            option.textContent = slot;
            timeSelect.appendChild(option);
        });
    }
    populateTimes();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Generate Fictional Reference
        const ref = `XEWALI-RSV-${Math.floor(1000 + Math.random() * 9000)}`;
        
        form.classList.add('hidden');
        document.getElementById('res-ref').textContent = ref;
        document.getElementById('res-success').classList.remove('hidden');
        
        window.showToast("Reservation request simulated successfully.");
    });

    // Private Booking Modal Logic
    document.getElementById('open-private-modal').addEventListener('click', () => {
        const body = document.getElementById('universal-modal-body');
        body.innerHTML = `
            <div style="padding: 2rem;">
                <h3 class="mb-2">Private Event Inquiry</h3>
                <form id="private-event-form">
                    <div class="form-grid">
                        <div class="input-group mb-1">
                            <label>Name</label>
                            <input type="text" required>
                        </div>
                        <div class="input-group mb-1">
                            <label>Contact Number</label>
                            <input type="tel" required>
                        </div>
                        <div class="input-group mb-1">
                            <label>Event Type</label>
                            <select required>
                                <option>Birthday</option>
                                <option>Corporate</option>
                                <option>Family Gathering</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div class="input-group mb-1">
                            <label>Estimated Guests</label>
                            <input type="number" min="10" required placeholder="Minimum 10">
                        </div>
                    </div>
                    <div class="input-group full-width mt-1 mb-2">
                        <label>Additional Details</label>
                        <textarea rows="3"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Send Inquiry (Demo)</button>
                </form>
            </div>
        `;
        document.getElementById('universal-modal').classList.add('active');
        document.getElementById('overlay').classList.add('active');

        document.getElementById('private-event-form').addEventListener('submit', (e) => {
            e.preventDefault();
            document.getElementById('close-universal-modal').click();
            window.showToast("Private booking inquiry sent!");
        });
    });
});
