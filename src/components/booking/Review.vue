<template>
  <div class="review-page">
    <div class="review-container">
      <h2 class="page-title">Review Your Booking</h2>

      <div class="summary-card">
        <h3>Booking Summary</h3>

        <div class="summary-grid">
          <div class="summary-item">
            <strong>Date &amp; Time</strong>
            <span
              >{{ bookingStore.form.date }} at
              {{ bookingStore.form.time }}</span
            >
          </div>
          <div class="summary-item">
            <strong>Technician</strong>
            <span>{{
              bookingStore.selectedTechnician?.name || "No preference"
            }}</span>
          </div>
          <div class="summary-item">
            <strong>Contact</strong>
            <span>{{ bookingStore.form.phoneNumber }}</span>
          </div>
        </div>

        <!-- Main Services -->
        <div class="services-review">
          <h4>Selected Services</h4>
          <div
            v-for="service in bookingStore.selectedServices"
            :key="service.serviceId"
            class="review-service"
          >
            <div>
              <strong>{{ service.serviceName }}</strong>
              <small>{{ service.serviceDuration }}</small>
            </div>
          </div>
        </div>

        <!-- Sub-services / Add-ons -->
        <div
          class="sub-services-preview"
          v-if="bookingStore.selectedServices.length"
        >
          <h4>Sub-Services &amp; Add-ons</h4>

          <div class="sub-grid">
            <div
              v-for="sub in bookingStore.selectedServices"
              :key="sub.subId"
              class="sub-item"
            >
              <span class="check"
                ><FontAwesomeIcon icon="check" class="check"
              /></span>

              {{ sub.subServiceName }}
              <span v-if="sub.subServiceDuration">
                • {{ sub.duration }} min</span
              >

              <span class="sub-price">
                +KSh {{ Number(sub.price || 0).toLocaleString() }}
              </span>
            </div>
          </div>
        </div>

        <!-- Image Previews -->
        <div class="images-review" v-if="bookingStore?.previews">
          <h4>Reference Images</h4>
          <div class="image-preview-grid">
            <div
              v-for="(img, i) in bookingStore?.previews"
              :key="i"
              class="preview-item"
            >
              <img :src="img" alt="Reference" />
            </div>
          </div>
        </div>
      </div>

      <!-- Policies -->
      <div class="policies-section">
        <h3>Important Booking Policies</h3>
        <div class="policies-list">
          <p v-for="(policy, i) in policies" :key="i" class="policy-item">
            • {{ policy }}
          </p>
        </div>
      </div>

      <!-- Agreements -->
      <div class="agreement-section">
        <label class="custom-checkbox">
          <input type="checkbox" v-model="agreedToPolicies" />
          <span class="checkmark"></span>
          I have read and agree to all the booking policies above
        </label>

        <label class="custom-checkbox">
          <input type="checkbox" v-model="agreedToPricing" />
          <span class="checkmark"></span>
          I understand that final pricing may vary based on sub-services and
          design complexity
        </label>
      </div>

      <!-- Total -->
      <div class="final-total">
        <div class="total">
          <span>Total Estimated Amount</span>
          <strong>KSh {{ bookingStore.totalPrice }}</strong>
        </div>
        <div class="deposit">
          <span>{{ bookingStore.paymentLabel }}</span>
          <strong>kSh {{ bookingStore.depositAmount }}</strong>
        </div>
      </div>

      <!-- Actions -->
      <div class="review-actions">
        <BaseButton
          label="back to Details"
          fullWidth
          variant="outline"
          @click="goBack"
          icon-left="arrow-left"
        />

        <BaseButton
          @click="proceedToPayment"
          label="continue to payment"
          fullWidth
          :disabled="!canProceed"
          size="medium"
          icon-right="arrow-right"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useBookingStore } from "../store/useBookingStore";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import BaseButton from "../BaseButton.vue";

const emit = defineEmits(["back", "next"]);

const bookingStore = useBookingStore();

const agreedToPolicies = ref(false);
const agreedToPricing = ref(false);

const policies = [
  "A deposit is required to confirm all bookings.",
  "For priced sub-services, a 30% deposit applies (minimum KSh 500).",
  "Bookings without priced sub-services require a flat KSh 500 reservation deposit.",
  "Late cancellations may result in deposit forfeiture.",
  "Missed appointments are treated as no-shows.",
  "Final pricing may vary depending on design complexity and add-ons.",
];

const canProceed = computed(() => {
  return agreedToPolicies.value && agreedToPricing.value;
});

const goBack = () => {
  emit("back");
};

const proceedToPayment = () => {
  if (!canProceed.value) return;

  emit("next");
};
</script>

<style scoped>
.review-page {
  padding: 40px 20px 100px;
  background: var(--bg-dark);
  color: var(--text-light);
  min-height: 100vh;
}

.review-container {
  max-width: 780px;
  margin: 0 auto;
  background: #2e3538;
  border-radius: 20px;
  padding: 40px;
}

.page-title {
  text-align: center;
  color: var(--bg-pink);
  margin-bottom: 40px;
}

.summary-card {
  background: #242a2d;
  padding: 30px;
  border-radius: 16px;
  margin-bottom: 30px;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.summary-item strong {
  display: block;
  color: var(--text-gray);
  font-size: 0.95rem;
}

.review-service {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #444;
}

.sub-services-preview h4,
.services-review h4 {
  margin: 20px 0 12px;
  color: var(--bg-pink);
}

.sub-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.sub-item {
  background: #3a4246;
  padding: 10px 16px;
  border-radius: 10px;
  font-size: 0.98rem;
}

.policies-section {
  background: #242a2d;
  padding: 28px;
  border-radius: 16px;
  margin: 30px 0;
}

.policy-item {
  margin: 10px 0;
  line-height: 1.6;
  color: #ccc;
}

.agreement-section {
  margin: 30px 0;
}

.image-preview-grid {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 12px;
}

.preview-item {
  width: 90px;
  height: 90px;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #444;
}

.preview-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Beautiful Custom Checkboxes */
.custom-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin: 18px 0;
  cursor: pointer;
  font-size: 1.02rem;
  user-select: none;
}

.custom-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  width: 24px;
  height: 24px;
  border: 2px solid #666;
  border-radius: 6px;
  flex-shrink: 0;
  position: relative;
  transition: all 0.3s;
}

.custom-checkbox input:checked ~ .checkmark {
  background: var(--bg-pink);
  border-color: var(--bg-pink);
}

.checkmark:after {
  content: "✓";
  position: absolute;
  color: white;
  font-weight: bold;
  font-size: 18px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.2s;
}

.custom-checkbox input:checked ~ .checkmark:after {
  transform: translate(-50%, -50%) scale(1);
}

.final-total {
  background: #1f2528;
  padding: 20px 24px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 1rem;
  font-size: 1.35rem;
  margin: 30px 0;
  flex-wrap: wrap;
}

.total,
.deposit {
  display: flex;
  justify-content: space-between;
}

.review-actions {
  display: flex;
  gap: 16px;
  margin-top: 40px;
}
</style>
