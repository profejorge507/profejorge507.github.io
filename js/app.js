document.addEventListener('DOMContentLoaded', function() {
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

    // Add loading animation to theme buttons
    const themeButtons = document.querySelectorAll('.theme-btn');
    
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('btn-loading');
            
            // Remove loading state after potential navigation
            setTimeout(() => {
                this.classList.remove('btn-loading');
            }, 500);
        });
    });
});