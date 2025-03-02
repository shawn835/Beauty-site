<template>
  <hero background-image="/hero-images/about-hero-image.jpg">
    <template #hero-header>
      <Headings heading=" about us" />
    </template>
    <template #heading-text>
      <p>- manicure mastery-from classic to avant-garde</p>
      <p>- Transform Your Tips with Our Artistry!</p>
      <p>- Custom Creations for Your Unique You!</p>
    </template>
  </hero>
</template>

<script setup>
import hero from "../utility/hero.vue";
import Headings from "../utility/Headings.vue";
</script>

<style scoped></style>
