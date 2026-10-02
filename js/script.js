// ===================================
// Idioma actual (lo define js/i18n.js, que se carga antes)
// ===================================
function currentLang() {
    return (window.I18N && window.I18N.getLang()) || 'es';
}

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
// Nav active según página o sección visible
// ===================================
const navLinks = document.querySelectorAll('.nav-menu a');
const isAboutPage = window.location.pathname.includes('about');

if (isAboutPage) {
    // En about.html: marcar solo "Acerca de Mí", sin lógica de scroll
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === 'about.html');
    });
} else {
    // En index.html: activar según sección visible al scrollear
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (window.pageYOffset >= section.offsetTop - 200) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (current && link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

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
// PlayGround — fechas relativas (ES / EN)
// ===================================
(function () {
    const LABELS = {
        es: {
            today:  'Hoy',
            day1:   'Hace 1 día',
            days:   n => `Hace ${n} días`,
            week1:  'Hace 1 semana',
            weeks:  n => `Hace ${n} semanas`,
            month1: 'Hace 1 mes',
            months: n => `Hace ${n} meses`,
            year1:  'Hace 1 año',
            years:  n => `Hace ${n} años`
        },
        en: {
            today:  'Today',
            day1:   '1 day ago',
            days:   n => `${n} days ago`,
            week1:  '1 week ago',
            weeks:  n => `${n} weeks ago`,
            month1: '1 month ago',
            months: n => `${n} months ago`,
            year1:  '1 year ago',
            years:  n => `${n} years ago`
        }
    };

    function updateRelativeDates() {
        const L = LABELS[currentLang()] || LABELS.es;

        document.querySelectorAll('.pg-card-meta[data-date]').forEach(el => {
            const date = new Date(el.dataset.date);
            const diffDays = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24));

            let label;
            if (diffDays <= 0)         label = L.today;
            else if (diffDays === 1)   label = L.day1;
            else if (diffDays < 7)     label = L.days(diffDays);
            else if (diffDays < 14)    label = L.week1;
            else if (diffDays < 30)    label = L.weeks(Math.floor(diffDays / 7));
            else if (diffDays < 60)    label = L.month1;
            else if (diffDays < 365)   label = L.months(Math.floor(diffDays / 30));
            else if (diffDays < 730)   label = L.year1;
            else                       label = L.years(Math.floor(diffDays / 365));

            el.textContent = `LinkedIn · ${label}`;
        });
    }

    updateRelativeDates();
    document.addEventListener('portfolio:languagechange', updateRelativeDates);
})();

// ===================================
// Hero — palabra rotativa (ES / EN)
// ===================================
(function () {
    const word = document.getElementById('hero-rotator');
    if (!word) return;

    const WORDS = {
        es: ['se entienden.', 'se usan.', 'convierten.', 'incluyen.'],
        en: ['make sense.', 'get used.', 'convert.', 'include.']
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const INTERVAL = 2600;
    let idx = 0;
    let timer = null;

    function list() { return WORDS[currentLang()] || WORDS.es; }

    function show(text, animate) {
        if (!animate) { word.textContent = text; return; }
        word.classList.add('is-out');
        setTimeout(() => {
            word.textContent = text;
            word.classList.remove('is-out');
            word.classList.add('is-in');
            void word.offsetWidth; // fuerza el reflow para animar la entrada
            word.classList.remove('is-in');
        }, 450);
    }

    function start() {
        clearInterval(timer);
        idx = 0;
        show(list()[0], false);
        if (reduceMotion) return;
        timer = setInterval(() => {
            idx = (idx + 1) % list().length;
            show(list()[idx], true);
        }, INTERVAL);
    }

    start();
    document.addEventListener('portfolio:languagechange', start);
})();

// ===================================
// Console log
// ===================================
console.log('%c👋 Hola! Bienvenido al portafolio de David Garcia', 'font-size: 16px; font-weight: bold; color: #6C5933;');
console.log('%cSi estás viendo esto, probablemente seas un desarrollador curioso 😄', 'font-size: 12px; color: #646464;');
console.log('%cConectemos: https://www.linkedin.com/in/paulleta/', 'font-size: 12px; color: #6C5933;');