<template>
  <div class="main-heading" :style="style">
    <h1>{{ heading }}</h1>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
defineProps({
  heading: String,
  style: Object,
});
</script>
<style scoped>
.main-heading {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  letter-spacing: 2px;
  color: var(--text-secondary);
  text-align: center;
}

@media (max-width: 992px) {
  h1 {
    font-size: 2rem;
  }
}
</style>
