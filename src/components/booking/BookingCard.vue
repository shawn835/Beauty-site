<template>
  <div class="container">
    <div v-if="bookingDetails" class="booking-card" ref="bookingCard">
      <div class="card-info">
        <div class="image">
          <img src="/hero-images/about-hero-image.jpg" alt="Salon Image" />
        </div>
        <div class="booking-details">
          <div class="confirm-text-id">
            <h4>{{ props.confirmation }}</h4>
            <p>
              Confirmation Code:
              <span class="confirmation-code">{{
                bookingDetails?.id || "N/A"
              }}</span>
            </p>
          </div>
          <div class="booking-info">
            <div class="booking-info-card-1">
              <div>
                <strong>Services:</strong>
                {{
                  Array.isArray(bookingDetails?.services)
                    ? bookingDetails.services.join(", ")
                    : "N/A"
                }}
              </div>
              <div>
                <strong>Technician:</strong>
                {{ bookingDetails?.technician || "N/A" }}
              </div>
              <div>
                <strong>Date:</strong> {{ bookingDetails?.date || "N/A" }}
              </div>
            </div>
            <div class="booking-info-card-2">
              <div>
                <strong>Name:</strong> {{ bookingDetails?.name || "N/A" }}
              </div>
              <div>
                <strong>Time:</strong> {{ bookingDetails?.time || "N/A" }}
              </div>
              <div>
                <strong>Location:</strong> Symos Nail Tech, 123 CBD, Nakuru
              </div>
              <div>
                <strong>Duration:</strong>
                {{ formatDuration(bookingDetails?.duration || 0) }}
              </div>
            </div>
          </div>
        </div>
        <div class="footer">
          <p>
            Please arrive 5 minutes early. Thank you for choosing Symos Nail
            Tech.
          </p>
        </div>
        <div class="download">
          <buttons
            @click="downloadPDF"
            class-name="primary-button"
            button-text="Download"
            :style="{ borderRadius: '0', width: '100%' }" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const apiUrl = import.meta.env.VITE_API_URL;
import buttons from "../utility/buttons.vue";
import { ref } from "vue";
const bookingCard = ref(null);
const props = defineProps({
  bookingDetails: Object,
  confirmation: String,
});

const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0 && mins > 0) return `${hours} hrs ${mins} min`;
  if (hours > 0) return `${hours} hrs`;
  return `${mins} min`;
};

const downloadPDF = () => {
  const params = new URLSearchParams(props.bookingDetails).toString();
  window.open(`${apiUrl}/download-booking?${params}`, "_blank");
};
</script>

<style scoped>
.booking-card {
  position: fixed;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 20;
  max-width: 450px;
  width: 100%;
  height: 100%;
  margin: auto;
  border-radius: 20px;
}
.card-info {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: auto;
}

.image {
  height: 180px;
}
.booking-details {
  padding: 20px;
}
.booking-details h2 {
  margin: 0;
  font-size: 24px;
  color: #333;
}
.booking-details p {
  margin: 8px 0;
  color: #666;
}

.confirm-text-id {
  text-align: center;
}
.confirm-text-id h4 {
  color: rgb(18, 202, 18);
}
.booking-info {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  display: flex;
  gap: 20px;
}
.booking-info div {
  margin-bottom: 8px;
}
.confirmation-code {
  font-weight: bold;
  color: #007bff;
}

.footer {
  padding: 10px 20px;
  font-size: 14px;
  color: #888;
  border-top: 1px solid #eee;
  font-style: oblique;
  text-align: center;
}
.download {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
