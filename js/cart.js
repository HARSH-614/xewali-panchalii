/**
 * Frontend Cart State Management via LocalStorage
 */
let cart = JSON.parse(localStorage.getItem('xewali-cart')) || [];

window.addToCart = (id) => {
    const item = MenuData.find(i => i.id === id);
    const existing = cart.find(i => i.id === id);
    if (existing) existing.qty++;
    else cart.push({ ...item, qty: 1 });
    saveCart();
    window.showToast(`${item.name} added to cart.`);
};

function updateQty(id, change) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
        saveCart();
    }
}

function saveCart() {
    localStorage.setItem('xewali-cart', JSON.stringify(cart));
    renderCart();
}

function renderCart() {
    const container = document.getElementById('cart-items');
    const countBadge = document.getElementById('cart-count');
    container.innerHTML = '';
    
    let subtotal = 0;
    let count = 0;

    if (cart.length === 0) {
        container.innerHTML = `<div class="empty-state"><p>Your cart is currently empty.</p></div>`;
    } else {
        cart.forEach(item => {
            subtotal += item.price * item.qty;
            count += item.qty;
            container.innerHTML += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <span style="color:var(--color-text-muted)">₹${item.price}</span>
                        <div class="cart-qty">
                            <button class="qty-btn" onclick="updateQty(${item.id}, -1)" aria-label="Decrease quantity">-</button>
                            <span>${item.qty}</span>
                            <button class="qty-btn" onclick="updateQty(${item.id}, 1)" aria-label="Increase quantity">+</button>
                        </div>
                    </div>
                    <strong>₹${item.price * item.qty}</strong>
                </div>
            `;
        });
    }

    countBadge.textContent = count;
    
    const tax = subtotal * RestaurantConfig.taxRate;
    const total = subtotal + tax;

    document.getElementById('cart-sub').textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById('cart-tax').textContent = `₹${tax.toFixed(2)}`;
    document.getElementById('cart-tot').textContent = `₹${total.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();

    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('overlay');
    
    document.getElementById('cart-toggle').addEventListener('click', () => {
        drawer.classList.add('active');
        overlay.classList.add('active');
    });

    const closeCart = () => {
        drawer.classList.remove('active');
        overlay.classList.remove('active');
    };

    document.getElementById('close-cart').addEventListener('click', closeCart);
    overlay.addEventListener('click', closeCart);

    document.getElementById('checkout-btn').addEventListener('click', () => {
        if(cart.length === 0) {
            window.showToast("Your cart is empty.", "error");
            return;
        }
        closeCart();
        document.getElementById('checkout-modal').classList.add('active');
        overlay.classList.add('active');
    });

    document.getElementById('checkout-form').addEventListener('submit', (e) => {
        e.preventDefault();
        cart = [];
        saveCart();
        document.getElementById('checkout-modal').classList.remove('active');
        overlay.classList.remove('active');
        window.showToast("Demo Order Received! This is a frontend simulation.");
    });
});
