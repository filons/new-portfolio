// Animation fade-in lors du scroll
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.fade-in-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.15
    });
    sections.forEach(section => {
        observer.observe(section);
    });
});

const phrases=["Bonjour je suis Eric Ketchadji.",
    "Étudiant à l'école Nationale Superieur Polytechnique de Maroua.",
    "développeur passionné, créatif et curieux,",
    "toujours prêt à relever de nouveaux défis numériques."
];
let phraseIndex=0;
let charIndex=0;
let isDeleting=false;
const speed=100;
const eraseSpeed=50;
const delai=1500;

function Writer(){
    const currentPhrase=phrases[phraseIndex];
    const target=document.getElementById("writer");
    if(!isDeleting){
        target.textContent=currentPhrase.substring(0,charIndex + 1);
        charIndex++;
        if(charIndex===currentPhrase.length){
            isDeleting=true;
            setTimeout(Writer,delai);
            return;
        }
    }else{
        target.textContent=currentPhrase.substring(0,charIndex - 1);
        charIndex--;
        if(charIndex===0){
            isDeleting=false;
            phraseIndex=(phraseIndex+1)%phrases.length;
        }
    }
    setTimeout(Writer,isDeleting ? eraseSpeed:speed);
}
document.addEventListener("DOMContentLoaded",Writer);

// TOUT LE CODE PRINCIPAL DANS UN SEUL DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    console.log('=== DÉBUT DE L\'INITIALISATION ===');
    
    // === MENU BURGER ===
    const burgerButton = document.querySelector('.burger');
    const navbar = document.querySelector('.navbar');
    const header = document.querySelector('header');

    function updateNavbarTop() {
        if (!header) return;
        const headerRect = header.getBoundingClientRect();
        const headerHeight = headerRect.height;
        document.documentElement.style.setProperty('--navbar-top', headerHeight + 'px');
    }

    if (burgerButton && navbar) {
        updateNavbarTop();
        window.addEventListener('resize', updateNavbarTop);
        window.addEventListener('scroll', updateNavbarTop, { passive: true });

        burgerButton.addEventListener('click', function () {
            const isOpen = navbar.classList.toggle('open');
            burgerButton.classList.toggle('is-active', isOpen);
            burgerButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            document.body.classList.toggle('no-scroll', isOpen);
            if (isOpen) {
                navbar.classList.add('anim');
                setTimeout(() => navbar.classList.remove('anim'), 300);
            }
        });
        navbar.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navbar.classList.remove('open');
                burgerButton.classList.remove('is-active');
                burgerButton.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // === SYSTÈME DE FILTRAGE ===
    function setupFilter(containerSelector, itemSelector, buttons) {
        const container = document.querySelector(containerSelector);
        if (!container) {
            console.log('❌ Container non trouvé:', containerSelector);
            return;
        }

        const items = container.querySelectorAll(itemSelector);
        console.log('✅ Éléments trouvés:', items.length, 'dans', containerSelector);
        console.log('✅ Boutons trouvés:', buttons.length);

        buttons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                console.log('🎯 Filtre sélectionné:', filter);
                
                // Mettre à jour l'état actif des boutons
                buttons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filtrer les éléments
                items.forEach(item => {
                    const category = item.getAttribute('data-category');
                    console.log('📋 Élément:', item, 'Catégorie:', category);
                    
                    if (filter === 'all' || category === filter) {
                        item.classList.remove('hidden');
                        console.log('✅ Affiché:', category);
                    } else {
                        item.classList.add('hidden');
                        console.log('❌ Caché:', category);
                    }
                });
            });
        });
    }

    // Configuration des filtres pour les langages
    const langagesButtons = document.querySelectorAll('#skills h3:first-of-type + .filter-buttons .filter-btn');
    setupFilter('.skills-langages', '.skill-item', langagesButtons);
    
    // Configuration des filtres pour les outils
    const outilsButtons = document.querySelectorAll('#skills h3:last-of-type + .filter-buttons .filter-btn');
    setupFilter('.skills-tools', '.skill-item', outilsButtons);
    
    // Configuration des filtres pour les projets
    const projetsButtons = document.querySelectorAll('#projets .filter-buttons .filter-btn');
    console.log('🔍 Boutons projets trouvés:', projetsButtons.length);
    setupFilter('.grille-projets', '.projet-card', projetsButtons);

    // === BOUTONS DES SERVICES ===
    const serviceButtons = document.querySelectorAll('.service-btn');
    
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceItem = this.closest('.service-item');
            const serviceTitle = serviceItem.querySelector('h2').textContent;
            
            // Animation de clic
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            console.log('Service sélectionné:', serviceTitle);
        });
    });
    
    // Animation d'entrée pour les services
    const serviceItems = document.querySelectorAll('.service-item');
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.1 });
    
    serviceItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        serviceObserver.observe(item);
    });

    // === CARTES DE PROJETS ===
    const projetLinks = document.querySelectorAll('.projet-link');
    
    projetLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const projetCard = this.closest('.projet-card');
            const projetTitle = projetCard.querySelector('h3').textContent;
            const linkType = this.getAttribute('title');
            
            // Animation de clic
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            console.log(`${linkType} pour le projet: ${projetTitle}`);
        });
    });
    
    // Animation d'entrée pour les cartes de projets
    const projetCards = document.querySelectorAll('.projet-card');
    const projetObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.1 });
    
    projetCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        projetObserver.observe(card);
    });

    console.log('=== FIN DE L\'INITIALISATION ===');
});

