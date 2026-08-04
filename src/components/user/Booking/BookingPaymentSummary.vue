<template>
  <div class="card payment-card">
    <h3>Payment Summary</h3>

    <div class="payment-summary">
      <div class="amount-row" v-if="payment.totalAmount > 0">
        <span>Total</span>
        <strong>KES {{ payment.totalAmount }}</strong>
      </div>

      <div class="amount-row">
        <span>Paid</span>
        <strong>KES {{ payment.amountPaid }}</strong>
      </div>

      <div class="amount-row balance-row" v-if="payment.remainingBalance > 0">
        <span>Balance</span>
        <strong :class="{ unpaid: bookingPrice > 0 }">
          {{ payment.remainingBalance }}
        </strong>
      </div>
    </div>

    <div class="payment-status-badge">
      <span :class="['status-badge', payment.status]">
        {{ payment.status }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  payment: {
    type: Object,
    required: true,
    default: () => ({
      totalAmount: 0,
      amountPaid: 0,
      remainingBalance: "KES 0",
      status: "pending",
    }),
  },
  bookingPrice: {
    type: Number,
    default: 0,
  },
  paymentStatus: {
    type: String,
    required: true,
  },
});
</script>
<style scoped>
.card {
  background: #3a4246;
  border-radius: 16px;
  padding: 26px;
  margin-bottom: 24px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}

.total-price {
  color: #f5d698;
}

.payment-status-badge {
  padding-top: 1rem;
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
</style>
