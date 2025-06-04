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
            try {
                const url = new URL(src, window.location.origin);
                if (!allowedDomains.includes(url.hostname) && url.origin !== window.location.origin) {
                    script.remove();
                }
            } catch (e) {
                script.remove();
            }
        }
    });
});

// Enhanced scroll animations
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

window.addEventListener('scroll', animateOnScroll);
// Initial check
animateOnScroll();
