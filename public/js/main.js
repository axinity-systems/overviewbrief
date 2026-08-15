/* ==========================================================================
   OverviewBrief - Main JavaScript
   Minimal vanilla JS for navigation and filtering
   ========================================================================== */

(function() {
    'use strict';
    
    // Mobile Navigation
    function initMobileNav() {
    const toggle = document.querySelector('.mobile-nav-toggle');
    const navList = document.getElementById('primary-nav-list');
    const body = document.body;

    if (!toggle || !navList) return;

    function openNav() {
        toggle.setAttribute('aria-expanded', 'true');
        navList.setAttribute('aria-hidden', 'false');
        navList.classList.add('is-open');
        body.classList.add('nav-open');
    }

    function closeNav() {
        toggle.setAttribute('aria-expanded', 'false');
        navList.setAttribute('aria-hidden', 'true');
        navList.classList.remove('is-open');
        body.classList.remove('nav-open');
    }

    function toggleNav() {
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';
        isOpen ? closeNav() : openNav();
    }

    toggle.addEventListener('click', toggleNav);

    // Close when a nav link is clicked
    const navLinks = navList.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeNav);
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
            closeNav();
            toggle.focus();
        }
    });

    // Close if clicking on the overlay background (the nav list itself)
    navList.addEventListener('click', function(e) {
        if (e.target === navList) {
            closeNav();
        }
    });

    // Auto-close when resizing to desktop width
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 820 && toggle.getAttribute('aria-expanded') === 'true') {
                closeNav();
            }
        }, 150);
    });

    // Ensure menu starts closed
    closeNav();
}
    
    // Learn AI Category Filtering
    function initCategoryFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const conceptCards = document.querySelectorAll('.concept-card[data-category]');
        
        if (!filterButtons.length || !conceptCards.length) return;
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter cards
                conceptCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
        
        // Check URL for category parameter
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');
        
        if (categoryParam) {
            const matchingButton = document.querySelector(`.filter-btn[data-category="${categoryParam}"]`);
            if (matchingButton) {
                matchingButton.click();
            }
        }
    }
    
    // Initialize
    document.addEventListener('DOMContentLoaded', function() {
        initMobileNav();
        initCategoryFilter();
    });
    
})();