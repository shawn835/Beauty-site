<template>
  <div class="appointment-container">
    <h1 class="title">Book an Appointment</h1>
    <p class="subtitle">
      Please fill out the appointment form below to make appointment
    </p>
    <form @submit.prevent="handleSubmit" class="appointment-form">
      <div class="form-row">
        <div class="form-group">
          <label for="date">date*</label>
          <input
            type="date"
            id="firstName"
            v-model="form.date"
            placeholder="date"
            :min="today"
            required />
        </div>
        <div class="form-group">
          <label for="time">time*</label>
          <input
            type="time"
            id="lastName"
            v-model="form.time"
            placeholder="time"
            :min="minTime"
            required />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="service">Select Service</label>
          <select id="service" v-model="form.services" required multiple>
            <option value="" disabled>Select Service</option>
            <option
              v-for="service in servicesNames"
              :key="service._id"
              :value="service._id">
              {{ service.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="staff">Select Staff</label>
          <select id="staff" v-model="form.staff" required>
            <option value="" disabled>Select Staff</option>
            <option v-for="t in technicians" :value="t.name" :key="t._id">
              {{ t.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>
            Upload Sample Design (Optional)
            <input
              ref="customInput"
              type="file"
              accept="image/*"
              multiple
              @change="handleFileUpload" />
          </label>
        </div>
        <div class="form-group">
          <label>
            Notes (Optional)
            <textarea
              v-model="form.notes"
              placeholder="e.g. I want nude gel polish"></textarea>
          </label>
        </div>
      </div>

      <!-- Gallery Samples -->
      <div v-if="form.gallery.length" class="gallery">
        <h3>Picked from our Gallery:</h3>

        <div class="gallery-list">
          <div
            v-for="(img, idx) in form.gallery"
            :key="idx"
            class="gallery-card">
            <!-- Remove Icon -->
            <button
              type="button"
              class="remove-btn"
              @click="removeGalleryItem(idx, img)">
              ✖
            </button>

            <img :src="img.image" alt="Sample" class="gallery-img-large" />

            <div class="gallery-info">
              <!-- <p class="gallery-service">{{ img.serviceName }}</p> -->
              <p class="gallery-name">{{ img.name }}</p>
              <p class="gallery-duration">{{ img.duration }}</p>
              <p class="gallery-price">KES {{ img.price }}</p>
            </div>
          </div>
        </div>

        <!-- Total -->
        <div class="gallery-total">
          <strong>Total: </strong>
          <span>
            KES
            {{ bookingStore.totalPrice }}
          </span>
        </div>
      </div>

      <!-- Preview Area -->
      <div v-if="previews.length" class="preview-area">
        <h3>Selected Designs</h3>
        <div class="preview-images">
          <div
            v-for="(img, idx) in previews"
            :key="idx"
            class="preview-wrapper">
            <img :src="img" alt="Preview" class="preview-img" />
            <button type="button" @click="removeFile(idx)" class="remove-btn">
              ✖
            </button>
          </div>
        </div>
      </div>

      <button type="submit" class="primary-button" :disabled="loading">
        <span v-if="loading">submiting booking</span>
        <span v-else>submit</span>
      </button>
    </form>
  </div>

  <div v-if="isProcessing" class="spinner-overlay">
    <div>
      <div class="spinner"></div>
      <div class="spinner-message">
        Please check your phone and enter your M-Pesa PIN<br />
        <small>Do not close or refresh this page</small>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, reactive, ref, onBeforeUnmount } from "vue";
import { useFileUpload } from "../composables/useFileUpload";
import { useBooking } from "../composables/useBooking";
import { usePaymentPolling } from "../composables/usePaymentpolling";
import { useBookingStore } from "../store/useBookingStore";
import { useRouter } from "vue-router";
import { useServices } from "../composables/useServices";
import { useTechnicians } from "../composables/useTechnician";
import { useToast } from "../composables/useToast";

const { servicesNames, fetchData: fetchServices } = useServices();
const { technicians, fetchData: fetchTechnicians } = useTechnicians();

const { handleBooking, loading } = useBooking();
const customInput = ref(null);
const bookingStore = useBookingStore();
const { previews, files, handleFileUpload, removeFile } = useFileUpload();
const router = useRouter();
const today = new Date().toISOString().split("T")[0];
const { show } = useToast();

const { isProcessing, startPolling } = usePaymentPolling(router);
const form = reactive({
  services: [],
  price: [],
  duration: [],
  gallery: [],
  custom: files,
  date: "",
  time: "",
  staff: "",
  notes: "",
});

const isToday = computed(() => form.date === today);
const minTime = computed(() => {
  if (isToday.value) {
    const now = new Date();
    return now.toTimeString().slice(0, 5); // "HH:MM"
  }
  return "00:00";
});

//prefill from store when form opens
onMounted(() => {
  if (bookingStore.selectedServices.length > 0) {
    form.gallery = [...bookingStore.selectedServices];
  }
  if (bookingStore.serviceIds.length > 0) {
    form.services = [...bookingStore.serviceIds];
  }
});

function removeGalleryItem(idx, img) {
  form.gallery.splice(idx, 1);
  bookingStore.removeService(img.name, img.serviceId);
}

function resetForm() {
  form.services = [];
  form.date = "";
  form.time = "";
  form.staff = "";
  form.notes = "";
  form.gallery = [];

  if (customInput.value) {
    customInput.value.value = "";
  }

  bookingStore.clearServices();
}

async function handleSubmit() {
  try {
    const { bookingId, requiresPayment, message } = await handleBooking(form);
    show({ message: message, type: "success" });
    if (requiresPayment) startPolling(bookingId);
    resetForm();
  } catch (err) {
    show({ message: err.message || "something went wrong!", type: "error" });
    console.error("Booking failed:", err);
  }
}

onMounted(async () => {
  await fetchServices();
  await fetchTechnicians();
});

onBeforeUnmount(() => {
  previews.value.forEach((p) => URL.revokeObjectURL(p.url));
});
</script>
<style scoped>
.appointment-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  font-family: "Georgia", serif;
  text-align: center;
}

.title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1rem;
  color: #666;
  margin-bottom: 30px;
}

.appointment-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}

