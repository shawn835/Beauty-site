<!-- BookingGallery.vue -->
<template>
  <div class="gallery-section">
    <h3>Picked from our Gallery</h3>
    <div class="gallery-list">
      <div v-for="(img, idx) in gallery" :key="idx" class="gallery-card">
        <!-- <button
          type="button"
          class="remove-btn"
          @click="$emit('remove', idx, img)"
        >
          ✕
        </button>
        <img :src="img.image" alt="Sample" class="gallery-img" /> -->
        <div class="gallery-info">
          <p class="gallery-name">{{ img.name }}</p>
          <p class="gallery-duration">{{ img.duration }}</p>
          <p class="gallery-price">KES {{ img.price }}</p>
        </div>
      </div>
    </div>

    <div class="gallery-total">
      <strong>Total Amount:</strong>
      <span class="total-price">KES {{ totalPrice }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  gallery: Array,
  totalPrice: [Number, String],
});
</script>

<style scoped>
.gallery-section h3 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

.gallery-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 1.2rem;
}

.gallery-card {
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  background: white;
}

.gallery-img {
  width: 100%;
  height: 190px;
  object-fit: cover;
}

.gallery-info {
  padding: 12px;
}

.gallery-name {
  font-weight: 600;
  margin: 4px 0;
}
.gallery-duration,
.gallery-price {
  color: #777;
  font-size: 0.9rem;
}

.remove-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(231, 76, 60, 0.95);
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
}

.gallery-total {
  margin-top: 1.8rem;
  padding: 1.2rem 1.8rem;
  background: linear-gradient(135deg, #9b59b6, #8e44ad);
  color: white;
  border-radius: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.15rem;
}

.total-price {
  font-size: 1.35rem;
  font-weight: 700;
}
</style>
