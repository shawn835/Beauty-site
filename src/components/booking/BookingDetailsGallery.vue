<template>
  <div v-if="images?.length" class="images-gallery">
    <h3 class="gallery-title">{{ title }}</h3>
    <div class="image-grid">
      <img
        v-for="(image, index) in images"
        :key="index"
        :src="isObject ? image.image : image"
        :alt="`Image ${index + 1} for ${service || 'Booking'}`"
        class="gallery-image" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  images: Array,
  title: String,
  service: String,
  isObject: { type: Boolean, default: false }, // for gallery vs submitted
});
</script>

<style scoped>
.images-gallery {
  margin-top: 20px;
}

.gallery-title {
  font-size: 1.3rem;
  color: #d81b60;
  margin-bottom: 15px;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
}

.gallery-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.gallery-image:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .image-grid {
    grid-template-columns: 1fr;
  }
}
</style>
