# 📝 Content Management Guide

## Overview

Your blog uses a **centralized content management system**. All blog posts and knowledgebase entries are defined in **ONE place**: `js/content-data.js`

**The blog starts empty** - you need to add your own content to get started!

### How It Works

```
js/content-data.js          ← Single source of truth (edit here)
         ↓
js/render-content.js        ← Renders content on each page
         ↓
All Pages                   ← Automatically updated
```

**Benefits:**
- ✅ Add posts in ONE place, they appear everywhere automatically
- ✅ Homepage shows most recent posts dynamically
- ✅ No more duplicating content across multiple HTML files
- ✅ Easy to maintain and update
- ✅ Consistent data across all pages

---

## 🎯 Adding a New Blog Post

### Step 1: Open `js/content-data.js`

### Step 2: Add Your Post to the `BLOG_POSTS` Array

```javascript
const BLOG_POSTS = [
    // Add your new post here at the TOP
    {
        id: 'my-awesome-post',              // Unique ID
        title: 'My Awesome Blog Post',      // Post title
        slug: 'my-awesome-post',            // URL slug (no spaces)
        category: 'tech',                   // tech, tutorial, personal, or design
        date: '2026-01-15',                 // YYYY-MM-DD format
        excerpt: 'A brief description...',  // Short summary
        featured: false                     // true to feature on homepage
    },
    // ... existing posts
];
```

### Step 3: Create the Actual Post HTML File

Create `posts/my-awesome-post.html` with your content (use `posts/sample-post.html` as template)

### Step 4: Done! 🎉

Your post will now automatically appear on:
- **Homepage** (if recent or featured)
- **Blog page** (all posts)
- **Categories page** (in the correct category)
- **Search results** (when users search)

---

## 📚 Adding Knowledgebase Entries

### Step 1: Open `js/content-data.js`

### Step 2: Add to Existing Section or Create New One

```javascript
const KNOWLEDGEBASE_SECTIONS = [
    {
        id: 'your-section',
        title: 'Your Section Title',
        articles: [
            { 
                title: 'Your Article Title', 
                slug: 'your-article-slug' 
            },
            // Add more articles...
        ]
    },
    // ... existing sections
];
```

### Step 3: Create the Article HTML File

Create `posts/your-article-slug.html` with your tutorial content

---

## 🎨 Setting Featured Posts

To feature a post on the homepage:

```javascript
{
    id: 'my-featured-post',
    title: 'This Will Show on Homepage',
    // ... other fields
    featured: true  // ← Set this to true
}
```

**Note:** Only the FIRST featured post will appear in the featured section.

---

## 📊 How Pages Pull Content

### Homepage (`index.html`)
- **Featured Section**: Shows first post with `featured: true`
- **Recent Posts**: Shows 6 most recent posts (sorted by date)
- **Categories**: Shows all categories with post counts

### Blog Page (`blog.html`)
- Shows ALL posts sorted by date (newest first)
- Filtering and search work automatically

### Categories Page (`categories.html`)
- Shows posts grouped by category
- Each section populated automatically

### Knowledgebase Page (`knowledgebase.html`)
- Shows all KB sections and articles
- All links generated automatically

---

## 🔧 Customization Options

### Change Number of Posts on Homepage

Edit `js/render-content.js`:

```javascript
// Find this line in initHomePage()
const recentPosts = getRecentPosts(6);  // Change 6 to any number
```

### Add New Category

1. Add posts with the new category in `content-data.js`:
```javascript
{
    category: 'newcategory',  // Your new category
    // ...
}
```

2. Add category styling in `css/main.css`:
```css
.post-category.newcategory {
    background: #your-color;
    color: white;
}
```

3. Add to category filter in `blog.html`:
```html
<button class="filter-btn" data-filter="newcategory">New Category</button>
```

4. Update `getCategoryName()` in `content-data.js`:
```javascript
function getCategoryName(category) {
    const names = {
        'newcategory': 'New Category',
        // ... other categories
    };
    return names[category] || category;
}
```

---

## 📝 Content Entry Template

### Blog Post Entry

```javascript
{
    id: 'url-friendly-id',
    title: 'Human Readable Title',
    slug: 'url-friendly-slug',
    category: 'tech', // tech, tutorial, personal, design
    date: '2026-01-15', // YYYY-MM-DD
    excerpt: 'Brief description shown on listing pages...',
    featured: false // true for homepage feature
}
```

### Knowledgebase Entry

