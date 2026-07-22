<template>
  <div class="bookings-page">
    <div class="bookings-header">
      <h1 class="title">Your Booking History</h1>
      <p class="subtitle">Explore your pampered moments at Symos Nail Spa</p>
    </div>

    <!-- Tabs -->
    <div class="tabs-container">
      <BaseButton
        v-for="tab in tabs"
        :key="tab"
        @click="activeTab = tab"
        :label="tab"
        :variant="activeTab === tab ? 'primary' : 'outline'"
        size="small"
      />
    </div>

    <div v-if="loading" class="loading-state">
      <Spinner size="large" message="Loading bookings..." />
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
          <span :class="['status-badge', booking.status]">
            {{ booking.status }}
          </span>
        </div>

        <div class="card-time">
          <strong
            >{{ formatTime(booking.startTime) }} —
            {{ formatTime(booking.endTime) }}</strong
          >
        </div>

        <div class="card-body">
          <!-- <p class="service-name">
            {{ booking.serviceName || "Nail Service" }}
          </p> -->
          <p class="technician">
            with <strong>{{ booking.technicianName || "Our Expert" }}</strong>
          </p>
        </div>

        <div class="card-footer">
          <p v-if="booking.amount" class="price">
            KES {{ booking.amount.toLocaleString() }}
          </p>
          <BaseButton
            label="View Details"
            variant="primary"
            size="small"
            icon-right="arrow-right"
          />
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!bookings.length" class="empty-state">
        <font-awesome-icon icon="calendar" class="empty-icon" />
        <h3>No {{ activeTab.toLowerCase() }} bookings yet</h3>
        <p>Book your next luxury session and treat yourself.</p>
        <BaseButton label="Book Now" variant="primary" @click="goToBooking" />
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
</script>

<style scoped>
.bookings-page {
  max-width: 1100px;
  margin: 0 auto;
}

.bookings-header {
  margin-bottom: 2rem;
}

.title {
  font-size: 2.1rem;
  color: #f5d698;
  margin-bottom: 0.4rem;
}

.subtitle {
  color: #aaa;
  font-size: 1.1rem;
}

/* Tabs */
.tabs-container {
  display: flex;
  gap: 12px;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

/* Bookings Grid */
.bookings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.8rem;
}

.booking-card {
  background: #252b2e;
  border-radius: 18px;
  padding: 1.6rem;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(245, 214, 152, 0.1);
}

.booking-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  border-color: #f5d698;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.booking-date {
  font-weight: 600;
  color: #ddd;
}

.service-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #f5d698;
  margin-bottom: 0.4rem;
}

.technician {
  color: #aaa;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.price {
  font-size: 1.35rem;
  font-weight: 700;
  color: #f5d698;
}

/* Empty State */
.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 4rem 2rem;
  color: #aaa;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  opacity: 0.6;
}

/* Responsive */
@media (max-width: 768px) {
  .bookings-grid {
    grid-template-columns: 1fr;
  }

  .booking-card {
    padding: 1.4rem;
  }

  .price {
    font-size: 0.7rem;
  }
}
</style>
