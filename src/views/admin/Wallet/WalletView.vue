<template>
  <div class="wallet-page">
    <!-- 1. PAGE HEADER -->
    <header class="page-header">
      <div class="header-left">
        <h1 class="page-title">PayHero Wallet</h1>
        <p class="page-desc">
          Manage the PayHero service wallet used to process FundiMatch payments.
        </p>
      </div>
      <div class="header-right">
        <button
          class="refresh-btn"
          @click="refreshWallet"
          :disabled="isRefreshing"
        >
          <span :class="{ spinning: isRefreshing }">↻</span>
          Refresh
        </button>
        <p class="last-updated">Last updated: {{ lastUpdated }}</p>
      </div>
    </header>

    <!-- ERROR STATE -->
    <div v-if="hasError" class="error-banner">
      <div>
        <strong>Unable to load wallet balance</strong>
        <p>
          We couldn't retrieve the current PayHero wallet balance. Please try
          again.
        </p>
      </div>
      <button class="btn primary" @click="refreshWallet">Retry</button>
    </div>

    <template v-else>
      <!-- 2–4. MAIN WALLET BALANCE CARD -->
      <div class="wallet-card" :class="walletStatusClass">
        <div v-if="isLoadingBalance" class="skeleton-card">
          <div class="skeleton line w40"></div>
          <div class="skeleton line w60 big"></div>
          <div class="skeleton line w30"></div>
        </div>

        <template v-else>
          <div class="wallet-top">
            <div>
              <p class="wallet-label">Service Wallet Balance</p>
              <h2 class="wallet-balance">
                KSh {{ formatMoney(wallet.balance) }}
              </h2>
              <div class="status-row">
                <span class="status-dot"></span>
                <span class="status-text">{{ wallet.statusLabel }}</span>
              </div>
            </div>
            <button class="btn primary" @click="scrollToTopUp">
              Top Up Wallet
            </button>
          </div>

          <p class="wallet-support">
            This balance is used by PayHero to process customer payments. Keep
            it funded to avoid service interruptions.
          </p>

          <div class="threshold-row">
            Low balance threshold:
            <strong>KSh {{ formatMoney(wallet.threshold) }}</strong>
          </div>

          <!-- Warning / Critical banners -->
          <div v-if="wallet.status === 'low'" class="alert warning">
            <strong>PayHero wallet balance is low</strong>
            <p>
              Your current balance is KSh {{ formatMoney(wallet.balance) }}. Top
              up the wallet to avoid interruptions when processing customer
              payments.
            </p>
            <button class="btn primary sm" @click="scrollToTopUp">
              Top Up Wallet
            </button>
          </div>

          <div v-if="wallet.status === 'critical'" class="alert danger">
            <strong>PayHero wallet balance is critically low</strong>
            <p>
              Your current balance is KSh {{ formatMoney(wallet.balance) }}.
              Payment processing may be interrupted.
            </p>
            <button class="btn primary sm" @click="scrollToTopUp">
              Top Up Wallet
            </button>
          </div>
        </template>
      </div>

      <!-- 5. QUICK METRICS -->
      <div class="metrics-grid">
        <div class="metric-card">
          <p class="metric-label">Current Balance</p>
          <p class="metric-value">KSh {{ formatMoney(wallet.balance) }}</p>
        </div>
        <div class="metric-card">
          <p class="metric-label">Pending Top-ups</p>
          <p class="metric-value">{{ metrics.pending }}</p>
        </div>
        <div class="metric-card">
          <p class="metric-label">Successful Top-ups</p>
          <p class="metric-value">{{ metrics.successful }}</p>
        </div>
        <div class="metric-card">
          <p class="metric-label">Last Top-up</p>
          <p class="metric-value">KSh {{ formatMoney(metrics.lastTopUp) }}</p>
        </div>
      </div>

      <div class="content-grid">
        <!-- 6. TOP-UP SECTION -->
        <section class="card topup-card" ref="topupSection">
          <h3>Top Up Service Wallet</h3>
          <p class="card-desc">
            Add funds to your PayHero service wallet using M-Pesa. An STK prompt
            will be sent to the selected phone number.
          </p>

          <div class="form-group">
            <label>Amount (KSh)</label>
            <input
              v-model.number="topUp.amount"
              type="number"
              min="1"
              placeholder="Enter amount"
              class="input"
            />
            <div class="presets">
              <button
                v-for="preset in presets"
                :key="preset"
                type="button"
                class="preset-btn"
                :class="{ active: topUp.amount === preset }"
                @click="topUp.amount = preset"
              >
                KSh {{ preset.toLocaleString() }}
              </button>
            </div>
          </div>

          <div class="form-group">
            <label>M-Pesa Phone Number</label>
            <input
              v-model="topUp.phone"
              type="tel"
              placeholder="07XX XXX XXX"
              class="input"
            />
          </div>

          <p class="hint">
            The top-up is only completed after the M-Pesa payment is confirmed.
          </p>

          <button
            class="btn primary full"
            :disabled="isSubmitting || !canSubmit"
            @click="submitTopUp"
          >
            {{ isSubmitting ? "Sending STK..." : "Send STK Push" }}
          </button>
        </section>

        <!-- 7. PAYMENT GATEWAY STATUS -->
        <section class="card gateway-card">
          <h3>Payment Gateway</h3>
          <div class="gateway-row">
            <span class="gateway-label">Provider</span>
            <span class="gateway-value">PayHero</span>
          </div>
          <div class="gateway-row">
            <span class="gateway-label">Status</span>
            <span class="gateway-value success">
              <span class="status-dot small green"></span>
              Connected
            </span>
          </div>
          <div class="gateway-row">
            <span class="gateway-label">Wallet</span>
            <span class="gateway-value"
              >KSh {{ formatMoney(wallet.balance) }}</span
            >
          </div>
          <div class="gateway-row">
            <span class="gateway-label">Payment Processing</span>
            <span class="gateway-value success">Available</span>
          </div>
        </section>
      </div>

      <!-- 8. RECENT TOP-UPS -->
      <section class="card">
        <div class="card-header-row">
          <h3>Recent Top-Ups</h3>
          <button class="link-btn" @click="viewAll">View All</button>
        </div>

        <!-- Loading -->
        <div v-if="isLoadingTopUps" class="table-skeleton">
          <div v-for="i in 5" :key="i" class="skeleton line"></div>
        </div>

        <!-- Empty -->
        <div v-else-if="!topUps.length" class="empty-state">
          <p class="empty-title">No top-ups yet</p>
          <p class="empty-desc">
            Your PayHero service-wallet top-up history will appear here.
          </p>
          <button class="btn primary" @click="scrollToTopUp">
            Top Up Wallet
          </button>
        </div>

        <!-- Table -->
        <div v-else class="table-wrap">
          <table class="topups-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Amount</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in topUps" :key="item.id">
                <td>#{{ item.id }}</td>
                <td>KSh {{ formatMoney(item.amount) }}</td>
                <td>{{ item.phone }}</td>
                <td>
                  <span class="badge" :class="item.status.toLowerCase()">
                    {{ item.status }}
                  </span>
                </td>
                <td>{{ item.date }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 9. MONTHLY ACTIVITY SUMMARY -->
      <section class="card summary-card">
        <h3>Wallet Activity Summary</h3>
        <div class="summary-grid">
          <div class="summary-item">
            <p class="summary-value">
              KSh {{ formatMoney(summary.totalThisMonth) }}
            </p>
            <p class="summary-label">Topped up this month</p>
          </div>
          <div class="summary-item">
            <p class="summary-value success-text">{{ summary.successful }}</p>
            <p class="summary-label">Successful</p>
          </div>
          <div class="summary-item">
            <p class="summary-value danger-text">{{ summary.failed }}</p>
            <p class="summary-label">Failed</p>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
import { handleResponse } from "@/Utility/response";
import { ref, computed } from "vue";
import { useToast } from "@/components/composables/useToast";
import DataTable from "@/components/DataTable.vue";

const isLoadingBalance = ref(false);
const isLoadingTopUps = ref(false);
const isRefreshing = ref(false);
const isSubmitting = ref(false);
const hasError = ref(false);
const { show } = useToast();

const lastUpdated = ref("Sep 4, 2026 · 17:28");
const topupSection = ref(null);

const wallet = ref({
  balance: 1240,
  threshold: 500,
  status: "healthy", // healthy | low | critical
  statusLabel: "Healthy",
});

const metrics = ref({
  pending: 1,
  successful: 12,
  lastTopUp: 500,
});

const summary = ref({
  totalThisMonth: 8500,
  successful: 14,
  failed: 2,
});

const topUps = ref([
  {
    id: 42,
    amount: 500,
    phone: "07•••1234",
    status: "Success",
    date: "Sep 4, 17:20",
  },
  {
    id: 41,
    amount: 300,
    phone: "07•••1234",
    status: "Failed",
    date: "Sep 4, 14:10",
  },
  {
    id: 40,
    amount: 500,
    phone: "07•••1234",
    status: "Queued",
    date: "Sep 4, 10:32",
  },
  {
    id: 39,
    amount: 1000,
    phone: "07•••1234",
    status: "Success",
    date: "Sep 3, 16:45",
  },
  {
    id: 38,
    amount: 500,
    phone: "07•••1234",
    status: "Success",
    date: "Sep 3, 11:20",
  },
]);

const presets = [300, 500, 1000, 2000];

const topUp = ref({
  amount: null,
  phone: "",
});

const walletStatusClass = computed(() => {
  if (wallet.value.status === "low") return "status-low";
  if (wallet.value.status === "critical") return "status-critical";
  return "status-healthy";
});

const canSubmit = computed(() => {
  return topUp.value.amount > 0 && topUp.value.phone.trim().length >= 10;
});

const formatMoney = (value) => {
  return Number(value || 0).toLocaleString("en-KE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const scrollToTopUp = () => {
  topupSection.value?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const refreshWallet = async () => {
  isRefreshing.value = true;
  isLoadingBalance.value = true;
  hasError.value = false;

  try {
    await new Promise((r) => setTimeout(r, 900));
    lastUpdated.value = new Date().toLocaleString("en-KE", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    hasError.value = true;
  } finally {
    isRefreshing.value = false;
    isLoadingBalance.value = false;
  }
};

const submitTopUp = async () => {
  if (!canSubmit.value) return;
  isSubmitting.value = true;

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/topup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        amount: topUp.value.amount,
        phoneNumber: topUp.value.phone,
      }),
    });

    const data = await handleResponse(res);

    show({
      type: "success",
      message:
        data.message ||
        `STK push sent for KSh ${formatMoney(topUp.value.amount)}. Please complete the payment on your phone.`,
    });

    topUp.value.amount = null;
  } finally {
    isSubmitting.value = false;
  }
};

