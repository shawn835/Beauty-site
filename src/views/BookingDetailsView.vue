<template>
  <div class="user-booking-detail">
    <!-- Header -->
    <div class="booking-header">
      <button class="back-btn" @click="goBack()">← Back to My Bookings</button>

      <div class="header-main">
        <h1>Booking #{{ booking.bookingCode }}</h1>
        <span :class="['status-badge', booking.status]">
          {{ bookingStatus }}
        </span>
      </div>
    </div>

    <div class="booking-content">
      <!-- Left Column -->
      <div class="left-column">
        <!-- Booking Info -->
        <div class="card">
          <h3>Booking Information</h3>
          <div class="info-grid">
            <div class="info-item">
              <label>Date</label>
              <p>{{ formatDate(booking.startTime) }}</p>
            </div>
            <div class="info-item">
              <label>Time Slot</label>
              <p>{{ formatTimeRange(booking.startTime, booking.endTime) }}</p>
            </div>
            <div class="info-item">
              <label>Duration</label>
              <p>{{ formatDuration(booking.duration) }}</p>
            </div>
            <div class="info-item">
              <label>Technician</label>
              <p>{{ booking.technicianName || "To be assigned" }}</p>
            </div>
          </div>
        </div>

        <!-- Services -->
        <div class="card">
          <h3 class="section-title">Your Services</h3>

          <div class="services-list">
            <div
              v-for="service in services"
              :key="service.id"
              class="service-item"
            >
              <!-- PARENT HEADER -->
              <div class="parent-header">
                <strong class="parent-name">{{ service.name }}</strong>
              </div>

              <!-- CHILD SUB-SERVICES (with price & duration) -->
              <div class="sub-services">
                <div
                  v-for="sub in subServices"
                  :key="sub.id"
                  class="sub-service-item"
                >
                  <div class="sub-main">
                    <span class="check">
                      <font-awesome-icon icon="check-circle" />
                    </span>
                    <div class="sub-info">
                      <strong>{{ sub.name }}</strong>
                      <small>{{ formatDuration(sub.duration) }}</small>
                    </div>
                    <span class="price">KES {{ sub.price }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="total-row">
            <strong>Total Amount</strong>
            <strong class="total-price">KES {{ payment.totalAmount }}</strong>
          </div>
        </div>

        <!-- Reference Images -->
        <ReferenceImages
          :customImages="customImages"
          :inspirationImages="details.subServices"
        />
      </div>

      <!-- Right Column -->
      <div class="right-column">
        <!-- Payment Status -->
        <div class="card payment-card">
          <h3>Payment Summary</h3>
          <div class="payment-summary">
            <div class="amount-row">
              <span>Total</span>
              <strong>KES {{ payment.totalAmount }}</strong>
            </div>
            <div class="amount-row">
              <span>Paid</span>
              <strong>KES {{ payment.amountPaid }}</strong>
            </div>
            <div class="amount-row balance-row">
              <span>Balance</span>
              <strong :class="{ unpaid: booking.price > 0 }">
                {{ payment.remainingBalance }}
              </strong>
            </div>
          </div>

          <div class="payment-status-badge">
            <span :class="['status-badge', payment.status]">
              {{ paymentStatus }}
            </span>
          </div>
        </div>

        <!-- Notes -->
        <div class="card" v-if="booking.notes">
          <h3>Special Requests</h3>
          <p class="notes">{{ booking.notes }}</p>
        </div>

        <!-- Activity -->
        <div class="card">
          <h3>Booking Activity</h3>
          <div class="activity-list">
            <div v-for="(log, i) in activityLog" :key="i" class="activity-item">
              <span class="time">{{ log.time }} </span>
              <span>{{ log.text }}</span>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="card actions-card">
          <h3>Actions</h3>
          <div class="user-actions">
            <!-- Cancel -->
            <BaseButton
              v-if="!['cancelled', 'completed'].includes(booking.status)"
              label="Cancel Booking"
              variant="danger"
              @click="showCancelModal = true"
              :disabled="isCancelling"
            />

            <BaseButton
              label="retry payment"
              variant="outline"
              v-if="paymentStatus === 'failed'"
              @click="paymentRetry(booking.id)"
              :disabled="isRetrying"
            />

            <ConfirmModal
              :isOpen="showCancelModal"
              title="Cancel Booking?"
              message="Are you sure you want to cancel this booking? This action
            cannot be undone."
              warningText="A cancellation fee may apply if done
            less than 4 hours before appointment."
              type="danger"
              :loading="isCancelling"
              @confirm="confirmCancel(booking.id)"
              @cancel="showCancelModal = false"
            />

            <!-- Rebook always visible -->
            <BaseButton
              label="receipt"
              variant="success"
              @click="receiptDownload(booking.id)"
              :loading="isDownloading"
              :disabled="isDownloading"
            />
            <BaseButton label="contact salon" variant="success" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <Spinner
    :show="showPaymentSpinner"
    size="large"
    message="Waiting for payment confirmation..."
    subtext="Check your phone for the M-Pesa prompt"
  />
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useApi } from "@/components/composables/useFetch";
import { useBooking } from "@/components/composables/useBooking";
import { useToast } from "@/components/composables/useToast";
import BaseButton from "@/components/BaseButton.vue";
import ReferenceImages from "@/components/ReferenceImages.vue";
import Spinner from "@/components/Spinner.vue";
import { useBookingSocket } from "@/components/composables/useBookingSocket";
import { formatDate, formatDuration, formatTimeRange } from "@/Utility/utils";

