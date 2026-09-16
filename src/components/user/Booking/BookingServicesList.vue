<template>
  <div class="card">
    <h3 class="section-title">Your Services</h3>

    <div class="services-list">
      <!-- Parent Services (if any) -->
      <div v-for="service in services" :key="service.id" class="service-item">
        <div class="parent-header">
          <strong class="parent-name">{{ service.name }}</strong>
        </div>
      </div>

      <!-- Sub Services -->
      <div v-if="subServices.length" class="sub-services">
        <div v-for="sub in subServices" :key="sub.id" class="sub-service-item">
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

    <!-- Conditional Total / Reservation Fee Row -->
    <div class="total-row">
      <template v-if="subServices.length">
        <strong>Total Amount</strong>
        <strong class="total-price">KES {{ totalAmount }}</strong>
      </template>
      <template v-else>
        <strong>Reservation Fee</strong>
        <strong class="total-price">KES {{ amountPaid }}</strong>
      </template>
    </div>
  </div>
</template>

<script setup>
import { formatDuration } from "@/Utility/utils";

defineProps({
  services: {
    type: Array,
    default: () => [],
  },
  subServices: {
    type: Array,
    default: () => [],
  },
  totalAmount: {
    type: [Number, String],
    default: "0.00",
  },
  amountPaid: {
    type: [Number, String],
    default: "0.00",
  },
});
</script>

<style scoped>
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
</style>
