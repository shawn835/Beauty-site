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
/* Define custom properties for consistency */
:root {
  --primary-color: #d81b60;
  --secondary-color: #ad1457;
  --text-light: #fff;
  --overlay-color: rgba(0, 0, 0, 0.4);
}

/* Hero Section Styling */
.hero-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-color);
  transition: background-color 0.3s ease;
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.hero-section::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    var(--overlay-color),
    rgba(216, 27, 96, 0.2)
  );
  z-index: 0;
  transition: background 0.3s ease;
}

/* Hero Text Styling */
.hero-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  text-align: center;
  color: var(--text-light);
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
}

.main-heading {
  font-family: "Playfair Display", serif;
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--text-light);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, color 0.3s ease;
}

.main-heading:hover {
  transform: scale(1.05);
  color: var(--secondary-color);
}

.heading-text {
  font-size: 1.2rem;
  letter-spacing: 1px;
  line-height: 1.6;
  color: var(--text-light);
  opacity: 0.9;
  max-width: 600px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease;
}

.heading-text:hover {
  opacity: 1;
}

/* Responsive Design */
@media (max-width: 1100px) {
  .hero-section {
    min-height: 60vh;
  }

  .main-heading {
    font-size: 2.5rem;
  }

  .heading-text {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .hero-section {
    min-height: 50vh;
  }

  .main-heading {
    font-size: 2rem;
  }

  .heading-text {
    font-size: 0.9rem;
    max-width: 90%;
  }
}

@media (max-width: 480px) {
  .hero-section {
    min-height: 40vh;
  }

  .main-heading {
    font-size: 1.8rem;
  }

  .heading-text {
    font-size: 0.8rem;
  }
}
</style>
