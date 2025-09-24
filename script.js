// Animaciones suaves al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animaciones a las tarjetas
document.querySelectorAll('.activity-card, .stat-card, .info-card, .resource-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Efecto de partículas en movimiento del mouse
document.addEventListener('mousemove', (e) => {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: rgba(102, 126, 234, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 999;
        left: ${e.clientX - 2}px;
        top: ${e.clientY - 2}px;
        animation: cursorParticle 1s ease-out forwards;
    `;
    document.body.appendChild(cursor);
    
    setTimeout(() => cursor.remove(), 1000);
});

// Estilo para la animación de partículas
const style = document.createElement('style');
style.textContent = `
    @keyframes cursorParticle {
        0% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(0) translateY(-20px); }
    }
`;
document.head.appendChild(style);

// Efecto de hover mejorado en las tarjetas
document.querySelectorAll('.activity-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(102, 126, 234, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.background = 'var(--glass-bg)';
    });
});

// Contador animado para las estadísticas
function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = counter.textContent;
        if (!isNaN(target)) {
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 30);
        }
    });
}

// Iniciar contador cuando sea visible
setTimeout(animateCounters, 2500);

// Smooth scroll para enlaces internos
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
