<template>
  <div class="payment-page">
    <div class="payment-container">
      <h2 class="page-title">Complete Your Booking</h2>

      <!-- Booking Recap -->
      <div class="recap-card">
        <h3>Booking Summary</h3>
        <div class="recap-items">
          <div
            v-for="service in bookingStore.selectedServices"
            :key="service.id"
            class="recap-row"
          >
            <span
              >{{ service.serviceName }}
              {{
                service.subServiceName ? `• ${service.subServiceName}` : ""
              }}</span
            >
            <span class="duration">{{ service.serviceDuration }}</span>
          </div>
        </div>

        <div class="recap-meta">
          <div class="meta-item">
            <FontAwesomeIcon icon="calendar" class="calendar" />
            <span>{{ bookingStore.form.date }}</span>
          </div>
          <div class="meta-item">
            <FontAwesomeIcon icon="clock" class="clock" />
            <span>{{ bookingStore.form.time }}</span>
          </div>
          <div class="meta-item">
            <FontAwesomeIcon icon="user" class="user" />
            <span>{{
              bookingStore.selectedTechnician?.name || "No preference"
            }}</span>
          </div>
        </div>
      </div>

      <!-- Amount Breakdown -->
      <div class="amount-card">
        <h3>Amount Breakdown</h3>

        <div class="breakdown">
          <div class="breakdown-row">
            <span>Booking Total</span>
            <strong>KSh {{ bookingStore.totalPrice.toLocaleString() }}</strong>
          </div>

          <template v-if="bookingStore.paymentOption === 'deposit'">
            <div class="breakdown-row deposit">
              <span>Deposit Required (30%)</span>
              <strong
                >KSh {{ bookingStore.depositAmount.toLocaleString() }}</strong
              >
            </div>

            <div class="breakdown-row balance">
              <span>Balance Due on Arrival</span>
              <strong
                >KSh
                {{ bookingStore.remainingBalance.toLocaleString() }}</strong
              >
            </div>
          </template>

          <div v-else class="breakdown-row deposit">
            <span>Amount Payable Now</span>
            <strong>KSh {{ bookingStore.totalPrice.toLocaleString() }}</strong>
          </div>
        </div>
      </div>

      <!-- Payment Option -->
      <div class="payment-option-section">
        <h3>Choose Payment Amount</h3>
        <div class="choice-grid">
          <label
            class="choice-option"
            :class="{ active: bookingStore.paymentOption === 'deposit' }"
          >
            <input
              type="radio"
              v-model="bookingStore.paymentOption"
              value="deposit"
            />
            <div class="option-content">
              <strong>{{ bookingStore.paymentLabel }}</strong>
              <h4>KSh {{ bookingStore.depositAmount.toLocaleString() }}</h4>
            </div>
          </label>

          <label
            class="choice-option"
            :class="{ active: bookingStore.paymentOption === 'full' }"
          >
            <input
              type="radio"
              v-model="bookingStore.paymentOption"
              value="full"
              :disabled="bookingStore.totalPrice <= 0"
            />
            <div class="option-content">
              <strong>Pay Full Amount</strong>
              <h4>KSh {{ bookingStore.totalPrice.toLocaleString() }}</h4>
            </div>
          </label>
        </div>
      </div>

      <!-- M-Pesa -->
      <div class="mpesa-section">
        <h3>Payment Method</h3>
        <div class="mpesa-method">
          <i class="fa-solid fa-mobile-screen-button"></i>
          <div>
            <strong>M-Pesa</strong>
            <small>Instant • Secure • Trusted</small>
          </div>
        </div>

        <div class="phone-section">
          <label>M-Pesa Phone Number</label>
          <input
            type="tel"
            v-model="bookingStore.form.phoneNumber"
            class="phone-input"
            placeholder="+254 712 345 678"
          />
        </div>
      </div>

      <!-- Final Payable -->
      <div class="final-pay-card">
        <span class="label">Amount to Pay Now</span>
        <h1 class="final-amount">
          KSh {{ bookingStore.amountToPay.toLocaleString() }}
        </h1>
      </div>

      <!-- Trust -->
      <div class="trust-line">
        <span>
          <FontAwesomeIcon icon="lock" class="lock" />
          Secure Checkout</span
        >
        <span>
          <FontAwesomeIcon icon="bolt" class="bolt" /> Instant STK Push</span
        >
        <span
          ><FontAwesomeIcon icon="envelope" class="envelope" /> Digital
          Receipt</span
        >
      </div>

      <!-- Agreement -->
      <div class="agreement">
        <label class="custom-checkbox">
          <input type="checkbox" v-model="agreed" />
          <span class="checkmark"></span>
          I authorize this payment and accept the booking terms &amp; conditions
        </label>
      </div>

      <!-- Buttons -->
      <div class="action-buttons">
        <BaseButton
          label="Back"
          variant="outline"
          fullWidth
          iconLeft="arrow-left"
          @click="goBack"
        />

        <BaseButton
          :label="`Pay KSh ${bookingStore.amountToPay.toLocaleString()}`"
          variant="success"
          fullWidth
          iconRight="credit-card"
          :disabled="!agreed || isSubmitting || isProcessing"
          @click="submitBooking"
        />
      </div>
    </div>
  </div>

  <Spinner
    :show="isProcessing"
    size="large"
    message="initiating payment..."
    subtext="Check your phone for M-Pesa prompt, do not close this page"
  />
