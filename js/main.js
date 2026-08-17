/**
 * Core Application Initialization, State, and DOM Logic
 */
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initTheme();
    initLanguage();
    initNavigation();
    initDynamicContent();
    initFAQ();
});

function initLoader() {
    setTimeout(() => {
        const loader = document.getElementById('loading-screen');
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 600);
    }, 1500);
}

function initTheme() {
    const themeToggles = [document.getElementById('theme-toggle'), document.getElementById('footer-theme-toggle')];
    let currentTheme = localStorage.getItem('xewali-theme');
    
    if (!currentTheme) {
        currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', currentTheme);

    const toggleTheme = () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('xewali-theme', newTheme);
        window.showToast(`Theme changed to ${newTheme} mode.`);
    };

    themeToggles.forEach(btn => btn?.addEventListener('click', toggleTheme));
}

function initLanguage() {
    const langToggles = [document.getElementById('lang-toggle'), document.getElementById('footer-lang-toggle')];
    let currentLang = localStorage.getItem('xewali-lang') || 'en';
    
    const applyTranslations = (lang) => {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (Translations[lang] && Translations[lang][key]) el.textContent = Translations[lang][key];
        });
    };

    applyTranslations(currentLang);

    const toggleLang = () => {
        currentLang = currentLang === 'en' ? 'as' : 'en';
        localStorage.setItem('xewali-lang', currentLang);
        applyTranslations(currentLang);
        window.showToast(`Language switched to ${currentLang === 'en' ? 'English' : 'অসমীয়া'}.`);
    };

    langToggles.forEach(btn => btn?.addEventListener('click', toggleLang));
}

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    }, { passive: true });

    mobileToggle.addEventListener('click', () => {
        const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
        mobileToggle.setAttribute('aria-expanded', !isExpanded);
        mobileToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

function initDynamicContent() {
    // Populate Offers
    const offersContainer = document.getElementById('offers-container');
    OfferData.forEach(offer => {
        offersContainer.innerHTML += `
            <div class="stack-card">
                <div class="stack-info">
                    <h4>${offer.title}</h4>
                    <p>${offer.desc}</p>
                </div>
                <button class="btn btn-outline btn-view-offer" onclick="window.showToast('Demo Offer Selected')">Claim</button>
            </div>
        `;
    });

    // Populate Events
    const eventsContainer = document.getElementById('events-container');
    EventData.forEach(event => {
        eventsContainer.innerHTML += `
            <div class="stack-card">
                <div class="stack-date-badge">
                    <span>${event.date.split(' ')[0] || '*'}</span>
                    <small>${event.date.split(' ')[1] || 'TBA'}</small>
                </div>
                <div class="stack-info">
                    <h4>${event.title}</h4>
                    <p>${event.desc}</p>
                </div>
            </div>
        `;
    });

    // Populate Reviews
    const reviewsGrid = document.getElementById('reviews-grid');
    ReviewData.forEach(rev => {
        const stars = '★'.repeat(rev.rating) + '☆'.repeat(5 - rev.rating);
        reviewsGrid.innerHTML += `
            <div class="review-card">
                <div class="stars">${stars}</div>
                <p class="review-text">"${rev.text}"</p>
                <div class="reviewer-info">
                    <div class="reviewer-avatar">${rev.name.charAt(0)}</div>
                    <div>
                        <strong>${rev.name}</strong>
                        <div class="small-text">${rev.type}</div>
                    </div>
                </div>
            </div>
        `;
    });
}

function initFAQ() {
    const accordion = document.getElementById('faq-accordion');
    FAQData.forEach((item, index) => {
        accordion.innerHTML += `
            <div class="faq-item">
                <button class="faq-question" aria-expanded="false" aria-controls="faq-ans-${index}">
                    ${item.q}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"></path></svg>
                </button>
                <div class="faq-answer" id="faq-ans-${index}">
                    <p class="pt-2">${item.a}</p>
                </div>
            </div>
        `;
    });

    accordion.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';
            // Close all
            accordion.querySelectorAll('.faq-question').forEach(b => b.setAttribute('aria-expanded', 'false'));
            // Open clicked if it was closed
            if (!isExpanded) btn.setAttribute('aria-expanded', 'true');
        });
    });
}

window.showToast = (message, type = 'success') => {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = type === 'error' ? '⚠️ ' + message : '✓ ' + message;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
};
