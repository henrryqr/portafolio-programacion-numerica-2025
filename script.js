// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Repositorio GitHub - Programación Numérica (Neon) cargado');
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Cerrar menú móvil si está abierto
                hamburger?.classList.remove('active');
                navMenu?.classList.remove('active');
                
                // Scroll suave
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll to top button
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
    
    scrollTopBtn?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animaciones al hacer scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.assignment-card, .feature, .objectives-list li, .info-item, .link-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate-in');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // Efectos de hover mejorados para tarjetas con glow
    document.querySelectorAll('.assignment-card, .feature, .info-card, .course-card, .links-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.3)';
        });
    });

    // Contador animado para las estadísticas del hero
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    // Iniciar contadores cuando son visibles
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stats = entry.target.querySelectorAll('.stat-number');
                stats.forEach(stat => {
                    const target = parseInt(stat.textContent);
                    animateCounter(stat, target);
                });
                observer.unobserve(entry.target);
            }
        });
    });

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        observer.observe(heroSection);
    }

    // Efecto de escritura para el código del hero
    function typeCodeEffect() {
        const codeLines = document.querySelectorAll('.code-line');
        codeLines.forEach((line, index) => {
            line.style.animation = `typeWrite 0.5s ${index * 0.2}s both`;
        });
    }

    // Añadir CSS para la animación de escritura
    const typeWriteCSS = `
        @keyframes typeWrite {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = typeWriteCSS;
    document.head.appendChild(style);

    // Iniciar efecto de escritura después de un delay
    setTimeout(typeCodeEffect, 1000);

    // Sistema de notificaciones neon para GitHub
    function showNeonNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'neon-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fab fa-github"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">&times;</button>
        `;
        
        document.body.appendChild(notification);
        
        // Animación de entrada
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Cerrar notificación
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Auto-remover después de 4 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }
        }, 4000);
    }

    // Simular clics en enlaces de GitHub (para demostración)
    document.querySelectorAll('.btn-assignment').forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                showNeonNotification('🔮 Repositorio GitHub - Enlace de demostración');
            }
        });
    });

    // Efecto de parallax suave para el hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Resaltar sección activa en la navegación con efecto neon
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveSection);

    // Preloader neon
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 1000);
    });

    // Efecto de hover para los enlaces del footer
    document.querySelectorAll('.footer-section a').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.textShadow = '0 0 10px #8b5cf6';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.textShadow = '0 0 5px #8b5cf6';
        });
    });

    // Efecto de pulso para los iconos neon
    function addPulseEffect() {
        const neonIcons = document.querySelectorAll('.neon-icon, .neon-avatar');
        neonIcons.forEach(icon => {
            icon.style.animation = 'neonPulse 2s ease-in-out infinite';
        });
    }

    // Animación de partículas de fondo
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        document.body.appendChild(particlesContainer);

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: fixed;
                width: 2px;
                height: 2px;
                background: #8b5cf6;
                border-radius: 50%;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.5};
                box-shadow: 0 0 10px #8b5cf6;
            `;
            particlesContainer.appendChild(particle);

            // Animación flotante
            animateParticle(particle);
        }
    }

    function animateParticle(particle) {
        let x = parseFloat(particle.style.left);
        let y = parseFloat(particle.style.top);
        let vx = (Math.random() - 0.5) * 0.2;
        let vy = (Math.random() - 0.5) * 0.2;

        function move() {
            x += vx;
            y += vy;

            // Rebote en los bordes
            if (x <= 0 || x >= 100) vx *= -1;
            if (y <= 0 || y >= 100) vy *= -1;

            particle.style.left = x + '%';
            particle.style.top = y + '%';

            requestAnimationFrame(move);
        }

        move();
    }

    // Efecto de texto typing para el hero
    function typeWriterText() {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            let i = 0;
            
            function type() {
                if (i < text.length) {
                    heroTitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, 100);
                }
            }
            type();
        }
    }

    // Inicializar efectos neon
    setTimeout(() => {
        addPulseEffect();
        createParticles();
        typeWriterText();
    }, 1500);

    // Efecto de cursor personalizado
    function createCustomCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'neon-cursor';
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Efecto al hacer hover en elementos interactivos
        const interactiveElements = document.querySelectorAll('a, button, .btn-assignment, .assignment-card, .feature');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });
    }

    // Console log de bienvenida estilo neon
    console.log(`
    %c🔮 REPOSITORIO DE PROGRAMACIÓN NUMÉRICA 🔮
    %c👨‍💻 Estudiante: Henry Higinio Quispe Ramos
    %c📚 Código: 194926
    %c🏫 UNAP - Facultad de Ingeniería Estadística e Informática
    %c📧 Email: hequisper@est.unap.edu.pe
    %c✨ Estilo: Neon Morado
    `, 
    'color: #8b5cf6; font-size: 16px; font-weight: bold; text-shadow: 0 0 10px #8b5cf6;',
    'color: #a78bfa; font-size: 12px;',
    'color: #a78bfa; font-size: 12px;',
    'color: #a78bfa; font-size: 12px;',
    'color: #a78bfa; font-size: 12px;',
    'color: #c4b5fd; font-size: 12px; font-style: italic;'
    );
});

// CSS adicional para efectos neon
const additionalCSS = `
    /* Animaciones Neon */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes neonPulse {
        0%, 100% {
            box-shadow: 0 0 5px #8b5cf6, 0 0 10px #8b5cf6;
        }
        50% {
            box-shadow: 0 0 10px #8b5cf6, 0 0 20px #8b5cf6, 0 0 30px #8b5cf6;
        }
    }
    
    @keyframes textGlow {
        0%, 100% {
            text-shadow: 0 0 5px #8b5cf6;
        }
        50% {
            text-shadow: 0 0 10px #8b5cf6, 0 0 20px #8b5cf6;
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out;
    }
    
    /* Notificaciones Neon */
    .neon-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(17, 17, 17, 0.95);
        padding: 1rem 1.5rem;
        border-radius: 8px;
        border: 1px solid #8b5cf6;
        box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        z-index: 3000;
        max-width: 300px;
        backdrop-filter: blur(10px);
    }
    
    .neon-notification.show {
        transform: translateX(0);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-content i {
        color: #8b5cf6;
        font-size: 1.2rem;
        filter: drop-shadow(0 0 5px #8b5cf6);
    }
    
    .notification-content span {
        color: #ffffff;
        text-shadow: 0 0 5px #8b5cf6;
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 1.25rem;
        cursor: pointer;
        color: #a1a1aa;
        position: absolute;
        top: 0.5rem;
        right: 0.75rem;
        transition: color 0.3s ease;
    }
    
    .notification-close:hover {
        color: #8b5cf6;
        text-shadow: 0 0 5px #8b5cf6;
    }
    
    /* Scroll to top button neon */
    .scroll-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #8b5cf6;
        color: white;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        justify-content: center;
        align-items: center;
        font-size: 1.25rem;
        box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
        transition: all 0.3s ease;
        z-index: 1000;
        animation: neonPulse 2s ease-in-out infinite;
    }
    
    .scroll-top:hover {
        background: #7c3aed;
        transform: translateY(-3px);
        box-shadow: 0 0 30px rgba(139, 92, 246, 0.8);
    }
    
    /* Navegación activa neon */
    .nav-link.active {
        color: #8b5cf6;
        font-weight: 600;
        text-shadow: 0 0 10px #8b5cf6;
    }
    
    .nav-link.active::after {
        width: 100%;
        box-shadow: 0 0 10px #8b5cf6;
    }
    
    /* Preloader neon */
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000000;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: '🔮 Cargando Programación Numérica...';
        position: fixed;
        top: 60%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10000;
        color: #8b5cf6;
        font-weight: 600;
        font-size: 1.1rem;
        text-shadow: 0 0 10px #8b5cf6;
        animation: textGlow 2s ease-in-out infinite;
    }
    
    /* Efectos de hover mejorados neon */
    .assignment-card, .feature, .info-card, .course-card, .links-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .btn-assignment {
        transition: all 0.3s ease;
        animation: neonPulse 3s ease-in-out infinite;
    }
    
    .btn-assignment:hover {
        transform: translateX(5px);
        box-shadow: 0 0 20px rgba(139, 92, 246, 0.8);
    }
    
    .footer-section a {
        transition: all 0.3s ease;
    }
    
    /* Iconos neon en información */
    .neon-icon {
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #8b5cf6, #a78bfa);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.2rem;
        box-shadow: 0 0 15px rgba(139, 92, 246, 0.5);
        animation: neonPulse 2s ease-in-out infinite;
    }
    
    .neon-link {
        transition: all 0.3s ease;
        border: 1px solid transparent;
    }
    
    .neon-link:hover {
        border-color: #8b5cf6;
        box-shadow: 0 0 15px rgba(139, 92, 246, 0.3);
        transform: translateX(5px);
    }
    
    /* Cursor personalizado neon */
    .neon-cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, #8b5cf6, transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: screen;
        transition: transform 0.1s ease;
        box-shadow: 0 0 20px #8b5cf6;
    }
    
    .neon-cursor.hover {
        transform: scale(1.5);
        background: radial-gradient(circle, #a78bfa, transparent);
    }
    
    /* Mobile menu styles neon */
    @media (max-width: 768px) {
        .hamburger {
            display: flex;
        }
        
        .nav-menu {
            position: fixed;
            top: 70px;
            right: -100%;
            background: rgba(0, 0, 0, 0.95);
            width: 80%;
            height: calc(100vh - 70px);
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            padding-top: 2rem;
            transition: right 0.3s ease;
            box-shadow: -5px 0 15px rgba(139, 92, 246, 0.3);
            backdrop-filter: blur(10px);
            border-left: 1px solid #8b5cf6;
        }
        
        .nav-menu.active {
            right: 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
            background: #8b5cf6;
            box-shadow: 0 0 5px #8b5cf6;
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
            background: #8b5cf6;
            box-shadow: 0 0 5px #8b5cf6;
        }
        
        .neon-notification {
            right: 10px;
            left: 10px;
            max-width: none;
        }
        
        .neon-cursor {
            display: none;
        }
    }

    /* Responsive para intro */
    @media (max-width: 968px) {
        .intro-content {
            grid-template-columns: 1fr;
            gap: 2rem;
        }
        
        .hero-stats {
            justify-content: center;
        }
    }

    /* Efectos de carga neon */
    .assignment-card, .feature, .info-item {
        opacity: 0;
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .assignment-card:nth-child(1) { animation-delay: 0.1s; }
    .assignment-card:nth-child(2) { animation-delay: 0.2s; }
    .assignment-card:nth-child(3) { animation-delay: 0.3s; }
    
    .feature:nth-child(1) { animation-delay: 0.1s; }
    .feature:nth-child(2) { animation-delay: 0.2s; }
    .feature:nth-child(3) { animation-delay: 0.3s; }
    
    /* Partículas de fondo */
    .particles-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    }
`;

// Inject additional CSS
const additionalStyle = document.createElement('style');
additionalStyle.textContent = additionalCSS;
document.head.appendChild(additionalStyle);

console.log('JavaScript estilo neon cargado exitosamente');
