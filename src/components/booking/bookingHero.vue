<template>
  <hero background-image="/gallery/art-image-4.jpg">
    <template #hero-header>
      <Headings heading="book appointment" />
    </template>

    <template #heading-text>
      <span> Unique, colorful, and completely personal.</span>
    </template>
  </hero>
</template>

<script setup>
import hero from "../utility/hero.vue";
import Headings from "../utility/Headings.vue";
</script>
