<template>
  <div class="container">
    <Headings
      heading="book now for faster services"
      :style="{ color: 'var(--text-primary)' }" />
    <div class="form-container">
      <div class="image form-side-image">
        <img v-lazy="'/gallery/art-image-11.jpg'" alt="booking-hero-image" />
      </div>

      <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
        <div class="form-flex">
          <div class="form-section">
            <label>
              name
              <input
                type="text"
                required
                placeholder="name"
                maxlength="10"
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
              <select multiple required v-model="bookingData.services">
                <option
                  v-for="service in services"
                  :key="service.category"
                  :value="service.category">
                  {{ service.category }}
                </option>
              </select>
            </label>
          </div>

          <div class="form-section">
            <label>
              phone
              <input
                type="tel"
                required
                placeholder="phone"
                maxlength="13"
                v-model="bookingData.phone" />
            </label>
            <label>
              time
              <input
                type="time"
                required
                v-model="bookingData.time"
                min="6:00"
                max="21:00" />
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
                @change="handleFileUpload"
                accept="image/*" />
            </label>
          </div>
        </div>

        <div class="desktop-preview">
          <div
            v-if="bookingData.samples && bookingData.samples.length"
            class="preview">
            <div
              v-for="(image, index) in bookingData.samples"
              :key="index"
              class="image">
              <img :src="image.preview" alt="Uploaded Preview" />
            </div>
          </div>

          <div
            v-if="bookingData.galleryImages && bookingData.galleryImages.length"
            class="preview">
            <div
              v-for="(image, index) in bookingData.galleryImages"
              :key="index"
              class="image">
              <img :src="image" alt="Gallery Preview" />
            </div>
          </div>
        </div>
        <div class="buttons">
          <buttons button-text="book appointment" class-name="primary-button" />
          <buttons
            button-text="clear form"
            class-name="secondary-button"
            @click="clearForm" />
        </div>
      </form>

      <div class="mobile-preview">
        <div
          v-if="bookingData.samples && bookingData.samples.length"
          class="preview">
          <div
            v-for="(image, index) in bookingData.samples"
            :key="index"
            class="image">
            <img :src="image.preview" alt="Uploaded Preview" />
          </div>
        </div>

        <div
          v-if="bookingData.galleryImages && bookingData.galleryImages.length"
          class="preview">
          <div
            v-for="(image, index) in bookingData.galleryImages"
            :key="index"
            class="image">
            <img :src="image" alt="Gallery Preview" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="bookingDetails">
    <BookingCard
      :booking-details="bookingDetails"
      confirmation="booking successfuly confirmed! Please copy the code, or download the card for reference" />
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
  getCurrentTime,
  clearLocalStorage,
  uploadFileToServer,
} from "@/requestsMethods/requestUtils";
import { getServiceDuration } from "@/requestsMethods/requestUtils";
import { calculateTotalDuration } from "@/requestsMethods/requestUtils";
import { showBookingCard } from "@/requestsMethods/requestUtils";
import BookingCard from "./BookingCard.vue";
import { bookingDetails } from "@/requestsMethods/requestUtils";

const services = servicesData.services;
const toast = useToast();
const fileInput = ref(null);
const maxImages = 5;

const bookingData = ref({
  name: "",
  phone: "",
  date: "",
  time: "",
  services: [],
  technician: "simon chege",
  samples: [],
  galleryImages: [],
  duration: 0,
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

const removeImage = (index) => {
  bookingData.value.samples.splice(index, 1);
  bookingData.value.galleryImages.splice(index, 1);
};

onMounted(() => {
  const savedData = JSON.parse(localStorage.getItem("bookingForm")) || {};
  Object.assign(bookingData.value, savedData);
});

// Save form data to localStorage
const saveFormDataToLocalStorage = () => {
  try {
    localStorage.setItem("bookingForm", JSON.stringify(bookingData.value));
  } catch (error) {
    console.error("Error saving form data to localStorage:", error);
  }
};

const handleFileUpload = async (event) => {
  if (!bookingData.value.samples) bookingData.value.samples = [];

  const files = event.target.files;
  if (!files.length) return;

  if (Array.from(files).length > maxImages) {
    toast.error(`You can upload a maximum of ${maxImages} images.`);
    event.target.value = "";
    return;
  }

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];

  for (let file of files) {
    if (file.size > MAX_FILE_SIZE) {
      toast.error(`${file.name} exceeds the 5MB limit.`);
      event.target.value = ""; // Clear file input
      return;
    }

    if (!allowedMimeTypes.includes(file.type)) {
      toast.error(`Invalid file type: ${file.type}`);
      event.target.value = "";
      return;
    }

    const previewURL = URL.createObjectURL(file); // Preview for frontend

    // Upload the file and get the URL
    const fileUrl = await uploadFileToServer(file);

    if (fileUrl) {
      bookingData.value.samples.push({
        url: fileUrl,
        preview: previewURL,
      });
    }
  }

  saveFormDataToLocalStorage();
};

//watch changes and update local storage
watch(bookingData, (newData) => saveFormDataToLocalStorage(newData), {
  deep: true,
});

// Load saved form data from localStorage
const loadFormDataFromLocalStorage = () => {
  const storedData = localStorage.getItem("bookingForm");

  try {
    if (!storedData) {
      console.warn("No booking form data found in localStorage.");
      return;
    }

    bookingData.value = JSON.parse(storedData);
  } catch (error) {
    console.error("Error parsing localStorage data:", error);
    localStorage.removeItem("bookingForm");
  }
};

// Call load function when component mounts
onMounted(() => {
  loadFormDataFromLocalStorage();
});

const handleSubmit = async () => {
  const bookingId = await submitBooking(bookingData.value);
  if (bookingId) {
    showBookingCard.value = true;
  }
};

const clearForm = () => {
  bookingData.value = {
    name: "",
    phone: "",
    time: "",
    date: "",
    technician: "",
    services: [],
    samples: [],
    galleryImages: [],
  };
  clearLocalStorage();
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

.mobile-preview {
  display: none;
}

.preview {
  display: flex;
  gap: 10px;
}

.preview .image {
  height: 200px;
}

.remove-booking-image {
  position: absolute;
  top: 0;
  left: 10px;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  cursor: pointer;
}

.buttons {
  display: flex;
  justify-content: space-around;
}
@media (max-width: 770px) {
  .form-side-image {
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

  .desktop-preview {
    display: none;
  }

  .mobile-preview {
    display: block;
  }
}
</style>
