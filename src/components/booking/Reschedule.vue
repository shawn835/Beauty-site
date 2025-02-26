<template>
  <div class="reschedule-modal">
    <h4>Reschedule your Appointment form</h4>
    <form @submit.prevent="submitReschedule">
      <div class="form-flex">
        <div class="form-section">
          <label>
            date
            <input
              type="date"
              required
              v-model="rescheduleData.date"
              :min="getTodayDate()" />
          </label>

          <label>
            Services
            <select multiple required v-model="rescheduleData.services">
              <option
                v-for="service in services"
                :key="service.category"
                :value="service.category">
                {{ service.category }}
              </option>
            </select>
          </label>

          <label>
            phone
            <input
              type="tel"
              required
              placeholder="phone"
              max="13"
              min="0"
              v-model="rescheduleData.phone" />
          </label>
        </div>

        <div class="form-section">
          <label>
            time
            <input type="time" required v-model="rescheduleData.time" />
          </label>
          <label>
            technician
            <select required v-model="rescheduleData.technician">
              <option
                v-for="team in technicians"
                :key="team.name"
                :value="team.name">
                {{ team.name }}
              </option>
            </select>
          </label>
        </div>
      </div>

      <!--  rules-->
      <div class="rules-box">
        <p><strong>Rescheduling Rules:</strong></p>
        <ul>
          <li>
            Must be done at least <strong>4 hours</strong> before the
            appointment.
          </li>
          <li>
            Allowed only within
            <strong>business hours (6:00 AM - 8:30 PM).</strong>
          </li>
          <li>You can only reschedule <strong>twice per week.</strong></li>
          <li>New date must be within the next <strong>14 days.</strong></li>
          <li>
            Pick a time where the selected
            <strong>technician is available.</strong>
          </li>
        </ul>
      </div>

      <div class="buttons">
        <buttons class="primary-button" button-text="reschedule" />
        <buttons
          class="secondary-button"
          @click="$emit('close')"
          button-text="cancel" />
      </div>
    </form>
  </div>
</template>

<script setup>
import buttons from "../utility/buttons.vue";
import { ref, defineProps, defineEmits, watch } from "vue";
import { useToast } from "vue-toastification";
import { getTodayDate } from "@/requestsMethods/requestUtils";
import technicians from "@/assets/team.json";
import servicesData from "@/assets/services.json";
import { getServiceDuration } from "@/requestsMethods/requestUtils";
import { calculateTotalDuration } from "@/requestsMethods/requestUtils";
const apiUrl = import.meta.env.VITE_API_URL;
const toast = useToast();
const props = defineProps(["bookingDetails"]);
const emit = defineEmits(["close", "rescheduleSuccess"]);
const services = servicesData.services;

const rescheduleData = ref({
  date: props.bookingDetails.date || "",
  time: props.bookingDetails.time || "",
  services: Array.isArray(props.bookingDetails.services)
    ? [...props.bookingDetails.services]
    : [],
  phone: props.bookingDetails.phone || "",
  technician: props.bookingDetails.technician || "",
  duration: 0,
});

// Get service durations
const serviceDurations = getServiceDuration(services);

// Watch for changes to the selected services and update the total duration dynamically
watch(
  () => rescheduleData.value.services,
  () => {
    rescheduleData.value.duration = calculateTotalDuration(
      rescheduleData.value.services,
      serviceDurations
    );
  },
  { deep: true }
);

const submitReschedule = async () => {
  try {
    const response = await fetch(
      `${apiUrl}/reschedule-booking?id=${props.bookingDetails.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...rescheduleData.value,
          services: [...rescheduleData.value.services], // Ensures it's sent as an array
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      toast.success(data.message);
      emit("rescheduleSuccess");
    } else {
      toast.error(data.error || "failed to reschedule");
    }
  } catch (error) {
    toast.error("Booking failed: " + error.message);
  }
};
</script>

<style scoped>
.reschedule-modal {
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 30;
  background-color: var(--background-secondary);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
}

.rules-box {
  background: #fff8e1;
  padding: 10px;
  border-left: 4px solid #ffcc00;
  margin: 15px 0;
  font-size: 14px;
}
.rules-box ul {
  padding-left: 20px;
}

li {
  padding: 5px;
}

.buttons {
  display: flex;
  justify-content: space-around;
}

.form-flex {
  display: flex;
  /* align-items: center; */
  width: 100%;
  gap: 20px;
}

.form-section {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
}
</style>
