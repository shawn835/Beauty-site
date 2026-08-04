<template>
  <div v-if="userDetailsLoading">
    <Spinner size="large" message="Loading booking details..." />
  </div>

  <div v-else class="user-booking-detail">
    <BookingHeader
      :booking-code="booking.bookingCode"
      :status="booking.status"
      :formatted-status="bookingStatus"
      @back="goBack"
    />

    <div class="booking-content">
      <!-- Left Column -->
      <div class="left-column">
        <BookingInfoCard :booking="booking" />

        <BookingServicesList
          :services="services"
          :sub-services="subServices"
          :total-amount="payment.totalAmount"
          :amount-paid="payment.amountPaid"
        />

        <ReferenceImages
          :custom-images="customImages"
          :inspiration-images="details.subServices"
        />
      </div>

      <!-- Right Column -->
      <div class="right-column">
        <BookingPaymentSummary
          :payment="payment"
          :booking-price="payment.totalAmount"
          :payment-status="payment.status"
        />

        <div v-if="booking.notes" class="card">
          <h3>Special Requests</h3>
          <p class="notes">{{ booking.notes }}</p>
        </div>

        <BookingActivityLog :activity-log="activityLog" />

        <BookingActions
          :booking="booking"
          :payment-status="paymentStatus"
          :is-cancelling="isCancelling"
          :is-retrying="isRetrying"
          :is-downloading="isDownloading"
          @cancel="confirmCancel"
          @retry-payment="paymentRetry"
          @download-receipt="receiptDownload"
        />

        <LeaveReviewCard
          :booking="{
            technicianName: booking.technicianName,
            date: booking.endTime,
            status: booking.status,
            review: data.review,
          }"
          @leave-review="showReviewModal = true"
        />
      </div>
    </div>
  </div>

  <Spinner
    :show="showPaymentSpinner"
    size="large"
    :message="paymentMessage"
    :subtext="paymentTitle"
  />

  <ReviewModal
    v-if="showReviewModal"
    @close="showReviewModal = false"
    :id="booking.id"
  />
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import Spinner from "@/components/Spinner.vue";
import ReferenceImages from "@/components/ReferenceImages.vue";
import BookingHeader from "@/components/user/Booking/BookingHeader.vue";
import BookingActions from "@/components/user/Booking/BookingActions.vue";
import BookingInfoCard from "@/components/user/Booking/BookingInfoCard.vue";
import BookingActivityLog from "@/components/user/Booking/BookingActivityLog.vue";
import BookingPaymentSummary from "@/components/user/Booking/BookingPaymentSummary.vue";
import BookingServicesList from "@/components/user/Booking/BookingServicesList.vue";
import { useRoute, useRouter } from "vue-router";
import { useApi } from "@/components/composables/useFetch";
import { useBooking } from "@/components/composables/useBooking";
import { useToast } from "@/components/composables/useToast";
import { useBookingSocket } from "@/components/composables/useBookingSocket";
import LeaveReviewCard from "@/components/user/Booking/LeaveReviewCard.vue";
import ReviewModal from "@/components/user/Booking/ReviewModal.vue";

const showReviewModal = ref(false);

const route = useRoute();
const router = useRouter();
const { cancelBooking, downloadReceipt, retryPayment } = useBooking();
const bookingCode = computed(() => route.params.bookingCode);
const { show } = useToast();

const url = computed(
  () =>
    `${import.meta.env.VITE_API_URL}/api/user/bookings/${bookingCode.value}`,
);

const { data, loading: userDetailsLoading } = useApi(url, {
  credentials: "include",
});

/******cancel booking********/
const showCancelModal = ref(false);
const isCancelling = ref(false);
const isDownloading = ref(false);
const isRetrying = ref(false);
const paymentStatus = ref(null);
const paymentLoading = ref(false);
const paymentTitle = ref("");
const paymentMessage = ref("");

const { joinBooking, onBookingEvent, onBookingState, leaveBooking } =
  useBookingSocket();

