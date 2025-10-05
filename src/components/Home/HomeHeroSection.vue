<template>
  <HeroContent
    :background-video="'/Videos/home-bg-video.mp4'"
    :style="{ color: 'white' }">
    <template #hero-header>
      <h1>Welcome to symos Nail Spa</h1>
    </template>
    <template #heading-text>
      <p>Experience luxury and care for your nails today.</p>
    </template>
    <template #custom-hero-content>
      <button @click="$router.push('/book-appointment')" class="primary-button">
        Book Now
      </button>
    </template>
  </HeroContent>
</template>

<script setup>
import HeroContent from "../utility/HeroContent.vue";
</script>
