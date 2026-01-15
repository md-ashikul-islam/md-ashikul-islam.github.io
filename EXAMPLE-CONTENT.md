# 📝 Example Content - Quick Start

Your blog is currently **empty**. Here's sample content you can copy-paste to get started quickly!

## 🚀 Quick Start - Copy This to `js/content-data.js`

Replace the empty arrays in `js/content-data.js` with this example content:

```javascript
const BLOG_POSTS = [
    {
        id: 'welcome-to-my-blog',
        title: 'Welcome to My Blog',
        slug: 'welcome-to-my-blog',
        category: 'personal',
        date: '2026-01-15',
        excerpt: 'This is my first blog post! I\'m excited to share my thoughts on technology, tutorials, and my personal journey in software development.',
        featured: true
    },
    {
        id: 'getting-started-with-javascript',
        title: 'Getting Started with JavaScript',
        slug: 'getting-started-with-javascript',
        category: 'tutorial',
        date: '2026-01-14',
        excerpt: 'A beginner-friendly guide to learning JavaScript from scratch. We\'ll cover variables, functions, and basic programming concepts.',
        featured: false
    },
    {
        id: 'my-favorite-developer-tools',
        title: 'My Favorite Developer Tools',
        slug: 'my-favorite-developer-tools',
        category: 'tech',
        date: '2026-01-13',
        excerpt: 'A curated list of tools and software that help me be more productive as a developer.',
        featured: false
    }
];

const KNOWLEDGEBASE_SECTIONS = [
    {
        id: 'web-development',
        title: 'Web Development',
        articles: [
            { title: 'HTML Basics', slug: 'html-basics' },
            { title: 'CSS Fundamentals', slug: 'css-fundamentals' },
            { title: 'JavaScript Introduction', slug: 'javascript-intro' }
        ]
    },
    {
        id: 'programming',
        title: 'Programming Concepts',
        articles: [
            { title: 'Variables and Data Types', slug: 'variables-data-types' },
            { title: 'Functions and Methods', slug: 'functions-methods' },
            { title: 'Loops and Conditionals', slug: 'loops-conditionals' }
        ]
    }
];
```

## 📄 Then Create These Post Files

Create these files in the `posts/` folder:

### 1. `posts/welcome-to-my-blog.html`

Copy `posts/sample-post.html` and modify it:

**Update these parts:**
- Title: "Welcome to My Blog"
- Category: Personal
- Date: Jan 15, 2026
- Excerpt: Your welcome message
- Content: Your introduction

### 2. `posts/getting-started-with-javascript.html`

Another copy of sample post with:
- Title: "Getting Started with JavaScript"
- Category: Tutorial
- Date: Jan 14, 2026
- Content: Your JavaScript tutorial

### 3. `posts/my-favorite-developer-tools.html`

Another copy with:
- Title: "My Favorite Developer Tools"
- Category: Tech
- Date: Jan 13, 2026
- Content: Your tool recommendations

## ✅ What This Gives You

After adding the example content:

- ✅ 3 blog posts visible on all pages
- ✅ 1 featured post on homepage
- ✅ 2 recent posts on homepage
- ✅ Posts organized by category
- ✅ 2 knowledgebase sections with articles
- ✅ Working search and filters

## 🎯 Step-by-Step Instructions

### Step 1: Add Content Data

1. Open `js/content-data.js`
2. Replace the empty `BLOG_POSTS` array with the example above
3. Replace the empty `KNOWLEDGEBASE_SECTIONS` array with the example
4. Save the file

### Step 2: Create Post Files

For each post in your data:

1. Copy `posts/sample-post.html`
2. Rename it to match the slug (e.g., `welcome-to-my-blog.html`)
3. Edit the HTML to match your post data
4. Update the content section with your actual content

### Step 3: Test Locally

1. Open `index.html` in your browser
2. You should see:
   - Featured post in the hero section
   - Recent posts below
   - Categories with post counts

### Step 4: Check All Pages

- **Homepage**: Should show featured + recent posts
- **Blog page**: Should show all 3 posts
- **Categories page**: Posts grouped by category
- **Knowledgebase**: 2 sections with articles

## 📝 Customizing Example Content

After getting started with the examples, customize them:

1. **Change titles** to your own topics
2. **Update dates** to current dates
3. **Write your own excerpts**
4. **Create real content** in the post HTML files
5. **Add more posts** as you go

## 🚫 Common Mistakes to Avoid

❌ **Don't** create post HTML files without adding entries to `content-data.js`
❌ **Don't** add entries to `content-data.js` without creating the HTML files
❌ **Don't** use spaces in slugs (use hyphens: `my-post` not `my post`)
❌ **Don't** forget to match slug in data with filename
❌ **Don't** use dates in wrong format (must be YYYY-MM-DD)

✅ **Do** add both: entry in `content-data.js` + HTML file in `posts/`
✅ **Do** keep slugs consistent between data and filename
✅ **Do** use valid categories: tech, tutorial, personal, design
✅ **Do** test in browser after adding content

## 💡 Alternative: Start Completely Empty

If you prefer to start from scratch:

1. Keep the empty arrays in `content-data.js`
2. Your blog will show "No posts yet" messages
3. Add your first real post when ready
4. The blog will automatically populate as you add content

This is actually a **great way to start** if you want to write your first real post right away!

## 🎓 Understanding the Connection

```
js/content-data.js:
{
    slug: 'my-post'
}
        ↓
        Must match filename
        ↓
posts/my-post.html
```

The `slug` in your data **MUST exactly match** the filename (without .html)

## 🔄 Your First Real Post

Ready to add your first real post? Follow these steps:

### 1. Add to `content-data.js`:

```javascript
{
    id: 'my-first-post',
    title: 'My First Blog Post',
    slug: 'my-first-post',
    category: 'personal',
    date: '2026-01-15',
    excerpt: 'Here I share my thoughts on...',
    featured: true
}
```

### 2. Create `posts/my-first-post.html`:

- Copy from `sample-post.html`
- Update all metadata to match
- Write your content
- Save the file

### 3. Refresh your browser:

Your post appears everywhere automatically! 🎉

---

## 📚 Need More Help?

See these guides:
- **CONTENT-MANAGEMENT.md** - Detailed content management guide
- **README.md** - Project overview
- **SETUP-GUIDE.md** - Setup instructions

---

Happy blogging! Start with the examples or jump right into your first real post. Either way, your blog is ready to grow with you! 🚀