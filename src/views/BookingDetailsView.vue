<template>
  <div class="details-container">
    <div class="back-button" @click="$router.back()">
      <span>← Back to Bookings</span>
    </div>

    <h1 class="title">Booking Details</h1>

    <div v-if="loading">
      <Spinner />
    </div>

    <div v-else class="details-content">
      <BookingDetailsHeader
        :service="booking.service"
        :status="booking.status" />

      <BookingDetailsInfo
        :date="booking.date"
        :time="booking.time"
        :technician="booking.technician"
        :payment="booking.payment"
        :notes="booking.notes" />

      <BookingDetailsGallery
        v-if="booking.gallery"
        :images="booking.gallery"
        title="selected images"
        :service="booking.service"
        :isObject="true" />

      <BookingDetailsGallery
        v-if="booking.images"
        :images="booking.images"
        title="submitted images"
        :service="booking.service" />

      <BookingDetailsActions
        :booking-id="booking.bookingId"
        :booking-status="booking.bookingStatus"
        @cancel="handleCancel"
        @rebook="rebookBooking"
        @receipt="openReceipt" />

      <p v-if="!booking.bookingId && !loading" class="no-details">
        Booking details not found.
      </p>
    </div>

    <ReceiptModal
      :show="showReceipt"
      :booking="booking"
      @close="closeReceipt"
      @print="printReceipt" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBooking } from "@/components/composables/useBooking";
import { useToast } from "@/components/composables/useToast";

import BookingDetailsInfo from "@/components/booking/BookingDetailsInfo.vue";
import BookingDetailsHeader from "@/components/booking/BookingDetailsHeader.vue";
import BookingDetailsGallery from "@/components/booking/BookingDetailsGallery.vue";
import BookingDetailsActions from "@/components/booking/BookingDetailsActions.vue";
import ReceiptModal from "@/components/booking/ReceiptModal.vue";
import Spinner from "@/components/utility/Spinner.vue";

const router = useRouter();
const { show } = useToast();
const { fetchBookingById, cancelBooking, loading } = useBooking();

const booking = ref({});
const showReceipt = ref(false);
const { bookingId } = useRoute().params;

onMounted(async () => {
  booking.value = await fetchBookingById(bookingId);
});

const handleCancel = async () => {
  try {
    const { message } = await cancelBooking(bookingId);
    show({ message: message, type: "success" });
    router.push("/my/bookings");
  } catch (error) {
    show({ message: error.message, type: "error" });
  }
};

const openReceipt = () => (showReceipt.value = true);
const closeReceipt = () => (showReceipt.value = false);
const printReceipt = () => window.print();
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
