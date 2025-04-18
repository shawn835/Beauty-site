<template>
  <hero>
    <template #hero-header>
      <Headings heading="Blogs and Articles" />
    </template>
  </hero>

  <div class="blogs-container">
    <TeamGallery
      :array="blogs"
      :customContentStyle="{
        flexDirection: 'column',
        top: '60%',
        width: '100%',
        alignItems: 'start',
        marginLeft: '15px',
        opacity: '1',
        visibility: 'visible',
      }"
      :style="{ gridTemplateColumns: 'repeat(3, 1fr)', cursor: 'pointer' }">
      <template #images="{ content }">
        <router-link
          :to="`/blogposts/${content.slug}`"
          custom
          v-slot="{ href, navigate }">
          <a :href="href" @click="navigate">
            <img v-lazy="content.imageDisplay" :alt="content.category" />
          </a>
        </router-link>
      </template>

      <template #custom-content="{ content }">
        <router-link :to="`/blogposts/${content.slug}`" class="blog-link">
          <div class="translate">
            <buttons
              :button-text="content.category"
              class-name="secondary-button"
              :style="{ borderRadius: '0', padding: '4px 6px' }" />

            <h3 class="title">{{ content.title }}</h3>
            <div class="author-date">
              <span class="author">{{ content.author }}</span>
              <span class="date">{{ content.publishedDate }}</span>
            </div>
            <span class="read-more"
              >Check more <i class="fas fa-arrow-right"></i
            ></span>
          </div>
        </router-link>
      </template>
    </TeamGallery>
  </div>
  <blogPostForm />
</template>

<script setup>
import Headings from "../utility/Headings.vue";
import hero from "../utility/hero.vue";
import TeamGallery from "../utility/TeamGallery.vue";
import buttons from "../utility/buttons.vue";
import { ref, onMounted } from "vue";
import { fetchBlogs } from "./fetchBlogs.js";
import blogPostForm from "./blogPostForm.vue";
const apiUrl = import.meta.env.VITE_API_URL;

const blogs = ref([]);

onMounted(async () => {
  const posts = await fetchBlogs(apiUrl);
  if (posts) {
    blogs.value = posts;
    console.log(blogs.value);
  }
});
</script>

<style scoped>
.author-date {
  display: flex;
  gap: 15px;
  color: #e4e4e4;
}

.title {
  font-weight: bold;
  color: var(--nav-links);
}

.hover-effect {
  transform: translateY(-45px);
}

.read-more {
  color: var(--nav-links);
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.translate {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 15px;
  transition: transform 0.3s ease-in;
  max-width: 100%;
  height: 100%;
}

.translate:hover {
  transform: translateY(-45px);
}

.translate:hover .read-more {
  opacity: 1;
}

a {
  text-decoration: none;
}
</style>
