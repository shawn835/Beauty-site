<template>
  <div class="location-container">
    <Headings
      heading="location and working hours"
      :style="{ color: 'var(--text-heading)' }" />

    <div class="location-working-hours">
      <div>
        <WorkingDays :style="{ fontSize: '30px' }" />
      </div>

      <div>
        <div class="image">
          <img src="/gallery/facial-image-6.jpg" alt="facial-image-6" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Headings from "../utility/Headings.vue";
import WorkingDays from "../utility/WorkingDays.vue";
</script>

<style scoped>
.location-working-hours {
  display: flex;
  justify-content: space-around; /* Ensures spacing */
  align-items: center;
  width: 100%;
}

img {
  border-radius: 50%;
}

.image {
  height: 600px;
}

.location-container {
  width: 100%;
  max-width: 1200px;
  margin-top: 2rem;
}
</style>
