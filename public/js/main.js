/* ==========================================================================
   OverviewBrief - Main JavaScript
   Mobile overlay + category filtering
   ========================================================================== */

(function() {
    'use strict';

    // ============================================================
    // Mobile Navigation (targets the new #mobile-overlay)
    // ============================================================
    function initMobileNav() {
        const toggle = document.querySelector('.mobile-nav-toggle');
        const overlay = document.getElementById('mobile-overlay');
        const body = document.body;

        if (!toggle || !overlay) return;

        function openMenu() {
            overlay.classList.add('is-open');
            toggle.setAttribute('aria-expanded', 'true');
            overlay.setAttribute('aria-hidden', 'false');
            body.classList.add('nav-open');
        }

        function closeMenu() {
            overlay.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            overlay.setAttribute('aria-hidden', 'true');
            body.classList.remove('nav-open');
        }

        // Toggle on button click
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            if (overlay.classList.contains('is-open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close when a nav link inside the overlay is clicked
        var navLinks = overlay.querySelectorAll('.nav-link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', closeMenu);
        });

        // Close when clicking on the overlay background itself
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeMenu();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
                closeMenu();
                toggle.focus();
            }
        });

        // Auto-close on resize above 820px
        var resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth > 820 && overlay.classList.contains('is-open')) {
                    closeMenu();
                }
            }, 150);
        });

        // Ensure menu starts closed
        closeMenu();
    }

    // ============================================================
    // Learn AI Category Filtering
    // ============================================================
    function initCategoryFilter() {
        var filterButtons = document.querySelectorAll('.filter-btn');
        var conceptCards = document.querySelectorAll('.concept-card[data-category]');

        if (!filterButtons.length || !conceptCards.length) return;

        filterButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                var category = this.getAttribute('data-category');

                // Update active button
                filterButtons.forEach(function(btn) {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                });
                this.classList.add('active');
                this.setAttribute('aria-selected', 'true');

                // Filter cards
                conceptCards.forEach(function(card) {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // Check URL for category parameter
        var urlParams = new URLSearchParams(window.location.search);
        var categoryParam = urlParams.get('category');
        if (categoryParam) {
            var matchingButton = document.querySelector('.filter-btn[data-category="' + categoryParam + '"]');
            if (matchingButton) {
                matchingButton.click();
            }
        }
    }

    // ============================================================
    // Initialize
    // ============================================================
    document.addEventListener('DOMContentLoaded', function() {
        initMobileNav();
        initCategoryFilter();
    });

})();