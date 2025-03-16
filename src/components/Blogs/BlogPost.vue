<template>
  <!-- <div v-if="blog" class="blog-post">
    <h1>{{ blog.title }}</h1>
    <p class="author-date">By {{ blog.author }} - {{ blog.publishedDate }}</p>
    <img :src="blog.imageDisplay" :alt="blog.title" />
    <div v-html="formattedContent"></div>
  </div>
  <p v-else>Loading...</p> -->
  <!-- Show loading if blog is null -->
</template>
<!-- <script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { marked } from "marked";
import DOMPurify from "dompurify";

const props = defineProps({
  blogs: Array, // Receive pre-fetched blogs from Vite SSG
});

const route = useRoute();
const slug = route.params.slug;

// Find the blog post from pre-fetched data
const blog = computed(() => props.blogs.find((b) => b.slug === slug) || null);

// Convert Markdown securely
const formattedContent = computed(() =>
  blog.value ? DOMPurify.sanitize(marked(blog.value.content)) : ""
);
</script> -->

<style scoped>
.blog-post {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  line-height: 1.6;
}

.blog-post img {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 10px;
  margin: 15px 0;
}

.blog-post h1 {
  font-size: 28px;
  margin-bottom: 10px;
}

.blog-post h2 {
  font-size: 24px;
  margin-top: 20px;
  color: #d63384;
}

.blog-post p {
  font-size: 18px;
  color: #333;
}

.blog-post ul,
.blog-post ol {
  padding-left: 20px;
  margin-top: 10px;
}

.blog-post ul li,
.blog-post ol li {
  font-size: 18px;
  margin-bottom: 5px;
}

.blog-post .author-date {
  font-size: 14px;
  color: gray;
}

@media (max-width: 600px) {
  .blog-post {
    padding: 10px;
  }
  .blog-post h1 {
    font-size: 24px;
  }
  .blog-post h2 {
    font-size: 20px;
  }
}

.blog-post img {
  transition: transform 0.3s ease-in-out;
}
.blog-post img:hover {
  transform: scale(1.02);
}
</style>
