<template>
  <div class="hero-section" :style="style">
    <!-- Conditional Video Background -->
    <video
      v-if="backgroundVideo"
      autoplay
      muted
      loop
      playsinline
      class="background-video">
      <source :src="backgroundVideo" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <!-- Background Image Styling -->
    <div
      v-else
      :style="{ backgroundImage: `url(${backgroundImage})` }"
      class="background-image"></div>

    <div class="hero-text" data-aos="fade-in">
      <div class="main-heading">
        <slot name="hero-header"></slot>
      </div>
      <div class="heading-text">
        <slot name="heading-text"></slot>
      </div>
      <slot name="custom-hero-content"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  backgroundImage: String,
  backgroundVideo: String,
  style: Object,
});
</script>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}
.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  object-fit: contain;
}

.hero-section::after {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.hero-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: auto;
  max-width: 650px;
  text-align: center;
  height: 80vh;
  position: relative;
  z-index: 6;
  height: 100%;
}

.heading-text {
  letter-spacing: 2px;
  line-height: 30px;
  color: var(--nav-links);
  font-size: 1.5rem;
}

@media (max-width: 1100px) {
  .hero-section {
    height: 50vh;
  }
}
</style>
