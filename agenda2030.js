// Centraliza aquí las 5 rutas/links que quieras usar.
// Reemplaza los valores por tus archivos locales o URLs completas.
// Si pones una URL que empieza por http:// o https:// se abrirá en nueva pestaña.
// Los keys disponibles: "adquiere", "planes", "cotizacion", "sumate", "conoce"
const SolarLinks = {
  adquiere: 'catalogo.html',
  planes: 'planes-casas.html',
  cotizacion: 'cotizaciones.html',
  sumate: 'sumate.html',
  conoce: 'https://www.un.org/sustainabledevelopment/es/energy/'
};

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initFloatingElements();
    initCarousel();
    initSmoothScroll();
    initAnimationsOnScroll();
    initSparkles();
    initParticles();
    initButtonRedirects(); // usa SolarLinks
});

// ---------- resto de la lógica (sin cambios funcionales) ----------

// Create floating elements in hero
function initFloatingElements() {
    const container = document.querySelector('.floating-elements-container');
    if (!container) return;
    
    const icons = ['fa-leaf', 'fa-bolt', 'fa-globe', 'fa-wind'];
    
    for (let i = 0; i < 4; i++) {
        const element = document.createElement('div');
        element.className = 'float-element';
        element.innerHTML = `<i class="fas ${icons[i]}"></i>`;
        element.style.left = Math.random() * 100 + '%';
        element.style.top = Math.random() * 100 + '%';
        element.style.animationDelay = Math.random() * 5 + 's';
        element.style.animationDuration = (10 + Math.random() * 5) + 's';
        container.appendChild(element);
    }
}

// Carousel functionality
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentSlide = 0;
    let autoplayInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));
        
        if (index >= slides.length) currentSlide = 0;
        if (index < 0) currentSlide = slides.length - 1;
        
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    function nextSlide() {
        currentSlide++;
        if (currentSlide >= slides.length) currentSlide = 0;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide--;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        showSlide(currentSlide);
    }

    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Event listeners
    nextBtn?.addEventListener('click', () => {
        nextSlide();
        stopAutoplay();
        startAutoplay();
    });

    prevBtn?.addEventListener('click', () => {
        prevSlide();
        stopAutoplay();
        startAutoplay();
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            stopAutoplay();
            startAutoplay();
        });
    });

    // Start autoplay
    startAutoplay();

    // Pause on hover
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer?.addEventListener('mouseenter', stopAutoplay);
    carouselContainer?.addEventListener('mouseleave', startAutoplay);
}

// Smooth scroll for internal links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Animations on scroll
function initAnimationsOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements
    const elements = document.querySelectorAll('.stat-card, .feature-item, .edu-card');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Create sparkles for CTA
function initSparkles() {
    const container = document.querySelector('.sparkles-container');
    if (!container) return;

    for (let i = 0; i < 15; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.innerHTML = '<i class="fas fa-sparkles"></i>';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 3 + 's';
        sparkle.style.animationDuration = (Math.random() * 5 + 3) + 's';
        container.appendChild(sparkle);
    }
}

// Create particles for clima section
function initParticles() {
    const container = document.querySelector('.particles-clima');
    if (!container) return;

    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'rgba(251, 191, 36, 0.4)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `sparkle-float ${Math.random() * 6 + 4}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 3 + 's';
        container.appendChild(particle);
    }
}

// Parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax for blobs
    const blobs = document.querySelectorAll('.blob, .clima-blob-1, .clima-blob-2');
    blobs.forEach((blob, index) => {
        const speed = (index + 1) * 0.1;
        blob.style.transform = `translate(${Math.sin(scrolled * 0.001) * 50}px, ${scrolled * speed}px)`;
    });
});

// Add ripple effect to buttons (delegado)
function addRippleTo(el, e) {
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.6)';
    ripple.style.width = '100px';
    ripple.style.height = '100px';
    ripple.style.marginTop = '-50px';
    ripple.style.marginLeft = '-50px';
    ripple.style.animation = 'ripple 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    
    const rect = el.getBoundingClientRect();
    ripple.style.left = (e.clientX - rect.left) + 'px';
    ripple.style.top = (e.clientY - rect.top) + 'px';
    
    el.style.position = 'relative';
    el.style.overflow = 'hidden';
    el.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Redirect behavior: mapea data-key -> SolarLinks
function initButtonRedirects() {
    // Delegación: escucha clicks en el documento para botones con data-key o data-href
    document.addEventListener('click', function(event) {
        const el = event.target.closest('[data-key], [data-href]');
        if (!el) return;

        // Añade efecto ripple si es botón/carousel/cta/badge
        if (el.classList.contains('btn-carousel') || el.classList.contains('btn-cta') || el.classList.contains('badge-item')) {
            try { addRippleTo(el, event); } catch(e){/* no crítico */}
        }

        // Prioridad: data-key (nuestra centralización). Si no existe, cae en data-href (compatibilidad).
        const key = el.getAttribute('data-key');
        let href = null;

        if (key) {
            // busca en SolarLinks
            href = SolarLinks[key];
            if (!href) {
                console.warn(`SolarLinks no contiene la clave '${key}'. Revisa agenda2030.js`);
                return;
            }
        } else {
            href = el.getAttribute('data-href')?.trim();
        }

        if (!href) return;

        // Si es una URL externa, abrir en nueva pestaña
        if (/^https?:\/\//i.test(href)) {
            window.open(href, '_blank', 'noopener');
        } else {
            // navegación local / ruta relativa
            window.location.href = href;
        }
    });
}

// Añade ripple animation CSS (si aún no existe)
(function addRippleStyle() {
    if (document.getElementById('solar-ripple-style')) return;
    const style = document.createElement('style');
    style.id = 'solar-ripple-style';
    style.textContent = `
        @keyframes ripple {
            from { opacity: 1; transform: scale(0); }
            to { opacity: 0; transform: scale(4); }
        }
    `;
    document.head.appendChild(style);
})();

console.log('🌞 SolarMind - Agenda 2030 ODS 13 cargado correctamente. En SolarLinks coloca tus 5 URLs.');