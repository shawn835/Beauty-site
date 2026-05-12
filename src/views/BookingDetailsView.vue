<template>
  <div class="user-booking-detail">
    <!-- Header -->
    <div class="booking-header">
      <button class="back-btn" @click="$emit('back')">
        ← Back to My Bookings
      </button>

      <div class="header-main">
        <h1>Booking #{{ booking.bookingCode }}</h1>
        <span :class="getStatusClass(booking.status)">
          {{ booking.status }}
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
              <p>{{ booking.technician || "To be assigned" }}</p>
            </div>
          </div>
        </div>

        <!-- Services -->
        <div class="card">
          <h3>Your Services</h3>
          <div class="services-list">
            <div
              v-if="subServices.length"
              v-for="sub in subServices"
              :key="sub.id"
              class="service-item"
            >
              <div class="service-main">
                <span class="check">✓</span>
                <div>
                  <strong>{{ sub.name }}</strong>
                  <small>{{ formatDuration(sub.duration) }}</small>
                </div>
                <span class="price">KES {{ sub.price }}</span>
              </div>

              <div v-if="services.length" class="sub-services">
                <div
                  v-for="service in services"
                  :key="service.id"
                  class="sub-service"
                >
                  • {{ service.name }}
                  <span class="extra">+KES {{ service.price || "0" }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="total-row">
            <strong>Total Amount</strong>
            <strong class="total-price">KES {{ booking.price }}</strong>
          </div>
        </div>

        <!-- Reference Images -->
        <!-- Reference Images -->
        <div class="card">
          <h3>Style References</h3>

          <!-- Submitted Custom Images -->
          <div class="image-section">
            <h4 class="section-title">Your Submitted Photos</h4>
            <div class="image-gallery">
              <div
                v-for="(img, i) in customImages"
                :key="i"
                class="gallery-item"
              >
                <img :src="img.imageUrl" alt="Your custom style" />
                <div class="image-label">Your Photo</div>
              </div>
            </div>
          </div>

          <!-- Inspiration Images -->
          <div class="image-section">
            <h4 class="section-title">Selected Inspiration</h4>

            <div v-for="sub in details.subServices" :key="sub.id">
              <h5>{{ sub.name }}</h5>

              <div class="inspiration-gallery">
                <div v-for="img in sub.images" :key="img.id" class="inspo-item">
                  <img :src="img.imageUrl" alt="Inspiration" />
                </div>
              </div>
            </div>
          </div>

          <!-- <p v-else class="no-inspo">
            No inspiration images selected for this booking.
          </p> -->
        </div>
      </div>

      <!-- Right Column -->
      <div class="right-column">
        <!-- Payment Status -->
        <div class="card payment-card">
          <h3>Payment Summary</h3>
          <div class="payment-summary">
            <div class="amount-row">
              <span>Total</span>
              <strong>KES {{ payment.amount }}</strong>
            </div>
            <div class="amount-row">
              <span>Paid</span>
              <strong>KES {{ payment.amount }}</strong>
            </div>
            <div class="amount-row balance-row">
              <span>Balance</span>
              <strong :class="{ unpaid: booking.price > 0 }"> KES 0 </strong>
            </div>
          </div>

          <div class="payment-status-badge">
            <span :class="getStatusClass(payment.status)">
              {{ payment.status }}
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
              <span class="time">{{ log.time }}</span>
              <span>{{ log.action }}</span>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="card actions-card">
          <h3>Actions</h3>
          <div class="user-actions">
            <!-- Reschedule -->
            <button
              v-if="!['cancelled', 'completed'].includes(booking.status)"
              class="btn btn-reschedule"
              @click="rescheduleBooking"
            >
              Reschedule
            </button>

            <!-- Cancel -->
            <BaseButton
              v-if="!['cancelled', 'completed'].includes(booking.status)"
              label="Cancel Booking"
              variant="danger"
              @click="showCancelModal = true"
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
            <button class="btn btn-rebook" @click="rebookService">
              Rebook Same Services
            </button>
            <button class="btn btn-contact" @click="contactSalon">
              Contact Salon
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useApi } from "@/components/composables/useFetch";
import { useBooking } from "@/components/composables/useBooking";
import { useToast } from "@/components/composables/useToast";
import BaseButton from "@/components/BaseButton.vue";
import {
  formatDate,
  formatDuration,
  formatTimeRange,
  getStatusClass,
} from "@/Utility/utils";

