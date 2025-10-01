// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Repositorio GitHub - Programación Numérica cargado');
    
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
        const elements = document.querySelectorAll('.assignment-card, .feature, .objectives-list li, .data-item, .detail-item, .resource-link');
        
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

    // Efectos de hover mejorados para tarjetas
    document.querySelectorAll('.assignment-card, .feature, .info-card, .resource-link').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
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

    // Sistema de notificaciones para GitHub
    function showGitHubNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'github-notification';
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
    document.querySelectorAll('.btn-assignment, .resource-link').forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                showGitHubNotification('Repositorio GitHub - Enlace de demostración');
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

    // Resaltar sección activa en la navegación
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

    // Preloader simple
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 1000);
    });

    // Efecto de hover para los enlaces de recursos
    document.querySelectorAll('.resource-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Copiar email al portapapeles
    const emailElement = document.querySelector('.data-content span');
    if (emailElement && emailElement.textContent.includes('@')) {
        emailElement.style.cursor = 'pointer';
        emailElement.title = 'Haz clic para copiar el email';
        
        emailElement.addEventListener('click', function() {
            const email = this.textContent;
            navigator.clipboard.writeText(email).then(() => {
                showGitHubNotification('Email copiado al portapapeles: ' + email);
            });
        });
    }

    // Efecto de carga escalonada para las tarjetas de información
    function staggerCardAnimation() {
        const cards = document.querySelectorAll('.info-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-in');
            }, index * 200);
        });
    }

    // Iniciar animación escalonada cuando la sección de información es visible
    const infoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                staggerCardAnimation();
                infoObserver.unobserve(entry.target);
            }
        });
    });

    const infoSection = document.querySelector('#informacion');
    if (infoSection) {
        infoObserver.observe(infoSection);
    }

    // Console log de bienvenida
    console.log(`
    🎓 Repositorio de Programación Numérica
    👨‍💻 Estudiante: Henry Higinio Quispe Ramos
    📚 Código: 194926
    🏫 UNAP - Facultad de Ingeniería Estadística e Informática
    📧 Email: hequisper@est.unap.edu.pe
    👨‍🏫 Docente: Ing. Fred Torres Cruz
    `);
});