const applyBookingState = async (payload) => {
  paymentStatus.value = payload.status;
  paymentLoading.value = payload.loading;
  paymentTitle.value = payload.title;
  paymentMessage.value = payload.message;

  // Show notification only when the flow has reached a terminal state.
  if (!payload.loading) {
    show({
      message: payload.message,
      type: payload.status === "success" ? "success" : "error",
    });

    // Keep the final state visible briefly.
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
};

// Register listeners.
const stopBookingState = onBookingState(applyBookingState);
const stopBookingEvent = onBookingEvent(applyBookingState);

onMounted(() => {
  joinBooking(bookingCode.value);
});

onBeforeUnmount(() => {
  stopBookingState();
  stopBookingEvent();
  leaveBooking(bookingCode.value);
});

const showPaymentSpinner = computed(() => paymentLoading.value);

const confirmCancel = async (bookingId) => {
  isCancelling.value = true;
  try {
    const data = await cancelBooking(bookingId);
    show({
      message: data.message || `booking ${bookingCode} cancelled successfully`,
      type: "success",
    });
    showCancelModal.value = false;
    router.push("/profile/user/bookings");
  } catch (error) {
    show({
      message: error.message || "booking cancel failed",
      type: "error",
    });
    console.error(error);
  } finally {
    isCancelling.value = false;
  }
};

//retry
const paymentRetry = async (bookingId) => {
  isRetrying.value = true;
  try {
    const data = await retryPayment(bookingId);

    show({ message: data.message, type: "success" });
  } catch (error) {
    show({
      message: error.message,
      type: "error",
    });
    console.error(error);
  } finally {
    isRetrying.value = false;
  }
};

const receiptDownload = async (bookingId) => {
  if (!bookingId) {
    show({
      message: "Invalid booking selected",
      type: "error",
    });
    return;
  }

  isDownloading.value = true;

  try {
    const data = await downloadReceipt(bookingId);

    window.location.href = data.receiptUrl;

    show({
      message: data.message || "Receipt downloaded successfully",
      type: "success",
    });
  } catch (error) {
    show({
      message: error.message || "Receipt download failed",
      type: "error",
    });

    console.error(error);
  } finally {
    isDownloading.value = false;
  }
};

const safeData = computed(() => data.value || {});
const booking = computed(() => safeData.value.booking || {});
const details = computed(() => safeData.value.details || {});
const finance = computed(() => safeData.value.finance || {});

const payment = computed(() => finance.value.payments?.[0] || {});
const services = computed(() => details.value.services || []);
const subServices = computed(() => details.value.subServices || []);
const customImages = computed(() => details.value.customImages || []);
const activityLog = computed(() => safeData.value.activity || []);
const bookingStatus = computed(() => {
  if (
    ["paid", "partial", "failed", "pending"].includes(paymentStatus.value) &&
    booking.value.status === "cancelled"
  ) {
    return "cancelled";
  }

  if (["processing", "pending"].includes(paymentStatus.value)) {
    return "pending";
  }

  if (["paid", "partial"].includes(paymentStatus.value)) {
    return "confirmed";
  }

  return booking.value.status;
});

const goBack = () => {
  router.push("/profile/user/bookings");
};
</script>

<style scoped>
.user-booking-detail {
  margin: 1rem auto;
  padding: 2.5rem 20px;
  background: var(--bg-dark);
  color: var(--text-light);
  min-height: 100vh;
  font-family: "Segoe UI", system-ui, sans-serif;
}

.booking-content {
  display: grid;
  grid-template-columns: 2fr 1.4fr;
  gap: 28px;
}

.card {
  background: #3a4246;
  border-radius: 16px;
  padding: 26px;
  margin-bottom: 24px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}

h3 {
  margin-top: 0;
  color: var(--bg-pink);
  padding-bottom: 12px;
  border-bottom: 1px solid #555;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 16px;
}

.info-item label {
  display: block;
  color: var(--text-gray);
  font-size: 0.9rem;
  margin-bottom: 4px;
}

.card {
  background: #252b2e;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.notes {
  background: #2e3538;
  padding: 16px;
  border-radius: 10px;
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 992px) {
  .booking-content {
    grid-template-columns: 1fr;
  }

  .service-main {
    flex-wrap: wrap;
    gap: 0.8rem;
  }

  .price {
    margin-left: auto;
  }
}
</style>