import ConfirmModal from "@/components/ConfirmModal.vue";
const route = useRoute();
const { loading, cancelBooking } = useBooking();
const emit = defineEmits(["back"]);
const bookingCode = computed(() => route.params.bookingCode);
const { show } = useToast();

const url = computed(
  () =>
    `${import.meta.env.VITE_API_URL}/api/user/bookings/${bookingCode.value}`,
);

const { data } = useApi(url, {
  withCredentials: true,
});

/******cancel booking********/
const showCancelModal = ref(false);
const isCancelling = ref(false);

const confirmCancel = async (bookingId) => {
  try {
    isCancelling.value = true;

    const data = await cancelBooking(bookingId);
    show({
      message: data.message || `booking ${bookingCode} cancelled successfully`,
      type: "success",
    });
    showCancelModal.value = false;
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

const safeData = computed(() => data.value || {});
const booking = computed(() => safeData.value.booking || {});
const details = computed(() => safeData.value.details || {});
const finance = computed(() => safeData.value.finance || {});

const payment = computed(() => finance.value.payments?.[0] || {});
const stats = computed(() => finance.value.stats || {});
const services = computed(() => details.value.services || []);
const subServices = computed(() => details.value.subServices || []);
const customImages = computed(() => details.value.customImages || []);
const subService = computed(() => data.value?.subServices?.[0]);
// const activityLogs = computed(() => safeData.value.activity || []);

const activityLog = [
  { time: "10:22", action: "Booking created successfully" },
  { time: "10:25", action: "Payment completed via M-Pesa" },
  { time: "10:30", action: "Technician assigned" },
  { time: "Yesterday", action: "Booking confirmed" },
];

// Actions
const rescheduleBooking = () => {
  alert("Reschedule modal would open here");
};

const rebookService = () => {
  alert("Redirecting to booking page with same services...");
};

const contactSalon = () => {
  window.open("https://wa.me/254712345678", "_blank");
};
</script>

<style scoped>
.user-booking-detail {
  /* max-width: 1200px; */
  margin: 0 auto;
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
  margin-bottom: 30px;
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

.status-badge {
  padding: 8px 20px;
  border-radius: 30px;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.95rem;
}

.status-badge.confirmed {
  background: #10b981;
  color: white;
}
.status-badge.pending {
  background: #f59e0b;
  color: black;
}
.status-badge.cancelled {
  background: #ef4444;
  color: white;
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

.service-item {
  padding: 16px 0;
  border-bottom: 1px solid #4a5258;
}

.service-main {
  display: flex;
  align-items: center;
  gap: 14px;
}

.check {
  color: #10b981;
  font-size: 1.3rem;
}

.price {
  margin-left: auto;
  font-weight: 600;
  color: var(--bg-pink);
}

.sub-services {
  margin-top: 10px;
  padding-left: 34px;
  color: var(--text-gray);
}

.total-row {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 2px solid var(--bg-pink);
  display: flex;
  justify-content: space-between;
  font-size: 1.25rem;
  align-items: center;
}

.total-price {
  color: var(--bg-pink);
}

.image-section {
  margin-bottom: 28px;
}

.section-title {
  color: var(--text-gray);
  font-size: 1rem;
  margin: 0 0 12px 0;
  font-weight: 500;
}

.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.gallery-item {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 4 / 3;
  transition: transform 0.4s ease;
}

.gallery-item:hover img {
  transform: scale(1.05);
}

.image-label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.75));
  color: white;
  text-align: center;
  padding: 12px 8px 8px;
  font-size: 0.85rem;
}

/* Inspiration Gallery */
.inspiration-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 14px;
}

.inspo-item {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

.inspo-item img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.inspo-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  padding: 8px 10px;
  text-align: center;
}

.inspo-info small {
  color: var(--bg-pink);
  font-weight: 500;
}

.no-inspo {
  color: var(--text-gray);
  font-style: italic;
  text-align: center;
  padding: 20px;
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

.btn {
  padding: 14px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-reschedule {
  background: #3b82f6;
  color: white;
}
.btn-cancel {
  background: #ef4444;
  color: white;
}
.btn-rebook {
  background: var(--bg-pink);
  color: white;
}
.btn-contact {
  background: #10b981;
  color: white;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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
}
</style>
