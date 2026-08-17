/**
 * Dynamic Gallery Image Grid population
 */
document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.getElementById('gallery-grid');
    if(!galleryGrid) return;
    
    const images = [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80", 
        "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1498654077810-12c21d4d6dc3?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1598514982205-f36b96d1e8dd?auto=format&fit=crop&w=600&q=80"
    ];

    images.forEach(img => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.innerHTML = `<img src="${img}" alt="Restaurant Atmosphere" loading="lazy">`;
        div.addEventListener('click', () => {
            // Simple Lightbox Logic utilizing Universal Modal
            const modal = document.getElementById('universal-modal');
            const body = document.getElementById('universal-modal-body');
            body.innerHTML = `<img src="${img}" alt="Enlarged View" style="width:100%; height:auto; display:block;">`;
            modal.classList.add('active');
            document.getElementById('overlay').classList.add('active');
        });
        galleryGrid.appendChild(div);
    });
});
