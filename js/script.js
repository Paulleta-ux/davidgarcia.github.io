// ===================================
// Scroll to Top Button
// ===================================
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===================================
// Smooth Scroll para enlaces internos
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const offsetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        }
    });
});

// ===================================
// Reveal Animations — Intersection Observer
// FIX: usa la clase .is-visible que ya está definida en el CSS,
// en lugar de sobreescribir los estilos inline.
// ===================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
    revealObserver.observe(el);
});

// ===================================
// Header sticky — hide on scroll down
// FIX: usa las clases CSS en lugar de style.transform inline,
// evitando conflictos con las clases .header--hidden y .header--scrolled.
// ===================================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.classList.add('header--scrolled');
        if (currentScroll > lastScroll) {
            header.classList.add('header--hidden');
        } else {
            header.classList.remove('header--hidden');
        }
    } else {
        header.classList.remove('header--scrolled');
        header.classList.remove('header--hidden');
    }

    lastScroll = currentScroll;
});

// ===================================
// Lazy loading de imágenes
// ===================================
if (!('loading' in HTMLImageElement.prototype)) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ===================================
// Prevenir # vacíos
// ===================================
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', e => e.preventDefault());
});

// ===================================
// Nav active según sección visible
// ===================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (window.pageYOffset >= section.offsetTop - 200) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// ===================================
// Handle external links
// ===================================
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.rel = 'noopener noreferrer';
});

// ===================================
// Portfolio Tabs
// ===================================
(function () {
    const btns = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.tab-panel');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;
            btns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
            panels.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            document.getElementById('panel-' + target).classList.add('active');
        });
    });
})();

// ===================================
// PlayGround — fechas relativas
// ===================================
document.querySelectorAll('.pg-card-meta[data-date]').forEach(el => {
    const date = new Date(el.dataset.date);
    const diffDays = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24));

    let label;
    if (diffDays === 0)        label = 'Hoy';
    else if (diffDays === 1)   label = 'Hace 1 día';
    else if (diffDays < 7)     label = `Hace ${diffDays} días`;
    else if (diffDays < 14)    label = 'Hace 1 semana';
    else if (diffDays < 30)    label = `Hace ${Math.floor(diffDays / 7)} semanas`;
    else if (diffDays < 60)    label = 'Hace 1 mes';
    else if (diffDays < 365)   label = `Hace ${Math.floor(diffDays / 30)} meses`;
    else if (diffDays < 730)   label = 'Hace 1 año';
    else                       label = `Hace ${Math.floor(diffDays / 365)} años`;

    el.textContent = `LinkedIn · ${label}`;
});

// ===================================
// Console log
// ===================================
console.log('%c👋 Hola! Bienvenido al portafolio de David Garcia', 'font-size: 16px; font-weight: bold; color: #6C5933;');
console.log('%cSi estás viendo esto, probablemente seas un desarrollador curioso 😄', 'font-size: 12px; color: #646464;');
console.log('%cConectemos: https://www.linkedin.com/in/paulleta/', 'font-size: 12px; color: #6C5933;');