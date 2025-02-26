<template>
  <div class="experience">
    <div class="inner-experience-content">
      <Headings heading=" Elevate Your Beauty Experience" />
      <p>
        Step into a world of indulgence and tranquility at Symos nails tech.
        From luxurious manicures to revitalizing treatments, we craft moments of
        beauty and relaxation tailored just for you. Discover the art of
        self-care and let us pamper you to perfection.
      </p>
    </div>
    <div class="experience-video">
      <video src="/Videos/about-oval-video.mp4" autoplay muted loop></video>
    </div>
  </div>
</template>

<script setup>
import Headings from "../utility/Headings.vue";
</script>

<style scoped>
.experience {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 25px;
  background-color: var(--background-secondary);
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.experience-video {
  max-width: 1200px;
  height: 600px;
  max-width: 1200px;
  overflow: hidden;
  border-radius: 30%/40%;
  position: relative;
}

.inner-experience-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 500px;
  margin: auto;
}

p {
  line-height: 30px;
  font-style: oblique;
  font-size: larger;
}
</style>
