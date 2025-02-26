<template>
  <hero
    background-image="/hero-images/contact-hero-image.jpg"
    :style="{ height: '95vh' }">
    <template #hero-header>
      <Headings heading="lets talk" />
    </template>
  </hero>
</template>

<script setup>
import hero from "../utility/hero.vue";

import Headings from "../utility/Headings.vue";
</script>
