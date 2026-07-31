<template>
  <div class="card">
    <h3>Booking Information</h3>
    <div class="info-grid">
      <div class="info-item">
        <label>Date</label>
        <p>{{ formatDate(booking.startTime) }}</p>
      </div>
      <div class="info-item">
        <label>Time Slot</label>
        <p>{{ formatTimeRange(booking.startTime, booking.endTime) }}</p>
      </div>
      <div class="info-item">
        <label>Duration</label>
        <p>{{ formatDuration(booking.duration) }}</p>
      </div>
      <div class="info-item">
        <label>Technician</label>
        <p>{{ booking.technicianName || "To be assigned" }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatDate, formatTimeRange, formatDuration } from "@/Utility/utils";

defineProps({
  booking: {
    type: Object,
    required: true,
    default: () => ({
      startTime: null,
      endTime: null,
      duration: 0,
      technicianName: "",
    }),
  },
});
</script>

<style scoped>
.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 16px;
}

.info-item label {
  display: block;
  color: var(--text-gray);
  font-size: 0.9rem;
  margin-bottom: 4px;
}

.card {
  background: #252b2e;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}
</style>
