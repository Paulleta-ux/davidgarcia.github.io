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
            "meta.title": "David García | Product Designer & UX Researcher in Bogotá",
            "meta.description": "David García Murcia is a junior Product Designer grounded in UX Research, based in Bogotá, Colombia. He designs digital products from user research to prototype and production: e-commerce, augmented reality apps, inclusive video games and digital strategy.",
            "meta.ogDescription": "Product Design and UX Research case studies: interactive museums, inclusion, co-design and e-commerce with measurable results.",
            "meta.locale": "en_US",
            "about.meta.title": "About Me - David García | Product Designer",
            "about.meta.description": "Learn more about David García Murcia, a Product Designer and UX Researcher from Bogotá, Colombia.",
            "lang.label": "Language",
            "nav.home": "Home",
            "nav.work": "Work",
            "nav.about": "About Me",
            "scrollTop": "Back to top",
            "hero.imgAlt": "David García, Product Designer and UX Researcher",
            "hero.h1a": "I design digital products that",
            "hero.h1sr": "make sense, get used and drive results.",
            "hero.desc": "I start by understanding people and <span class=\"highlight-underline\">end by measuring the impact</span>. I take each product from user interviews to prototype and into production.",
            "hero.ctaWork": "See case studies",
            "hero.cv": "Download CV",
            "hero.cvAria": "Download David García's résumé as a PDF",
            "hero.cvHref": "files/CV_DavidGarcia%20(EN).pdf",
            "hero.cvDownload": "David-Garcia-CV-EN.pdf",
            "ach.1": "Winner · An-Archaeology Hackathon — IDARTES × Utadeo",
            "ach.2": "Speaker · 3rd Research Groups Meeting — U. de La Sabana",
            "ach.3": "Exhibition · XXIII International Image Festival",
            "ach.4": "Talk · DIN'T research group — Universidad Nacional",
            "ach.5": "Speaker · IX Research Groups Meeting — Utadeo",
            "ach.6": "Challenge winner · La CoCreadora × Vínculo networking",
            "ach.7": "3D web design micro-workshop — MediaLab Idartes",
            "ach.8": "UI Design course — uxcristopher",
            "ach.9": "Information Architecture — Tech Academy",
            "portfolio.title": "Work",
            "portfolio.lead": "Case studies with the full process, web projects with measurable results, and personal explorations.",
            "portfolio.tablistAria": "Portfolio categories",
            "tab.cases": "Case studies",
            "tab.web": "Web Experiences",
            "tab.lab": "Lab",
            "label.result": "Result:",
            "meta.ongoing": "Ongoing",
            "meta.winner": "Winner",
            "btn.viewCase": "View case study",
            "btn.viewApp": "View app",
            "btn.play": "Play prototype",
            "btn.viewSite": "View website",
            "btn.viewProjectSite": "View project",
            "btn.viewExperience": "View experience",
            "tag.strategy": "UX Strategy",
            "tag.analytics": "Analytics",
            "tag.prototyping": "Prototyping",
            "tag.ar": "Augmented reality",
            "tag.uxstrategy": "UX Strategy",
            "tag.accessibility": "Accessibility",
            "tag.interaction": "Interaction design",
            "tag.codesign": "Co-design",
            "tag.participatory": "Participatory research",
            "tag.narratives": "Visual storytelling",
            "tag.speculative": "Speculative design",
            "tag.expertResearch": "Expert research",
            "tag.visualSystems": "Visual systems",
            "imek.imgAlt": "IMEK - Digital strategy and redesign",
            "imek.year": "2026 – present",
            "imek.h3": "Refocusing a website on what truly creates value",
            "imek.p": "The website was built to ask for donations, but the organization's main value lies in its consulting. Through a UX/UI and SEO audit, in-depth interviews with researchers (JTBD) and a Value Proposition Canvas, I refocused the digital strategy and now lead the redesign toward an MVP.",
            "imek.result": "a digital strategy focused on generating consulting opportunities; analytics with GA4, Search Console and Clarity; an MVP planned with wireframes, a prototype and usability testing.",
            "maloka.team": "Team of 4",
            "maloka.h3": "A phygital experience for families at a museum",
            "maloka.h4": "Universo Maloka — brochure + augmented reality app",
            "maloka.p": "In collaboration with the Maloka museum, I led the design of an extended experience for families: a printed brochure connected to an augmented reality app. I handled user research, UI, prototyping and stakeholder management.",
            "maloka.result": "testing with UX experts and families revealed 3 critical issues (initial context, connection to the exhibit room and the map) that I turned into improvements.",
            "neuro.h3": "A safe video game for people on the autism spectrum",
            "neuro.h4": "Neuronautas — video game",
            "neuro.p": "I led product, research and interaction design for an accessible, sensory-friendly video game that makes neurodivergent experiences visible, all the way to a published playable prototype.",
            "neuro.result": "a user on the autism spectrum validated it as a safe space to explore risk.",
            "ndm.imgAlt": "No hay dolores menores - Co-design with school students",
            "ndm.role": "Researcher · SemillaLab, Utadeo",
            "ndm.h3": "Co-designing with school students to talk about mental health",
            "ndm.h4": "No hay dolores menores — transmedia project",
            "ndm.p": "I co-designed participatory methods on mental health and visual storytelling with school communities in Ciudad Bolívar, and turned them into a replicable guide for other facilitators.",
            "ndm.result": "26 workshops delivered; the project was presented at the 2024 International Image Festival and at two research group meetings.",
            "mitos.imgAlt": "Mitos del Hermano Mayor",
            "mitos.role": "Design lead",
            "mitos.h3": "Speculative design on ancestral knowledge",
            "mitos.h4": "Mitos del Hermano Mayor — extended experience",
            "mitos.p": "I coordinated the entire process, from research with anthropologists to the conceptual models, infographics and style guide of an experience about ancestral knowledge.",
            "mitos.result": "winning project of the An-Archaeology Colloquium Hackathon (IDARTES × Utadeo).",
            "web.intro": "Three shopping experiences redesigned end to end in 2025, with a focus on the user experience.",
            "link.viewCase": "View case →",
            "link.viewSite": "View website →",
            "link.viewPost": "View post →",
            "link.viewExperience": "View experience →",
            "backyard.h3": "Rethinking e-commerce conventions",
            "backyard.p": "Audit and redesign toward a minimalist experience, free of intrusive promotions and consistent with the brand manual.",
            "backyard.result": "From audit to launch",
            "magnus.h3": "UX + SEO Optimization",
            "magnus.p": "Redesign through iterations centered on the shopping experience, together with the site's SEO strategy.",
            "magnus.result": "+25% organic clicks · +15% CTR",
            "regatta.tag": "Migration · Shopify",
            "regatta.h3": "WooCommerce to Shopify migration",
            "regatta.p": "I migrated the store to a new platform with a complete structure and design, focused on a clearer purchase flow.",
            "regatta.result": "+30% in sales",
            "lab.intro": "Prototypes, talks and explorations I work on outside of projects.",
            "kind.talk": "Talk",
            "kind.prototype": "Prototype",
            "kind.prototypeAI": "AI prototype",
            "kind.workshop": "Workshop",
            "kind.reflection": "Reflection",
            "kind.event": "Event",
            "pg.featured": "Featured",
            "pg.finance.title": "Personal finance app",
            "pg.finance.desc": "A personal finance app that simplifies expense tracking through AI, voice commands and automatic receipt recognition from photos.",
            "skills.title": "Skills & Tools",
            "skills.process": "UX Process",
            "level.main": "Main",
            "level.intermediate": "Intermediate",
            "level.analytics": "Analytics",
            "skills.more": "More tools",
            "footer.ctaLabel": "Looking for a Product Designer for your team?",
            "footer.ctaHeading": "Let's talk.",
            "footer.phone": "Phone",
            "about.title": "About Me",
            "about.p1": "My name is <strong>David García Murcia</strong> and I'm from <strong>Bogotá, Colombia</strong>. I'm a <strong>Product Designer</strong> grounded in <strong>UX Research</strong>: I care about creating functional, clear, people-centered digital products, and about measuring whether they actually work.",
            "about.p3": "I currently work as a <strong>Product Designer &amp; UX Researcher at IMEK</strong>, where I lead the redesign of its digital strategy. Before that, I designed <strong>three online shopping experiences</strong>, from audit to launch. I see design as a tool to achieve goals, beyond the visual.",
            "rec.title": "Recognitions",
            "rec.lead": "Awards, talks and collaborations I've gathered along the way.",
            "about.p2": "I studied <strong>Interactive Design</strong> at <strong>Universidad Jorge Tadeo Lozano</strong>, where I worked on interactive museum projects, cultural initiatives, social change experiences and digital products, always grounded in user research and real problem solving.",
            "about.p4": "In my free time I like watching <strong>TV series and movies</strong>, <strong>reading</strong>, <strong>playing video games</strong> (especially on my <strong>Xbox</strong>) and I really enjoy <strong>working out</strong>, particularly <strong>jumping rope</strong>.",
            "pg.talk.alt": "David García giving his first talk at Universidad Nacional de Colombia",
            "pg.talk.title": "My first talk: \"How to gain experience while waiting for your first experience\"",
            "pg.talk.desc": "I gave my first talk for the DIN'T research group at the Faculty of Arts – Universidad Nacional de Colombia, sharing my personal professional path as an Interactive and UX designer.",
            "pg.album.title": "Augmented Reality Prototype — FIFA World Cup 2026™ Album",
            "pg.album.desc": "I modeled players with Hi3D, animated them with Mixamo and built an augmented reality experience with A-Frame to take collecting the Panini album far beyond simply sticking stickers.",
            "pg.crowd.title": "Behavioral Design and the traffic light game",
            "pg.crowd.desc": "A reflection on Crowd Control, a program that redesigned everyday moments such as waiting at a traffic light, turning it into a gamified experience. The actual waiting time isn't reduced, but the user's perception is transformed and better behaviors are encouraged.",
            "pg.finance.alt": "Personal finance app",
            "pg.aframe.alt": "Memory Garden - A-Frame",
            "pg.aframe.title": "Memory Garden of Everyday Spaces",
            "pg.aframe.desc": "I took part in the Micro-workshop organized by IDARTES and the Cinemateca Distrital, exploring interactive environments with A-Frame in a collaborative project.",
            "pg.network.title": "First networking event with La CoCreadora and Vínculo",
            "pg.network.desc": "A really enjoyable experience where I ended up winning the challenge and taking home the Alinna game.",
            "pg.principito.desc": "Interactive experience created for the #FigmaMakeathon. Designed to be viewed on a computer.",
            "maloka.imgAlt": "Maloka - Extended Experience",
            "neuro.imgAlt": "Neuronautas - Video game",
            "about.imgAlt": "David Garcia at a waterfall",
            "skill.prototyping": "Prototyping",
            "skill.usability": "Usability Testing",
            "skill.responsive": "Responsive Design",
            "skill.ia": "Information Architecture"
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