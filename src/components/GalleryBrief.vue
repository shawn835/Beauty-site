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
        :class="`image-wrapper image-${index + 1}`">
        <img :src="image.image" :alt="image.alt" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Headings from "./utility/Headings.vue";
import imagesData from "@/assets/images.json";
const images = imagesData.images;
</script>

<style scoped>
.gallery-brief {
  margin-top: 8rem;
}

.gallery-image-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 200px);
  gap: 20px;
}
.image-2 {
  grid-row: span 2;
  grid-column: span 2;
}

@media (max-width: 992px) {
  .gallery-image-container {
    grid-template-columns: repeat(3, 1fr);
  }

  .image-5 {
    grid-column: span 2;
    height: 400px;
  }
}
@media (max-width: 700px) {
  .gallery-image-container {
    grid-template-columns: 1fr;
  }

  .image-1 {
    display: none;
  }
}
</style>