import ConfirmModal from "@/components/ConfirmModal.vue";
const route = useRoute();
const router = useRouter();
const { cancelBooking, downloadReceipt, retryPayment } = useBooking();
const bookingCode = computed(() => route.params.bookingCode);
const { show } = useToast();

const url = computed(
  () =>
    `${import.meta.env.VITE_API_URL}/api/user/bookings/${bookingCode.value}`,
);

const { data } = useApi(url, {
  credentials: "include",
});

/******cancel booking********/
const showCancelModal = ref(false);
const isCancelling = ref(false);
const isDownloading = ref(false);
const isRetrying = ref(false);
const paymentStatus = ref(null);

const { joinBooking, onBookingEvent, leaveBooking, onBookingState } =
  useBookingSocket();

onBookingState((data) => {
  paymentStatus.value = data.status;
});

onBookingEvent((data) => {
  switch (data.status) {
    case "payment_initiated":
      paymentStatus.value = "processing";
      break;

    case "payment_received":
      paymentStatus.value = "processing";
      break;

    case "booking_confirmed":
      paymentStatus.value = "confirmed";

      show({
        message: data.message,
        type: "success",
      });
      break;

    case "payment_failed":
      paymentStatus.value = "failed";

      show({
        message: data.message || "payment failed",
        type: "error",
      });
      break;
  }
});

onMounted(() => {
  joinBooking(bookingCode.value);
});

onBeforeUnmount(() => {
  leaveBooking();
});

const showPaymentSpinner = computed(() => {
  return ["pending", "processing"].includes(paymentStatus.value);
});

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
const stats = computed(() => finance.value.stats || {});
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

.booking-header {
  display: flex;
  align-items: center;
  gap: 2rem 20px;
  margin-top: 3rem;
  padding: 20px;
  flex-wrap: wrap;
}

.back-btn {
  background: transparent;
  border: 2px solid var(--text-gray);
  color: var(--text-light);
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
}

.header-main h1 {
  margin: 0;
  font-size: 1.9rem;
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

.section-title {
  color: #f5d698;
  font-size: 1.75rem;
  margin-bottom: 2rem;
}

/* Parent */
.parent-header {
  margin-bottom: 1.2rem;
}

.parent-name {
  font-size: 1.45rem;
  color: #f5d698;
}

/* Sub Service Items */
.sub-service-item {
  margin-bottom: 1.4rem;
}

.sub-main {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.check {
  color: #4ade80;
  font-size: 1.6rem;
}

.sub-info {
  flex: 1;
}

.sub-info strong {
  font-size: 1.25rem;
  color: #ddd;
}

.duration {
  color: #aaa;
  font-size: 0.97rem;
}

.price {
  font-size: 1.4rem;
  font-weight: 700;
  color: #f5d698;
}

/* Total */
.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2.5rem;
  padding-top: 1.8rem;
  border-top: 2px solid #f5d698;
  font-size: 1.45rem;
}

.total-price {
  color: #f5d698;
}

.payment-summary .amount-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #555;
}

.balance-row strong.unpaid {
  color: #f59e0b;
}

.user-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
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

  .user-actions {
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