// CSS adicional para las animaciones y efectos
const additionalCSS = `
    /* Animaciones */
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
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out;
    }
    
    /* Grid de información mejorado */
    .info-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        margin-top: 2rem;
    }
    
    .info-column {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
    
    .info-card {
        background: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        border: 1px solid #e2e8f0;
        transition: all 0.3s ease;
    }
    
    .info-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
    
    .info-header {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        margin-bottom: 2rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid #e2e8f0;
    }
    
    .student-details h3 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        color: #1e293b;
    }
    
    .student-role {
        color: #64748b;
        font-size: 1rem;
    }
    
    .personal-data {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    
    .data-group h4 {
        font-size: 1.1rem;
        margin-bottom: 1rem;
        color: #1e293b;
        font-weight: 600;
    }
    
    .data-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: #f8fafc;
        border-radius: 8px;
        margin-bottom: 0.75rem;
        transition: all 0.3s ease;
    }
    
    .data-item:hover {
        background: #f1f5f9;
        transform: translateX(5px);
    }
    
    .data-icon {
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, #2563eb, #06b6d4);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1rem;
        flex-shrink: 0;
    }
    
    .data-content {
        flex: 1;
    }
    
    .data-content label {
        display: block;
        font-size: 0.8rem;
        color: #64748b;
        margin-bottom: 0.25rem;
        font-weight: 500;
    }
    
    .data-content span {
        display: block;
        color: #1e293b;
        font-weight: 600;
    }
    
    .info-card-title {
        font-size: 1.3rem;
        margin-bottom: 1.5rem;
        color: #1e293b;
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .info-card-title i {
        color: #2563eb;
    }
    
    .course-details {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .detail-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: #f8fafc;
        border-radius: 8px;
        transition: all 0.3s ease;
    }
    
    .detail-item:hover {
        background: #f1f5f9;
        transform: translateX(5px);
    }
    
    .detail-icon {
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, #2563eb, #06b6d4);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1rem;
        flex-shrink: 0;
    }
    
    .detail-content label {
        display: block;
        font-size: 0.8rem;
        color: #64748b;
        margin-bottom: 0.25rem;
        font-weight: 500;
    }
    
    .detail-content span {
        display: block;
        color: #1e293b;
        font-weight: 600;
    }
    
    .links-grid {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    
    .resource-link {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: #f8fafc;
        border-radius: 8px;
        text-decoration: none;
        color: inherit;
        transition: all 0.3s ease;
        border: 1px solid transparent;
    }
    
    .resource-link:hover {
        background: white;
        border-color: #2563eb;
        transform: translateX(5px);
    }
    
    .link-icon {
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, #2563eb, #06b6d4);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.1rem;
        flex-shrink: 0;
    }
    
    .link-content {
        flex: 1;
    }
    
    .link-title {
        display: block;
        font-weight: 600;
        color: #1e293b;
        margin-bottom: 0.25rem;
    }
    
    .link-desc {
        display: block;
        font-size: 0.8rem;
        color: #64748b;
    }
    
    .link-arrow {
        color: #64748b;
        transition: color 0.3s ease;
    }
    
    .resource-link:hover .link-arrow {
        color: #2563eb;
    }
    
    /* Notificaciones GitHub */
    .github-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        border-left: 4px solid #2563eb;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        z-index: 3000;
        max-width: 300px;
    }
    
    .github-notification.show {
        transform: translateX(0);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-content i {
        color: #2563eb;
        font-size: 1.2rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 1.25rem;
        cursor: pointer;
        color: #64748b;
        position: absolute;
        top: 0.5rem;
        right: 0.75rem;
    }
    
    /* Scroll to top button */
    .scroll-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #2563eb;
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
        box-shadow: 0 4px 15px rgba(37, 99, 235, 0.4);
        transition: all 0.3s ease;
        z-index: 1000;
    }
    
    .scroll-top:hover {
        background: #1d4ed8;
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(37, 99, 235, 0.6);
    }
    
    /* Navegación activa */
    .nav-link.active {
        color: #2563eb;
        font-weight: 600;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    /* Preloader */
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
        background: #ffffff;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: 'Cargando Programación Numérica...';
        position: fixed;
        top: 60%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10000;
        color: #2563eb;
        font-weight: 600;
        font-size: 1.1rem;
    }
    
    /* Mobile menu styles */
    @media (max-width: 768px) {
        .hamburger {
            display: flex;
        }
        
        .nav-menu {
            position: fixed;
            top: 70px;
            right: -100%;
            background: white;
            width: 80%;
            height: calc(100vh - 70px);
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            padding-top: 2rem;
            transition: right 0.3s ease;
            box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
        }
        
        .nav-menu.active {
            right: 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        .info-grid {
            grid-template-columns: 1fr;
        }
        
        .github-notification {
            right: 10px;
            left: 10px;
            max-width: none;
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

    /* Efectos de carga escalonados */
    .assignment-card, .feature, .data-item, .detail-item, .resource-link {
        opacity: 0;
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .assignment-card:nth-child(1) { animation-delay: 0.1s; }
    .assignment-card:nth-child(2) { animation-delay: 0.2s; }
    .assignment-card:nth-child(3) { animation-delay: 0.3s; }
    
    .feature:nth-child(1) { animation-delay: 0.1s; }
    .feature:nth-child(2) { animation-delay: 0.2s; }
    .feature:nth-child(3) { animation-delay: 0.3s; }
    
    .data-item:nth-child(1) { animation-delay: 0.1s; }
    .data-item:nth-child(2) { animation-delay: 0.2s; }
    .data-item:nth-child(3) { animation-delay: 0.3s; }
    .data-item:nth-child(4) { animation-delay: 0.4s; }
    .data-item:nth-child(5) { animation-delay: 0.5s; }
`;

// Inject additional CSS
const additionalStyle = document.createElement('style');
additionalStyle.textContent = additionalCSS;
document.head.appendChild(additionalStyle);

console.log('JavaScript profesional cargado exitosamente');
