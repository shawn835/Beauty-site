<template>
  <div class="verify-page">
    <div class="verify-card">
      <!-- =========================================================
           HEADER
      ========================================================== -->

      <div class="brand">
        <h1>Symos Nail Spa</h1>

        <p class="subtitle">
          {{ isStaff ? "Receipt Verification" : "Receipt Lookup" }}
        </p>
      </div>

      <div class="divider"></div>

      <!-- =========================================================
           1. LOADING
           GET /verify/:token is still running
      ========================================================== -->

      <div v-if="loading" class="state-block">
        <Spinner message="Verifying receipt..." size="small" inline />
      </div>

      <!-- =========================================================
           2. NETWORK / REQUEST ERROR
           The request itself failed.
           
           This is different from INVALID_RECEIPT.
      ========================================================== -->

      <div v-else-if="error" class="state-block">
        <div class="icon-circle error">
          <font-awesome-icon icon="times" />
        </div>

        <h2 class="state-title error-text">Verification Failed</h2>

        <p class="state-message">
          {{ error }}
        </p>
      </div>

      <div v-else-if="!isStaff" class="state-block">
        <!-- Valid receipt -->
        <template v-if="verificationData.status === 'RECEIPT_VALID'">
          <div class="icon-circle success">
            <font-awesome-icon icon="check" />
          </div>

          <h2 class="state-title success-text">Receipt Verified</h2>

          <div class="info-list">
            <div class="info-row">
              <span>Receipt</span>
              <strong>
                {{ verificationData.receiptNumber }}
              </strong>
            </div>

            <div class="info-row">
              <span>Booking</span>
              <strong>
                {{ verificationData.bookingCode }}
              </strong>
            </div>
          </div>

          <p class="public-note">
            This receipt is valid and belongs to a booking in the Symos Nail Spa
            system.
          </p>
        </template>

        <!-- Invalid receipt -->
        <template v-else>
          <div class="icon-circle error">
            <font-awesome-icon icon="times" />
          </div>

          <h2 class="state-title error-text">Invalid Receipt</h2>

          <p class="state-message">
            {{ verificationData.message }}
          </p>
        </template>
      </div>

      <div v-else class="state-block">
        <template v-if="checkingIn">
          <div class="icon-circle success">
            <font-awesome-icon icon="check" />
          </div>

          <h2 class="state-title">Checking In Customer</h2>

          <div class="info-list">
            <div class="info-row">
              <span>Customer</span>
              <strong>
                {{ verificationData.booking?.customerName }}
              </strong>
            </div>

            <div class="info-row">
              <span>Booking</span>
              <strong>
                {{ verificationData.bookingCode }}
              </strong>
            </div>

            <div class="info-row">
              <span>Receipt</span>
              <strong>
                {{ verificationData.receiptNumber }}
              </strong>
            </div>
          </div>

          <Spinner message="Please wait..." size="small" />
        </template>

        <template v-else-if="checkInResult">
          <template v-if="checkInResult.status === 'CHECKED_IN'">
            <div class="icon-circle success">
              <font-awesome-icon icon="check" />
            </div>

            <h2 class="state-title success-text">Customer Checked In</h2>

            <p class="state-message">
              {{ checkInResult.message }}
            </p>

            <div class="info-list">
              <div class="info-row">
                <span>Receipt</span>
                <strong>
                  {{ checkInResult.receiptNumber }}
                </strong>
              </div>

              <div class="info-row">
                <span>Booking</span>
                <strong>
                  {{ checkInResult.bookingCode }}
                </strong>
              </div>

            
              <div class="info-row">
                <span>Checked in</span>
                <strong>
                  {{ formatDate(checkInResult.checkedInAt) }}
                </strong>
              </div>
            </div>
          </template>

          <template v-else-if="checkInResult.status === 'ALREADY_CHECKED_IN'">
            <div class="icon-circle warning">
              <font-awesome-icon icon="exclamation" />
            </div>

            <h2 class="state-title warning-text">Already Checked In</h2>

            <p class="state-message">
              {{ checkInResult.message }}
            </p>

            <div class="info-list">
              <div class="info-row">
                <span>Receipt</span>
                <strong>
                  {{ checkInResult.receiptNumber }}
                </strong>
              </div>

              <div class="info-row">
                <span>Booking</span>
                <strong>
                  {{ checkInResult.bookingCode }}
                </strong>
              </div>
            </div>
          </template>

          <template v-else>
            <div class="icon-circle warning">
              <font-awesome-icon icon="exclamation" />
            </div>

            <h2 class="state-title warning-text">Check-in Not Completed</h2>

            <p class="state-message">
              {{ checkInResult.message }}
            </p>
          </template>
        </template>

        <template v-else-if="verificationData.status === 'READY_FOR_CHECK_IN'">
          <div class="icon-circle success">
            <font-awesome-icon icon="check" />
          </div>

          <h2 class="state-title success-text">Booking Verified</h2>

          <div class="info-list">
            <div class="info-row">
              <span>Customer</span>
              <strong>
                {{ verificationData.booking.customerName }}
              </strong>
            </div>

            <div class="info-row">
              <span>Booking</span>
              <strong>
                {{ verificationData.bookingCode }}
              </strong>
            </div>

            <div class="info-row">
              <span>Receipt</span>
              <strong>
                {{ verificationData.receiptNumber }}
              </strong>
            </div>

            <div class="info-row">
              <span>Technician</span>
              <strong>
                {{ verificationData.booking.technicianName }}
              </strong>
            </div>
          </div>

          <BaseButton
            label="Check in customer"
            :disabled="checkingIn"
            @click="checkIn"
          />
        </template>

        <template v-else-if="verificationData.status === 'ALREADY_CHECKED_IN'">
          <div class="icon-circle warning">
            <font-awesome-icon icon="exclamation" />
          </div>

          <h2 class="state-title warning-text">Already Checked In</h2>

          <p class="state-message">
            {{ verificationData.message }}
          </p>

          <div class="info-list">
            <div class="info-row">
              <span>Receipt</span>
              <strong>
                {{ verificationData.receiptNumber }}
              </strong>
            </div>

            <div class="info-row">
              <span>Booking</span>
              <strong>
                {{ verificationData.bookingCode }}
              </strong>
            </div>

            <div class="info-row">
              <span>Checked in</span>
              <strong>
                {{ formatDate(verificationData.checkedInAt) }}
              </strong>
            </div>

            <div class="info-row">
              <span>Staff</span>
              <strong>
                {{ verificationData.checkedInBy }}
              </strong>
            </div>
          </div>
        </template>

        <!-- =====================================================
             4E. GET RESULT — NOT SCHEDULED TODAY
        ====================================================== -->

        <template v-else-if="verificationData.status === 'NOT_SCHEDULED_TODAY'">
          <div class="icon-circle warning">
            <font-awesome-icon icon="exclamation" />
          </div>

          <h2 class="state-title warning-text">Not Scheduled Today</h2>

          <p class="state-message">This booking is scheduled for:</p>

          <p class="highlight-date">
            {{ formatDate(verificationData.appointmentDate) }}
          </p>

          <p class="state-message muted">No check-in action is available.</p>
        </template>

        <template v-else>
          <div class="icon-circle warning">
            <font-awesome-icon icon="exclamation" class="exclamation" />
          </div>

          <h2 class="state-title warning-text">Check-in Not Available</h2>

          <p class="state-message">
            {{ verificationData.message }}
          </p>

          <div
            v-if="
              verificationData.receiptNumber || verificationData.bookingCode
            "
            class="info-list"
          >
            <div v-if="verificationData.receiptNumber" class="info-row">
              <span>Receipt</span>
              <strong>
                {{ verificationData.receiptNumber }}
              </strong>
            </div>

            <div v-if="verificationData.bookingCode" class="info-row">
              <span>Booking</span>
              <strong>
                {{ verificationData.bookingCode }}
              </strong>
            </div>
          </div>

          <p class="state-message muted">No check-in action is available.</p>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useApi } from "../composables/useFetch";
import { handleResponse } from "@/Utility/response";
import { formatDate } from "@/Utility/utils";
import { useUserStore } from "../store/userStore";
import Spinner from "../Spinner.vue";
import BaseButton from "../BaseButton.vue";

const route = useRoute();
const userStore = useUserStore();
const token = route.query.token;
const checkingIn = ref(false);
const error = ref("");
const checkInResult = ref(null);
const staffs = ["technician", "admin"];
const isStaff = staffs.includes(userStore.user?.role);
const url = token
  ? `${import.meta.env.VITE_API_URL}/api/verify/receipt/${token}`
  : null;
const { data, loading } = useApi(url, {
  credentials: "include",
});

const verificationData = computed(() => data.value?.result);

const checkIn = async () => {
  if (checkingIn.value) return;
  checkingIn.value = true;
  error.value = "";
  checkInResult.value = null;
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/checkin/receipt`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      },
    );
    const data = await handleResponse(res);
    /* * The POST result is now the authoritative result * of the check-in attempt. */
    checkInResult.value = data.result;
  } catch (err) {
    error.value = err.message;
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

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
