<template>
  <hero background-video="/Videos/home-bg-video.mp4">
    <template #hero-header>
      <Headings heading="step into luxury-your at-home nail retreat awaits" />
    </template>
    <template #heading-text>
      <p>- manicure mastery-from classic to avant-garde</p>
      <p>- Transform Your Tips with Our Artistry!</p>
      <p>- Custom Creations for Your Unique You!</p>
    </template>
    <template #custom-hero-content>
      <div class="hero-btns">
        <router-link to="/contact-us">
          <buttons button-text="contact us" class-name="primary-button"
        /></router-link>
        <router-link to="/services">
          <buttons
            button-text="view our services"
            class-name="secondary-button"
        /></router-link>
      </div>
    </template>
  </hero>
</template>

<script setup>
import { RouterLink } from "vue-router";
import buttons from "./utility/buttons.vue";
import Headings from "./utility/Headings.vue";
import hero from "./utility/hero.vue";
</script>

<style scoped>
.hero-btns {
  display: flex;
  justify-content: center;
  gap: 25px;
  margin-top: 1rem;
}
</style>
