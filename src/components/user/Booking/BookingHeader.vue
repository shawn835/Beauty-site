<template>
  <div class="booking-header">
    <button class="back-btn" @click="$emit('back')">
      ← Back to My Bookings
    </button>

    <div class="header-main">
      <h1>Booking #{{ bookingCode }}</h1>
      <span :class="['status-badge', status]">
        {{ status }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  bookingCode: {
    type: [String, Number],
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

defineEmits(["back"]);
</script>

<style scoped>
.booking-header {
  display: flex;
  align-items: center;
  gap: 2rem 20px;
  margin-top: 3rem;
  padding: 20px;
  flex-wrap: wrap;
}

.back-btn {
  background: transparent;
  border: 2px solid var(--text-gray);
  color: var(--text-light);
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
}

.header-main h1 {
  margin: 0;
  font-size: 1.9rem;
}
</style>
