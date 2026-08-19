document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cartItems');
    const subtotalEl = document.getElementById('cartSubtotal');
    const taxEl = document.getElementById('cartTax');
    const deliveryEl = document.getElementById('cartDelivery');
    const totalEl = document.getElementById('cartTotal');
    const emptyCartMsg = document.getElementById('emptyCartMsg');
    const cartContent = document.getElementById('cartContent');
    const clearCartBtn = document.getElementById('clearCartBtn');

    const TAX_RATE = 0.05; // 5% GST
    const DELIVERY_FEE = 50; // Standard delivery fee

    function getCart() {
        return JSON.parse(localStorage.getItem('cart') || '[]');
    }

    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    function updateQuantity(id, delta) {
        let cart = getCart();
        const item = cart.find(i => i.id === id);
        if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) {
                cart = cart.filter(i => i.id !== id);
            }
            saveCart(cart);
        }
    }

    function removeItem(id) {
        let cart = getCart();
        cart = cart.filter(i => i.id !== id);
        saveCart(cart);
    }

    function renderCart() {
        if (!cartItemsContainer) return;
        
        const cart = getCart();
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartContent.style.display = 'none';
            emptyCartMsg.style.display = 'block';
            return;
        }

        cartContent.style.display = 'grid';
        emptyCartMsg.style.display = 'none';

        let subtotal = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            const itemEl = document.createElement('div');
            itemEl.style.cssText = 'display: flex; align-items: center; justify-content: space-between; padding: 1rem; border-bottom: 1px solid var(--border-color); background: var(--bg-card);';
            itemEl.innerHTML = `
                <div style="flex: 2;">
                    <h4 style="margin-bottom: 0.25rem;">${item.name}</h4>
                    <p style="color: var(--accent-primary); font-weight: 600;">₹${item.price}</p>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem; flex: 1; justify-content: center;">
                    <button class="icon-btn qty-btn" data-id="${item.id}" data-delta="-1" style="width: 28px; height: 28px;">-</button>
                    <span style="font-weight: 600; width: 20px; text-align: center;">${item.quantity}</span>
                    <button class="icon-btn qty-btn" data-id="${item.id}" data-delta="1" style="width: 28px; height: 28px;">+</button>
                </div>
                <div style="flex: 1; text-align: right; font-weight: 700;">
                    ₹${itemTotal}
                </div>
                <div style="margin-left: 1rem;">
                    <button class="icon-btn remove-btn" data-id="${item.id}" style="color: #dc3545; border-color: #dc3545; width: 32px; height: 32px;">×</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemEl);
        });

        const tax = subtotal * TAX_RATE;
        const total = subtotal + tax + DELIVERY_FEE; // Assumes delivery by default for cart view

        subtotalEl.textContent = `₹${subtotal.toFixed(2)}`;
        taxEl.textContent = `₹${tax.toFixed(2)}`;
        deliveryEl.textContent = `₹${DELIVERY_FEE.toFixed(2)}`;
        totalEl.textContent = `₹${total.toFixed(2)}`;

        // Attach event listeners to new buttons
        document.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const delta = parseInt(e.target.getAttribute('data-delta'));
                updateQuantity(id, delta);
            });
        });

        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                removeItem(id);
            });
        });
    }

    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            if(confirm('Are you sure you want to clear your cart?')) {
                saveCart([]);
            }
        });
    }

    renderCart();
});
