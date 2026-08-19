document.addEventListener('DOMContentLoaded', () => {
    const orderTypeSelect = document.getElementById('orderType');
    const deliveryFields = document.getElementById('deliveryFields');
    const pickupFields = document.getElementById('pickupFields');
    const dineInFields = document.getElementById('dineInFields');
    const checkoutForm = document.getElementById('checkoutForm');
    
    // Total calculation elements
    const checkoutSubtotal = document.getElementById('checkoutSubtotal');
    const checkoutTax = document.getElementById('checkoutTax');
    const checkoutDelivery = document.getElementById('checkoutDelivery');
    const checkoutTotal = document.getElementById('checkoutTotal');
    
    const TAX_RATE = 0.05;
    const DELIVERY_FEE = 50;

    function renderCheckoutTotals() {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        if (cart.length === 0) {
            window.location.href = 'cart.html';
            return;
        }

        let subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        let tax = subtotal * TAX_RATE;
        let delivery = orderTypeSelect.value === 'delivery' ? DELIVERY_FEE : 0;
        let total = subtotal + tax + delivery;

        checkoutSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
        checkoutTax.textContent = `₹${tax.toFixed(2)}`;
        
        if (orderTypeSelect.value === 'delivery') {
            checkoutDelivery.textContent = `₹${delivery.toFixed(2)}`;
            checkoutDelivery.parentElement.style.display = 'flex';
        } else {
            checkoutDelivery.parentElement.style.display = 'none';
        }

        checkoutTotal.textContent = `₹${total.toFixed(2)}`;
    }

    // Toggle fields based on Order Type
    if (orderTypeSelect) {
        orderTypeSelect.addEventListener('change', (e) => {
            const type = e.target.value;
            deliveryFields.style.display = type === 'delivery' ? 'block' : 'none';
            pickupFields.style.display = type === 'pickup' ? 'block' : 'none';
            dineInFields.style.display = type === 'dine_in' ? 'block' : 'none';
            
            // Re-render totals to adjust delivery fee
            renderCheckoutTotals();
        });
    }

    // Form Submission
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate Phone Number (10 digits standard India)
            const phone = document.getElementById('phone').value;
            if(!/^\d{10}$/.test(phone.replace(/\D/g,''))) {
                alert("Please enter a valid 10-digit phone number.");
                return;
            }

            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            let subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            let tax = subtotal * TAX_RATE;
            let delivery = orderTypeSelect.value === 'delivery' ? DELIVERY_FEE : 0;
            let total = subtotal + tax + delivery;

            // Generate temporary Order Payload
            const pendingOrder = {
                orderId: `SBFV-ORD-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.floor(1000 + Math.random() * 9000)}`,
                customer: {
                    name: document.getElementById('fullName').value,
                    phone: phone,
                    email: document.getElementById('email').value
                },
                orderType: orderTypeSelect.value,
                items: cart,
                totals: { subtotal, tax, delivery, grandTotal: total },
                timestamp: new Date().toISOString()
            };

            // Save to pending order for the payment phase
            sessionStorage.setItem('pendingOrder', JSON.stringify(pendingOrder));
            
            // Move to Payment Phase
            window.location.href = 'payment.html';
        });
    }

    // Initial render
    renderCheckoutTotals();
});
