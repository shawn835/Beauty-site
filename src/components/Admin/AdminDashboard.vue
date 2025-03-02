<template>
  <div class="dashboard-header">
    <h3>admin dashboard</h3>
    <buttons button-text="logout" class-name="primary-button" @click="logout" />
  </div>
  <div class="bookings-container">
    <div class="bookings-header">
      <span>Name</span>
      <span>Date</span>
      <span>Time</span>
      <span>phone</span>
      <span>Technician</span>
      <span>Services</span>
      <span>booking code</span>
    </div>

    <div v-for="(booking, index) in bookings" :key="index" class="booking-item">
      <span>{{ booking.name }}</span>
      <span>{{ booking.date }}</span>
      <span>{{ booking.time }}</span>
      <span>{{ booking.phone }}</span>
      <span>{{ booking.technician }}</span>
      <span>{{ booking.services.join(", ") }}</span>
      <span class="code">{{ booking.id }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import buttons from "../utility/buttons.vue";

const apiUrl = import.meta.env.VITE_API_URL;
const bookings = ref([]);
const router = useRouter();
const toast = useToast();

const fetchBookings = async () => {
  try {
    const response = await fetch(`${apiUrl}/admin/bookings`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      bookings.value = data;
    } else {
      toast.error("Unable to fetch bookings");
    }
  } catch (error) {
    toast.error(error?.message || "Server error");
  }
};

const logout = () => {
  localStorage.removeItem("admin");
  router.push("/admin/login");
};

onMounted(() => {
  if (!localStorage.getItem("admin")) {
    router.push("/admin/login");
  } else {
    fetchBookings();
  }
});
</script>
<style scoped>
.dashboard-header {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

.bookings-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  font-weight: bold;
  background: #333;
  color: white;
  padding: 10px;
  text-align: center;
}

.booking-item {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-bottom: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  align-items: center;
}

.booking-item:nth-child(odd) {
  background-color: var(--background-secondary);
}

.code {
  color: #007bff;
  font-weight: 600;
}
</style>
