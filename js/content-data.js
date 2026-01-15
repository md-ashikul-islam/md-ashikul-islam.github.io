// Central Content Database
// All blog posts and knowledgebase entries are defined here
// Each page will pull from this single source of truth

const BLOG_POSTS = [
    {
        id: 'my-awesome-post',              // Unique ID
        title: 'My Awesome Blog Post',      // Post title
        slug: 'sample-post',            // URL slug (no spaces)
        category: 'tech',                   // tech, tutorial, personal, or design
        date: '2026-01-15',                 // YYYY-MM-DD format
        excerpt: 'A brief description...',  // Short summary
        featured: false                     // true to feature on homepage
    },
];

const KNOWLEDGEBASE_SECTIONS = [
    // Add your knowledgebase sections here
    // Example:
    // {
    //     id: 'web-development',
    //     title: 'Web Development',
    //     articles: [
    //         { title: 'HTML5 Basics', slug: 'html5-basics' },
    //         { title: 'CSS Fundamentals', slug: 'css-fundamentals' }
    //     ]
    // }
];

// Helper functions
function getCategoryName(category) {
    const names = {
        'tech': 'Tech',
        'tutorial': 'Tutorial',
        'personal': 'Personal',
        'design': 'Design'
    };
    return names[category] || category;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

// Get featured posts
function getFeaturedPosts() {
    return BLOG_POSTS.filter(post => post.featured);
}

// Get recent posts (last N posts)
function getRecentPosts(limit = 6) {
    return BLOG_POSTS
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, limit);
}

// Get posts by category
function getPostsByCategory(category) {
    if (category === 'all') {
        return BLOG_POSTS;
    }
    return BLOG_POSTS.filter(post => post.category === category);
}

// Get category counts
function getCategoryCounts() {
    const counts = {};
    BLOG_POSTS.forEach(post => {
        counts[post.category] = (counts[post.category] || 0) + 1;
    });
    return counts;
}

// Search posts
function searchPosts(query) {
    const lowerQuery = query.toLowerCase();
    return BLOG_POSTS.filter(post => 
        post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery)
    );
}