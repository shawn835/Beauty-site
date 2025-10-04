<template>
  <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
    <div class="receipt-modal">
      <button class="close-btn" @click="$emit('close')">×</button>
      <h2 class="modal-title">Receipt</h2>
      <div class="receipt-content">
        <p><strong>Service:</strong> {{ booking.service }}</p>
        <p>
          <strong>Date & Time:</strong> {{ formatDate(booking.date) }} at
          {{ booking.time }}
        </p>
        <p><strong>Technician:</strong> {{ booking.technician }}</p>
        <p v-if="booking?.payment?.amount !== undefined">
          <strong>Price:</strong> KES {{ booking.payment.amount }}
        </p>
        <p v-if="booking?.notes"><strong>Notes:</strong> {{ booking.notes }}</p>
        <p>
          <strong>Status:</strong>
          <span v-if="booking.status" :class="booking.status.toLowerCase()">{{
            booking.status
          }}</span>
        </p>
        <p><strong>Transaction ID:</strong> #{{ booking.id || "N/A" }}</p>
        <p>
          <strong>Issued:</strong>
          {{ formatDate(new Date(), { withTime: true }) }}
        </p>
      </div>
      <button class="print-btn" @click="$emit('print')">Print Receipt</button>
    </div>
  </div>
</template>

<script setup>
import { formatDate } from "@/utils";
defineProps({
  show: Boolean,
  booking: Object,
});
defineEmits(["close", "print"]);
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.receipt-modal {
  background: #fff;
  padding: 20px;
  border-radius: 15px;
  width: 90%;
  max-width: 400px;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease-out;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #d81b60;
}

.modal-title {
  font-family: "Playfair Display", serif;
  font-size: 1.8rem;
  color: #d81b60;
  margin-bottom: 15px;
}

.receipt-content p {
  margin: 10px 0;
  font-size: 1rem;
  color: #333;
  text-align: left;
}

.print-btn {
  margin-top: 20px;
  padding: 10px 25px;
  background-color: #d81b60;
  color: #fff;
  border: none;
  border-radius: 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.print-btn:hover {
  background-color: #ad1457;
}

@keyframes slideIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