```javascript
{
    id: 'section-id',
    title: 'Section Title',
    articles: [
        { title: 'Article Title', slug: 'article-slug' },
        { title: 'Another Article', slug: 'another-slug' }
    ]
}
```

---

## 🚀 Workflow Example

### Adding a New Blog Post

**Goal:** Add a post titled "Learning Python in 2026"

1. **Open** `js/content-data.js`

2. **Add to top** of BLOG_POSTS array:
```javascript
{
    id: 'learning-python-2026',
    title: 'Learning Python in 2026',
    slug: 'learning-python-2026',
    category: 'tutorial',
    date: '2026-01-15',
    excerpt: 'A complete guide to learning Python from scratch in 2026...',
    featured: false
}
```

3. **Create** `posts/learning-python-2026.html` (copy from sample-post.html)

4. **Edit** the HTML file with your content

5. **Commit and push** to GitHub

6. **Result:** Post appears on:
   - Blog page (all posts)
   - Categories page (under Tutorials)
   - Homepage (in recent posts)
   - Search results

---

## 🔍 Finding Content to Edit

### To Update a Post Title/Excerpt/Date
→ Edit `js/content-data.js`

### To Update Post Content
→ Edit the actual post HTML file in `posts/` folder

### To Add New Post
→ Add entry to `js/content-data.js` + create HTML file

### To Remove a Post
→ Remove entry from `js/content-data.js` (keep or delete HTML file)

---

## ⚠️ Important Notes

1. **Slugs must be unique** - no two posts can have the same slug
2. **Date format matters** - always use YYYY-MM-DD
3. **Category names are case-sensitive** - use: tech, tutorial, personal, design
4. **Create HTML files** - the data file only stores metadata, not content
5. **Featured posts** - only the first one with `featured: true` shows on homepage

---

## 💡 Pro Tips

### Tip 1: Bulk Import Posts
You can generate multiple post entries at once:

```javascript
const newPosts = [
    { id: 'post1', title: 'Post 1', /* ... */ },
    { id: 'post2', title: 'Post 2', /* ... */ },
    { id: 'post3', title: 'Post 3', /* ... */ },
];

// Add to BLOG_POSTS array
const BLOG_POSTS = [...newPosts, ...existingPosts];
```

### Tip 2: Date Sorting
Posts are automatically sorted by date (newest first) on most pages.

### Tip 3: Search Optimization
The search function looks in both `title` and `excerpt`, so write good excerpts!

### Tip 4: Keep IDs Simple
Use lowercase, hyphens, no special characters: `my-post-title`

---

## 📂 File Structure

```
ashik-blog/
├── js/
│   ├── content-data.js        ← EDIT THIS to add posts
│   └── render-content.js      ← Renders posts (don't edit usually)
│
└── posts/
    ├── post-1.html            ← Actual post content
    ├── post-2.html
    └── sample-post.html       ← Use as template
```

---

## 🎓 Understanding the System

### Old Way (Hardcoded)
```html
<!-- index.html -->
<article>
  <h3>Post Title</h3>
  <p>Excerpt...</p>
</article>

<!-- blog.html -->
<article>
  <h3>Post Title</h3>  ← Same content duplicated!
  <p>Excerpt...</p>
</article>
```

**Problem:** Update in 3+ places every time

### New Way (Dynamic)
```javascript
// js/content-data.js
{ title: 'Post Title', excerpt: '...' }
```

```javascript
// js/render-content.js
// Automatically renders on all pages
```

**Benefit:** Update in ONE place, reflects everywhere!

---

## 🆘 Troubleshooting

### Post Not Showing Up?
1. Check `js/content-data.js` - is entry added?
2. Check date format - must be YYYY-MM-DD
3. Check category name - must be: tech, tutorial, personal, or design
4. Clear browser cache and refresh

### Search Not Working?
- Make sure `js/content-data.js` and `js/render-content.js` are loaded
- Check browser console for JavaScript errors

### Featured Post Not Showing?
- Set `featured: true` in the post entry
- Make sure it's added to `BLOG_POSTS` array
- Only the FIRST featured post appears

---

## ✅ Quick Checklist

When adding new content:

- [ ] Added entry to `js/content-data.js`
- [ ] Created HTML file in `posts/` folder
- [ ] Used correct date format (YYYY-MM-DD)
- [ ] Used valid category (tech/tutorial/personal/design)
- [ ] Unique slug with no spaces
- [ ] Set featured status if needed
- [ ] Tested on all pages (home, blog, categories)
- [ ] Committed and pushed to GitHub

---

Your blog is now much easier to maintain! 🎉