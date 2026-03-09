// ==================== Mobile Menu Handling ====================
document.addEventListener('DOMContentLoaded', function() {
    // Handle dropdown menus on mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        const submenuBtns = dropdown.querySelectorAll('.submenu-btn');
        
        if (window.innerWidth <= 768) {
            // Mobile: Click to toggle dropdown
            if (dropbtn) {
                dropbtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    dropdown.classList.toggle('open');
                    
                    // Close other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('open');
                        }
                    });
                });
            }
            
            // Handle submenus on mobile
            submenuBtns.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const submenu = btn.closest('.dropdown-submenu');
                    if (submenu) {
                        submenu.classList.toggle('open');
                    }
                });
            });
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('open');
            });
        }
    });
});

// ==================== Responsive Helper ====================
function handleResize() {
    const header = document.querySelector('header');
    const nav = document.querySelector('.nav-primary');
    
    if (window.innerWidth <= 768) {
        // Mobile mode
        if (header) header.classList.add('mobile-mode');
        if (nav) nav.classList.add('mobile-nav');
    } else {
        // Desktop mode
        if (header) header.classList.remove('mobile-mode');
        if (nav) nav.classList.remove('mobile-nav');
    }
}

// Call on resize
window.addEventListener('resize', handleResize);
// Call on load
window.addEventListener('load', handleResize);
document.addEventListener('DOMContentLoaded', handleResize);

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

// Typewriter effect with JavaScript
function startTypewriter() {
    const text = "J{BLUE}B imports{/BLUE}.<br>Tecnología a un solo CLIC!";
    const typewriterElement = document.getElementById('typewriter-text');
    const paragraph = document.getElementById('hero-paragraph');
    const button = document.getElementById('hero-button');
    const heroContent = document.querySelector('.hero-content');
    const heroSlider = document.getElementById('heroSlider');
    
    let index = 0;
    const speed = 60; // milliseconds per character
    
    typewriterElement.classList.add('typing');
    
    function typeCharacter() {
        if (index < text.length) {
            // Detectar <br> tag
            if (text.substr(index, 4) === '<br>') {
                typewriterElement.innerHTML += '<br>';
                index += 4;
            }
            // Detectar {BLUE} marker
            else if (text.substr(index, 6) === '{BLUE}') {
                typewriterElement.innerHTML += '';
                index += 6;
            }
            // Detectar {/BLUE} marker
            else if (text.substr(index, 7) === '{/BLUE}') {
                typewriterElement.innerHTML += '';
                index += 7;
            }
            // Caracteres normales
            else {
                // Comprobar si estamos dentro de marcadores azules
                let beforeText = text.substring(0, index);
                let blueCount = (beforeText.match(/{BLUE}/g) || []).length;
                let closeBlueCount = (beforeText.match(/{\/BLUE}/g) || []).length;
                let inBlue = blueCount > closeBlueCount;
                
                if (inBlue) {
                    // Agregar con span azul
                    typewriterElement.innerHTML += '<span style="color: #1a3b69;">' + text.charAt(index) + '</span>';
                } else {
                    typewriterElement.innerHTML += text.charAt(index);
                }
                index++;
            }
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
            
            // Fade out hero-content and fade in slider
            setTimeout(function() {
                heroContent.classList.add('fade-out');
                heroSlider.classList.add('active');
                
                // Start slider after fade in completes
                setTimeout(function() {
                    startHeroSlider();
                }, 800);
            }, 3000);
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

// ==================== Carousel Slick Initialization ====================
document.addEventListener('DOMContentLoaded', function() {
    // Cargar Slick JS si no está disponible
    if (typeof $ === 'undefined') {
        const slickScript = document.createElement('script');
        slickScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
        document.head.appendChild(slickScript);
        
        slickScript.onload = function() {
            const slickMin = document.createElement('script');
            slickMin.src = 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js';
            document.head.appendChild(slickMin);
            
            slickMin.onload = function() {
                initializeCarousel();
            };
        };
    } else {
        // Si jQuery ya está cargado, usar Slick directamente
        if (typeof $.fn.slick !== 'undefined') {
            initializeCarousel();
        } else {
            const slickMin = document.createElement('script');
            slickMin.src = 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js';
            document.head.appendChild(slickMin);
            
            slickMin.onload = function() {
                initializeCarousel();
            };
        }
    }
});

function initializeCarousel() {
    const carousel = document.getElementById('products-carousel');
    
    if (carousel && typeof $ !== 'undefined' && typeof $.fn.slick !== 'undefined') {
        $(carousel).slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            dots: false,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 4000,
            infinite: true,
            speed: 500,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 4
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        autoplaySpeed: 3000
                    }
                }
            ]
        });
        
        // Agregar controles de navegación personalizados
        const prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-prev-btn';
        prevBtn.innerHTML = '<i class="fa fa-chevron-left"></i>';
        prevBtn.onclick = function() {
            $(carousel).slick('slickPrev');
        };
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-next-btn';
        nextBtn.innerHTML = '<i class="fa fa-chevron-right"></i>';
        nextBtn.onclick = function() {
            $(carousel).slick('slickNext');
        };
        
        carousel.parentElement.insertBefore(prevBtn, carousel);
        carousel.parentElement.insertBefore(nextBtn, carousel.nextSibling);
    } else {
        // Fallback: usar scroll horizontal sin Slick
        console.log('Slick carousel no disponible, usando scroll horizontal');
        enableHorizontalScroll(carousel);
    }
}

// Fallback: Scroll horizontal suave
function enableHorizontalScroll(carousel) {
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 1;
        carousel.scrollLeft = scrollLeft - walk;
    });

    // Botones de navegación para fallback
    const prevBtn = document.createElement('button');
    prevBtn.className = 'carousel-prev-btn';
    prevBtn.innerHTML = '<i class="fa fa-chevron-left"></i>';
    prevBtn.onclick = function() {
        carousel.scrollBy({ left: -250, behavior: 'smooth' });
    };
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'carousel-next-btn';
    nextBtn.innerHTML = '<i class="fa fa-chevron-right"></i>';
    nextBtn.onclick = function() {
        carousel.scrollBy({ left: 250, behavior: 'smooth' });
    };
    
    carousel.parentElement.insertBefore(prevBtn, carousel);
    carousel.parentElement.insertBefore(nextBtn, carousel.nextSibling);
}

// Agregar estilos para botones de navegación
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .carousel-prev-btn, .carousel-next-btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0, 0, 0, 0.7);
            color: white;
            border: none;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
            transition: background 0.3s ease;
        }
        
        .carousel-prev-btn:hover, .carousel-next-btn:hover {
            background: rgba(0, 0, 0, 0.9);
        }
        
        .carousel-prev-btn {
            left: 10px;
        }
        
        .carousel-next-btn {
            right: 10px;
        }
        
        .carrusel {
            position: relative;
        }
    `;
    document.head.appendChild(style);
});
