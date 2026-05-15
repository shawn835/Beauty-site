<template>
  <div class="booking-detail-container">
    <!-- Header -->
    <div class="booking-header">
      <div class="booking-code">
        <h1>Booking #{{ booking.bookingCode }}</h1>
        <span :class="getStatusClass(booking.status)">
          {{ booking.status }}
        </span>
      </div>

      <div class="header-actions">
        <BaseButton label="edit status" @click="editStatus" variant="primary" />
        <BaseButton
          @click="reassignTechnician"
          variant="secondary"
          label="reassign technician"
        />

        <BaseButton
          @click="printBooking"
          label="print slip"
          variant="success"
        />
      </div>
    </div>

    <div class="booking-content">
      <!-- Left Column -->
      <div class="left-column">
        <!-- Customer Info -->
        <div class="card">
          <h3>Customer Information</h3>
          <div class="info-grid">
            <div class="info-item">
              <strong>Name:</strong>
              <span>{{ booking.customerName }}</span>
            </div>
            <div class="info-item">
              <strong>Phone:</strong>
              <span class="phone-link" @click="copyPhone">
                {{ booking.phone }}
              </span>
            </div>
            <div class="info-item">
              <strong>Booking Date:</strong>
              <span>{{ formatDate(booking.startTime) }}</span>
            </div>
            <div class="info-item">
              <strong>Time Slot:</strong>
              <span>{{
                formatTimeRange(booking.startTime, booking.endTime)
              }}</span>
            </div>
            <div class="info-item">
              <strong>Duration:</strong>
              <span>{{ formatDuration(booking.duration || "60") }}</span>
            </div>
            <div class="info-item">
              <strong>Assigned Technician:</strong>
              <span>{{ booking.technicianName || "Not Assigned" }}</span>
            </div>
          </div>

          <div class="contact-actions">
            <BaseButton
              @click="callCustomer(booking.customerPhone)"
              label="call customer"
              icon-left="phone"
              variant="outline"
            />
            <BaseButton
              icon-left="comments"
              variant="primary"
              label="whatsapp"
              @click="messageCustomer(booking.customerPhone)"
            />
          </div>
        </div>

        <!-- Services Booked -->
        <div class="card">
          <h3>Services Booked</h3>

          <div class="services-list">
            <div
              v-for="service in services"
              :key="service.id"
              class="service-item"
            >
              <div class="service-main">
                <span class="check">✓</span>
                <strong>{{ service.name }}</strong>

                <span class="price"> KES 0 </span>

                <span class="duration">
                  {{ formatDuration("60") }}
                </span>
              </div>
            </div>

            <!-- render subs separately -->
            <div class="sub-service">
              <div v-for="sub in subServices" :key="sub.id" class="sub-service">
                <span class="check">✓{{ sub.name }}</span>

                <span class="price"
                  >+KES {{ sub.price }} • +{{
                    formatDuration(sub.duration)
                  }}</span
                >
              </div>
            </div>
          </div>

          <div class="subtotal">
            <strong>Subtotal:</strong>
            <span>KES {{ booking.totalPrice }}</span>
          </div>
        </div>

        <ReferenceImages
          :customImages="customImages"
          :inspirationImages="details.subServices"
        />
      </div>

      <!-- Right Column -->
      <div class="right-column">
        <!-- Payment Section -->
        <div class="card payment-card">
          <h3>Payment Summary</h3>

          <div class="payment-info">
            <div class="amount-row">
              <span>Expected Amount</span>
              <strong>KES {{ payment.totalAmount }}</strong>
            </div>

            <div class="amount-row">
              <span>Paid Amount</span>
              <strong>KES {{ payment.amountPaid || 0 }}</strong>
            </div>

            <div class="amount-row balance">
              <span>Balance</span>
              <strong :class="{ 'text-danger': payment.balance > 0 }">
                KES {{ payment.remainingBalance || 0 }}
              </strong>
            </div>
          </div>

          <div class="payment-status">
            <span
              :class="['status-badge', payment.paymentStatus?.toLowerCase()]"
            >
              {{ payment.paymentStatus || "PENDING" }}
            </span>
          </div>

          <!-- Transaction History -->
          <!-- <div class="transaction-history">
            <h4>Transaction History</h4>
            <div
              v-for="(tx, i) in booking.transactions"
              :key="i"
              class="transaction-item"
            >
              <div class="tx-left">
                <strong>{{ tx.method }}</strong>
                <small>{{ tx.phone }}</small>
              </div>
              <div class="tx-center">
                <span>KES {{ tx.amount }}</span>
                <small>{{ tx.timestamp }}</small>
              </div>
              <div class="tx-right">
                <span :class="['tx-status', tx.status.toLowerCase()]">
                  {{ tx.status }}
                </span>
                <small v-if="tx.receipt">Receipt: {{ tx.receipt }}</small>
              </div>
            </div>
          </div> -->

          <div class="payment-actions">
            <BaseButton
              label="  Verify Payment"
              size="small"
              variant="success"
              @click="verifyPayment"
            />

            <BaseButton
              label="mark cash paid"
              size="small"
              variant="outline"
              @click="markCashPaid"
            />

            <BaseButton
              label="resend STK push"
              size="small"
              variant="warning"
              @click="resendSTK"
            />
          </div>
        </div>
        <!-- Customer History -->
        <div class="card">
          <h3>Customer History</h3>

          <div class="history-grid">
            <div v-for="item in customerHistory" :key="item.label">
              <strong>{{ item.label }}:</strong>
              {{ item.value }}
            </div>
          </div>
        </div>

        <!-- Activity Log -->
        <div class="card">
          <h3>Activity Log</h3>
          <div class="activity-timeline">
            <div v-for="(log, i) in activityLogs" :key="i" class="log-item">
              <div class="log-time">{{ log.time }} hrs</div>
              <div class="log-text">{{ log.text }}</div>
            </div>
          </div>
        </div>

        <!-- Notes -->
        <div class="card" v-if="booking.notes">
          <h3>Notes</h3>
          <p class="notes-text">{{ booking.notes }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import ReferenceImages from "@/components/ReferenceImages.vue";
import { useApi } from "@/components/composables/useFetch";

import {
  formatDate,
  formatDuration,
  getStatusClass,
  formatTimeRange,
  callCustomer,
  messageCustomer,
} from "@/Utility/utils";
import BaseButton from "@/components/BaseButton.vue";

const route = useRoute();

const bookingCode = computed(() => route.params.bookingCode);

const url = computed(
  () =>
    `${import.meta.env.VITE_API_URL}/api/admin/bookings/${bookingCode.value}`,
);

const { data, fetchData } = useApi(url, {
  withCredentials: true,
});

const booking = computed(() => safeData.value.booking || {});
const safeData = computed(() => data.value || {});
const details = computed(() => safeData.value.details || {});
const finance = computed(() => safeData.value.finance || {});

const payment = computed(() => finance.value.payments?.[0] || {});
const stats = computed(() => finance.value.stats || {});
const services = computed(() => details.value.services || []);
const subServices = computed(() => details.value.subServices || []);
const customImages = computed(() => details.value.customImages || []);
const activityLogs = computed(() => safeData.value.activity || []);

const customerHistory = computed(() => {
  const s = stats.value || {};

  return [
    {
      label: "Total Bookings",
      value: s.totalBookings ?? 0,
    },
    {
      label: "Lifetime Spend",
      value: `KES ${Number(s.lifetimeSpend || 0).toLocaleString()}`,
    },
    {
      label: "Cancellations",
      value: s.cancellations ?? 0,
    },
    {
      label: "Last Booking",
      value: s.lastBooking || "No bookings",
    },
    {
      label: "Favorite Service",
      value: s.favoriteService || "N/A",
    },
  ];
});
</script>

<style scoped>
.booking-detail-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Segoe UI", system-ui, sans-serif;
  background: var(--bg-dark);
  color: var(--text-light);
  min-height: 100vh;
}

