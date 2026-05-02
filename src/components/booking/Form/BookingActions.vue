<!-- BookingActions.vue -->
<template>
  <div class="actions">
    <button type="submit" class="primary-button" :disabled="loading">
      <span v-if="loading">Processing Booking...</span>
     <span>
  Pay with M-Pesa (KES {{ totalPrice.toFixed(2) }})
</span>
    </button>
  </div>

  <!-- Processing Overlay -->
  <div v-if="isProcessing" class="spinner-overlay">
    <div class="spinner-container">
      <div class="spinner"></div>
      <div class="spinner-message">
        Please check your phone and enter your M-Pesa PIN<br />
        <small>Do not close or refresh this page</small>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  loading: Boolean,
  isProcessing: Boolean,
  totalPrice: [Number, String],
});
</script>

<style scoped>
.primary-button {
  width: 100%;
  padding: 16px 24px;
  background: linear-gradient(135deg, #9b59b6, #8e44ad);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.15rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.3s;
}

.primary-button:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(155, 89, 182, 0.35);
}

.primary-button:disabled {
  opacity: 0.75;
  cursor: not-allowed;
}

/* Spinner Overlay */
.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.spinner-container {
  background: white;
  padding: 2.5rem 3rem;
  border-radius: 16px;
  text-align: center;
  max-width: 380px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #9b59b6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1.5rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.spinner-message {
  color: #2c3e50;
  line-height: 1.6;
}
</style>
