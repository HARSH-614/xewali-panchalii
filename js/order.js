document.addEventListener('DOMContentLoaded', () => {
    const trackForm = document.getElementById('trackOrderForm');
    const orderIdInput = document.getElementById('orderIdInput');
    const trackingResult = document.getElementById('trackingResult');
    const trackingError = document.getElementById('trackingError');
    const statusTimeline = document.getElementById('statusTimeline');
    const orderDetailsUI = document.getElementById('orderDetailsUI');

    // Order status progression for UI mapping
    const statusMap = {
        'PENDING_PAYMENT': { index: 0, label: 'Pending Payment', text: 'Awaiting payment confirmation.' },
        'ORDER_RECEIVED': { index: 1, label: 'Order Received', text: 'We have received your order.' },
        'CONFIRMED': { index: 2, label: 'Confirmed', text: 'Kitchen has accepted your order.' },
        'PREPARING': { index: 3, label: 'Preparing', text: 'Your food is being prepared.' },
        'READY': { index: 4, label: 'Ready', text: 'Order is ready.' },
        'OUT_FOR_DELIVERY': { index: 4, label: 'Out for Delivery', text: 'Your order is on the way.' },
        'DELIVERED': { index: 5, label: 'Completed', text: 'Enjoy your meal!' },
        'COMPLETED': { index: 5, label: 'Completed', text: 'Order completed.' }
    };

    if (trackForm) {
        trackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const orderId = orderIdInput.value.trim().toUpperCase();

            // Clear previous states
            trackingResult.style.display = 'none';
            trackingError.style.display = 'none';
            statusTimeline.innerHTML = '';
            orderDetailsUI.innerHTML = '';

            // Simulate backend fetch by checking sessionStorage (for Phase 4/7 testing)
            const pendingOrderStr = sessionStorage.getItem('pendingOrder');
            const liveOrderStr = sessionStorage.getItem('activeLiveOrder'); // Set after payment
            
            let foundOrder = null;

            if (liveOrderStr) {
                const liveOrder = JSON.parse(liveOrderStr);
                if (liveOrder.orderId === orderId) foundOrder = liveOrder;
            } 
            
            if (!foundOrder && pendingOrderStr) {
                const pendingOrder = JSON.parse(pendingOrderStr);
                if (pendingOrder.orderId === orderId) {
                    foundOrder = pendingOrder;
                    foundOrder.status = 'PENDING_PAYMENT'; // Enforce pending status if not paid
                }
            }

            if (foundOrder) {
                renderTrackingUI(foundOrder);
            } else {
                // IMPORTANT: Anti-Hallucination rule. 
                // Do not fake real-time statuses for random inputs.
                trackingError.style.display = 'block';
                trackingError.textContent = "Order ID not found in current session. A live backend connection is required to track past orders.";
            }
        });
    }

    function renderTrackingUI(order) {
        trackingResult.style.display = 'block';
        
        const currentStatus = order.status || 'ORDER_RECEIVED';
        const mappedStatus = statusMap[currentStatus] || statusMap['ORDER_RECEIVED'];

        // 1. Render Order Info
        orderDetailsUI.innerHTML = `
            <div style="margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border-color);">
                <p style="color: var(--text-secondary); margin-bottom: 0.5rem;">Order Reference</p>
                <h3 style="font-family: var(--font-heading); font-size: 1.5rem;">${order.orderId}</h3>
                <p style="color: var(--text-secondary); margin-top: 0.5rem;">Type: <span style="color: var(--text-primary); font-weight: 600;">${order.orderType.replace('_', ' ').toUpperCase()}</span></p>
            </div>
            <div>
                <p style="color: var(--text-secondary); margin-bottom: 0.5rem;">Current Status</p>
                <h4 style="color: var(--accent-primary); font-size: 1.25rem; margin-bottom: 0.25rem;">${mappedStatus.label}</h4>
                <p style="font-size: 0.9rem; color: var(--text-secondary);">${mappedStatus.text}</p>
            </div>
        `;

        // 2. Render Timeline Steps
        const steps = ['Received', 'Confirmed', 'Preparing', order.orderType === 'delivery' ? 'Out for Delivery' : 'Ready', 'Completed'];
        
        // Define active step index based on order status (ignoring PENDING_PAYMENT for timeline start)
        let activeIndex = mappedStatus.index - 1; 
        if (activeIndex < 0) activeIndex = 0; // If pending payment, show 0 progress on timeline

        steps.forEach((step, index) => {
            const isCompleted = index <= activeIndex && currentStatus !== 'PENDING_PAYMENT';
            const isCurrent = index === activeIndex && currentStatus !== 'PENDING_PAYMENT';
            
            const stepEl = document.createElement('div');
            stepEl.style.cssText = `
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-bottom: 1.5rem;
                opacity: ${isCompleted ? '1' : '0.4'};
                position: relative;
            `;

            // Draw connecting line except for the last item
            const lineHtml = index < steps.length - 1 ? `
                <div style="position: absolute; left: 15px; top: 32px; bottom: -1.5rem; width: 2px; background-color: ${isCompleted && !isCurrent ? 'var(--accent-primary)' : 'var(--border-color)'};"></div>
            ` : '';

            stepEl.innerHTML = `
                ${lineHtml}
                <div style="width: 32px; height: 32px; border-radius: 50%; background-color: ${isCompleted ? 'var(--accent-primary)' : 'var(--bg-primary)'}; border: 2px solid ${isCompleted ? 'var(--accent-primary)' : 'var(--border-color)'}; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: bold; z-index: 1;">
                    ${isCompleted ? '✓' : index + 1}
                </div>
                <div>
                    <h5 style="margin: 0; font-size: 1.05rem; color: ${isCurrent ? 'var(--accent-primary)' : 'var(--text-primary)'};">${step}</h5>
                </div>
            `;
            statusTimeline.appendChild(stepEl);
        });
    }
});