.booking-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 15px;
}

.booking-code h1 {
  margin: 0;
  font-size: 1.8rem;
  color: var(--text-light);
}

.header-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.booking-content {
  display: grid;
  grid-template-columns: 2fr 1.3fr;
  gap: 24px;
}

.card {
  background: #3a4246;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

h3 {
  margin-top: 0;
  color: var(--bg-pink);
  border-bottom: 1px solid #555;
  padding-bottom: 12px;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 16px 0;
}

.info-item span {
  color: var(--text-gray);
}

.phone-link {
  color: var(--bg-pink);
  cursor: pointer;
  text-decoration: underline;
}

.contact-actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.whatsapp {
  background: #25d366;
  color: white;
}

.service-item {
  padding: 14px 0;
  border-bottom: 1px solid #555;
}

.service-main {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.check {
  color: #10b981;
  font-weight: bold;
}

.price {
  margin-left: auto;
  color: var(--bg-pink);
  font-weight: 600;
}

.sub-services {
  margin-top: 10px;
  padding-left: 28px;
}

.sub-service {
  color: var(--text-gray);
  font-size: 0.95rem;
  margin: 6px 0;
}

.subtotal {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 2px solid var(--bg-pink);
  font-size: 1.1rem;
  display: flex;
  justify-content: space-between;
}

.payment-card .amount-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #555;
}

.payment-actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 10px;
}

.balance strong {
  color: #f59e0b;
}

.text-danger {
  color: #ef4444;
}

.transaction-item {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 12px 0;
  border-bottom: 1px solid #444;
  font-size: 0.95rem;
}

.tx-status.success {
  color: #10b981;
}
.tx-status.failed {
  color: #ef4444;
}

.activity-timeline .log-item {
  display: flex;
  gap: 16px;
  padding: 10px 0;
  border-bottom: 1px solid #444;
}

.log-time {
  color: var(--text-gray);
  width: 60px;
  flex-shrink: 0;
}

/* Responsive */
@media (max-width: 1024px) {
  .booking-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .header-actions {
    flex-direction: column;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>