const viewAll = () => {
  // navigate to full history later
  console.log("View all top-ups");
};
</script>

<style scoped>
.wallet-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem;
  color: #e5e7eb;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
}

/* Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.page-title {
  margin: 0 0 0.4rem;
  font-size: 2.2rem;
  color: #f5d698;
}

.page-desc {
  margin: 0;
  color: #aaa;
  max-width: 520px;
}

.header-right {
  text-align: right;
}

.refresh-btn {
  background: rgba(245, 214, 152, 0.12);
  border: 1px solid rgba(245, 214, 152, 0.3);
  color: #f5d698;
  padding: 0.7rem 1.2rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spinning {
  display: inline-block;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.last-updated {
  margin: 0.5rem 0 0;
  color: #888;
  font-size: 0.9rem;
}

/* Cards */
.card {
  background: #252b2e;
  border-radius: 18px;
  padding: 1.6rem;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(245, 214, 152, 0.08);
}

.wallet-card {
  background: linear-gradient(145deg, #2a3135, #252b2e);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(245, 214, 152, 0.15);
}

.wallet-card.status-healthy {
  box-shadow: 0 0 0 1px rgba(74, 222, 128, 0.15);
}

.wallet-card.status-low {
  box-shadow: 0 0 0 1px rgba(251, 191, 36, 0.25);
}

.wallet-card.status-critical {
  box-shadow: 0 0 0 1px rgba(248, 113, 113, 0.3);
}

.wallet-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.wallet-label {
  margin: 0 0 0.4rem;
  color: #aaa;
  font-size: 1rem;
}

.wallet-balance {
  margin: 0 0 0.8rem;
  font-size: 3rem;
  line-height: 1.1;
  color: #f5d698;
  font-weight: 700;
}

.status-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #4ade80;
}

