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
        
        if (!toggle || !navList) return;
        
        toggle.addEventListener('click', function() {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', !isExpanded);
            navList.setAttribute('aria-hidden', isExpanded);
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = isExpanded ? '' : 'hidden';
        });
        
        // Close nav when a link is clicked
        const navLinks = navList.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                toggle.setAttribute('aria-expanded', 'false');
                navList.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            });
        });
        
        // Close nav on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navList.getAttribute('aria-hidden') === 'false') {
                toggle.setAttribute('aria-expanded', 'false');
                navList.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
                toggle.focus();
            }
        });
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