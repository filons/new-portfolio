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

document.addEventListener('DOMContentLoaded', function () {
    const burgerButton = document.querySelector('.burger');
    const navbar = document.querySelector('.navbar');
    if (burgerButton && navbar) {
        burgerButton.addEventListener('click', function () {
            const isOpen = navbar.classList.toggle('open');
            burgerButton.classList.toggle('is-active', isOpen);
            burgerButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            document.body.classList.toggle('no-scroll', isOpen);
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
});

