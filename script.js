// ===== MENÚ HAMBURGUESA =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

function closeMobileMenu() {
    if (navMenu) navMenu.classList.remove('active');
    if (hamburger) hamburger.classList.remove('active');
}

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('click', closeMobileMenu);
}

// ===== INTERSECTION OBSERVER PARA ANIMACIONES =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos con clases de animación
document.querySelectorAll('.fade-up, .fade-up-delay, .fade-up-delay-2, .fade-up-delay-3, .fade-up-delay-4, .fade-up-delay-5, .slide-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(el);
});

// ===== SCROLL EFFECT EN LA NAVBAR =====
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ===== SMOOTH SCROLL PARA ENLACES =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== FORMULARIO DE CONTACTO =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obtener valores del formulario
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Validar que los campos no estén vacíos
        if (name.trim() && email.trim() && message.trim()) {
            // Crear mailto link
            const mailtoLink = `mailto:tu@email.com?subject=Mensaje de ${name}&body=${encodeURIComponent(message)}%0A%0ADe: ${name}%0AEmail: ${email}`;
            
            // Abrir cliente de correo
            window.location.href = mailtoLink;
            
            // Limpiar formulario
            contactForm.reset();
            
            // Mostrar mensaje de éxito
            showNotification('¡Mensaje enviado! Te contactaremos pronto.');
        } else {
            showNotification('Por favor, completa todos los campos.', 'error');
        }
    });
}

// ===== NOTIFICACIÓN =====
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 2000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 500;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remover notificación después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== ANIMACIONES ADICIONALES =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    }
});

// ===== HOVER EFFECTS EN SKILL CARDS =====
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== CONTADOR DE SCROLL PARA NAVBAR =====
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateNavbarOnScroll();
            ticking = false;
        });
        ticking = true;
    }
});

function updateNavbarOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = 'var(--text-dark)';
        }
    });
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('Landing page de Abdel Yamil Lopez cargada correctamente.');
    
    // Agregar clase active al primer nav-link
    const firstNavLink = document.querySelector('.nav-link');
    if (firstNavLink) {
        firstNavLink.style.color = 'var(--primary-color)';
    }
});

