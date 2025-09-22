<template>
  <div class="toast-container">
    <Toast
      v-for="t in toasts"
      :key="t.id"
      :message="t.message"
      :title="t.title"
      :type="t.type"
      :duration="t.duration"
      @close="remove(t.id)" />
  </div>
</template>

<script setup>
import { useToast } from "../composables/useToast";
import Toast from "../Toast.vue";

// Get reactive toasts array and remove function
const { toasts, remove } = useToast();
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2000;
  width: 90%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: none; /* Prevent interaction with background */
}
</style>
