/**
 * Menu Rendering, Filtering, and Modal interactions
 */
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('menu-grid');
    const search = document.getElementById('menu-search');
    const filterContainer = document.getElementById('menu-filters');
    const emptyState = document.getElementById('menu-empty');
    
    // Extract unique categories from MenuData
    const categories = ['All', 'Assamese', 'North-East', 'North India', 'South India', 'East India', 'West India', 'Continental', 'Veg', 'Non-Veg'];
    let currentFilter = 'All';

    // Build Accessible Filter Buttons
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `filter-btn ${cat === 'All' ? 'active' : ''}`;
        btn.textContent = cat;
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-selected', cat === 'All');
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            currentFilter = cat;
            renderMenu(search.value);
        });
        filterContainer.appendChild(btn);
    });

    function renderMenu(query = '') {
        grid.innerHTML = '';
        let filtered = MenuData.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(query.toLowerCase()) || 
                                  item.desc.toLowerCase().includes(query.toLowerCase()) ||
                                  item.reg.toLowerCase().includes(query.toLowerCase());
            
            let matchesFilter = true;
            if (currentFilter === 'Veg') matchesFilter = item.veg;
            else if (currentFilter === 'Non-Veg') matchesFilter = !item.veg;
            else if (currentFilter !== 'All') matchesFilter = item.cat === currentFilter;
            
            return matchesSearch && matchesFilter;
        });

        if (filtered.length === 0) {
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
            filtered.forEach(item => {
                const card = document.createElement('div');
                card.className = 'food-card';
                card.innerHTML = `
                    <div class="food-img-wrapper">
                        <img src="${item.img}" alt="${item.name}" class="food-img" loading="lazy">
                        <div class="food-badge-overlay">
                            <span class="diet-badge ${item.veg ? 'veg' : 'non-veg'}" aria-label="${item.veg ? 'Vegetarian' : 'Non-Vegetarian'}"></span>
                        </div>
                        ${item.spice > 0 ? `<div class="spice-indicator">${'🌶️'.repeat(item.spice)}</div>` : ''}
                    </div>
                    <div class="food-info">
                        <div class="food-header">
                            <h3 class="food-name">${item.name}</h3>
                            <span class="food-price">₹${item.price}</span>
                        </div>
                        <div class="food-meta">
                            ${item.reg} • ${item.cat}
                            ${item.pop ? ' • <span style="color:var(--color-secondary)">Popular</span>' : ''}
                        </div>
                        <p class="food-desc">${item.desc}</p>
                        <div class="food-actions mt-1">
                            <button class="btn btn-outline btn-view" data-id="${item.id}">View Details</button>
                            <button class="btn btn-primary btn-add-cart" data-id="${item.id}">Add to Cart</button>
                        </div>
                    </div>
                `;
                grid.appendChild(card);
            });
            attachMenuEvents();
        }
    }

    search.addEventListener('input', (e) => renderMenu(e.target.value));
    renderMenu(); // Initial render

    function attachMenuEvents() {
        document.querySelectorAll('.btn-add-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                window.addToCart(id);
            });
        });
        document.querySelectorAll('.btn-view').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                openFoodModal(id);
            });
        });
    }

    function openFoodModal(id) {
        const item = MenuData.find(i => i.id === id);
        if (!item) return;
        
        const modal = document.getElementById('universal-modal');
        const body = document.getElementById('universal-modal-body');
        
        body.innerHTML = `
            <img src="${item.img}" alt="${item.name}" style="width:100%; height:300px; object-fit:cover; border-bottom:1px solid var(--color-border)">
            <div style="padding: 2rem;">
                <div class="flex-between mb-1">
                    <h2>${item.name}</h2>
                    <span style="color:var(--color-secondary); font-size:1.5rem; font-weight:bold;">₹${item.price}</span>
                </div>
                <div class="food-meta mb-2">
                    <span class="diet-badge ${item.veg ? 'veg' : 'non-veg'}" style="display:inline-flex; vertical-align:middle; margin-right:8px;"></span>
                    ${item.reg} Region • ${item.spice > 0 ? 'Spice Level: ' + item.spice + '/4' : 'Mild'}
                </div>
                <p style="margin-bottom: 2rem; font-size:1.1rem; color:var(--color-text-muted)">${item.desc}</p>
                <div class="flex-between">
                    <button class="btn btn-primary w-100" id="modal-add-btn">Add to Cart</button>
                </div>
            </div>
        `;
        
        document.getElementById('modal-add-btn').addEventListener('click', () => {
            window.addToCart(item.id);
            closeUniversalModal();
        });

        modal.classList.add('active');
        document.getElementById('overlay').classList.add('active');
        
        // Trap focus
        modal.setAttribute('aria-hidden', 'false');
        modal.focus();
    }

    const closeUniversalModal = () => {
        document.getElementById('universal-modal').classList.remove('active');
        document.getElementById('checkout-modal').classList.remove('active');
        document.getElementById('overlay').classList.remove('active');
    };

    document.getElementById('close-universal-modal').addEventListener('click', closeUniversalModal);
    document.getElementById('close-checkout-modal').addEventListener('click', closeUniversalModal);
    document.getElementById('overlay').addEventListener('click', closeUniversalModal);
    
    // Keyboard accessibility for modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeUniversalModal();
    });
});
