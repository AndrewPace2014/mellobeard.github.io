'use strict';

// Smooth scrolling for navigation links with security checks
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        
        if (!/^#[a-zA-Z][a-zA-Z0-9\-_]*$/.test(href)) {
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.classList.toggle('mobile-open');
        });
    }
});

// Header scroll effect with performance optimization
let ticking = false;
function updateHeader() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(35, 57, 91, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #23395B 0%, #6B8F71 100%)';
            header.style.backdropFilter = 'none';
        }
    }
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
    }
});

// Security and error handling
window.addEventListener('error', function(e) {
    console.log('An error occurred');
    return true;
});

// Security: Remove unauthorized scripts
document.addEventListener('DOMContentLoaded', function() {
    const scripts = document.querySelectorAll('script[src]');
    scripts.forEach(script => {
        const src = script.getAttribute('src');
        if (src && !src.startsWith('data:') && !src.startsWith('blob:')) {
            const allowedDomains = ['cdnjs.cloudflare.com'];
            const url = new URL(src, window.location.origin);
            if (!allowedDomains.includes(url.hostname) && url.origin !== window.location.origin) {
                script.remove();
            }
        }
    });
});

// Enhanced animations and interactions
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
};

// Add staggered animation delays for better visual flow
document.addEventListener('DOMContentLoaded', function() {
    const valueItems = document.querySelectorAll('.value-item');
    const serviceCards = document.querySelectorAll('.service-card');
    const resultItems = document.querySelectorAll('.result-item');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Add staggered delays
    valueItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });
    
    resultItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
    });
});

// Smooth hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.cta-primary, .cta-secondary, .contact-method');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Performance optimizations
window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Initial check

// Preload critical resources
document.addEventListener('DOMContentLoaded', function() {
    // Preload fonts and critical images
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
});

// Add CSS for ripple effect
const rippleCSS = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-effect 0.6s ease-out;
    pointer-events: none;
    z-index: 1;
}

@keyframes ripple-effect {
    to {
        transform: scale(2);
        opacity: 0;
    }
}
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);
