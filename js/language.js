document.addEventListener('DOMContentLoaded', () => {
    const langToggleBtn = document.getElementById('lang-toggle');
    let currentLang = localStorage.getItem('lang') || 'en';

    function updateContent(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (window.translations && window.translations[lang] && window.translations[lang][key]) {
                el.textContent = window.translations[lang][key];
            }
        });
        if (langToggleBtn) {
            langToggleBtn.textContent = lang === 'en' ? 'অসমীয়া' : 'English';
        }
    }

    updateContent(currentLang);

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'as' : 'en';
            localStorage.setItem('lang', currentLang);
            updateContent(currentLang);
        });
    }
});
