<template>
  <div class="dashboard">
    <dashboardHeader />
    <dashboardCards />
    <!-- Table Headers (Hidden on Small Screens) -->
    <div class="bookings-header">
      <span>Name</span>
      <span>Date</span>
      <span>Time</span>
      <span>status</span>
      <span>Phone</span>
      <span>Technician</span>
      <span>Services</span>
      <span>Images</span>
      <span>Booking Code</span>
    </div>
    <div class="clients-data">
      <currentBookings />
    </div>
  </div>
</template>

<script setup>
import dashboardHeader from "./dashboardHeader.vue";
import currentBookings from "./currentBookings.vue";
import dashboardCards from "./dashboardCards.vue";
</script>
<style scoped>
.dashboard {
  height: 100vh;
  overflow: hidden;
}

.clients-data {
  height: 50vh;
  overflow: auto;
}

.bookings-header {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  font-weight: bold;
  background: #333;
  color: white;
  padding: 10px;
  text-align: center;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .bookings-header {
    display: none; /* Hide table headers */
  }
}
</style>
