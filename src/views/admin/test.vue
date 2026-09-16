<template>
  <div class="verify-page">
    <div class="verify-card">
      <!-- Brand -->
      <div class="brand">
        <h1>Symos Nail Spa</h1>
        <p class="subtitle">
          {{ isStaff ? "Receipt Verification" : "Receipt Lookup" }}
        </p>
      </div>

      <div class="divider"></div>

      <!-- LOADING -->
      <div v-if="loading" class="state-block">
        <div class="spinner"></div>
        <p class="state-message">Verifying receipt...</p>
      </div>

      <!-- ERROR / NOT FOUND -->
      <div v-else-if="error" class="state-block">
        <div class="icon-circle error">✕</div>
        <h2 class="state-title error-text">Verification Failed</h2>
        <p class="state-message">{{ error }}</p>
      </div>

      <!-- PUBLIC VIEW -->
      <div v-else-if="!isStaff" class="state-block">
        <div class="icon-circle success">✓</div>
        <h2 class="state-title success-text">Receipt Verified</h2>

        <div class="info-list">
          <div class="info-row">
            <span>Receipt</span>
            <strong>{{ data.receiptNo }}</strong>
          </div>
          <div class="info-row">
            <span>Booking</span>
            <strong>{{ data.bookingCode }}</strong>
          </div>
        </div>

        <p class="public-note">
          This receipt is valid and belongs to a booking in the Symos Nail Spa
          system.
        </p>
      </div>

      <!-- STAFF VIEW -->
      <div v-else class="state-block">
        <!-- READY FOR CHECK-IN -->
        <template v-if="data.status === 'READY_FOR_CHECK_IN'">
          <div class="icon-circle success">✓</div>
          <h2 class="state-title success-text">Booking Verified</h2>

          <div class="info-list">
            <div class="info-row">
              <span>Customer</span><strong>{{ data.customerName }}</strong>
            </div>
            <div class="info-row">
              <span>Booking</span><strong>{{ data.bookingCode }}</strong>
            </div>
            <div class="info-row">
              <span>Receipt</span><strong>{{ data.receiptNo }}</strong>
            </div>
            <div class="info-row">
              <span>Technician</span><strong>{{ data.technicianName }}</strong>
            </div>
            <div class="info-row">
              <span>Appointment</span
              ><strong>{{ data.appointmentDate }}</strong>
            </div>
            <div class="info-row">
              <span>Payment</span><strong>{{ data.paymentStatus }}</strong>
            </div>
          </div>

          <button class="btn primary" :disabled="checkingIn" @click="checkIn">
            {{ checkingIn ? "Checking in..." : "Check In Customer" }}
          </button>
        </template>

        <!-- ALREADY CHECKED IN -->
        <template v-else-if="data.status === 'ALREADY_CHECKED_IN'">
          <div class="icon-circle success">✓</div>
          <h2 class="state-title success-text">Already Checked In</h2>

          <div class="info-list">
            <div class="info-row">
              <span>Customer</span><strong>{{ data.customerName }}</strong>
            </div>
            <div class="info-row">
              <span>Receipt</span><strong>{{ data.receiptNo }}</strong>
            </div>
            <div class="info-row">
              <span>Checked in</span><strong>{{ data.checkedInAt }}</strong>
            </div>
            <div class="info-row">
              <span>Staff</span><strong>{{ data.checkedInBy }}</strong>
            </div>
          </div>
        </template>

        <!-- NOT SCHEDULED TODAY -->
        <template v-else-if="data.status === 'NOT_SCHEDULED_TODAY'">
          <div class="icon-circle warning">⚠</div>
          <h2 class="state-title warning-text">Not Scheduled Today</h2>
          <p class="state-message">This booking is scheduled for:</p>
          <p class="highlight-date">{{ data.appointmentDate }}</p>
          <p class="state-message muted">No check-in action available.</p>
        </template>

        <!-- CANCELLED -->
        <template v-else-if="data.status === 'CANCELLED'">
          <div class="icon-circle error">✕</div>
          <h2 class="state-title error-text">Booking Cancelled</h2>
          <p class="state-message">This booking cannot be checked in.</p>
        </template>

        <!-- PAYMENT NOT VALID -->
        <template v-else-if="data.status === 'PAYMENT_NOT_VALID'">
          <div class="icon-circle error">✕</div>
          <h2 class="state-title error-text">Payment Not Valid</h2>
          <p class="state-message">
            This booking is not eligible for check-in.
          </p>
        </template>

        <!-- FALLBACK -->
        <template v-else>
          <div class="icon-circle warning">!</div>
          <h2 class="state-title warning-text">Unable to Process</h2>
          <p class="state-message">
            This booking cannot be checked in at this time.
          </p>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const loading = ref(true);
