<template>
  <div class="container">
    <Headings
      heading="book now for faster services"
      :style="{ color: 'var(--text-primary)' }" />
    <div class="form-container">
      <div class="image">
        <img v-lazy="'/gallery/art-image-11.jpg'" alt="booking-hero-image" />
      </div>

      <form @submit.prevent="submitBookings" enctype="multipart/form-data">
        <div class="form-flex">
          <div class="form-section">
            <label>
              name
              <input
                type="text"
                required
                placeholder="name"
                max="10"
                v-model="bookingData.name" />
            </label>

            <label>
              date
              <input
                type="date"
                required
                v-model="bookingData.date"
                :min="getTodayDate()" />
            </label>

            <label>
              Services
              <select
                multiple
                required
                v-model="bookingData.services"
                :disabled="isGallerySelection">
                <option
                  v-for="service in services"
                  :key="service.category"
                  :value="service.category">
                  {{ service.category }}
                </option>
              </select>
            </label>

            <label>
              email
              <input
                type="email"
                required
                placeholder="email"
                v-model="bookingData.email" />
            </label>
          </div>

          <div class="form-section">
            <label>
              phone
              <input
                type="tel"
                required
                placeholder="phone"
                max="13"
                min="0"
                v-model="bookingData.phone" />
            </label>
            <label>
              time
              <input type="time" required v-model="bookingData.time" />
            </label>
            <label>
              technician
              <select required v-model="bookingData.technician">
                <option
                  v-for="team in technicians"
                  :key="team.name"
                  :value="team.name">
                  {{ team.name }}
                </option>
              </select>
            </label>
            <label>
              Sample Upload?(optional)
              <input
                multiple
                ref="fileInput"
                type="file"
                placeholder="sample upload"
                @change="(e) => handleFileUpload(e, bookingData, toast)"
                accept="image/*"
                :disabled="isGallerySelection" />
            </label>
          </div>
        </div>

        <!-- Preview -->
        <div v-if="bookingData.samplePreviews.length" class="preview">
          <div
            class="image"
            v-for="(preview, index) in bookingData.samplePreviews"
            :key="index">
            <img :src="preview" alt="Preview" />
          </div>
        </div>

        <buttons button-text="book appointment" class-name="primary-button" />
      </form>
    </div>
  </div>

  <div v-if="bookingDetails">
    <BookingCard :booking-details="bookingDetails" />
  </div>
</template>

<script setup>
import Headings from "../utility/Headings.vue";
import { ref, onMounted, watch } from "vue";
import buttons from "../utility/buttons.vue";
import technicians from "@/assets/team.json";
import servicesData from "@/assets/services.json";
import { useToast } from "vue-toastification";
import {
  submitBooking,
  getTodayDate,
  handleFileUpload,
} from "@/requestsMethods/requestUtils";
import { resetGallerySelection } from "@/requestsMethods/requestUtils";
import { isGallerySelection } from "@/requestsMethods/requestUtils";
import { initializeBookingForm } from "@/requestsMethods/requestUtils";
import { getServiceDuration } from "@/requestsMethods/requestUtils";
import { calculateTotalDuration } from "@/requestsMethods/requestUtils";
import { showBookingCard } from "@/requestsMethods/requestUtils";
import BookingCard from "./BookingCard.vue";
import { bookingDetails } from "@/requestsMethods/requestUtils";
const services = servicesData.services;
const toast = useToast();
const fileInput = ref(null);
const savedBookingData = JSON.parse(localStorage.getItem("bookingData"));

const bookingData = ref(
  savedBookingData || {
    name: "",
    phone: "",
    date: "",
    time: "",
    services: [],
    technician: "simon chege",
    email: "",
    samples: [],
    galleryImages: [],
    samplePreviews: [],
    duration: 0,
  }
);

onMounted(() => {
  initializeBookingForm(bookingData, toast);
});
// Get service durations
const serviceDurations = getServiceDuration(services);

// Watch for changes to the selected services and update the total duration dynamically
watch(
  () => bookingData.value.services,
  () => {
    bookingData.value.duration = calculateTotalDuration(
      bookingData.value.services,
      serviceDurations
    );
  },
  { deep: true }
);

const submitBookings = async () => {
  const bookingId = await submitBooking(bookingData.value, toast, fileInput);
  if (bookingId) {
    showBookingCard.value = true;
  }
  resetGallerySelection();
};
</script>

<style scoped>
.container {
  margin-top: 2rem;
  position: relative;
}
.form-container {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 50px;
}

.form-flex {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
  padding: 15px;
  border-radius: 15px;
}

.form-section {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
}

.preview {
  display: flex;
  gap: 10px;
  /* max-height: 300px; */
}

.preview .image {
  height: 200px;
}

@media (max-width: 770px) {
  .image {
    display: none;
  }

  .form-container {
    grid-template-columns: 1fr;
    background-image: url("/gallery/art-image-11.jpg");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    position: relative;
    padding: 20px 0;
    max-width: 900px;
    margin: auto;
  }

  form {
    width: 350px;
    margin: auto;
    background-color: var(--background-secondary);
  }

  .form-flex {
    flex-direction: column;
  }
}
</style>
