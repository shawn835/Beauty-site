<template>
  <div class="metrics">
    <div v-for="card in metrics" :key="card.id" class="card">
      <div class="card-top">
        <span><i :class="card.icon"></i></span>
        <span>{{ card.title }}</span>
        <span><i class="fas fa-circle-info"></i></span>
      </div>
      <div class="card-middle">{{ card.subtitle }}</div>
      <div class="card-bottom">
        <span class="total">{{ card.value }}</span>
        <span :class="getPercentageClass(card.percent)">
          {{ card.percent }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { fetchBookings } from "./fetchAllBookings";
import {
  todayBookings,
  getUpcomingBookings,
  totalBookingPercentage,
  newClientsThisMonth,
  upcomingBookingsPercentage,
  todaysBookingPercentage,
  newClientsPercentage,
} from "./percentages";

const bookings = ref([]);

onMounted(async () => {
  const data = await fetchBookings();
  if (data) {
    bookings.value = data;
  }
});

const totalBookings = computed(
  () => bookings.value.filter((booking) => booking).length
);
const monthlyBookingsPercent = computed(() =>
  totalBookingPercentage(bookings.value)
);
const currentDayBookings = computed(() => todayBookings(bookings.value));
const UpcomingBookings = computed(() => getUpcomingBookings(bookings.value));
const currentMonthNewClients = computed(() =>
  newClientsThisMonth(bookings.value)
);
const currentDayPercent = computed(() =>
  todaysBookingPercentage(bookings.value)
);
const upcomingBookingsPercent = computed(() =>
  upcomingBookingsPercentage(bookings.value)
);
const newClientPercent = computed(() => newClientsPercentage(bookings.value));

// Store metrics data
const metrics = computed(() => [
  {
    id: 1,
    title: "Total Bookings",
    subtitle: "Total clients served",
    icon: "fas fa-calendar-check",
    value: totalBookings.value,
    percent: monthlyBookingsPercent.value,
  },
  {
    id: 2,
    title: "Today's Bookings",
    subtitle: "Today",
    icon: "fas fa-calendar-day",
    value: currentDayBookings.value,
    percent: currentDayPercent.value,
  },
  {
    id: 3,
    title: "Upcoming Bookings",
    subtitle: "Upcoming",
    icon: "fas fa-clock",
    value: UpcomingBookings.value,
    percent: upcomingBookingsPercent.value,
  },
  {
    id: 4,
    title: "New Clients This Month",
    subtitle: "First-time customers",
    icon: "fas fa-user-plus",
    value: currentMonthNewClients.value,
    percent: newClientPercent.value,
  },
]);

// Function to determine class dynamically
const getPercentageClass = (percentage) => {
  return String(percentage).startsWith("+") ? "positive" : "negative";
};
</script>

<style scoped>
.metrics {
  margin: 20px 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
}
.card {
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 10px 20px;
  /* max-width: 250px; */
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.25);
}

.card-top {
  display: flex;
  gap: 15px;
}

.card-top span:nth-child(2) {
  font-weight: bold;
}

.card-middle {
  color: #9f9d9d;
}

.card-bottom {
  display: flex;
  gap: 20px;
  justify-content: space-around;
}

.total {
  font-weight: bold;
}

.percent {
  padding: 2px 5px;
  border-radius: 4px;
}
.negative {
  color: #dc3545;
  background-color: #df8e8e;
}

.positive {
  color: #28a745;
  background-color: #ddffdd;
}

i {
  color: #9f9d9d;
}
</style>