.status-healthy .status-dot {
  background: #4ade80;
}
.status-low .status-dot {
  background: #fbbf24;
}
.status-critical .status-dot {
  background: #f87171;
}

.status-text {
  font-weight: 600;
  color: #ddd;
}

.wallet-support {
  margin: 1.2rem 0 0.8rem;
  color: #bbb;
  max-width: 640px;
}

.threshold-row {
  color: #999;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

/* Alerts */
.alert {
  margin-top: 1.2rem;
  padding: 1rem 1.2rem;
  border-radius: 12px;
}

.alert.warning {
  background: rgba(251, 191, 36, 0.12);
  border: 1px solid rgba(251, 191, 36, 0.3);
}

.alert.danger {
  background: rgba(248, 113, 113, 0.12);
  border: 1px solid rgba(248, 113, 113, 0.3);
}

.alert p {
  margin: 0.4rem 0 0.8rem;
  color: #ddd;
}

/* Metrics */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.metric-card {
  background: #252b2e;
  border-radius: 14px;
  padding: 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.metric-label {
  margin: 0 0 0.4rem;
  color: #aaa;
  font-size: 0.9rem;
}

.metric-value {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: #f5d698;
}

/* Content grid */
.content-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.card h3 {
  margin: 0 0 0.6rem;
  color: #f5d698;
  font-size: 1.25rem;
}

.card-desc {
  margin: 0 0 1.4rem;
  color: #aaa;
  line-height: 1.5;
}

.form-group {
  margin-bottom: 1.2rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #ccc;
  font-weight: 500;
}

.input {
  width: 100%;
  background: #2e3538;
  border: 2px solid rgba(245, 214, 152, 0.2);
  color: white;
  border-radius: 12px;
  padding: 0.85rem 1rem;
  font-size: 1rem;
}

.input:focus {
  outline: none;
  border-color: #f5d698;
}

.presets {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 0.8rem;
}

.preset-btn {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #ddd;
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  cursor: pointer;
  font-size: 0.9rem;
}

.preset-btn.active,
.preset-btn:hover {
  background: rgba(245, 214, 152, 0.15);
  border-color: #f5d698;
  color: #f5d698;
}

.hint {
  color: #888;
  font-size: 0.9rem;
  margin: 0 0 1.2rem;
}

/* Gateway */
.gateway-row {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.gateway-row:last-child {
  border-bottom: none;
}

.gateway-label {
  color: #aaa;
}

.gateway-value {
  font-weight: 600;
  color: #ddd;
}

.gateway-value.success {
  color: #4ade80;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.status-dot.small {
  width: 8px;
  height: 8px;
}

.status-dot.green {
  background: #4ade80;
}

/* Table */
.card-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.link-btn {
  background: none;
  border: none;
  color: #f5d698;
  cursor: pointer;
  font-weight: 600;
}

.table-wrap {
  overflow-x: auto;
}

.topups-table {
  width: 100%;
  border-collapse: collapse;
}

.topups-table th {
  text-align: left;
  padding: 0.85rem 0.75rem;
  color: #aaa;
  font-size: 0.9rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.topups-table td {
  padding: 0.95rem 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.badge {
  display: inline-block;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
}

.badge.success {
  background: rgba(74, 222, 128, 0.15);
  color: #4ade80;
}

.badge.failed {
  background: rgba(248, 113, 113, 0.15);
  color: #f87171;
}

.badge.queued,
.badge.pending {
  background: rgba(251, 191, 36, 0.15);
  color: #fbbf24;
}

.badge.unknown {
  background: rgba(156, 163, 175, 0.15);
  color: #9ca3af;
}

/* Summary */
.summary-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.summary-item {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 1.2rem;
  text-align: center;
}

.summary-value {
  margin: 0 0 0.35rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #f5d698;
}

.summary-label {
  margin: 0;
  color: #aaa;
  font-size: 0.9rem;
}

.success-text {
  color: #4ade80;
}
.danger-text {
  color: #f87171;
}

/* Buttons */
.btn {
  border: none;
  border-radius: 12px;
  padding: 0.85rem 1.4rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.btn.primary {
  background: #f5d698;
  color: #2e3538;
}

.btn.primary:hover:not(:disabled) {
  transform: translateY(-1px);
}

.btn.primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn.sm {
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
}

.btn.full {
  width: 100%;
}

/* Error / Empty / Skeleton */
.error-banner {
  background: rgba(248, 113, 113, 0.1);
  border: 1px solid rgba(248, 113, 113, 0.3);
  border-radius: 14px;
  padding: 1.2rem 1.4rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.5rem;
}

.empty-state {
  text-align: center;
  padding: 2.5rem 1rem;
}

.empty-title {
  font-size: 1.2rem;
  color: #ddd;
  margin: 0 0 0.4rem;
}

.empty-desc {
  color: #888;
  margin: 0 0 1.2rem;
}

.skeleton {
  background: linear-gradient(90deg, #2e3538 25%, #3a4246 50%, #2e3538 75%);
  background-size: 200% 100%;
  animation: shimmer 1.2s infinite;
  border-radius: 8px;
}

.skeleton.line {
  height: 14px;
  margin-bottom: 12px;
}

.skeleton.big {
  height: 42px;
}

.skeleton.w30 {
  width: 30%;
}
.skeleton.w40 {
  width: 40%;
}
.skeleton.w60 {
  width: 60%;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Responsive */
@media (max-width: 900px) {
  .metrics-grid,
  .content-grid,
  .summary-grid {
    grid-template-columns: 1fr;
  }

  .wallet-balance {
    font-size: 2.4rem;
  }

  .wallet-page {
    padding: 1.2rem;
  }
}
</style>
