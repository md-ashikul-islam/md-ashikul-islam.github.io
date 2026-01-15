// Theme Toggle Functionality
(function() {
    'use strict';

    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const THEME_KEY = 'ashik-blog-theme';

    // Check for saved theme preference or default to light mode
    function getThemePreference() {
        const savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme) {
            return savedTheme;
        }
        
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        
        return 'light';
    }

    // Apply theme
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
        } else {
            body.classList.remove('dark-theme');
        }
        localStorage.setItem(THEME_KEY, theme);
    }

    // Toggle theme
    function toggleTheme() {
        const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    }

    // Initialize theme
    function initTheme() {
        const theme = getThemePreference();
        applyTheme(theme);
    }

    // Event listeners
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Listen for system theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            // Only auto-switch if user hasn't manually set a preference
            if (!localStorage.getItem(THEME_KEY)) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    // Initialize on load
    initTheme();

})();