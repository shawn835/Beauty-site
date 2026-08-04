<template>
  <div class="bookings-page">
    <!-- Header -->
    <header class="page-header">
      <h1 class="page-title">Your Booking History</h1>
      <p class="page-subtitle">
        Explore your pampered moments at Symos Nail Spa
      </p>
    </header>

    <!-- Filter Tabs -->
    <div class="tabs-container">
      <BaseButton
        v-for="tab in tabs"
        :key="tab"
        :label="tab"
        :variant="activeTab === tab ? 'primary' : 'outline'"
        size="small"
        class="tab-btn"
        :class="{ active: activeTab === tab }"
        @click="activeTab = tab"
      />
    </div>

    <!-- Loading Spinner State -->
    <div v-if="loading" class="loading-state">
      <Spinner size="large" message="Loading bookings..." />
    </div>

    <!-- Bookings Grid -->
    <div v-else-if="bookings.length" class="bookings-grid">
      <div
        v-for="booking in bookings"
        :key="booking.id"
        class="booking-card"
        @click="goToDetails(booking.bookingCode)"
      >
        <div class="card-top">
          <span class="booking-date">
            <font-awesome-icon icon="calendar" class="icon" />
            {{ formatDate(booking.startTime) }}
          </span>
          <span :class="['status-badge', booking.status?.toLowerCase()]">
            {{ booking.status }}
          </span>
        </div>

        <div class="card-time">
          <font-awesome-icon icon="clock" class="icon" />
          <strong>
            {{ formatTime(booking.startTime) }} —
            {{ formatTime(booking.endTime) }}
          </strong>
        </div>

        <div class="card-body">
          <p class="technician">
            With <strong>{{ booking.technicianName || "Our Expert" }}</strong>
          </p>
        </div>

        <div class="card-footer">
          <div class="price-wrapper">
            <p v-if="booking.amount > 0" class="price">
              <span class="currency">KES</span>
              {{ booking.amount.toLocaleString() }}
            </p>
            <p v-else class="price-variable">Price determined upon arrival</p>
          </div>

          <BaseButton
            label="View Details"
            variant="primary"
            size="small"
            icon-right="arrow-right"
            class="details-btn"
          />
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <div class="empty-icon-wrapper">
        <font-awesome-icon icon="calendar" class="empty-icon" />
      </div>
      <h3>No {{ activeTab.toLowerCase() }} bookings yet</h3>
      <p>Book your next luxury session and treat yourself.</p>
      <BaseButton
        label="Book Now"
        variant="primary"
        class="book-now-btn"
        @click="goToBooking"
      />
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="pagination-wrapper">
      <Paginator
        :page="page"
        :total-pages="totalPages"
        :next-page="nextPage"
        :prev-page="prevPage"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useApi } from "@/components/composables/useFetch";
import Paginator from "@/components/Paginator.vue";
import { formatDate, formatTime } from "@/Utility/utils";
import BaseButton from "../BaseButton.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Spinner from "../Spinner.vue";
import { usePagination } from "../composables/usePagination.js";

const { nextPage, prevPage, limit, page, totalPages, setMeta } =
  usePagination();

// Tabs and state
const tabs = ["All", "Upcoming", "Complete", "pending", "Cancelled"];
const activeTab = ref("All");
const router = useRouter();

const url = computed(() => {
  const params = new URLSearchParams({
    limit: String(limit.value),
    page: String(page.value),
  });

  if (activeTab.value !== "All") {
    params.set("status", activeTab.value);
  }

  return `${import.meta.env.VITE_API_URL}/api/user/bookings?${params.toString()}`;
});

const { data, loading } = useApi(url, {
  credentials: "include",
});
const bookings = computed(() => data.value?.bookings || []);

watch(data, (response) => {
  if (response) {
    setMeta(response);
  }
});
// Navigate to details
const goToDetails = (bookingCode) => {
  router.push(`/user/bookings/${bookingCode}`);
};
const goToBooking = () => {
  router.push("/book/appointment");
};
</script>

<style scoped>
/* Main Container */
.bookings-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
}

/* Header Section */
.page-header {
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.page-title {
  color: var(--text-light);
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.02em;
}

.page-subtitle {
  color: var(--text-gray);
  font-size: 0.875rem;
  margin: 0.35rem 0 0;
}

/* Filter Tabs Header */
.tabs-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding-bottom: 0.5rem;
}

.tab-btn {
  flex: 0 0 auto;
  background-color: rgba(255, 255, 255, 0.03);
  color: var(--nav-links);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 0.45rem 1.1rem;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.tab-btn:hover {
  border-color: var(--nav-links);
  background-color: var(--hover-bg);
}

.tab-btn.active {
  background-color: var(--bg-pink);
  color: var(--text-light);
  border-color: var(--bg-pink);
  box-shadow: 0 4px 12px rgba(216, 27, 96, 0.25);
}

/* Grid Layout */
.bookings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.25rem;
}

/* Booking Card */
.booking-card {
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
}

.booking-card:hover {
  transform: translateY(-3px);
  border-color: rgba(245, 214, 152, 0.3);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  background-color: rgba(255, 255, 255, 0.035);
}

/* Card Header & Badges */
.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.booking-date {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--nav-links);
  font-size: 0.875rem;
  font-weight: 600;
}

.booking-date .icon {
  font-size: 0.8rem;
  opacity: 0.8;
}

/* Card Content Details */
.card-time {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-light);
  font-size: 0.95rem;
}

.card-body .technician {
  margin: 0;
  color: var(--text-gray);
  font-size: 0.875rem;
}

.card-body .technician strong {
  color: var(--text-secondary);
}

/* Card Footer & Price */
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  padding-top: 0.85rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  margin-top: auto;
  flex-wrap: wrap;
}

.price-wrapper {
  flex: 1 1 140px;
  min-width: 0;
}

.price {
  color: var(--text-light);
  font-size: 1.15rem;
  font-weight: 700;
  margin: 0;
}

.price .currency {
  font-size: 0.75rem;
  color: var(--nav-links);
}

.price-variable {
  color: var(--text-gray);
  font-size: 0.75rem;
  margin: 0;
  line-height: 1.2;
}

.booking-card:hover .details-btn {
  background-color: var(--hover-color);
  color: var(--text-light);
  border-color: var(--hover-color);
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem;
  background-color: rgba(255, 255, 255, 0.015);
  border: 1px dashed rgba(255, 255, 255, 0.1);
  border-radius: 12px;
}

.empty-icon-wrapper {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: rgba(245, 214, 152, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
}

.empty-icon {
  font-size: 1.8rem;
  color: var(--nav-links);
}

.empty-state h3 {
  color: var(--text-light);
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
}

.empty-state p {
  color: var(--text-gray);
  font-size: 0.9rem;
  margin: 0 0 1.5rem;
  max-width: 320px;
}

.book-now-btn {
  background-color: var(--bg-pink);
  color: var(--text-light);
  border: none;
  padding: 0.75rem 1.75rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.book-now-btn:hover {
  background-color: #b0134c;
}

/* Pagination Placement */
.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

/* Mobile Adjustments */
@media (max-width: 600px) {
  .bookings-grid {
    grid-template-columns: 1fr;
  }
}
</style>
