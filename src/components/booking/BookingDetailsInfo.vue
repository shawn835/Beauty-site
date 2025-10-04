<template>
  <div class="details-info">
    <p>
      <strong>Date & Time:</strong>
      {{ formatDate(date) }} at {{ time }}
    </p>
    <p><strong>Technician:</strong> {{ technician }}</p>
    <p v-if="payment?.amount !== undefined">
      <strong>Price:</strong> KES {{ payment.amount }}
    </p>
    <p v-if="notes"><strong>Notes:</strong> {{ notes }}</p>
  </div>
</template>

<script setup>
import { formatDate } from "@/utils";

defineProps({
  date: [String, Date],
  time: String,
  technician: String,
  payment: Object,
  notes: String,
});
</script>

<style scoped>
.details-info p {
  margin: 10px 0;
  font-size: 1.1rem;
  color: #333;
  text-align: left;
}
</style>