</template>
<script setup>
import { ref } from "vue";
import { useBookingStore } from "../store/useBookingStore";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import BaseButton from "../BaseButton.vue";
import Spinner from "../Spinner.vue";
import { useToast } from "../composables/useToast";
import { usePaymentPolling } from "../composables/usePaymentpolling";
import { useBooking } from "../composables/useBooking";

const agreed = ref(false);
const bookingStore = useBookingStore();
const { createBooking } = useBooking();
const { isProcessing, startPolling, stopPolling } = usePaymentPolling();
const { show } = useToast();
const isSubmitting = ref(false);

const submitBooking = async () => {
  if (!agreed.value) return;

  isSubmitting.value = true;

  try {
    const { bookingCode, message } = await createBooking(
      bookingStore.bookingPayload,
    );

    show({
      message: message || "Booking received. Awaiting payment confirmation.",
      type: "success",
    });

    startPolling(bookingCode, (event) => {
      switch (event.type) {
        case "info":
          show({ message: event.message, type: "info" });
          break;

        case "confirmed":
          show({
            message: event.message || "Payment successful!",
            type: "success",
          });
          bookingStore.resetBooking();
          router.push(`/orders/track-order/${event.bookingCode}`);
          break;

        case "completed":
          show({
            message: event.message || "Service completed.",
            type: "success",
          });
          bookingStore.resetBooking();
          router.push(`/orders/track-order/${event.bookingCode}`);
          break;

        case "payment_failed":
          show({
            message: event.message || "Payment failed",
            type: "error",
          });
          break;
      }
    });
  } catch (err) {
    show({
      message: err.message || "booking failed",
      type: "error",
    });

    stopPolling();
  } finally {
    isSubmitting.value = false;
  }
};

const emit = defineEmits(["back"]);

function goBack() {
  emit("back");
}
</script>
<style scoped>
.payment-page {
  padding: 40px 20px 120px;
  background: var(--bg-dark);
  min-height: 100vh;
  color: var(--text-light);
}

.payment-container {
  max-width: 680px;
  margin: 0 auto;
  background: #2e3538;
  border-radius: 24px;
  padding: 40px 36px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.4);
}

.page-title {
  text-align: center;
  font-size: 2.1rem;
  color: var(--bg-pink);
  margin-bottom: 40px;
}

.recap-card,
.amount-card,
.mpesa-section {
  background: #242a2d;
  padding: 28px;
  border-radius: 18px;
  margin-bottom: 28px;
}

.recap-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #3a4246;
}

.breakdown {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.breakdown-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 0.5rem;
  font-size: large;
}

.duration {
  color: var(--text-gray);
}

.recap-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 16px;
  color: var(--text-gray);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.choice-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.choice-option {
  border: 2px solid #444;
  border-radius: 16px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.choice-option.active {
  border-color: var(--bg-pink);
  background: rgba(216, 27, 96, 0.08);
}

.final-pay-card {
  background: linear-gradient(135deg, #3a4246, #2e3538);
  padding: 32px;
  border-radius: 20px;
  text-align: center;
  margin: 32px 0;
}

.final-amount {
  font-size: 2.8rem;
  color: var(--bg-pink);
  margin: 8px 0 0;
  font-weight: 700;
}

.custom-checkbox {
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  font-size: 1.05rem;
}

.btn-pay {
  background: var(--bg-pink);
  color: white;
  border: none;
  padding: 18px 32px;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  width: 100%;
  margin-top: 10px;
}

/* Trust Line */
.trust-line {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  margin: 40px 0 50px;
  padding: 20px 0;
  border-top: 1px solid #444;
  border-bottom: 1px solid #444;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-gray);
  font-size: 0.98rem;
}

.trust-item i {
  color: var(--bg-pink);
  font-size: 1.3rem;
}

/* Agreement */
.agreement-section {
  margin: 30px 0 40px;
  padding: 20px;
  background: #242a2d;
  border-radius: 16px;
}

.custom-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  cursor: pointer;
  font-size: 1.03rem;
  line-height: 1.5;
}

.custom-checkbox input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.checkmark {
  width: 26px;
  height: 26px;
  border: 2px solid #666;
  border-radius: 8px;
  flex-shrink: 0;
  position: relative;
  transition: all 0.3s ease;
  margin-top: 2px;
}

.custom-checkbox input:checked ~ .checkmark {
  background-color: var(--bg-pink);
  border-color: var(--bg-pink);
}

.checkmark:after {
  content: "✓";
  position: absolute;
  color: white;
  font-size: 18px;
  font-weight: bold;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.25s ease;
}

.custom-checkbox input:checked ~ .checkmark:after {
  transform: translate(-50%, -50%) scale(1);
}

.checkbox-text {
  color: #ddd;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 16px;
  margin-top: 20px;
}
</style>
