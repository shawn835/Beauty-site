<template>
  <div class="actions" v-if="bookingId">
    <button
      v-if="bookingStatus === 'upcoming'"
      @click="$emit('cancel')"
      class="action-btn cancel-btn">
      Cancel Booking
    </button>
    <button @click="$emit('rebook')" class="action-btn rebook-btn">
      Rebook
    </button>
    <button @click="$emit('receipt')" class="action-btn receipt-btn">
      View Receipt
    </button>
    <button @click="$emit('reschedule')" class="secondary-button">
      re-schedule
    </button>
  </div>
</template>

<script setup>
defineProps({
  bookingId: String,
  bookingStatus: String,
});
defineEmits(["cancel", "rebook", "receipt", "reschedule"]);
</script>

<style scoped>
.actions {
  margin-top: 30px;
  display: flex;
  gap: 15px;
  justify-content: center;
}

.action-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.cancel-btn {
  background-color: #d32f2f;
  color: #fff;
}

.cancel-btn:hover {
  background-color: #b71c1c;
  transform: translateY(-2px);
}

.rebook-btn {
  background-color: #2e7d32;
  color: #fff;
}

.rebook-btn:hover {
  background-color: #1b5e20;
  transform: translateY(-2px);
}

.receipt-btn {
  background-color: #d81b60;
  color: #fff;
}

.receipt-btn:hover {
  background-color: #ad1457;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  mage-grid {
    grid-template-columns: 1fr;
  }
}
</style>
