document.addEventListener('DOMContentLoaded', () => {
    const paymentAmountEl = document.getElementById('paymentAmount');
    const orderIdEl = document.getElementById('orderIdRef');
    const qrContainer = document.getElementById('qrContainer');
    const copyUpiBtn = document.getElementById('copyUpiBtn');
    const openUpiAppBtn = document.getElementById('openUpiAppBtn');
    const simulatePaymentBtn = document.getElementById('simulatePaymentBtn'); // FOR TESTING ONLY

    const UPI_ID = "sajalbaruah0614@upi";
    const MERCHANT_NAME = "S Baruah Foodyverse";
    
    // Retrieve the pending order from checkout
    const pendingOrderStr = sessionStorage.getItem('pendingOrder');
    
    if (!pendingOrderStr) {
        alert("No pending order found. Returning to cart.");
        window.location.href = 'cart.html';
        return;
    }

    const order = JSON.parse(pendingOrderStr);
    const amount = order.totals.grandTotal.toFixed(2);
    const orderRef = order.orderId;

    // Display basic info
    paymentAmountEl.textContent = `₹${amount}`;
    orderIdEl.textContent = `Order Ref: ${orderRef}`;

    // Generate Dynamic UPI URI
    // Format: upi://pay?pa=UPI_ID&pn=NAME&tr=ORDER_ID&am=AMOUNT&cu=INR
    const upiURI = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(MERCHANT_NAME)}&tr=${orderRef}&am=${amount}&cu=INR`;

    // Render QR Code using the loaded QRCode.js library
    if (typeof QRCode !== 'undefined') {
        qrContainer.innerHTML = ''; // Clear loading state
        new QRCode(qrContainer, {
            text: upiURI,
            width: 220,
            height: 220,
            colorDark : "#1c261e",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
    } else {
        qrContainer.innerHTML = '<p style="color: red;">Failed to load QR generator.</p>';
    }

    // Set "Open UPI App" button link
    if (openUpiAppBtn) {
        openUpiAppBtn.href = upiURI;
    }

    // Copy UPI ID functionality
    if (copyUpiBtn) {
        copyUpiBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(UPI_ID).then(() => {
                const originalText = copyUpiBtn.textContent;
                copyUpiBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyUpiBtn.textContent = originalText;
                }, 2000);
            });
        });
    }

    // SIMULATED PAYMENT CONFIRMATION (Temporary for Phase 7 testing)
    // IMPORTANT: Anti-Hallucination rule. This explicitly states it is a simulation.
    if (simulatePaymentBtn) {
        simulatePaymentBtn.addEventListener('click', () => {
            if(confirm("DEVELOPMENT MODE: Simulate a successful payment verification? In production, this requires a server-side webhook.")) {
                
                // Transition order to live state
                order.status = 'ORDER_RECEIVED';
                sessionStorage.setItem('activeLiveOrder', JSON.stringify(order));
                
                // Clear cart and pending order
                localStorage.removeItem('cart');
                sessionStorage.removeItem('pendingOrder');

                window.location.href = `order-success.html?id=${orderRef}`;
            }
        });
    }
});
