<template>
  <div class="appointment-container">
    <div class="form-header">
      <h1 class="title">Book an Appointment</h1>
      <p class="subtitle">Fill in the details below to secure your slot</p>
    </div>

    <form @submit.prevent="handleSubmit" class="appointment-form">
      <BookingBasicInfo
        v-model:date="form.date"
        v-model:time="form.time"
        v-model:technician="form.technician"
        :technicians="appStore.technicians"
        :today="today"
        :minTime="minTime"
      />

      <BookingServices v-model="form.services" :services="appStore.services" />

      <BookingCustomUpload
        :form="form"
        :previews="previews"
        :handleFileUpload="handleFileUpload"
        :removeFile="removeFile"
        :customInputRef="customInput"
      />

      <!-- <BookingGallery
        v-if="form.gallery.length"
        :gallerr="bookingStore.selectedServices"
        :total-price="bookingStore.totalPrice"
        @remove="removeGalleryItem"
      /> -->

      <BookingActions
        :loading="loading"
        :is-processing="isProcessing"
        :total-price="bookingStore.totalPrice"
      />
    </form>
  </div>
</template>
<script setup>
import { computed, onMounted, reactive, ref, onBeforeUnmount } from "vue";
import BookingBasicInfo from "./BookingBasicInfo.vue";
import BookingActions from "./BookingActions.vue";
import BookingCustomUpload from "./BookingCustomUpload.vue";
import BookingGallery from "./BookingGallery.vue";
import BookingServices from "./BookingServices.vue";
import { useFileUpload } from "../../composables/useFileUpload";
import { useBooking } from "@/components/composables/useBooking";
import { usePaymentPolling } from "../../composables/usePaymentpolling";
import { useBookingStore } from "../../store/useBookingStore";
import { useRouter } from "vue-router";
import { useAppStore } from "@/components/store/appStore";
const bookingStore = useBookingStore();

const initialForm = {
  services: [],
  subServiceIds: bookingStore.selectedServices.map((s) => s.subId),
  date: "",
  time: "",
  technician: "",
  notes: "",
};

const form = reactive({ ...initialForm });

const customInput = ref(null);
const { previews, files, handleFileUpload, removeFile, clearAll } =
  useFileUpload();
const router = useRouter();
const today = new Date().toISOString().split("T")[0];
const appStore = useAppStore();
const { submitBooking, loading } = useBooking();

const { isProcessing, startPolling } = usePaymentPolling(router);
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
  Object.assign(form, initialForm);

  // clear file input (DOM)
  if (customInput.value) {
    customInput.value.value = "";
  }

  // clear previews + files
  clearAll();

  bookingStore.clearServices();
}

async function handleSubmit() {
  await submitBooking(form, resetForm, startPolling, files);
}

onBeforeUnmount(() => {
  clearAll();
});
</script>
<style scoped>
/* Main container styles */
.appointment-container {
  max-width: 920px;
  margin: 2rem auto;
  padding: 2.5rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.07);
  font-family: "Segoe UI", system-ui, sans-serif;
}

.form-header {
  text-align: center;
  margin-bottom: 2.8rem;
}

.title {
  color: #2c3e50;
  font-size: 2.3rem;
  margin-bottom: 0.6rem;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
}

.appointment-form {
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
}
</style>
