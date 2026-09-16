<template>
  <div class="card actions-card">
    <h3>Actions</h3>
    <div class="user-actions">
      <!-- Cancel -->
      <BaseButton
        v-if="!['cancelled', 'completed'].includes(booking.status)"
        label="Cancel Booking"
        variant="danger"
        :disabled="isCancelling"
        @click="showCancelModal = true"
      />

      <!-- Retry -->
      <BaseButton
        v-if="paymentStatus === 'failed'"
        label="Retry Payment"
        variant="outline"
        :disabled="isRetrying"
        @click="$emit('retry-payment', booking.id)"
      />

      <!-- Receipt -->
      <BaseButton
        label="Receipt"
        variant="success"
        :loading="isDownloading"
        :disabled="isDownloading"
        @click="$emit('download-receipt', booking.id)"
      />

      <!-- Contact -->
      <BaseButton label="Contact Salon" variant="success" />

      <!-- Modal owned inside actions -->
      <ConfirmModal
        :is-open="showCancelModal"
        title="Cancel Booking?"
        message="Are you sure you want to cancel this booking? This action cannot be undone."
        warning-text="A cancellation fee may apply if done less than 4 hours before appointment."
        type="danger"
        :loading="isCancelling"
        @confirm="handleConfirmCancel"
        @cancel="showCancelModal = false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";
const props = defineProps({
  booking: { type: Object, required: true },
  paymentStatus: { type: String, required: true },
  isCancelling: Boolean,
  isRetrying: Boolean,
  isDownloading: Boolean,
});

const emit = defineEmits(["cancel", "retry-payment", "download-receipt"]);

const showCancelModal = ref(false);

function handleConfirmCancel() {
  emit("cancel", props.booking.id);
  showCancelModal.value = false;
}
</script>

<style scoped>
.user-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

@media (max-width: 992px) {
  .user-actions {
    grid-template-columns: 1fr;
  }
}
</style>
