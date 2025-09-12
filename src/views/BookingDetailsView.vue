<template>
  <div class="details-container">
    <div class="back-button" @click="$router.back()">
      <span>← Back to Bookings</span>
    </div>
    <h1 class="title">Booking Details</h1>
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
    </div>
    <div v-else class="details-content">
      <div class="details-header">
        <h2 class="service-title">{{ booking.service }}</h2>
        <span
          v-if="booking.status"
          class="status"
          :class="booking.status.toLowerCase()"
          >{{ booking.status }}</span
        >
      </div>
      <div class="details-info">
        <p>
          <strong>Date & Time:</strong> {{ formatDate(booking.date) }} at
          {{ booking.time }}
        </p>
        <p><strong>Technician:</strong> {{ booking.technician }}</p>
        <p v-if="booking?.payment?.amount !== undefined">
          <strong>Price:</strong> KES {{ booking.payment.amount }}
        </p>

        <p v-if="booking?.notes"><strong>Notes:</strong> {{ booking.notes }}</p>
      </div>

      <!-- gallery images -->
      <div
        v-if="booking.gallery && booking.gallery.length"
        class="images-gallery">
        <h3 class="gallery-title">selected images</h3>
        <div class="image-grid">
          <img
            v-for="(image, index) in booking.gallery"
            :key="index"
            :src="image.image"
            :alt="`Image ${index + 1} for ${booking.service || 'Booking'}`"
            class="gallery-image" />
        </div>
      </div>

      <!-- booking images -->
      <div
        v-if="booking.images && booking.images.length"
        class="images-gallery">
        <h3 class="gallery-title">submitted images</h3>
        <div class="image-grid">
          <img
            v-for="(image, index) in booking.images"
            :key="index"
            :src="image"
            :alt="`Image ${index + 1} for ${booking.service || 'Booking'}`"
            class="gallery-image" />
        </div>
      </div>
      <div class="actions" v-if="booking.bookingId">
        <button
          v-if="booking.bookingStatus === 'upcoming'"
          @click="cancelBooking"
          class="action-btn cancel-btn">
          Cancel Booking
        </button>
        <button @click="rebookBooking" class="action-btn rebook-btn">
          Rebook
        </button>
        <button @click="openReceipt" class="action-btn receipt-btn">
          View Receipt
        </button>
      </div>
      <p v-if="!booking.bookingId && !isLoading" class="no-details">
        Booking details not found.
      </p>
    </div>

    <!-- Receipt Modal -->
    <div v-if="showReceipt" class="modal-overlay" @click.self="closeReceipt">
      <div class="receipt-modal">
        <button class="close-btn" @click="closeReceipt">×</button>
        <h2 class="modal-title">Receipt</h2>
        <div class="receipt-content">
          <p><strong>Service:</strong> {{ booking.service }}</p>
          <p>
            <strong>Date & Time:</strong> {{ formatDate(booking.date) }} at
            {{ booking.time }}
          </p>
          <p><strong>Technician:</strong> {{ booking.technician }}</p>
          <p v-if="booking?.payment?.amount !== undefined">
            <strong>Price:</strong> KES {{ booking.payment.amount }}
          </p>
          <p v-if="booking?.notes">
            <strong>Notes:</strong> {{ booking.notes }}
          </p>
          <p>
            <strong>Status:</strong>
            <span v-if="booking.status" :class="booking.status.toLowerCase()">{{
              booking.status
            }}</span>
          </p>
          <p><strong>Transaction ID:</strong> #{{ booking.id || "N/A" }}</p>
          <p><strong>Issued:</strong> {{ formatDateTime(new Date()) }}</p>
        </div>
        <button class="print-btn" @click="printReceipt">Print Receipt</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();

// State
const booking = ref({});
const showReceipt = ref(false);
const isLoading = ref(true);
const { bookingId } = useRoute().params;

