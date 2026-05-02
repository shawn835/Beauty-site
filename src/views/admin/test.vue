<template>
  <div class="user-booking-detail">
    <!-- Header -->
    <div class="booking-header">
      <button class="back-btn" @click="$emit('back')">
        ← Back to My Bookings
      </button>

      <div class="header-main">
        <h1>Booking #{{ booking.bookingCode }}</h1>
        <span :class="['status-badge', booking.status.toLowerCase()]">
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
              <p>{{ booking.bookingDate }}</p>
            </div>
            <div class="info-item">
              <label>Time Slot</label>
              <p>{{ booking.timeSlot }}</p>
            </div>
            <div class="info-item">
              <label>Duration</label>
              <p>{{ booking.duration }}</p>
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
              v-for="service in booking.services"
              :key="service.id"
              class="service-item"
            >
              <div class="service-main">
                <span class="check">✓</span>
                <div>
                  <strong>{{ service.name }}</strong>
                  <small>{{ service.duration }}</small>
                </div>
                <span class="price"
                  >KES {{ service.price.toLocaleString() }}</span
                >
              </div>

              <div v-if="service.subServices?.length" class="sub-services">
                <div
                  v-for="sub in service.subServices"
                  :key="sub.id"
                  class="sub-service"
                >
                  • {{ sub.name }}
                  <span class="extra">+KES {{ sub.price }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="total-row">
            <strong>Total Amount</strong>
            <strong class="total-price"
              >KES {{ booking.totalPrice.toLocaleString() }}</strong
            >
          </div>
        </div>

        <!-- Reference Images -->
        <div class="card">
          <h3>Style References</h3>
          <div class="image-gallery">
            <div
              v-for="(img, i) in booking.customImages"
              :key="i"
              class="gallery-item"
            >
              <img :src="img.url" alt="Your style" />
            </div>
          </div>
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
              <strong>KES {{ booking.totalPrice.toLocaleString() }}</strong>
            </div>
            <div class="amount-row">
              <span>Paid</span>
              <strong>KES {{ booking.paidAmount.toLocaleString() }}</strong>
            </div>
            <div class="amount-row balance-row">
              <span>Balance</span>
              <strong :class="{ unpaid: booking.balance > 0 }">
                KES {{ booking.balance.toLocaleString() }}
              </strong>
            </div>
          </div>

          <div class="payment-status-badge">
            <span
              :class="['status-badge', booking.paymentStatus.toLowerCase()]"
            >
              {{ booking.paymentStatus }}
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
            <div
              v-for="(log, i) in booking.activityLog"
              :key="i"
              class="activity-item"
            >
              <span class="time">{{ log.time }}</span>
              <span>{{ log.action }}</span>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="card actions-card">
          <h3>Actions</h3>
          <div class="user-actions">
            <button
              class="btn btn-reschedule"
              @click="rescheduleBooking"
              :disabled="booking.status === 'Cancelled'"
            >
              Reschedule
            </button>

            <button
              class="btn btn-cancel"
              @click="cancelBooking"
              :disabled="
                booking.status === 'Cancelled' || booking.status === 'Confirmed'
              "
            >
              Cancel Booking
            </button>

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
import { ref } from "vue";

const emit = defineEmits(["back"]);

const booking = ref({
  bookingCode: "BK-1FP45954",
  status: "Confirmed",
  bookingDate: "Saturday, 3 May 2026",
  timeSlot: "9:49 AM - 1:43 PM",
  duration: "3 hrs 54 mins",
  technician: "Esther Wanjiku",
  totalPrice: 5200,
  paidAmount: 5200,
  balance: 0,
  paymentStatus: "Paid",
  notes:
    "Please use soft pink and add extra rhinestones on ring finger. Thank you!",

  services: [
    {
      id: 1,
      name: "Manicure + Gel Polish",
      price: 3200,
      duration: "1 hr 45 mins",
      subServices: [
        { name: "Gel Overlay", price: 800 },
        { name: "French Tips", price: 600 },
      ],
    },
    {
      id: 2,
      name: "Pedicure",
      price: 2000,
      duration: "1 hr",
    },
  ],

  customImages: [
    { url: "https://picsum.photos/600/400?random=1" },
    { url: "https://picsum.photos/600/400?random=2" },
  ],

  activityLog: [
    { time: "10:22", action: "Booking created successfully" },
    { time: "10:25", action: "Payment completed via M-Pesa" },
    { time: "10:30", action: "Technician assigned" },
    { time: "Yesterday", action: "Booking confirmed" },
  ],
});

// Actions
const rescheduleBooking = () => {
  alert("Reschedule modal would open here");
};

const cancelBooking = () => {
  if (confirm("Are you sure you want to cancel this booking?")) {
    alert("Booking cancelled (demo)");
  }
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

.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.gallery-item img {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
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
