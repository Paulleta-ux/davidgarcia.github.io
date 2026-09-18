/* ==========================================================
   i18n — Selector de idioma ES / EN

   Cómo funciona:
   - El HTML conserva el texto en ESPAÑOL (idioma base).
   - Cada elemento traducible lleva un atributo data-*:
       data-i18n="clave"            → reemplaza el texto (textContent)
       data-i18n-html="clave"       → reemplaza el HTML interno (para textos con <strong>, <span>, etc.)
       data-i18n-attr="alt:clave;aria-label:otra.clave"
                                    → traduce atributos (alt, aria-label, content, href...)
   - Este archivo solo guarda las traducciones al INGLÉS (DICT.en).
     El español se lee del propio HTML la primera vez que carga la página.

   Para agregar un texto nuevo:
   1) Ponle data-i18n="mi.clave" al elemento en el HTML.
   2) Agrega "mi.clave": "English text" en DICT.en más abajo.
   ========================================================== */
(function () {
    'use strict';

    var STORAGE_KEY = 'portfolio-lang';
    var SUPPORTED = ['es', 'en'];
    var DEFAULT_LANG = 'es';

    // true  → la primera vez, si el navegador NO está en español, muestra inglés.
    // false → siempre arranca en español hasta que la persona cambie el idioma.
    var DETECT_BROWSER_LANG = true;

    var DICT = {
        en: {

            /* ---------- Meta / SEO (index) ---------- */
            "meta.title": "David García's Portfolio | UX/UI Interactive Designer",
            "meta.description": "David García Murcia is an Interactive Designer based in Bogotá, Colombia, trained in UX Research, UX Strategy and UI Design. He has worked on interactive museums, cultural projects, social change experiences and e-commerce, applying user research, information architecture, usability and responsive design to solve real business and experience problems.",
            "meta.ogDescription": "UX Research, UX Strategy and UI applied to digital experiences, interactive museums and e-commerce.",
            "meta.locale": "en_US",

            /* ---------- Meta / SEO (about) ---------- */
            "about.meta.title": "About Me - David Garcia",
            "about.meta.description": "Learn more about David García Murcia, an interactive designer from Bogotá focused on UX/UI and digital experiences.",

            /* ---------- Común ---------- */
            "lang.label": "Language",
            "nav.home": "Home",
            "nav.about": "About Me",
            "scrollTop": "Back to top",

            /* ---------- Hero ---------- */
            "hero.imgAlt": "David García, Interactive Designer specialized in UX and UI",
            "hero.h1Aria": "I start by understanding.",
            "hero.desc": "Understanding is my way of <span class=\"highlight-underline\">reducing uncertainty</span>. I research behavior and turn findings into design decisions with real impact.",
            "hero.cv": "Download CV",
            "hero.cvAria": "Download David García's résumé as a PDF",
            "hero.cvHref": "files/CV_DavidGarcia%20(EN).pdf",
            "hero.cvDownload": "David-Garcia-CV-EN.pdf",

            /* ---------- Portafolio ---------- */
            "portfolio.title": "Portfolio",
            "portfolio.tablistAria": "Portfolio categories",
            "tab.web": "Web Experiences",
            "label.web": "Web Pages",

            "btn.viewProject": "View Project",
            "btn.viewApp": "View App",

            /* Maloka */
            "maloka.imgAlt": "Maloka - Extended Experience",
            "maloka.h3": "Phygital experience for families",
            "maloka.h4": "Extended Experience",
            "maloka.p": "As Team Leader in collaboration with Maloka, I led the design of an extended experience for families (a printed brochure and an augmented reality app), handling user research, UI, prototyping and stakeholder management.",

            /* Neuronautas */
            "neuro.imgAlt": "Neuronautas - Video game",
            "neuro.tag": "UX Strategy · Inclusion",
            "neuro.h3": "Video game for people on the autism spectrum",
            "neuro.h4": "Video game",
            "neuro.p": "I led the development of an accessible, sensory-friendly video game for people on the autism spectrum, in charge of UX strategy, research and interaction design, with a focus on inclusion and on making neurodivergent experiences visible.",

            /* Mitos */
            "mitos.tag": "Speculative Design",
            "mitos.h3": "Speculative Design on Ancestral Knowledge",
            "mitos.h4": "Extended experience - Hackathon winner with IDARTES",
            "mitos.p": "Design lead on a speculative project about ancestral knowledge, I coordinated the entire process, from research with anthropologists to the development of conceptual models, infographics and a style guide, highlighting skills in research and digital product design.",

            /* Web: Backyard */
            "link.viewCase": "View case →",
            "link.viewSite": "View website →",
            "backyard.overlay": "Home remodeling e-commerce",
            "backyard.tag": "UI · Brand · Shopify",
            "backyard.h3": "Rethinking e-commerce",
            "backyard.p": "Platform redesign based on the brand manual, improving visual consistency and the appeal of the interface.",

            /* Web: Magnus */
            "magnus.overlay": "Barbershop products e-commerce",
            "magnus.h3": "UX + SEO Optimization",
            "magnus.p": "I redesigned the site through iterations centered on the user experience, aiming to improve conversion and sales.",

            /* Web: Regatta */
            "regatta.overlay": "Men's clothing e-commerce",
            "regatta.h3": "WooCommerce to Shopify Migration",
            "regatta.p": "Migration of the site from WordPress to the Shopify platform, including the full structure and design.",

            /* ---------- PlayGround ---------- */
            "link.viewPost": "View post →",
            "link.viewExperience": "View experience →",
            "pg.featured": "Featured",

            "pg.talk.alt": "David García giving his first talk at Universidad Nacional de Colombia",
            "pg.talk.title": "My first talk: \"How to gain experience while waiting for your first experience\"",
            "pg.talk.desc": "I gave my first talk for the DIN'T research group at the Faculty of Arts – Universidad Nacional de Colombia, sharing my personal professional path as an Interactive and UX designer.",

            "pg.album.title": "Augmented Reality Prototype — FIFA World Cup 2026™ Album",
            "pg.album.desc": "I modeled players with Hi3D, animated them with Mixamo and built an augmented reality experience with A-Frame to take collecting the Panini album far beyond simply sticking stickers.",

            "pg.crowd.title": "Behavioral Design and the traffic light game",
            "pg.crowd.desc": "A reflection on Crowd Control, a program that redesigned everyday moments such as waiting at a traffic light, turning it into a gamified experience. The actual waiting time isn't reduced, but the user's perception is transformed and better behaviors are encouraged.",

            "pg.finance.alt": "Personal finance app",
            "pg.finance.title": "Personal finance app",
            "pg.finance.desc": "A personal finance app that simplifies expense tracking through AI, voice commands and automatic receipt recognition from photos.",

            "pg.aframe.alt": "Memory Garden - A-Frame",
            "pg.aframe.title": "Memory Garden of Everyday Spaces",
            "pg.aframe.desc": "I took part in the Micro-workshop organized by IDARTES and the Cinemateca Distrital, exploring interactive environments with A-Frame in a collaborative project.",

            "pg.network.title": "First networking event with La CoCreadora and Vínculo",
            "pg.network.desc": "A really enjoyable experience where I ended up winning the challenge and taking home the Alinna game.",

            "pg.principito.desc": "Interactive experience created for the #FigmaMakeathon. Designed to be viewed on a computer.",

            /* ---------- Skills ---------- */
            "skills.title": "Skills & Tools",
            "skills.process": "UX Process",
            "skill.prototyping": "Prototyping",
            "skill.usability": "Usability Testing",
            "skill.responsive": "Responsive Design",
            "skill.ia": "Information Architecture",
            "level.main": "Main",
            "level.intermediate": "Intermediate",
            "skills.more": "More tools",

            /* ---------- Footer ---------- */
            "footer.ctaLabel": "Have a project in mind?",
            "footer.ctaHeading": "Let's talk.",
            "footer.phone": "Phone",

            /* ---------- About ---------- */
            "about.title": "About Me",
            "about.imgAlt": "David Garcia at a waterfall",
            "about.p1": "My name is <strong>David García Murcia</strong> and I'm from <strong>Bogotá, Colombia</strong>. I'm an interactive designer focused on <strong>UX/UI</strong>, interested in creating functional, clear, people-centered digital experiences.",
            "about.p2": "I studied <strong>Interactive Design</strong> at <strong>Universidad Jorge Tadeo Lozano</strong>, where I worked on interactive museum projects, cultural initiatives, social change experiences and digital products, always grounded in user research and real problem solving.",
            "about.p3": "I've taken part in <strong>web and e-commerce projects</strong>, collaborating with multidisciplinary teams and applying principles of usability, accessibility and responsive design. I see design as a tool to achieve goals, beyond the visual.",
            "about.p4": "In my free time I like watching <strong>TV series and movies</strong>, <strong>reading</strong>, <strong>playing video games</strong> (especially on my <strong>Xbox</strong>) and I really enjoy <strong>working out</strong>, particularly <strong>jumping rope</strong>.",

            "rec.title": "Recognitions",
            "rec.subtitle": "Recognitions earned for interactive design and UX projects in academic and professional contexts.",
            "rec.viewProject": "View project →",
            "rec.viewDetails": "View details →",
            "rec.viewCert": "View certificate →",

            "rec.1.alt": "Research group logo",
            "rec.1.h3": "Member of the Digital Content Laboratory",
            "rec.1.p": "Member of the transmedia project No hay dolores menores, developed collaboratively with school communities in Ciudad Bolívar.",

            "rec.2.alt": "International Image Festival",
            "rec.2.h3": "Participation in the exhibition \"A Través de las Grietas\" (\"Through the Cracks\")",
            "rec.2.p": "Participation in the XXIII International Image Festival, presenting an interactive artifact based on cooperation.",

            "rec.3.h3": "Winner of the An-Archaeology Colloquium Hackathon — IDARTES",
            "rec.3.p": "In this project, I collaborated with my teammates on a speculative design challenge centered on our own interpretations of ancestral cultures and knowledge.",

            "rec.4.alt": "Research group speaker",
            "rec.4.h3": "Speaker at the 3rd Audiovisual Research-Creation Research Groups Meeting"
            // rec.4.p reutiliza "rec.1.p" (el HTML original tiene el mismo texto en ambas tarjetas)
        }
    };

    /* ---------- Utilidades ---------- */

    function getSaved() {
        try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
    }

    function save(lang) {
        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* modo privado, etc. */ }
    }

    function isSupported(lang) {
        return SUPPORTED.indexOf(lang) !== -1;
    }

    // Prioridad: ?lang=en en la URL > idioma guardado > idioma del navegador > español
    function detectLang() {
        try {
            var fromUrl = new URLSearchParams(window.location.search).get('lang');
            if (isSupported(fromUrl)) { save(fromUrl); return fromUrl; }
        } catch (e) { /* navegadores muy viejos */ }

        var saved = getSaved();
        if (isSupported(saved)) return saved;

        if (DETECT_BROWSER_LANG) {
            var nav = (navigator.languages && navigator.languages[0]) || navigator.language || '';
            if (nav) return nav.toLowerCase().indexOf('es') === 0 ? 'es' : 'en';
        }
        return DEFAULT_LANG;
    }

    function parseAttrs(el) {
        return (el.getAttribute('data-i18n-attr') || '')
            .split(';')
            .map(function (pair) {
                var i = pair.indexOf(':');
                return i > 0 ? { attr: pair.slice(0, i).trim(), key: pair.slice(i + 1).trim() } : null;
            })
            .filter(Boolean);
    }

    function translate(lang, key, fallback) {
        if (lang === DEFAULT_LANG) return fallback;
        var dict = DICT[lang];
        if (dict && Object.prototype.hasOwnProperty.call(dict, key)) return dict[key];
        console.warn('[i18n] Falta la traducción "' + lang + '" para: ' + key);
        return fallback;
    }

    var SELECTOR = '[data-i18n], [data-i18n-html], [data-i18n-attr]';

    // Guarda el contenido original (español) de cada elemento traducible
    function collectOriginals() {
        document.querySelectorAll(SELECTOR).forEach(function (el) {
            var orig = {};
            if (el.hasAttribute('data-i18n')) orig.text = el.textContent;
            if (el.hasAttribute('data-i18n-html')) orig.html = el.innerHTML;
            if (el.hasAttribute('data-i18n-attr')) {
                orig.attrs = {};
                parseAttrs(el).forEach(function (p) { orig.attrs[p.attr] = el.getAttribute(p.attr); });
            }
            el.__i18n = orig;
        });
    }

    var currentLang = DEFAULT_LANG;

    function apply(lang) {
        document.querySelectorAll(SELECTOR).forEach(function (el) {
            var orig = el.__i18n;
            if (!orig) return;

            if (orig.text !== undefined) {
                el.textContent = translate(lang, el.getAttribute('data-i18n'), orig.text);
            }
            if (orig.html !== undefined) {
                el.innerHTML = translate(lang, el.getAttribute('data-i18n-html'), orig.html);
            }
            if (orig.attrs) {
                parseAttrs(el).forEach(function (p) {
                    el.setAttribute(p.attr, translate(lang, p.key, orig.attrs[p.attr]));
                });
            }
        });

        document.documentElement.lang = lang;

        document.querySelectorAll('.lang-btn').forEach(function (btn) {
            btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
        });

        currentLang = lang;
    }

    function setLang(lang) {
        if (!isSupported(lang) || lang === currentLang) return;
        save(lang);
        apply(lang);
        document.dispatchEvent(new CustomEvent('portfolio:languagechange', { detail: { lang: lang } }));
    }

    /* ---------- Init ---------- */
    collectOriginals();
    apply(detectLang());

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
        btn.addEventListener('click', function () { setLang(btn.dataset.lang); });
    });

    window.I18N = {
        getLang: function () { return currentLang; },
        setLang: setLang
    };
})();