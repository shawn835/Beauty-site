<template>
  <div class="admin-bookings-container">
    <h1 class="page-title">Admin Booking Management</h1>
    <p class="page-subtitle">Manage and oversee all booking activities</p>

    <BookingBar
      v-model="filters"
      :technicians="appStore.technicians"
      :services="appStore.services"
      @apply="applyFilters"
    />

    <!-- Your appointments table below -->

    <bookingTable
      :bookings="bookings"
      :total-pages="totalPages"
      :next-page="nextPage"
      :prev-page="prevPage"
      :page="page"
    />
  </div>
</template>

<script setup>
import { reactive, computed, ref } from "vue";
import bookingTable from "./bookingTable.vue";
import BookingBar from "./FilterPanel.vue";
import { useApi } from "@/components/composables/useFetch";
import { useAppStore } from "@/components/store/appStore";

const appStore = useAppStore();
const filters = reactive({
  search: "",
  startDate: "",
  endDate: "",
  technician: "",
  service: "",
  status: "",
  paymentStatus: "",
});

const queryString = computed(() => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });

  return params.toString();
});

const url = computed(() => {
  const base = `${import.meta.env.VITE_API_URL}/api/admin/bookings`;
  return queryString.value ? `${base}?${queryString.value}` : base;
});

const { data, loading, page, totalPages, nextPage, prevPage, fetchData } =
  useApi(url, {
    perPage: 8,
    withCredentials: true,
  });

const bookings = computed(() => data.value?.bookings || []);

const applyFilters = (newFilters) => {
  Object.assign(filters, newFilters);
  fetchData();
};
</script>
<style scoped>
.admin-bookings-container {
  /* max-width: 1200px; */
  /* margin: 40px auto; */
  padding: 20px;
  background: linear-gradient(135deg, #fff5f7 0%, #ffe4e1 100%);
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  font-family: "Lora", serif;
}

.page-title {
  font-family: "Playfair Display", serif;
  font-size: 2.5rem;
  color: #d81b60;
  margin-bottom: 10px;
  text-align: center;
}

@media (max-width: 768px) {
  .admin-bookings-container {
    margin: 20px;
    padding: 10px;
  }
}
</style>
