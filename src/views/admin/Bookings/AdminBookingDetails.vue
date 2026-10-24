<template>
  <div class="booking-detail-container">
    <!-- Header -->
    <div class="booking-header">
      <div class="booking-code">
        <h1>Booking #{{ booking.bookingCode }}</h1>
        <span :class="['status-badge', booking.status]">
          {{ booking.status }}
        </span>
      </div>

      <div class="header-actions">
        <BaseButton
          label="print slip"
          variant="success"
          @click="receiptDownload(booking.id)"
        />

        <BaseButton
          @click="showReassignModal = true"
          variant="warning"
          label="reassign technician"
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
              <strong>Name: </strong>
              <span>{{ booking.customerName }}</span>
            </div>
            <div class="info-item">
              <strong>Phone: </strong>
              <span>
                {{ booking.customerPhone }}
              </span>
            </div>
            <div class="info-item">
              <strong>Booking Date: </strong>
              <span>{{ formatDate(booking.startTime) }}</span>
            </div>
            <div class="info-item">
              <strong>Time Slot: </strong>
              <span>{{
                formatTimeRange(booking.startTime, booking.endTime)
              }}</span>
            </div>
            <div class="info-item">
              <strong>Duration: </strong>
              <span>{{ formatDuration(booking.duration || "60") }}</span>
            </div>
            <div class="info-item">
              <strong>Assigned Technician: </strong>
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
          git   <BaseButton
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
            <template v-if="subServices.length">
              <strong>Total Amount</strong>
              <strong class="total-price">KES {{ payment.totalAmount }}</strong>
            </template>
            <template v-else>
              <strong>Reservation Fee</strong>
              <strong class="total-price">KES {{ payment.amountPaid }}</strong>
            </template>
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
              <span v-if="payment.totalAmount > 0">Expected Amount</span>
              <strong>KES {{ payment.totalAmount }}</strong>
            </div>

            <div class="amount-row">
              <span>Paid Amount</span>
              <strong>KES {{ payment.amountPaid || 0 }}</strong>
            </div>

            <div class="amount-row balance" v-if="payment.remainingBalance > 0">
              <span>Balance</span>
              <strong :class="{ 'text-danger': payment.balance > 0 }">
                KES {{ payment.remainingBalance || 0 }}
              </strong>
            </div>
          </div>

          <div class="payment-status">
            <span :class="['status-badge', payment.status?.toLowerCase()]">
              {{ payment.status }}
            </span>
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

  <ReassignmentModal
    :booking-id="booking.id"
    v-if="showReassignModal"
    @close="showReassignModal = false"
  />
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import ReferenceImages from "@/components/ReferenceImages.vue";
import { useApi } from "@/components/composables/useFetch";
import { useBooking } from "@/components/composables/useBooking.js";
import { useToast } from "@/components/composables/useToast.js";
const { fetchReceiptBlob } = useBooking();
const { show } = useToast();
const isDownloading = ref(false);

import {
  formatDate,
  formatDuration,
  formatTimeRange,
  callCustomer,
  messageCustomer,
} from "@/Utility/utils";
import BaseButton from "@/components/BaseButton.vue";
import ReassignmentModal from "./ReassignmentModal.vue";
const route = useRoute();
const showReassignModal = ref(false);

const bookingCode = computed(() => route.params.bookingCode);

const url = computed(
  () =>
    `${import.meta.env.VITE_API_URL}/api/admin/bookings/${bookingCode.value}`,
);

const { data } = useApi(url, {
  credentials: "include",
});

const safeData = computed(() => data.value || {});
const booking = computed(() => safeData.value.booking || {});
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
    const blob = await fetchReceiptBlob(bookingId);

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `Receipt-${bookingId}.pdf`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);

    show({
      message: "Receipt downloaded successfully",
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
</script>

<style scoped>
/* =========================================
   BOOKING DETAIL CONTAINER & LAYOUT
   ========================================= */
.booking-detail-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

/* Header Section */
.booking-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--bg-light);
  padding: 1.25rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  gap: 1rem;
  flex-wrap: wrap;
}

.booking-code {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.booking-code h1 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-heading);
  margin: 0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

/* Main Content Grid (Two Columns) */
.booking-content {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 1.5rem;
  align-items: start;
}

.left-column,
.right-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Cards */
.card {
  background-color: var(--bg-light);
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card h3 {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-heading);
  margin: 0 0 0.25rem 0;
  border-bottom: 1px solid var(--bg-grey);
  padding-bottom: 0.5rem;
}

