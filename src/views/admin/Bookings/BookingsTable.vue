<template>
  <div class="bookings-table-wrapper">
    <table v-if="bookings.length" class="bookings-table">
      <thead>
        <tr>
          <th>Booking ID</th>
          <th>Customer</th>
          <th>Service</th>
          <th>Date & Time</th>
          <th>Payment Status</th>
          <th>Booking Status</th>
          <th>Created Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <BookingRow
          v-for="b in bookings"
          :key="b.id"
          :booking="b"
          @openDetails="$emit('openDetails', b)"
          @openCustomerInfo="$emit('openCustomerInfo', b)"
          @reschedule="$emit('reschedule', b)"
          @cancel="$emit('cancel', b)"
          @complete="$emit('complete', b)"
          @updatePayment="$emit('updatePayment', b)" />
      </tbody>
    </table>
    <p v-else class="no-bookings">No bookings found.</p>
  </div>
</template>

<script setup>
import BookingRow from "./BookingRow.vue";
defineProps({ bookings: Array });
</script>

<style scoped>
.bookings-table-wrapper {
  overflow-x: auto;
}

.bookings-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
}

.bookings-table th,
.bookings-table td {
  padding: 12px 15px;
  text-align: left;
  font-size: 0.95rem;
}

.bookings-table th {
  background-color: #f5e6ea;
  color: #d81b60;
  font-weight: 600;
}

.bookings-table td {
  vertical-align: middle;
  transition: background-color 0.3s ease;
}
</style>
