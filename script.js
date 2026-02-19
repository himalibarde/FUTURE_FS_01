// ===== TYPING ANIMATION =====
const titles = [
    "Web Developer.",
    "Full Stack Developer.",
    "MERN Stack Enthusiast."
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeTitle() {
    const currentTitle = titles[titleIndex];
    const displayText = isDeleting 
        ? currentTitle.substring(0, charIndex--)
        : currentTitle.substring(0, charIndex++);
    
    document.getElementById('typingText').textContent = displayText;

    if (!isDeleting && charIndex === currentTitle.length) {
        setTimeout(() => isDeleting = true, pauseTime);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
    }

    setTimeout(typeTitle, isDeleting ? deletingSpeed : typingSpeed);
}

// ===== ACADEMIC EXPERIENCE DATA =====
const experienceData = [
    {
        title: "Viva Institute of Technology, Virar",
        degree: "MCA | CGPA: 7.38/10.0 | Sept 2024 - June 2026",
        description: "Currently pursuing my MCA at Viva Institute of Technology, Virar with a CGPA of 7.38."
    },
    {
        title: "St. John College of Humanities & Sciences",
        degree: "B.Sc (Computer Science) | CGPA: 7.61/10.0 | May 2021 - June 2024",
        description: "Successfully completed my Bachelor's degree from St. John College of Humanities & Sciences, Palghar with a CGPA of 7.61."
    },
    {
        title: "Tarapur Vidya Mandir and Jr. College, Boisar",
        degree: "12th | Percentage: 82.67% | April 2020 - May 2021",
        description: "Completed my 12th grade from Tarapur Vidya Mandir and Jr. College, Boisar with an excellent score of 82.67%."
    },
    {
        title: "Boisar Education Society, Dr. S. D. Vartak Vidyalaya",
        degree: "10th | Percentage: 75.60% | April 2018 - May 2019",
        description: "Successfully completed my 10th grade from Boisar Education Society with a score of 75.60%."
    }
];

// ===== TYPEWRITER EFFECT FOR ACADEMIC EXPERIENCE =====
function typeWriter(element, text, speed) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

function animateExperienceContent(index) {
    const content = document.getElementById('content-' + index);
    const h3 = content.querySelector('h3');
    const degree = content.querySelector('.degree');
    const description = content.querySelector('.description');
    
    h3.innerHTML = '';
    degree.innerHTML = '';
    description.innerHTML = '';
    
    setTimeout(function() { 
        typeWriter(h3, experienceData[index].title, 15); 
    }, 300);
    
    setTimeout(function() { 
        typeWriter(degree, experienceData[index].degree, 15); 
    }, 1200);
    
    setTimeout(function() { 
        typeWriter(description, experienceData[index].description, 12); 
    }, 2100);
}

// ===== CAROUSEL FUNCTIONALITY =====
let currentSlide = 0;
const slides = document.querySelectorAll('.experience-card');
const totalSlides = slides.length;

function changeSlide(direction) {
    slides[currentSlide].classList.remove('active');
    currentSlide += direction;
    
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    
    slides[currentSlide].classList.add('active');
    animateExperienceContent(currentSlide);
}

// ===== THEME TOGGLE =====
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark');
    }
}

// ===== CONTACT FORM SUBMISSION =====
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Create WhatsApp message
            const whatsappMessage = `Name: ${name}%0APhone: ${phone}%0AEmail: ${email}%0AMessage: ${message}`;
            
            // Open WhatsApp
            window.open(`https://wa.me/917498369087?text=${whatsappMessage}`, '_blank');
            
            alert('Opening WhatsApp...');
            this.reset();
        });
    }
});

// ===== INITIALIZATION ON PAGE LOAD =====
window.addEventListener('DOMContentLoaded', function() {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.getElementById('theme-icon');
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    // Start typing animation
    typeTitle();
    
    // Animate first academic experience card
    animateExperienceContent(0);

    // Setup scroll animations with IntersectionObserver
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    }, { 
        threshold: 0.2, 
        rootMargin: '0px 0px -100px 0px' 
    });

    // Observe all animated elements
    document.querySelectorAll('.animate-left, .animate-right').forEach(function(el) {
        observer.observe(el);
    });
});

// ===== SMOOTH SCROLL FOR NAVIGATION =====
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({ 
                behavior: 'smooth' 
            });
        }
    });
});