const checkingIn = ref(false);
const error = ref("");
const isStaff = ref(false); // set from auth

// Mock data — replace with API response
const data = ref({
  status: "READY_FOR_CHECK_IN", // READY_FOR_CHECK_IN | ALREADY_CHECKED_IN | NOT_SCHEDULED_TODAY | CANCELLED | PAYMENT_NOT_VALID
  customerName: "Jane Doe",
  bookingCode: "BK-82J91",
  receiptNo: "SYM-00123",
  technicianName: "Mary",
  appointmentDate: "13 Sep 2026",
  paymentStatus: "Partial",
  checkedInAt: "13 Sep 2026, 2:34 PM",
  checkedInBy: "Mary",
});

onMounted(async () => {
  try {
    // Example:
    // const receiptNo = route.params.receiptNo
    // const res = await fetch(`/api/verify/${receiptNo}`)
    // const json = await res.json()
    // isStaff.value = json.isStaff
    // data.value = json.data

    await new Promise((r) => setTimeout(r, 600));
    isStaff.value = true; // demo: staff view
  } catch (e) {
    error.value = "We could not verify this receipt. Please try again.";
  } finally {
    loading.value = false;
  }
});

const checkIn = async () => {
  checkingIn.value = true;
  try {
    await new Promise((r) => setTimeout(r, 900));
    data.value.status = "ALREADY_CHECKED_IN";
    data.value.checkedInAt = new Date().toLocaleString("en-KE", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
    data.value.checkedInBy = data.value.technicianName;
  } finally {
    checkingIn.value = false;
  }
};
</script>

<style scoped>
.verify-page {
  min-height: 100vh;
  background: #1a1f22;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  color: #e5e7eb;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
}

.verify-card {
  width: 100%;
  max-width: 420px;
  background: #252b2e;
  border-radius: 20px;
  padding: 2rem 1.6rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(245, 214, 152, 0.12);
}

.brand {
  text-align: center;
}

.brand h1 {
  margin: 0;
  font-size: 1.6rem;
  color: #f5d698;
}

.subtitle {
  margin: 0.35rem 0 0;
  color: #aaa;
  font-size: 0.95rem;
}

.divider {
  border-top: 1px dashed rgba(245, 214, 152, 0.25);
  margin: 1.3rem 0;
}

.state-block {
  text-align: center;
}

.icon-circle {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.1rem;
  font-size: 1.8rem;
  font-weight: 700;
}

.icon-circle.success {
  background: rgba(74, 222, 128, 0.15);
  color: #4ade80;
}

.icon-circle.warning {
  background: rgba(251, 191, 36, 0.15);
  color: #fbbf24;
}

.icon-circle.error {
  background: rgba(248, 113, 113, 0.15);
  color: #f87171;
}

.state-title {
  margin: 0 0 1rem;
  font-size: 1.35rem;
}

.success-text {
  color: #4ade80;
}
.warning-text {
  color: #fbbf24;
}
.error-text {
  color: #f87171;
}

.state-message {
  color: #ccc;
  margin: 0 0 0.6rem;
  line-height: 1.5;
}

.state-message.muted {
  color: #888;
}

.highlight-date {
  color: #f5d698;
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0.4rem 0 0.8rem;
}

.info-list {
  text-align: left;
  background: rgba(0, 0, 0, 0.22);
  border-radius: 14px;
  padding: 0.9rem 1rem;
  margin: 0 0 1.4rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.55rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.95rem;
}

.info-row:last-child {
  border-bottom: none;
}

.info-row span {
  color: #aaa;
}

.info-row strong {
  color: #f5d698;
  text-align: right;
}

.public-note {
  color: #bbb;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
}

.btn {
  width: 100%;
  border: none;
  border-radius: 12px;
  padding: 0.95rem 1rem;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
}

.btn.primary {
  background: #f5d698;
  color: #2e3538;
}

.btn.primary:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.spinner {
  width: 42px;
  height: 42px;
  border: 3px solid rgba(245, 214, 152, 0.2);
  border-top-color: #f5d698;
  border-radius: 50%;
  margin: 0 auto 1rem;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
