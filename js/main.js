// Main JavaScript functionality
(function() {
    'use strict';

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Blog filter functionality (for blog.html page)
    function initBlogFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const postCards = document.querySelectorAll('.post-card');

        if (filterButtons.length === 0) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Filter posts
                postCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        // Add fade-in animation
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.opacity = '1';
                        }, 10);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Search functionality (for blog.html page)
    function initSearch() {
        const searchInput = document.getElementById('searchInput');
        const postCards = document.querySelectorAll('.post-card');

        if (!searchInput) return;

        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();

            postCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const content = card.querySelector('p').textContent.toLowerCase();

                if (title.includes(searchTerm) || content.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Add reading time estimate
    function addReadingTime() {
        const postCards = document.querySelectorAll('.post-card p');
        
        postCards.forEach(content => {
            const text = content.textContent;
            const wordsPerMinute = 200;
            const wordCount = text.trim().split(/\s+/).length;
            const readingTime = Math.ceil(wordCount / wordsPerMinute);
            
            const postMeta = content.parentElement.querySelector('.post-meta');
            if (postMeta && !postMeta.querySelector('.reading-time')) {
                const readingTimeSpan = document.createElement('span');
                readingTimeSpan.className = 'reading-time';
                readingTimeSpan.textContent = `${readingTime} min read`;
                postMeta.appendChild(readingTimeSpan);
            }
        });
    }

    // Highlight current page in navigation
    function highlightCurrentPage() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.main-nav a');

        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPath = new URL(link.href).pathname;
            
            if (currentPath === linkPath || 
                (currentPath === '/' && linkPath.endsWith('index.html')) ||
                (currentPath.endsWith('/') && linkPath.endsWith('index.html'))) {
                link.classList.add('active');
            }
        });
    }

    // Copy code blocks (for tutorial pages)
    function initCodeCopy() {
        const codeBlocks = document.querySelectorAll('pre code');

        codeBlocks.forEach(block => {
            const button = document.createElement('button');
            button.className = 'copy-code-btn';
            button.textContent = 'Copy';
            button.style.cssText = 'position: absolute; top: 0.5rem; right: 0.5rem; padding: 0.3rem 0.6rem; border: 1px solid; background: var(--bg-secondary); cursor: pointer; font-family: var(--font-mono); font-size: 0.8rem;';

            const pre = block.parentElement;
            pre.style.position = 'relative';
            pre.appendChild(button);

            button.addEventListener('click', function() {
                navigator.clipboard.writeText(block.textContent).then(() => {
                    button.textContent = 'Copied!';
                    setTimeout(() => {
                        button.textContent = 'Copy';
                    }, 2000);
                });
            });
        });
    }

    // Initialize all functionality when DOM is ready
    function init() {
        highlightCurrentPage();
        initBlogFilters();
        initSearch();
        addReadingTime();
        initCodeCopy();
    }

    // Run initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();