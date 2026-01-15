// Dynamic Content Rendering
// This script renders blog posts and KB content from the central data source

(function() {
    'use strict';

    // Render a single blog post card
    function renderPostCard(post, isFeatured = false) {
        const categoryName = getCategoryName(post.category);
        const formattedDate = formatDate(post.date);
        const featuredClass = isFeatured ? ' featured' : '';

        return `
            <article class="post-card${featuredClass}" data-category="${post.category}">
                <div class="post-meta">
                    <span class="post-category ${post.category}">${categoryName}</span>
                    <span class="post-date">${formattedDate}</span>
                </div>
                <h3><a href="posts/${post.slug}.html">${post.title}</a></h3>
                <p>${post.excerpt}</p>
                <a href="posts/${post.slug}.html" class="read-more">Read More →</a>
            </article>
        `;
    }

    // Render category box
    function renderCategoryBox(category, count) {
        const categoryName = getCategoryName(category);
        return `
            <a href="categories.html#${category}" class="category-box">
                <h3>${categoryName}</h3>
                <span class="post-count">${count} posts</span>
            </a>
        `;
    }

    // Render knowledgebase card
    function renderKBCard(section) {
        const articlesHTML = section.articles.map(article => `
            <li><a href="posts/${article.slug}.html">${article.title}</a></li>
        `).join('');

        return `
            <article class="kb-card">
                <h3>${section.title}</h3>
                <ul class="kb-list">
                    ${articlesHTML}
                </ul>
            </article>
        `;
    }

    // Initialize homepage
    function initHomePage() {
        // Render featured post
        const featuredContainer = document.querySelector('.featured-post');
        if (featuredContainer) {
            const featured = getFeaturedPosts()[0];
            if (featured) {
                featuredContainer.innerHTML = renderPostCard(featured, true);
            } else {
                // No featured posts, show a message
                featuredContainer.innerHTML = `
                    <div class="post-card" style="text-align: center; padding: 3rem;">
                        <h3 style="font-family: var(--font-mono); margin-bottom: 1rem;">No Featured Posts Yet</h3>
                        <p style="opacity: 0.7;">Add blog posts to <code>js/content-data.js</code> to see them here.</p>
                    </div>
                `;
            }
        }

        // Render recent posts
        const postsGrid = document.querySelector('.posts-grid');
        if (postsGrid) {
            const recentPosts = getRecentPosts(6);
            
            const titleElement = postsGrid.querySelector('.section-title');
            const existingTitle = titleElement ? titleElement.outerHTML : '<h2 class="section-title">Recent Posts</h2>';
            
            if (recentPosts.length > 0) {
                const postsHTML = recentPosts.map(post => renderPostCard(post)).join('');
                postsGrid.innerHTML = existingTitle + postsHTML;
            } else {
                // No posts, show a message
                postsGrid.innerHTML = `
                    ${existingTitle}
                    <div class="post-card" style="text-align: center; padding: 3rem;">
                        <p style="opacity: 0.7;">No blog posts yet. Add posts to <code>js/content-data.js</code> to get started.</p>
                    </div>
                `;
            }
        }

        // Render category preview
        const categoryGrid = document.querySelector('.category-grid');
        if (categoryGrid) {
            const counts = getCategoryCounts();
            if (Object.keys(counts).length > 0) {
                const categoriesHTML = Object.entries(counts)
                    .map(([category, count]) => renderCategoryBox(category, count))
                    .join('');
                categoryGrid.innerHTML = categoriesHTML;
            } else {
                // No categories, show placeholder
                categoryGrid.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 2rem; opacity: 0.7;">
                        <p>Categories will appear here once you add blog posts.</p>
                    </div>
                `;
            }
        }
    }

    // Initialize blog page
    function initBlogPage() {
        const postsContainer = document.querySelector('.posts-container');
        if (postsContainer) {
            // Render all posts
            const allPosts = BLOG_POSTS.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            if (allPosts.length > 0) {
                const postsHTML = allPosts.map(post => renderPostCard(post)).join('');
                postsContainer.innerHTML = postsHTML;
            } else {
                // No posts, show message
                postsContainer.innerHTML = `
                    <div class="post-card" style="text-align: center; padding: 3rem;">
                        <h3 style="font-family: var(--font-mono); margin-bottom: 1rem;">No Blog Posts Yet</h3>
                        <p style="opacity: 0.7;">Add blog posts to <code>js/content-data.js</code> to see them here.</p>
                    </div>
                `;
            }
        }

        // Set up filtering
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Filter posts
                const posts = filter === 'all' ? BLOG_POSTS : getPostsByCategory(filter);
                
                if (posts.length > 0) {
                    const postsHTML = posts
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .map(post => renderPostCard(post))
                        .join('');
                    postsContainer.innerHTML = postsHTML;
                } else {
                    postsContainer.innerHTML = `
                        <div class="post-card" style="text-align: center; padding: 3rem;">
                            <p style="opacity: 0.7;">No posts in this category yet.</p>
                        </div>
                    `;
                }
            });
        });

        // Set up search
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const query = this.value.trim();
                const posts = query ? searchPosts(query) : BLOG_POSTS;
                
                if (posts.length > 0) {
                    const postsHTML = posts
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .map(post => renderPostCard(post))
                        .join('');
                    postsContainer.innerHTML = postsHTML;
                } else {
                    postsContainer.innerHTML = `
                        <div class="post-card" style="text-align: center; padding: 3rem;">
                            <p style="opacity: 0.7;">No posts found matching "${query}"</p>
                        </div>
                    `;
                }

                // Reset active filter
                filterButtons.forEach(btn => btn.classList.remove('active'));
                document.querySelector('.filter-btn[data-filter="all"]')?.classList.add('active');
            });
        }
    }

    // Initialize categories page
    function initCategoriesPage() {
        const categories = ['tech', 'tutorial', 'personal', 'design'];
        
        categories.forEach(category => {
            const section = document.getElementById(category);
            if (section) {
                const posts = getPostsByCategory(category);
                
                if (posts.length > 0) {
                    const postsHTML = posts
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .map(post => renderPostCard(post))
                        .join('');
                    
                    // Find where to insert posts (after the description paragraph)
                    const description = section.querySelector('p');
                    if (description) {
                        description.insertAdjacentHTML('afterend', postsHTML);
                    } else {
                        // If no description, append to section
                        const title = section.querySelector('.section-title');
                        if (title) {
                            title.insertAdjacentHTML('afterend', postsHTML);
                        }
                    }
                } else {
                    // No posts in this category
                    const description = section.querySelector('p');
                    if (description) {
                        description.insertAdjacentHTML('afterend', `
                            <div class="post-card" style="text-align: center; padding: 2rem; opacity: 0.7;">
                                <p>No posts in this category yet.</p>
                            </div>
                        `);
                    }
                }
            }
        });
    }

    // Initialize knowledgebase page
    function initKnowledgebasePage() {
        const kbGrid = document.querySelector('.kb-grid');
        if (kbGrid) {
            if (KNOWLEDGEBASE_SECTIONS.length > 0) {
                const kbHTML = KNOWLEDGEBASE_SECTIONS.map(section => renderKBCard(section)).join('');
                kbGrid.innerHTML = kbHTML;
            } else {
                // No KB sections, show message
                kbGrid.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 3rem; border: 2px solid var(--border-color); border-radius: 4px;">
                        <h3 style="font-family: var(--font-mono); margin-bottom: 1rem;">No Knowledgebase Entries Yet</h3>
                        <p style="opacity: 0.7;">Add knowledgebase sections to <code>js/content-data.js</code> to see them here.</p>
                    </div>
                `;
            }
        }
    }

    // Detect page and initialize
    function initPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';

        switch(page) {
            case '':
            case 'index.html':
                initHomePage();
                break;
            case 'blog.html':
                initBlogPage();
                break;
            case 'categories.html':
                initCategoriesPage();
                break;
            case 'knowledgebase.html':
                initKnowledgebasePage();
                break;
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPage);
    } else {
        initPage();
    }

})();