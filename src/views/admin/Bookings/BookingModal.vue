<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <button @click="$emit('close')" class="close-btn">&times;</button>

      <h3 class="modal-title">{{ modalType }} Details</h3>

      <!-- Booking Details -->
      <div v-if="modalType === 'Booking'" class="modal-body">
        <p><strong>Booking ID:</strong> {{ booking.id }}</p>
        <p><strong>Customer:</strong> {{ booking.customerName }}</p>
        <p><strong>Contact:</strong> {{ booking.contact }}</p>
        <p>
          <strong>Service:</strong> {{ booking.service }} -
          {{ booking.subservice }}
        </p>
        <p>
          <strong>Date & Time:</strong> {{ formatDate(booking.date) }} at
          {{ booking.time }}
        </p>
        <p><strong>Technician:</strong> {{ booking.technician }}</p>
        <p><strong>Status:</strong> {{ booking.bookingStatus }}</p>
        <p><strong>Created:</strong> {{ formatDate(booking.createdDate) }}</p>
        <p><strong>Notes:</strong> {{ booking.notes || "N/A" }}</p>

        <div v-if="booking.images?.length" class="modal-images">
          <h4>Images</h4>
          <div class="image-grid">
            <img
              v-for="(image, i) in booking.images"
              :key="i"
              :src="image"
              :alt="`Image ${i + 1}`"
              class="modal-image" />
          </div>
        </div>
      </div>

      <!-- Customer Info -->
      <div v-else-if="modalType === 'Customer'" class="modal-body">
        <p><strong>Name:</strong> {{ booking.customerName }}</p>
        <p><strong>Contact:</strong> {{ booking.contact }}</p>
        <p><strong>Email:</strong> {{ booking.email || "N/A" }}</p>
      </div>

      <!-- Reschedule Form -->
      <div v-else-if="modalType === 'Reschedule'" class="modal-body">
        <form @submit.prevent="$emit('confirmReschedule')">
          <div class="form-group">
            <label>New Date</label>
            <input type="date" v-model="rescheduleDate" required />
          </div>
          <div class="form-group">
            <label>New Time</label>
            <input type="time" v-model="rescheduleTime" required />
          </div>
          <button type="submit" class="submit-btn">Reschedule & Notify</button>
        </form>
      </div>

      <!-- Cancel Booking -->
      <div v-else-if="modalType === 'Cancel'" class="modal-body">
        <p>Are you sure you want to cancel this booking?</p>
        <label>
          <input type="checkbox" v-model="refundOption" /> Refund Customer
        </label>
        <button @click="$emit('confirmCancel')" class="submit-btn">
          Confirm Cancel
        </button>
      </div>

      <!-- Payment Update -->
      <div v-else-if="modalType === 'Payment'" class="modal-body">
        <select v-model="paymentStatus" class="select-input">
          <option
            v-for="status in paymentStatuses"
            :key="status"
            :value="status">
            {{ status }}
          </option>
        </select>
        <button @click="$emit('confirmPaymentUpdate')" class="submit-btn">
          Update Payment
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatDate } from "@/utils";

const props = defineProps({
  booking: Object,
  modalType: String,
  rescheduleDate: String,
  rescheduleTime: String,
  paymentStatus: String,
  refundOption: Boolean,
  paymentStatuses: {
    type: Array,
    default: () => ["Paid", "Pending", "Refunded"],
  },
});

const emit = defineEmits([
  "close",
  "confirmReschedule",
  "confirmCancel",
  "confirmPaymentUpdate",
]);

// `v-model` sync helpers
const rescheduleDate = defineModel("rescheduleDate");
const rescheduleTime = defineModel("rescheduleTime");
const paymentStatus = defineModel("paymentStatus");
const refundOption = defineModel("refundOption");
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

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
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
  color: #d81b60;
  cursor: pointer;
  transition: color 0.3s ease;
}

.close-btn:hover {
  color: #ad1457;
}

.modal-title {
  font-family: "Playfair Display", serif;
  font-size: 1.8rem;
  color: #d81b60;
  margin-bottom: 15px;
  text-align: center;
}

.modal-body {
  text-align: left;
}

.modal-body p {
  margin: 10px 0;
  font-size: 1rem;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-size: 0.95rem;
  color: #333;
  margin-bottom: 5px;
}

.submit-btn {
  padding: 10px 20px;
  background-color: #d81b60;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.submit-btn:hover {
  background-color: #ad1457;
  transform: translateY(-2px);
}

.modal-images h4 {
  font-size: 1.2rem;
  color: #d81b60;
  margin-bottom: 10px;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 10px;
}

.modal-image {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.modal-image:hover {
  transform: scale(1.05);
}

.select-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  font-family: "Lora", serif;
  transition: border-color 0.3s ease;
}

.select-input:focus {
  outline: none;
  border-color: #d81b60;
  box-shadow: 0 0 5px rgba(216, 27, 96, 0.3);
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

@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    padding: 15px;
  }

  .modal-image {
    height: 80px;
  }
}
</style>
