<template>
  <hero background-image="/hero-images/services-hero-image.jpeg">
    <template #hero-header>
      <Headings heading=" our services" />
    </template>
    <template #heading-text>
      <p>have a glance, of what we offer</p>
    </template>
  </hero>
</template>

<script setup>
import hero from "../utility/hero.vue";
import Headings from "../utility/Headings.vue";
</script>
