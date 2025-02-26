<template>
  <hero
    background-image="/hero-images/services-hero-image.jpeg"
    :style="{ height: '95vh' }">
    <template #hero-header>
      <Headings heading=" our services" />
    </template>
    <template #heading-text>
      <p>our luxury SPA</p>
    </template>
  </hero>
</template>

<script setup>
import hero from "../utility/hero.vue";
import Headings from "../utility/Headings.vue";
</script>
