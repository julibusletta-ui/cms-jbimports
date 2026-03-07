// Typewriter effect with JavaScript
function startTypewriter() {
    const text = "JBimports. Tecnologia al alcance de todos.";
    const typewriterElement = document.getElementById('typewriter-text');
    const paragraph = document.getElementById('hero-paragraph');
    const button = document.getElementById('hero-button');
    
    let index = 0;
    const speed = 60; // milliseconds per character
    
    typewriterElement.classList.add('typing');
    
    function typeCharacter() {
        if (index < text.length) {
            typewriterElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeCharacter, speed);
        } else {
            // Remove typing class when done
            typewriterElement.classList.remove('typing');
            
            // Show paragraph after typing is complete
            setTimeout(function() {
                paragraph.style.transition = 'opacity 800ms ease-in-out, transform 800ms ease-in-out';
                paragraph.style.opacity = '1';
                paragraph.style.transform = 'translateY(0)';
            }, 200);
            
            // Show button
            setTimeout(function() {
                button.style.transition = 'opacity 800ms ease-in-out, transform 800ms ease-in-out';
                button.style.opacity = '1';
                button.style.transform = 'translateY(0)';
            }, 400);
            
            // Start hero slider after animation completes
            setTimeout(function() {
                startHeroSlider();
            }, 1200);
        }
    }
    
    // Start typing after a small delay
    setTimeout(typeCharacter, 300);
}

// Hero Slider Functionality
let sliderIndex = 1;
let sliderInterval;

function startHeroSlider() {
    showSlide(sliderIndex);
    autoSlide();
}

function currentSlide(n) {
    clearInterval(sliderInterval);
    showSlide(sliderIndex = n);
    autoSlide();
}

function showSlide(n) {
    let slides = document.querySelectorAll('.slider-slide');
    let dots = document.querySelectorAll('.dot');
    
    if (n > slides.length) {
        sliderIndex = 1;
    }
    if (n < 1) {
        sliderIndex = slides.length;
    }
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[sliderIndex - 1].classList.add('active');
    dots[sliderIndex - 1].classList.add('active');
}

function autoSlide() {
    sliderInterval = setInterval(function() {
        sliderIndex++;
        showSlide(sliderIndex);
    }, 4000); // Cambiar imagen cada 4 segundos
}

// Initialize typewriter when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startTypewriter);
} else {
    startTypewriter();
}

// Initialize AOS (Animate On Scroll)
function initAOS() {
    if (typeof AOS !== 'undefined') {
        console.log('AOS library loaded successfully');
        AOS.init({
            duration: 800,
            easing: 'ease-in-out-cubic',
            once: false,
            mirror: true,
            offset: 120,
            disable: false
        });
        console.log('AOS initialized');
    } else {
        console.warn('AOS library not loaded, showing elements without animation');
        // Show all AOS elements immediately if library didn't load
        document.querySelectorAll('[data-aos]').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translate3d(0, 0, 0)';
        });
    }
}

// Try to initialize as soon as DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(initAOS, 100);
    });
} else {
    setTimeout(initAOS, 100);
}

// Also try on load event as fallback
window.addEventListener('load', function() {
    setTimeout(initAOS, 100);
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Header scroll effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Active menu link based on scroll position
function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-primary a');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        // Check if user has scrolled past this section
        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    // Update active link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('active');
        }
    });

    // Set home as active when at top
    if (window.scrollY < 300) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#home') {
                link.classList.add('active');
            }
        });
    }
}

// Update on scroll
window.addEventListener('scroll', updateActiveLink);

// Update on page load
updateActiveLink();

// Carrito de compras: contador dinámico
let cartCount = 0;
const cartCountElement = document.querySelector('.cart-count');

function addToCart(quantity = 1) {
    cartCount += quantity;
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

function removeFromCart(quantity = 1) {
    cartCount = Math.max(0, cartCount - quantity);
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

// Ejemplo: para probar, puedes llamar addToCart() en la consola o desde botones futuros
