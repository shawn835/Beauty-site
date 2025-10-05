<template>
  <div class="bookings-container">
    <h1 class="title">Your Booking History</h1>
    <p class="subtitle">Explore your pampered moments at our Nail Spa</p>

    <!-- Tabs -->
    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="{ active: activeTab === tab }"
        @click="activeTab = tab"
        class="tab-btn">
        {{ tab }}
      </button>
    </div>

    <!-- Bookings Grid -->
    <div class="bookings-grid">
      <div
        v-for="booking in bookings"
        :key="booking.id"
        class="booking-card"
        @click="goToDetails(booking.bookingId)">
        <div class="card-header">
          <h3 class="card-title">
            <!-- {{ booking.services.map((s) => s.name).join(", ") }} -->
          </h3>

          <span class="card-date">
            {{ formatDate(booking.date) }} at {{ booking.time }}</span
          >
        </div>
        <div class="card-details">
          <p><strong>Technician:</strong> {{ booking.technician }}</p>
          <p v-if="booking?.payment?.amount !== undefined">
            <strong>Price:</strong> KES {{ booking.payment.amount }}
          </p>

          <p>
            <strong>Status:</strong>
            <span :class="booking.status.toLowerCase()">{{
              booking.status
            }}</span>
          </p>
        </div>
        <button class="view-details-btn">View Details</button>
      </div>
      <p v-if="!bookings.length" class="no-bookings">
        No bookings found in this category. Book your first session today!
      </p>
    </div>

    <!-- Pagination -->
    <Paginator
      :page="page"
      :total-pages="totalPages"
      :next-page="nextPage"
      :prev-page="prevPage" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useApi } from "@/components/composables/useFetch";
import Paginator from "@/components/utility/Paginator.vue";
import { formatDate } from "@/utils";

// Tabs and state
const tabs = ["All", "Upcoming", "Complete", "Cancelled"];
const activeTab = ref("All");
const router = useRouter();

const url = computed(
  () => `${import.meta.env.VITE_API_URL}/api/mybookings?tab=${activeTab.value}`
);

const { data, loading, page, totalPages, nextPage, prevPage } = useApi(url, {
  perPage: 8,
  withCredentials: true,
});
const bookings = computed(() => data.value?.bookings || []);
// Navigate to details
const goToDetails = (bookingId) => {
  router.push(`/mybookings/${bookingId}`);
};
</script>

<style scoped>
.bookings-container {
  max-width: 1000px;
  margin: 50px auto;
  padding: 20px;
  background: linear-gradient(135deg, #fff5f7 0%, #ffe4e1 100%);
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.title {
  font-size: 2.5rem;
  color: var(--text-pink);
  margin-bottom: 10px;
  font-weight: 700;
}

.subtitle {
  font-size: 1.1rem;
  color: var(--dark-gray);
  margin-bottom: 30px;
}

.tabs {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
}

.tab-btn {
  padding: 10px 20px;
  background: var(--bg-light);
  border: 1px solid var(--dark-gray);
  border-radius: 20px;
  font-size: 1rem;
  color: var(--light-dark);
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.tab-btn.active {
  background-color: var(--bg-pink);
  color: var(--text-light);
  border-color: var(--text-pink);
}

.tab-btn:hover:not(.active) {
  background-color: #f5e6ea;
}

.bookings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.booking-card {
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #eee;
}

.booking-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.card-header {
  margin-bottom: 15px;
}

.card-title {
  font-size: 1.4rem;
  color: #d81b60;
  margin: 0;
  font-weight: 600;
}

.card-date {
  font-size: 0.9rem;
  color: #666;
  display: block;
  margin-top: 5px;
}

.card-details p {
  margin: 5px 0;
  font-size: 0.95rem;
  color: #333;
  text-align: left;
}

.card-details .confirmed {
  color: #2e7d32;
  font-weight: 500;
}

.card-details .pending {
  color: #ed6c02;
  font-weight: 500;
}

.card-details .completed {
  color: #1b5e20;
  font-weight: 500;
}

.card-details .cancelled {
  color: #d32f2f;
  font-weight: 500;
}

.view-details-btn {
  margin-top: 15px;
  padding: 8px 20px;
  background-color: #d81b60;
  color: #fff;
  border: none;
  border-radius: 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.view-details-btn:hover {
  background-color: #ad1457;
}

.no-bookings {
  font-size: 1.1rem;
  color: #666;
  text-align: center;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
}

.pagination-btn {
  padding: 8px 15px;
  background-color: #d81b60;
  color: #fff;
  border: none;
  border-radius: 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination-btn:hover:not(:disabled) {
  background-color: #ad1457;
}

.pagination-info {
  font-size: 1rem;
  color: #333;
}

@media (max-width: 768px) {
  .bookings-grid {
    grid-template-columns: 1fr;
  }
  .tabs {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
