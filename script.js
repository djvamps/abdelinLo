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

// Manejo del formulario de contacto con FormSubmit (AJAX, sin redirección)
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    // 1. Primero asignas el correo al input '_replyto'
    contactForm.querySelector('input[name="_replyto"]').value = contactForm.querySelector('input[name="email"]').value;

    // 2. Después creas el FormData con todos los campos ya actualizados
    const formData = new FormData(contactForm);

    // 3. Y finalmente envías el formulario
    try {
      const response = await fetch('https://formsubmit.co/ajax/890665adf3e8427c1cdca4efe697c540', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });

      if (response.ok) {
        mostrarMensaje('success', '¡Mensaje enviado!, Te contactaré pronto 🙌');
        contactForm.reset();
      } else {
        throw new Error('Error en el envío');
      }
    } catch (error) {
      mostrarMensaje('error', 'Hubo un problema al enviar tu mensaje. Intenta de nuevo o escríbeme directamente por email.');
    } finally {
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
    }
  });
}

function mostrarMensaje(tipo, texto) {
  let msgBox = document.getElementById('form-message');
  if (!msgBox) {
    msgBox = document.createElement('div');
    msgBox.id = 'form-message';
    contactForm.insertAdjacentElement('afterend', msgBox);
  }
  msgBox.textContent = texto;
  msgBox.className = `form-message ${tipo}`;

  setTimeout(() => {
    msgBox.remove();
  }, 6000);
}


