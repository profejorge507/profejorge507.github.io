// Animate elements on scroll
document.addEventListener('DOMContentLoaded', function() {
    // Fade in animations
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = entry.target.dataset.delay || '0s';
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });

    // Navbar scroll behavior
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow and reduce padding on scroll
        if (scrollTop > 50) {
            navbar.classList.add('navbar-scrolled');
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.classList.remove('navbar-scrolled');
            navbar.style.padding = '1rem 0';
        }

        // Hide/show navbar on scroll up/down
        if (scrollTop > lastScrollTop && scrollTop > 300) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });

    // Card hover effects
    const cards = document.querySelectorAll('.subject-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.2)';
            
            // Rotate icon
            const iconWrapper = this.querySelector('.icon-wrapper');
            if (iconWrapper) {
                iconWrapper.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            
            // Reset icon
            const iconWrapper = this.querySelector('.icon-wrapper');
            if (iconWrapper) {
                iconWrapper.style.transform = 'scale(1) rotate(0)';
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation to theme-btn
    const themeButtons = document.querySelectorAll('.theme-btn');
    
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('btn-loading');
            
            // Remove loading state after navigation
            setTimeout(() => {
                this.classList.remove('btn-loading');
            }, 500);
        });
    });

    // Initialize tooltips if Bootstrap is present
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
});
