<template>
  <div class="overlay" @click="closePoppingWindows"></div>
  <div class="close" @click="closeModal">X</div>
  <!-- Booking Code Input (Only Show When Not Authenticated & Not Rescheduling) -->
  <div class="code-password-form" v-if="!isAuthenticated && !isRescheduling">
    <h4 @click.self="closeModal">Enter Booking Code</h4>

    <form @submit.prevent="">
      <input type="text" v-model="input" placeholder="Enter booking code" />
    </form>

    <div class="options">
      <buttons
        class-name="primary-button"
        button-text="Check Bookings"
        @click="fetchBookingDetails" />
      <buttons
        class-name="primary-button"
        button-text="Reschedule"
        @click="showRescheduleForm" />
      <buttons
        class-name="primary-button"
        button-text="Cancel Booking"
        @click="handleCancel" />
    </div>
  </div>

  <!-- Booking Card -->
  <BookingCard v-if="isAuthenticated" :bookingDetails="fetchedData" />

  <!-- Reschedule Form -->
  <Reschedule
    v-if="isRescheduling"
    :bookingDetails="fetchedData"
    @close="isRescheduling = false"
    @rescheduleSuccess="resetState" />
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { useToast } from "vue-toastification";
import buttons from "./buttons.vue";
import BookingCard from "../booking/BookingCard.vue";
import Reschedule from "../booking/Reschedule.vue";
const apiUrl = import.meta.env.VITE_API_URL;

const emit = defineEmits(["close-modal"]);
const toast = useToast();

const input = ref("");
const fetchedData = ref(null);
const isAuthenticated = ref(false);
const isRescheduling = ref(false);

const closeModal = () => {
  emit("close-modal");
};

// Helper Function: Fetch Booking Details
const getBookingDetails = async (code) => {
  if (!code.trim()) {
    toast.error("Please enter booking code");
    return null;
  }

  try {
    const response = await fetch(`${apiUrl}/booking-details?id=${code}`);
    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message || "Booking not found.");
      return null;
    }
    return data;
  } catch (error) {
    toast.error("An error occurred. Please try again.");
    return null;
  }
};

// Check Bookings
const fetchBookingDetails = async () => {
  const data = await getBookingDetails(input.value);
  if (data) {
    fetchedData.value = data;
    isAuthenticated.value = true;
    toast.success("Booking details retrieved!");
  }
};

// Show Reschedule Form
const showRescheduleForm = async () => {
  const data = fetchedData.value || (await getBookingDetails(input.value));
  if (!data) return;

  fetchedData.value = data;
  isRescheduling.value = true;
};

/// Handle Booking Cancellation
const handleCancel = async () => {
  if (!input.value.trim()) {
    toast.error("Please enter booking code");
    return;
  }

  if (!confirm("Are you sure you want to cancel this booking?")) return;

  try {
    const response = await fetch(`${apiUrl}/cancel-booking?id=${input.value}`, {
      method: "DELETE",
    });
    const data = await response.json();

    if (!response.ok) {
      toast.error(data.error || "Failed to cancel booking.");
      return;
    }

    toast.success("Booking canceled successfully.");
    resetState();
  } catch (error) {
    toast.error("Error canceling booking. Try again.");
  }
};

// Reset Everything ** Reschedule or Cancel)
const resetState = () => {
  input.value = "";
  fetchedData.value = null;
  isAuthenticated.value = false;
  isRescheduling.value = false;
};

const closePoppingWindows = () => {
  resetState();
  closeModal();
};
</script>

<style scoped>
.code-password-form {
  display: flex;
  flex-direction: column;
  width: 550px;
  margin: auto;
  height: auto;
  gap: 20px;
  background-color: var(--background-secondary);
  position: fixed;
  top: 25vh;
  transform: translateX(-50%);
  left: 50%;
  border-radius: 10px;
  padding: 1rem 30px;
  z-index: 20;
}

.close {
  position: fixed;
  top: 0;
  right: 0;
  color: var(--primary-icon-color);
  z-index: 100;
  cursor: pointer;
  font-size: 2rem;
}

form {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}
input {
  padding: 15px 40px;
  border-radius: 30px;
}

.options {
  display: flex;
  justify-content: space-around;
}
</style>
