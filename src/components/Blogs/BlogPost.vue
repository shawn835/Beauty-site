<template>
  <!-- <div class="container"> -->
  <article class="blog-article" v-if="blog">
    <hero :background-image="blog.imageDisplay">
      <template #hero-header>
        <Headings :heading="blog.title" />
      </template>
      <template #heading-text>
        <span>{{ blog.excerpt }}</span>
        <span class="category">{{ blog.category }}</span>
        <span v-if="blog.subCategory" class="sub-category"
          >/ {{ blog.subCategory }}</span
        >
      </template>
    </hero>

    <div class="border"></div>

    <div class="container">
      <div class="blog-details-section">
        <!-- Header Section -->
        <header class="blog-header">
          <div class="blog-meta">
            <div class="author-info">
              <span class="author">By {{ blog.author }}</span>
              <span class="meta-separator">•</span>
              <time :datetime="blog.publishedDate" class="publish-date">
                {{ formatDate(blog.publishedDate) }}
              </time>
              <span
                v-if="blog.updatedDate !== blog.publishedDate"
                class="meta-separator"
                >•</span
              >
              <span
                v-if="blog.updatedDate !== blog.publishedDate"
                class="updated">
                Updated {{ formatDate(blog.updatedDate) }}
              </span>
            </div>
          </div>
        </header>

        <!-- Content Section with responsive typography -->
        <div class="blog-content" v-html="renderMarkdown(blog.content)"></div>

        <!-- Tags Section -->
        <footer class="blog-footer">
          <div class="tags-container" v-if="blog.tags && blog.tags.length">
            <h3 class="tags-title">Tags:</h3>
            <ul class="tags-list">
              <li v-for="tag in blog.tags" :key="tag" class="tag-item">
                {{ tag }}
              </li>
            </ul>
          </div>

          <!-- Optional related posts or author bio could go here -->
        </footer>
      </div>

      <div class="blog-sidebar">
        <searchBlogs />
      </div>
    </div>
  </article>
  <!-- </div> -->
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { marked } from "marked";
import DOMPurify from "dompurify";
import hero from "../utility/hero.vue";
import Headings from "../utility/Headings.vue";
import searchBlogs from "./searchBlogs.vue";

const route = useRoute();
const slug = route.params.slug;
const blog = ref(null);
const apiUrl = import.meta.env.VITE_API_URL;

// Custom renderer for marked to wrap images in div.image
const renderer = new marked.Renderer();
renderer.image = (href, title, text) => {
  const imgSrc = href.href || href;
  const altText = text || "Image";
  return `<div class="image"><img src="${imgSrc}" alt="${altText}"${
    title ? ` title="${title}"` : ""
  }></div>`;
};

// Configure marked to use the custom renderer
marked.use({ renderer });

const fetchBlogBySlug = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/blogpost/${slug}`);
    if (!response.ok) throw new Error("Blog not found");
    const data = await response.json();

    //caption if not provided
    if (data.imageDisplay && !data.imageCaption) {
      data.imageCaption = `Featured image for "${data.title}"`;
    }

    blog.value = data;
  } catch (error) {
    console.error("Failed to fetch blog:", error);
  }
};

const renderMarkdown = (content) => {
  if (!content) return "";
  let html = marked(content);
  console.log("Rendered HTML before cleanup:", html);

  // Remove empty <p> tags
  html = html.replace(/<p>\s*<\/p>/g, "");
  return DOMPurify.sanitize(html);
};

// Improved date formatting
const formatDate = (dateString) => {
  if (!dateString) return "";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

onMounted(fetchBlogBySlug);
</script>
<style scoped>
/* Base styles for consistent layout */
.container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
}

.blog-header {
  margin-top: 2rem;
  text-align: center;
}

.blog-categories {
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
}

.category,
.sub-category {
  text-transform: capitalize;
}

.blog-title {
  font-size: 2.5rem;
  margin: 0.5rem 0 1rem;
  line-height: 1.2;
  word-wrap: break-word;
}

.blog-meta {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.meta-separator {
  margin: 0 0.5rem;
}

h2 {
  text-align: center;
}

/* Cover image styles */
.blog-cover-container {
  margin: 2rem 0;
  text-align: center;
}

.blog-cover {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.cover-caption {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #666;
  font-style: italic;
}

.border {
  width: 100%;
  height: 1px;
  background-color: #666;
  max-width: 1100px;
  margin: 2rem auto;
}

/* Content styles that will affect rendered markdown */
.blog-content {
  font-size: 1.1rem;
}

.blog-content :deep(h2) {
  margin-top: 2rem;
  font-size: 1.8rem;
}

.blog-content :deep(h3) {
  margin-top: 1.5rem;
  font-size: 1.4rem;
}

.blog-content :deep(p) {
  margin: 1rem 0;
}

.blog-content :deep(ul),
.blog-content :deep(ol) {
  margin: 1rem 0;
  padding-left: 2rem;
}

.blog-content :deep(blockquote) {
  border-left: 4px solid #ddd;
  padding-left: 1rem;
  margin: 1.5rem 0;
  color: #666;
  font-style: italic;
}

.blog-content :deep(img) {
  width: 100%;
  /* height: auto; */
  height: px;
  margin: 1rem 0;
  border-radius: 4px;
}

/* Footer and tags */
.blog-footer {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

.tags-title {
  font-size: 1rem;
  margin: 0;
  color: #666;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.tag-item {
  background: #f0f0f0;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  color: #555;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .blog-article {
    padding: 1rem;
  }

  .blog-title {
    font-size: 2rem;
  }

  .blog-content {
    font-size: 1rem;
  }

  .blog-content :deep(h2) {
    font-size: 1.5rem;
  }

  .blog-content :deep(h3) {
    font-size: 1.2rem;
  }
}
</style>