.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: left;
}

label {
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 5px;
  font-weight: 500;
}

input,
select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  font-family: "Arial", sans-serif;
  transition: border-color 0.3s ease;
}

input:focus,
select:focus {
  outline: none;
  border-color: #d81b60;
}

.gallery {
  margin: 1.5rem 0;
}

.gallery-list,
.preview-images {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 15px;
}

.gallery-card,
.preview-wrapper {
  position: relative;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease;
}

.gallery-card:hover {
  transform: translateY(-4px);
}

.remove-btn {
  position: absolute;
  top: 5px;
  right: 8px;
  background: #e91e63;
  border: none;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery-img-large {
  width: 100%;
  height: 100px;
  object-fit: cover;
}

.gallery-info {
  padding: 10px;
  text-align: center;
}

.gallery-service {
  font-size: 0.85rem;
  font-weight: 600;
  color: #888;
  margin-bottom: 4px;
}

.gallery-name {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
}

.gallery-duration {
  font-size: 0.85rem;
  color: #555;
}

.gallery-price {
  margin-top: 6px;
  font-size: 1rem;
  font-weight: 600;
  color: #d81b60;
}

.gallery-total {
  margin-top: 1rem;
  text-align: right;
  font-size: 1.1rem;
}

.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8); /* light blur */
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #ccc;
  border-top: 5px solid #0d6efd;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.spinner-message {
  text-align: center;
  margin-top: 16px;
  color: #333;
  font-size: 16px;
}

@media (max-width: 600px) {
  .form-row {
    flex-direction: column;
  }
}
</style>
