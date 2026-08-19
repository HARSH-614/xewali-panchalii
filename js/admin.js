document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Authentication Logic (Login Page)
    const loginForm = document.getElementById('adminLoginForm');
    if (loginForm) {
        // If we are on the login page, clear any old tokens
        sessionStorage.removeItem('adminToken');

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = document.getElementById('adminUser').value;
            const pass = document.getElementById('adminPass').value;
            const errorEl = document.getElementById('loginError');

            // MOCK AUTHENTICATION FOR DEVELOPMENT
            // In production, this fires a POST to /api/admin/login and returns a JWT
            if (user === 'admin' && pass === 'foodyverse2026') {
                sessionStorage.setItem('adminToken', 'mock_secure_jwt_token_123');
                window.location.href = 'dashboard.html';
            } else {
                errorEl.style.display = 'block';
            }
        });
    }

    // 2. Dashboard Protection & Logic
    const adminNav = document.getElementById('adminNav');
    if (adminNav) {
        // Enforce Authentication
        const token = sessionStorage.getItem('adminToken');
        if (!token) {
            alert("Unauthorized access. Please log in.");
            window.location.href = 'index.html';
            return;
        }

        // Sidebar Navigation Routing
        const navItems = document.querySelectorAll('.admin-nav-item');
        const sections = document.querySelectorAll('.admin-section');
        const pageTitle = document.getElementById('pageTitle');

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                // Update active nav class
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');

                // Update title
                pageTitle.textContent = item.textContent;

                // Show corresponding section
                const targetId = item.getAttribute('data-target');
                sections.forEach(sec => {
                    if (sec.id === targetId) {
                        sec.classList.add('active');
                    } else {
                        sec.classList.remove('active');
                    }
                });
            });
        });

        // Logout
        document.getElementById('logoutBtn').addEventListener('click', () => {
            sessionStorage.removeItem('adminToken');
            window.location.href = 'index.html';
        });

        // Load Pending Action Data (Simulating a backend fetch)
        const pendingOrderStr = sessionStorage.getItem('pendingOrder');
        const actionTable = document.getElementById('actionRequiredTable');
        
        if (actionTable) {
            if (pendingOrderStr) {
                const order = JSON.parse(pendingOrderStr);
                actionTable.innerHTML = `
                    <tr>
                        <td>${order.orderId}</td>
                        <td>${order.orderType.toUpperCase()}</td>
                        <td style="font-weight: 600;">₹${order.totals.grandTotal.toFixed(2)}</td>
                        <td><span class="status-badge status-pending">Awaiting Action</span></td>
                        <td><button class="btn btn-primary" style="padding: 0.25rem 0.75rem; font-size: 0.75rem;">View Details</button></td>
                    </tr>
                `;
            } else {
                actionTable.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-secondary);">No immediate actions required.</td></tr>`;
            }
        }
    }
});
