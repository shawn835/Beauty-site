<template>
  <div class="brief-images-container" :style="styleOne">
    <div
      v-for="service in services"
      :key="service.id"
      class="image"
      :style="styleTwo"
      data-aos="zoom-in">
      <slot name="image" :service="service" />

      <slot name="custom" :service="service" />
    </div>
  </div>
</template>

<script setup>
defineProps({ services: Array, styleOne: Object, styleTwo: Object });
</script>

<style scoped>
.brief-images-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
  position: relative;
}

@media (max-width: 992px) {
  .brief-images-container {
    grid-template-columns: repeat(2, 1fr);
    padding: 10px;
  }
}

@media (max-width: 778px) {
  .brief-images-container {
    grid-template-columns: 1fr;
  }
}
</style>