onMounted(async () => {
  isLoading.value = true;
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/booking/${bookingId}`,
      {
        credentials: "include",
      }
    );

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "fetch failed");
    }
    console.log(data.booking);

    booking.value = data.booking;
  } catch (error) {
    console.error("something went wrong", error);
  } finally {
    isLoading.value = false;
  }
});
// Format date
const formatDate = (dateStr) => {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Format date and time (for receipt issuance)
const formatDateTime = (date) => {
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Nairobi",
    hour12: true,
  });
};

// Check if booking is upcoming
const isUpcoming = computed(() => {
  if (!booking.value.date || !booking.value.time) return false;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const bookingDate = new Date(booking.value.date);
  bookingDate.setHours(0, 0, 0, 0);
  const bookingTime = new Date(`1970-01-01 ${booking.value.time}`);
  const currentTime = new Date();
  currentTime.setHours(now.getHours(), now.getMinutes(), 0, 0);
  return (
    bookingDate > now ||
    (bookingDate.getTime() === now.getTime() && bookingTime >= currentTime)
  );
});

// Modal controls
const openReceipt = () => {
  showReceipt.value = true;
};
const closeReceipt = () => {
  showReceipt.value = false;
};
const printReceipt = () => {
  window.print();
};

// Cancel booking
const cancelBooking = () => {
  if (confirm("Are you sure you want to cancel this booking?")) {
    booking.value.status = "Cancelled";
    alert("Booking cancelled successfully.");
    // API call to update status on backend
  }
};

// Rebook booking
const rebookBooking = () => {
  router.push({
    path: "/appointment",
    query: {
      service: booking.value.service,
      date: booking.value.date,
      time: booking.value.time,
    },
  });
};
</script>

<style scoped>
.details-container {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background: linear-gradient(135deg, #fff5f7 0%, #ffe4e1 100%);
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  font-family: "Lora", serif;
  text-align: center;
  position: relative;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  cursor: pointer;
  font-size: 1rem;
  color: #d81b60;
  text-decoration: none;
  transition: color 0.3s ease;
}

.back-button:hover {
  color: #ad1457;
}

.title {
  font-family: "Playfair Display", serif;
  font-size: 2.5rem;
  color: #d81b60;
  margin-bottom: 20px;
  font-weight: 700;
}

.details-content {
  background: #fff;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #d81b60;
  border-radius: 50%;
  width: 40px;
  height: 40px;
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

.details-header {
  margin-bottom: 20px;
}

.service-title {
  font-size: 1.8rem;
  color: #d81b60;
  margin: 0;
  font-weight: 600;
}

.status {
  font-size: 1rem;
  padding: 5px 10px;
  border-radius: 15px;
  display: inline-block;
  margin-top: 5px;
}

.status.confirmed {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.status.pending {
  background-color: #fff3e0;
  color: #ed6c02;
}

.status.completed {
  background-color: #e0f2e9;
  color: #1b5e20;
}

.status.cancelled {
  background-color: #ffebee;
  color: #d32f2f;
}

.details-info p {
  margin: 10px 0;
  font-size: 1.1rem;
  color: #333;
  text-align: left;
}

.images-gallery {
  margin-top: 20px;
}

.gallery-title {
  font-size: 1.3rem;
  color: #d81b60;
  margin-bottom: 15px;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
}

.gallery-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.gallery-image:hover {
  transform: scale(1.05);
}

.actions {
  margin-top: 30px;
  display: flex;
  gap: 15px;
  justify-content: center;
}

.action-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.cancel-btn {
  background-color: #d32f2f;
  color: #fff;
}

.cancel-btn:hover {
  background-color: #b71c1c;
  transform: translateY(-2px);
}

.rebook-btn {
  background-color: #2e7d32;
  color: #fff;
}

.rebook-btn:hover {
  background-color: #1b5e20;
  transform: translateY(-2px);
}

.receipt-btn {
  background-color: #d81b60;
  color: #fff;
}

.receipt-btn:hover {
  background-color: #ad1457;
  transform: translateY(-2px);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.receipt-modal {
  background: #fff;
  padding: 20px;
  border-radius: 15px;
  width: 90%;
  max-width: 400px;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease-out;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #d81b60;
}

.modal-title {
  font-family: "Playfair Display", serif;
  font-size: 1.8rem;
  color: #d81b60;
  margin-bottom: 15px;
}

.receipt-content p {
  margin: 10px 0;
  font-size: 1rem;
  color: #333;
  text-align: left;
}

.print-btn {
  margin-top: 20px;
  padding: 10px 25px;
  background-color: #d81b60;
  color: #fff;
  border: none;
  border-radius: 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.print-btn:hover {
  background-color: #ad1457;
}

@keyframes slideIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.no-details {
  font-size: 1.1rem;
  color: #666;
  text-align: center;
}

@media (max-width: 768px) {
  .details-content {
    padding: 15px;
  }
  .image-grid {
    grid-template-columns: 1fr;
  }
  .actions {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
