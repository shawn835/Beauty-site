<template>
  <aside class="sidebar">
    <form action="">
      <input type="text" v-model="searchQuery" placeholder="Search blogs..." />
      <buttons button-text="search" class-name="primary-button" />
    </form>

    <div class="latest-posts">
      <h3>Latest Blogs</h3>
      <ul>
        <li v-for="post in latestBlogs" :key="post.slug">
          <router-link :to="`/blogs/${post.slug}`">{{
            post.title
          }}</router-link>
        </li>
      </ul>
    </div>

    <div class="popular-posts">
      <h3>Trending Blogs</h3>
      <ul>
        <li v-for="post in popularBlogs" :key="post.slug">
          <router-link :to="`/blogs/${post.slug}`">{{
            post.title
          }}</router-link>
        </li>
      </ul>
    </div>

    <div class="categories">
      <h3>Categories</h3>
      <ul>
        <li v-for="category in categories" :key="category">
          <router-link :to="`/blogs?category=${category}`">{{
            category
          }}</router-link>
        </li>
      </ul>
    </div>

    <div class="social-share">
      <h3>Share This Post</h3>
      <a :href="`https://twitter.com/share?url=${currentUrl}`">Twitter</a>
      <a :href="`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`"
        >Facebook</a
      >
    </div>
  </aside>
</template>

<script setup>
import buttons from "../utility/buttons.vue";
</script>

<style scoped>
/* Sidebar Styling */
.sidebar {
  width: 100%;
  /* max-width: 300px; */
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Sidebar Sections */
.sidebar h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #333;
  border-bottom: 2px solid #ddd;
  padding-bottom: 5px;
}

/* Search Bar */
.sidebar input[type="text"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 15px;
}

/* Sidebar Lists */
.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar ul li {
  margin-bottom: 10px;
}

.sidebar ul li a {
  text-decoration: none;
  color: #0073e6;
  font-size: 1rem;
  transition: color 0.3s ease;
}

.sidebar ul li a:hover {
  color: #004a99;
  text-decoration: underline;
}

/* Social Share */
.social-share a {
  display: inline-block;
  margin-right: 10px;
  padding: 8px 12px;
  background: #0073e6;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  font-size: 0.9rem;
}

.social-share a:hover {
  background: #004a99;
}

form {
  display: flex;
  gap: 10px;
}
</style>
