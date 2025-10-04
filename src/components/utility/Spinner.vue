<template>
  <div
    class="spinner-container"
    :style="{ width: size + 'px', height: size + 'px' }">
    <div
      class="spinner"
      :style="{ borderTopColor: color, borderWidth: borderWidth + 'px' }"></div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

// Props with defaults
defineProps({
  size: { type: Number, default: 40 },
  color: { type: String, default: "#d81b60" },
  borderWidth: { type: Number, default: 4 },
});
</script>

<style scoped>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.spinner {
  width: 100%;
  height: 100%;
  border: v-bind('borderWidth + "px"') solid #f3f3f3; /* Light gray base */
  border-top: v-bind('borderWidth + "px"') solid v-bind("color"); /* Dynamic color */
  border-radius: 50%;
  animation: spin 1s linear infinite;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .spinner-container {
    width: v-bind('size * 0.8 + "px"'); /* Slightly smaller on mobile */
    height: v-bind('size * 0.8 + "px"');
  }
}
</style>
