<template>
  <div class="dashboard">
    <!-- HEADER -->
    <header class="dash-header">
      <div class="container">
        <div class="header-left">
          <h1 class="dash-title">Dashboard Overview</h1>
          <p class="dash-date">{{ currentDate }}</p>
        </div>
        <button class="refresh-btn" @click="refreshData">↻ Refresh Data</button>
      </div>
    </header>

    <div class="container main-content">
      <!-- KPI CARDS -->
      <div class="kpi-grid">
        <div class="kpi-card" v-for="(kpi, i) in kpis" :key="i">
          <div class="kpi-icon">{{ kpi.icon }}</div>
          <div class="kpi-content">
            <p class="kpi-label">{{ kpi.label }}</p>
            <h3 class="kpi-value">{{ kpi.value }}</h3>
            <p class="growth" :class="kpi.trend">
              {{ kpi.growth }} {{ kpi.period }}
            </p>
          </div>
        </div>
      </div>

      <!-- MIDDLE SECTION -->
      <div class="middle-grid">
        <!-- STATUS BREAKDOWN -->
        <div class="card status-card">
          <h2>Bookings Status</h2>
          <div class="status-bars">
            <div
              class="status-item"
              v-for="(status, i) in bookingStatus"
              :key="i"
            >
              <div class="status-label">
                <span class="dot" :class="status.color"></span>
                {{ status.label }}
              </div>
              <div class="status-bar-bg">
                <div
                  class="status-bar"
                  :style="{ width: status.percent + '%' }"
                ></div>
              </div>
              <div class="status-count">
                {{ status.count }} • {{ status.percent }}%
              </div>
            </div>
          </div>
        </div>

        <!-- PEAK INSIGHTS -->
        <div class="card peak-card">
          <h2>Peak Insights</h2>
          <div class="peak-grid">
            <div class="peak-box">
              <p class="peak-title">Peak Booking Time</p>
              <h3 class="peak-time">2:00 PM - 4:00 PM</h3>
              <p class="peak-desc">18 bookings • Highest activity</p>
            </div>
            <div class="peak-box">
              <p class="peak-title">Peak Appointment Day</p>
              <h3 class="peak-time">Friday</h3>
              <p class="peak-desc">42 appointments this week</p>
            </div>
          </div>
        </div>
      </div>

      <!-- CHARTS SECTION -->
      <div class="charts-grid">
        <!-- FINANCIAL TREND -->
        <div class="card chart-card">
          <div class="chart-header">
            <h2>💰 Financial Trend (Last 30 Days)</h2>
          </div>
          <div class="bar-chart">
            <div v-for="(bar, i) in financialData" :key="i" class="bar-group">
              <div class="bar" :style="{ height: bar.height + '%' }"></div>
              <span class="bar-label">{{ bar.day }}</span>
              <span class="bar-value">KES {{ bar.amount }}</span>
            </div>
          </div>
        </div>

        <!-- BOOKING ACTIVITY -->
        <div class="card chart-card">
          <div class="chart-header">
            <h2>📅 Booking Activity (Last 7 Days)</h2>
          </div>
          <div class="line-chart">
            <div class="line-container">
              <!-- Simulated line using CSS -->
              <div class="line-points">
                <div
                  v-for="(point, i) in bookingTrend"
                  :key="i"
                  class="point"
                  :style="{ bottom: point + '%' }"
                >
                  <span class="point-value">{{ point }}</span>
                </div>
              </div>
              <div class="line-bg"></div>
            </div>
            <div class="x-axis">
              <span
                v-for="(d, i) in [
                  'Mon',
                  'Tue',
                  'Wed',
                  'Thu',
                  'Fri',
                  'Sat',
                  'Sun',
                ]"
                :key="i"
                >{{ d }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const currentDate = ref(
  new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date()),
);

const kpis = ref([
  {
    icon: "💵",
    label: "Total Deposits",
    value: "KES 1,248,900",
    growth: "↑ 14%",
    period: "this month",
    trend: "up",
  },
  {
    icon: "📅",
    label: "Total Bookings",
    value: "187",
    growth: "↑ 8%",
    period: "this week",
    trend: "up",
  },
  {
    icon: "⏳",
    label: "Pending",
    value: "23",
    growth: "↓ 3",
    period: "from yesterday",
    trend: "neutral",
  },
  {
    icon: "❌",
    label: "Cancellations",
    value: "11",
    growth: "↓ 4",
    period: "this week",
    trend: "down",
  },
  {
    icon: "⚖️",
    label: "Outstanding Balance",
    value: "KES 94,500",
    growth: "↓ 12%",
    period: "this month",
    trend: "down",
  },
]);

const bookingStatus = ref([
  { label: "Completed", count: 142, percent: 76, color: "completed" },
  { label: "Pending", count: 23, percent: 12, color: "pending" },
  { label: "Cancelled", count: 22, percent: 12, color: "cancelled" },
]);

