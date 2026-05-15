<template>
  <div class="bookings-page">
    <div class="bookings-header">
      <h1 class="title">Your Booking History</h1>
      <p class="subtitle">Explore your pampered moments at Symos Nail Spa</p>
    </div>

    <!-- Tabs -->
    <div class="tabs-container">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="{ active: activeTab === tab }"
        @click="activeTab = tab"
        class="tab-btn"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Bookings Grid -->
    <div class="bookings-grid">
      <div
        v-for="booking in bookings"
        :key="booking.id"
        class="booking-card"
        @click="goToDetails(booking.bookingCode)"
      >
        <div class="card-top">
          <span class="booking-date">
            {{ formatDate(booking.startTime) }}
          </span>
          <span :class="['status-badge', booking.status.toLowerCase()]">
            {{ booking.status }}
          </span>
        </div>

        <div class="card-time">
          {{ formatTimeRange(booking.startTime, booking.endTime) }}
        </div>

        <div class="card-body">
          <p class="technician">
            <strong>Technician:</strong> {{ booking.technicianName }}
          </p>
          <p v-if="booking.amount" class="price">
            <strong>Total:</strong> KES {{ booking.amount.toLocaleString() }}
          </p>
        </div>

        <BaseButton label="View Details →" variant="primary" full-width />
        <button class="view-details-btn"></button>
      </div>

      <!-- Empty State -->
      <div v-if="!bookings.length" class="empty-state">
        <FontAwesomeIcon icon="calendar" class="calendar" />
        <h3>No {{ activeTab }} bookings found</h3>
        <p>Book your first session today and enjoy luxury nail care.</p>
      </div>
    </div>

    <!-- Pagination -->
    <Paginator
      v-if="totalPages > 1"
      :page="page"
      :total-pages="totalPages"
      :next-page="nextPage"
      :prev-page="prevPage"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useApi } from "@/components/composables/useFetch";
import Paginator from "@/components/Paginator.vue";
import { formatDate, formatTimeRange } from "@/Utility/utils";
import BaseButton from "../BaseButton.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Tabs and state
const tabs = ["All", "Upcoming", "Complete", "Cancelled"];
const activeTab = ref("All");
const router = useRouter();

const url = computed(
  () =>
    `${import.meta.env.VITE_API_URL}/api/user/bookings?status=${activeTab.value}`,
);

const { data, loading, page, totalPages, nextPage, prevPage } = useApi(url, {
  perPage: 8,
  withCredentials: true,
});
const bookings = computed(() => data.value?.bookings || []);
// Navigate to details
const goToDetails = (bookingCode) => {
  router.push(`/bookings/${bookingCode}`);
};
</script>

<style scoped>
.bookings-page {
  padding: 40px 20px 100px;
  background: var(--bg-dark);
  min-height: 100vh;
  color: var(--text-light);
}

.bookings-header {
  text-align: center;
  margin-bottom: 50px;
}

.title {
  font-size: 2.6rem;
  margin-bottom: 8px;
  color: white;
}

.subtitle {
  color: var(--text-gray);
  font-size: 1.15rem;
}

/* Tabs */
.tabs-container {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 12px 28px;
  background: #2e3538;
  border: none;
  border-radius: 50px;
  color: var(--text-light);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.tab-btn.active {
  background: var(--bg-pink);
  color: white;
  box-shadow: 0 6px 20px rgba(216, 27, 96, 0.3);
}

/* Booking Cards */
.bookings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.booking-card {
  background: #2e3538;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s ease;
  cursor: pointer;
  border: 1px solid #444;
}

.booking-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(216, 27, 96, 0.15);
  border-color: var(--bg-pink);
}

.card-top {
  padding: 20px 24px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #3a4246;
}

.booking-date {
  font-weight: 600;
  color: var(--text-light);
}

.status-badge {
  padding: 6px 16px;
  border-radius: 30px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-badge.confirmed {
  background: #10b981;
  color: white;
}
.status-badge.pending {
  background: #f59e0b;
  color: black;
}
.status-badge.cancelled {
  background: #ef4444;
  color: white;
}
.status-badge.completed {
  background: #64748b;
  color: white;
}

.card-time {
  padding: 16px 24px;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--bg-pink);
}

.card-body {
  padding: 0 24px 20px;
  color: var(--text-gray);
}

.card-body p {
  margin: 8px 0;
}

.view-details-btn {
  width: 100%;
  padding: 14px;
  background: transparent;
  border: none;
  border-top: 1px solid #444;
  color: var(--bg-pink);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.view-details-btn:hover {
  background: rgba(216, 27, 96, 0.1);
  color: white;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: var(--text-gray);
}

.book-now-btn {
  margin-top: 24px;
  padding: 14px 32px;
  background: var(--bg-pink);
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 600;
}

/* Responsive */
@media (max-width: 768px) {
  .bookings-grid {
    grid-template-columns: 1fr;
  }

  .tab-btn {
    padding: 10px 20px;
    font-size: 0.95rem;
  }
}
</style>