/* Info Grid (Customer Details) */
.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem 1rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.info-item strong {
  font-size: 0.75rem;
  color: var(--dark-gray);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-item span {
  font-size: 0.9rem;
  color: var(--text-dark);
  font-weight: 500;
}

/* Contact Actions (Call / WhatsApp) */
.contact-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.contact-actions :deep(button),
.contact-actions button {
  flex: 1;
}

/* Services Booked List */
.services-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.service-item,
.sub-service-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.06);
  font-size: 0.9rem;
}

.service-main {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
}

.service-main .check,
.sub-service .check {
  color: var(--status-completed);
  font-weight: bold;
}

.service-main .price,
.sub-service .price {
  margin-left: auto;
  font-weight: 600;
  color: var(--text-dark);
}

.service-main .duration,
.sub-service .duration {
  font-size: 0.8rem;
  color: var(--dark-gray);
  margin-left: 0.75rem;
}

.sub-service {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-left: 1rem;
  border-left: 2px solid var(--bg-grey);
  margin-top: 0.25srem;
}

.subtotale,
.subtotal {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.75rem;
  border-top: 1px solid var(--bg-grey);
  font-size: 0.95rem;
  color: var(--text-dark);
}

.total-price {
  color: var(--bg-pink);
  font-size: 1.1rem;
}

/* Payment Summary Styling */
.payment-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.amount-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: var(--dark-gray);
}

.amount-row strong {
  color: var(--text-dark);
}

.amount-row.balance {
  padding-top: 0.5rem;
  border-top: 1px solid var(--bg-grey);
  font-weight: 600;
}

.text-danger {
  color: var(--status-failed) !important;
}

.payment-status {
  display: flex;
  margin-top: 0.25rem;
}

.payment-actions {
  display: flex;
  justify-content: flex-end;
}

/* Customer History */
.history-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem 1rem;
  font-size: 0.9rem;
}

/* Activity Timeline */
.activity-timeline {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.log-item {
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}

.log-time {
  color: var(--dark-gray);
  font-weight: 600;
  white-space: nowrap;
}

.log-text {
  color: var(--text-dark);
}

.notes-text {
  font-size: 0.9rem;
  color: var(--text-dark);
  line-height: 1.5;
  margin: 0;
  background-color: #fafbfc;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid var(--bg-grey);
}

/* =========================================
   STATUS BADGES (Using your exact roots)
   ========================================= */
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Status colors map */
.status-badge.pending,
.status-badge.Pending {
  background-color: var(--bg-pending);
  color: var(--status-pending);
}
.status-badge.confirmed,
.status-badge.Confirmed {
  background-color: var(--bg-confirmed);
  color: var(--status-confirmed);
}
.status-badge.in-progress,
.status-badge.In-Progress {
  background-color: var(--bg-in-progress);
  color: var(--status-in-progress);
}
.status-badge.completed,
.status-badge.Completed {
  background-color: var(--bg-completed);
  color: var(--status-completed);
}
.status-badge.cancelled,
.status-badge.Cancelled {
  background-color: var(--bg-cancelled);
  color: var(--status-cancelled);
}
.status-badge.no-show,
.status-badge.No-Show {
  background-color: var(--bg-no-show);
  color: var(--status-no-show);
}
.status-badge.paid,
.status-badge.Paid,
.status-badge.success,
.status-badge.Success {
  background-color: var(--bg-paid);
  color: var(--status-paid);
}
.status-badge.failed,
.status-badge.Failed {
  background-color: var(--bg-failed);
  color: var(--status-failed);
}
.status-badge.partial,
.status-badge.Partial {
  background-color: var(--bg-partial);
  color: var(--status-partial);
}

/* =========================================
   MOBILE RESPONSIVENESS (Phones)
   ========================================= */
@media (max-width: 768px) {
  .booking-header {
    flex-direction: column;
    align-items: stretch;
    padding: 1rem;
  }

  .booking-code {
    justify-content: space-between;
  }

  .header-actions {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .booking-content {
    grid-template-columns: 1fr; /* Stack columns into a single phone-friendly stream */
  }

  .card {
    padding: 1rem;
  }

  .info-grid,
  .history-grid {
    grid-template-columns: 1fr; /* Single column stats on mobile */
  }
}
</style>