const financialData = ref([
  { day: "1", amount: "28k", height: 45 },
  { day: "5", amount: "41k", height: 68 },
  { day: "10", amount: "52k", height: 82 },
  { day: "15", amount: "39k", height: 61 },
  { day: "20", amount: "67k", height: 95 },
  { day: "25", amount: "48k", height: 74 },
  { day: "30", amount: "55k", height: 88 },
]);

const bookingTrend = ref([42, 51, 38, 67, 82, 59, 71]);

const refreshData = () => {
  alert("✅ Dashboard refreshed with latest data!");
};
</script>

<style scoped>
:root {
  --bg-dark: #2e3538;
  --text-light: #fff;
  --text-secondary: #faeee9;
  --nav-links: #f5d698;
  --hover-color: #f76706;
}

.dashboard {
  min-height: 100vh;
  background: var(--bg-dark);
  color: var(--text-light);
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
}

.container {
  max-width: 1380px;
  margin: 0 auto;
  padding: 0 2rem;
}

.dash-header {
  padding: 2.5rem 0 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dash-title {
  font-size: 2.8rem;
  margin: 0;
  color: var(--text-secondary);
}

.dash-date {
  color: #aaa;
  margin-top: 0.5rem;
}

.refresh-btn {
  background: rgba(245, 214, 152, 0.15);
  color: var(--nav-links);
  border: 1px solid rgba(245, 214, 152, 0.3);
  padding: 0.8rem 1.6rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
}

/* KPI GRID */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.6rem;
  margin-top: 2.5rem;
}

.kpi-card {
  background: rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  padding: 1.8rem 1.6rem;
  display: flex;
  gap: 1.2rem;
  transition: all 0.3s ease;
}

.kpi-card:hover {
  transform: translateY(-8px);
  background: rgba(255, 255, 255, 0.12);
}

.kpi-icon {
  font-size: 2.8rem;
  width: 68px;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(245, 214, 152, 0.12);
  border-radius: 12px;
}

.kpi-label {
  color: #aaa;
  margin-bottom: 0.4rem;
  font-size: 1.05rem;
}

.kpi-value {
  font-size: 2.1rem;
  font-weight: 700;
  margin: 0 0 0.6rem;
  color: var(--text-secondary);
}

.growth {
  font-weight: 600;
  font-size: 1rem;
}

.growth.up {
  color: #4ade80;
}
.growth.down {
  color: #f87171;
}
.growth.neutral {
  color: #fbbf24;
}

/* MIDDLE GRID */
.middle-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.6rem;
  margin-top: 2.5rem;
}

@media (max-width: 1024px) {
  .middle-grid,
  .charts-grid {
    grid-template-columns: 1fr;
  }
}

.card {
  background: rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  padding: 2rem;
}

.card h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.55rem;
  color: var(--nav-links);
}

/* STATUS BARS */
.status-bars {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.status-label {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 110px;
}

.dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
}

.dot.completed {
  background: #4ade80;
}
.dot.pending {
  background: #fbbf24;
}
.dot.cancelled {
  background: #f87171;
}

.status-bar-bg {
  flex: 1;
  height: 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 9999px;
  overflow: hidden;
}

.status-bar {
  height: 100%;
  background: linear-gradient(to right, #f5d698, #f76706);
  border-radius: 9999px;
}

.status-count {
  font-weight: 600;
  min-width: 90px;
  text-align: right;
}

/* PEAK INSIGHTS */
.peak-grid {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}

.peak-box {
  background: rgba(255, 255, 255, 0.05);
  padding: 1.4rem;
  border-radius: 12px;
}

.peak-title {
  color: #aaa;
  margin: 0 0 0.6rem;
}

.peak-time {
  font-size: 1.75rem;
  margin: 0 0 0.5rem;
  color: var(--text-secondary);
}

/* CHARTS */
.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.6rem;
  margin-top: 2.5rem;
  margin-bottom: 4rem;
}

.chart-card {
  padding: 2rem;
}

.chart-header h2 {
  margin: 0;
}

.bar-chart {
  display: flex;
  align-items: flex-end;
  gap: 18px;
  height: 280px;
  padding: 20px 0;
}

.bar-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  position: relative;
}

.bar {
  width: 100%;
  background: linear-gradient(to top, #f5d698, #f76706);
  border-radius: 8px 8px 0 0;
  transition: all 0.4s;
}

.bar-label {
  font-size: 0.85rem;
  color: #aaa;
}

.bar-value {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--nav-links);
  position: absolute;
  top: -26px;
  opacity: 0;
  transition: opacity 0.2s;
}

.bar-group:hover .bar-value {
  opacity: 1;
}

/* Simple Line Chart */
.line-chart {
  height: 280px;
  position: relative;
}

.line-container {
  position: relative;
  height: 240px;
}

.line-bg {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: rgba(245, 214, 152, 0.3);
}

.line-points {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}

.point {
  position: absolute;
  width: 14px;
  height: 14px;
  background: #f5d698;
  border-radius: 50%;
  border: 3px solid var(--bg-dark);
  transform: translateX(-50%);
}

.point-value {
  position: absolute;
  top: -28px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--nav-links);
}

.x-axis {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 12px;
  color: #aaa;
  font-size: 0.9rem;
}
</style>
