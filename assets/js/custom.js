// Carousel Scroll Function
function scrollCarousel(direction) {
    const carousel = document.getElementById('categoriesCarousel');
    const scrollAmount = 250; // Ancho aproximado de un item + gap
    
    if (direction === 'left') {
        carousel.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    } else if (direction === 'right') {
        carousel.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
}

// Intersection Observer para animaciones
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar todos los category cards
    document.querySelectorAll('.category-card').forEach(card => {
        observer.observe(card);
    });
});
