<template>
  <div class="gallery-brief">
    <Headings
      heading="our portfolio"
      data-aos="fade-in"
      :style="{ textDecoration: 'underline', color: 'var(--text-heading)' }" />
    <div class="gallery-image-container" data-aos="fade-in">
      <div
        v-for="(image, index) in images"
        :key="image.id"
        :class="`image image-${index + 1}`">
        <img :src="image.image" :alt="image.alt" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Headings from "../utility/Headings.vue";
import imagesData from "@/assets/portfolioImages.json";
const images = imagesData.images;
</script>

<style scoped>
.gallery-brief {
  display: none;
  margin-top: 2.5rem;
}

.gallery-image-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 200px);
  gap: 20px;
}
.image-2 {
  grid-column: span 2;
}

.image-6 {
  grid-column: span 2;
}

@media (max-width: 700px) {
  .gallery-brief {
    display: block;
  }
  .gallery-image-container {
    grid-template-columns: 1fr;
  }

  .image-2 {
    grid-column: span 1;
  }
  .image-6 {
    grid-column: span 1;
  }
}
</style>
