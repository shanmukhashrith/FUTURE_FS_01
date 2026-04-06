// 1. Navigation & Scroll Logic
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('sticky');
    else navbar.classList.remove('sticky');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });

    if (window.scrollY > 500) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
});

// 2. Mobile Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('mobile-active');
    // Animate hamburger to X
    hamburger.classList.toggle('toggle');
});

// 3. Scroll Reveal Animations
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealOnScroll.observe(el));

// 4. Skill Bar Animations
const skillBars = document.querySelectorAll(".progress-bar span");
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const targetWidth = bar.getAttribute('data-percent');
            bar.style.width = targetWidth;
            skillObserver.unobserve(bar);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// 5. Tactical 3D Tilt Effect
const tiltCards = document.querySelectorAll(".tactical-card");
tiltCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = -(y - rect.height / 2) / 30; // Subtle movement
        const rotateY = (x - rect.width / 2) / 30;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
    });
});

// 6. Tactical Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorGlow = document.querySelector('.cursor-glow');

// Trailing delay logic
let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Dot follows instantly
    if(cursorDot) {
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    }
});

// Glow follows with a slight delay for a smooth, high-tech feel
function animateCursor() {
    let distX = mouseX - glowX;
    let distY = mouseY - glowY;
    
    glowX += distX * 0.2;
    glowY += distY * 0.2;
    
    if(cursorGlow) {
        cursorGlow.style.left = `${glowX}px`;
        cursorGlow.style.top = `${glowY}px`;
    }
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effect for clickable elements
const clickables = document.querySelectorAll('a, button, .tactical-card');
clickables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorGlow.style.width = '60px';
        cursorGlow.style.height = '60px';
        cursorGlow.style.backgroundColor = 'rgba(0, 229, 255, 0.1)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
        cursorGlow.style.width = '40px';
        cursorGlow.style.height = '40px';
        cursorGlow.style.backgroundColor = 'transparent';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// 7. Typing Effect
const typingText = document.querySelector("#typing");
const roles = ["Software Engineer", "Systems Architect", "Problem Solver"];
let roleIndex = 0;
let charIndex = 0;

function type() {
    if (!typingText) return;
    if (charIndex < roles[roleIndex].length) {
        typingText.textContent += roles[roleIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (!typingText) return;
    if (charIndex > 0) {
        typingText.textContent = roles[roleIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, 500);
    }
}

document.addEventListener("DOMContentLoaded", type);

// 8. Form Submission Feedback
const contactForm = document.getElementById('contact-form');
const submitBtn = contactForm ? contactForm.querySelector('.submit-btn') : null;

if (contactForm && submitBtn) {
    const btnText = submitBtn.querySelector('span');
    const btnIcon = submitBtn.querySelector('i');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        btnText.textContent = 'Encrypting...';
        btnIcon.className = 'fas fa-spinner fa-spin';
        
        setTimeout(() => {
            btnText.textContent = 'Transmission Sent';
            btnIcon.className = 'fas fa-check-circle';
            submitBtn.style.background = 'var(--accent-primary)';
            submitBtn.style.color = 'var(--bg-base)';
            
            setTimeout(() => {
                contactForm.reset();
                btnText.textContent = 'Transmit';
                btnIcon.className = 'fas fa-satellite-dish';
                submitBtn.style.background = 'rgba(0, 229, 255, 0.1)';
                submitBtn.style.color = 'var(--accent-primary)';
            }, 3000);
            
        }, 1500);
    });
}
// ==========================================
// 9. Batcomputer Decryption Glitch Effect
// ==========================================
const title = document.querySelector('.cinematic-title');

if (title) {
    const originalText = title.textContent;
    // The characters it will cycle through during the "glitch"
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>[]{}';
    
    function glitchText() {
        let iterations = 0;
        
        const interval = setInterval(() => {
            title.textContent = originalText.split('').map((char, index) => {
                // Ignore spaces so the layout doesn't jump around
                if (char === ' ') return ' ';
                
                // Once the iteration passes the letter's index, lock in the real letter
                if (index < iterations) {
                    return originalText[index];
                }
                
                // Otherwise, show a random high-tech character
                return characters[Math.floor(Math.random() * characters.length)];
            }).join('');
            
            // If we've revealed all letters, stop the timer
            if (iterations >= originalText.length) {
                clearInterval(interval);
                title.textContent = originalText; // Failsafe to ensure perfect spelling
            }
            
            // The lower the fraction, the longer the decryption takes (1/3 is a good speed)
            iterations += 1 / 3; 
        }, 40); // 40 milliseconds between each frame
    }

    // Run the decryption sequence 500ms after the page loads
    window.addEventListener('load', () => {
        setTimeout(glitchText, 500);
    });
}