<template>
  <div class="lightbox" @click.self="emit('close')">
    <div class="lightbox-content">
      <button class="close-btn" @click="emit('close')">✕</button>
      <img :src="image.imageUrl || image.url" alt="Full view" />
    </div>
  </div>
</template>

<script setup>
defineProps({ image: Object });
const emit = defineEmits(["close"]);
</script>

<style scoped>
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.lightbox-content {
  position: relative;
  max-width: 90%;
  max-height: 90vh;
}

.lightbox-content img {
  max-width: 100%;
  max-height: 90vh;
  border-radius: 12px;
}

.close-btn {
  position: absolute;
  top: -50px;
  right: 0;
  background: white;
  color: black;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
