document.addEventListener('DOMContentLoaded', () => {
    const menuGrid = document.getElementById('menuGrid');
    const searchInput = document.getElementById('searchMenu');
    const categoryFilter = document.getElementById('categoryFilter');
    const dietaryFilter = document.getElementById('dietaryFilter');
    const sortBy = document.getElementById('sortBy');

    if (!menuGrid) return;

    function renderMenu(items) {
        menuGrid.innerHTML = '';
        if (items.length === 0) {
            menuGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary); padding: 3rem;">No dishes match your criteria.</p>`;
            return;
        }

        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card-luxury';
            card.innerHTML = `
                <div style="height: 200px; background: linear-gradient(135deg, var(--accent-primary), #1c261e); display: flex; align-items: center; justify-content: center; color: #fff; font-family: var(--font-heading); font-size: 1.25rem; padding: 1rem; text-align: center;">
                    ${item.name}
                </div>
                <div class="card-content">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                        <span class="badge-tag ${item.isSignature ? 'badge-signature' : ''}">${item.category}</span>
                        <span style="font-weight: 700; color: var(--accent-primary);">₹${item.price}</span>
                    </div>
                    <h3 style="font-size: 1.15rem; margin-bottom: 0.5rem;"><a href="menu-item.html?id=${item.id}">${item.name}</a></h3>
                    <p style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 1.25rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${item.description}</p>
                    <div style="display: flex; gap: 0.5rem;">
                        <a href="menu-item.html?id=${item.id}" class="btn btn-outline" style="flex: 1; padding: 0.5rem; font-size: 0.85rem;">View Details</a>
                        <button onclick="addToCartQuick('${item.id}')" class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.85rem;">Add</button>
                    </div>
                </div>
            `;
            menuGrid.appendChild(card);
        });
    }

    function filterAndSortMenu() {
        let filtered = window.menuData.slice();

        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
        if (query) {
            filtered = filtered.filter(item => 
                item.name.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query) ||
                item.category.toLowerCase().includes(query) ||
                item.state.toLowerCase().includes(query)
            );
        }

        const cat = categoryFilter ? categoryFilter.value : 'all';
        if (cat !== 'all') {
            filtered = filtered.filter(item => item.category === cat);
        }

        const diet = dietaryFilter ? dietaryFilter.value : 'all';
        if (diet === 'veg') {
            filtered = filtered.filter(item => item.vegetarian === true);
        } else if (diet === 'non-veg') {
            filtered = filtered.filter(item => item.vegetarian === false);
        } else if (diet === 'signature') {
            filtered = filtered.filter(item => item.isSignature === true);
        }

        const sort = sortBy ? sortBy.value : 'default';
        if (sort === 'price-low') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sort === 'price-high') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sort === 'name') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        }

        renderMenu(filtered);
    }

    if (searchInput) searchInput.addEventListener('input', filterAndSortMenu);
    if (categoryFilter) categoryFilter.addEventListener('change', filterAndSortMenu);
    if (dietaryFilter) dietaryFilter.addEventListener('change', filterAndSortMenu);
    if (sortBy) sortBy.addEventListener('change', filterAndSortMenu);

    renderMenu(window.menuData);
});

function addToCartQuick(itemId) {
    const item = window.menuData.find(i => i.id === itemId);
    if (!item) return;
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(i => i.id === itemId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id: item.id, name: item.name, price: item.price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${item.name} added to cart!`);
}
