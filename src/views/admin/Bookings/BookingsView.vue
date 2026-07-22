<template>
  <div class="admin-bookings-container">
    <FilterPanel
      :technicians="technicianStore.technicians"
      :services="appStore.services"
      @apply="applyFilters"
      :loading="loading"
    />

    <BookingTable
      :bookings="bookings"
      :page="page"
      :total-pages="totalPages"
      :next-page="nextPage"
      :prev-page="prevPage"
    />
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import BookingTable from "./BookingTable.vue";
import FilterPanel from "./FilterPanel.vue";
import { useApi } from "@/components/composables/useFetch";
import { useAppStore } from "@/components/store/appStore";
import { useTechnicianStore } from "@/components/store/TechnicianStore.js";
import { usePagination } from "@/components/composables/usePagination.js";

const appStore = useAppStore();
const technicianStore = useTechnicianStore();
const pagination = usePagination();
const { page, limit, totalPages, totalCount, nextPage, prevPage, setMeta } =
  usePagination();

const filters = ref({
  search: "",
  startDate: "",
  endDate: "",
  technicianId: "",
  status: "",
  paymentStatus: "",
});

const applyFilters = (newFilters) => {
  // Reset to first page whenever filters change
  pagination.page.value = 1;

  // Replace the entire object
  filters.value = { ...newFilters };
};

const url = computed(() => {
  const params = new URLSearchParams();

  params.set("page", String(page.value));
  params.set("limit", String(limit.value));

  Object.entries(filters.value).forEach(([key, value]) => {
    if (value) {
      params.set(key, String(value));
    }
  });

  return `${import.meta.env.VITE_API_URL}/api/admin/bookings?${params.toString()}`;
});

const { data, loading } = useApi(url, {
  credentials: "include",
});

const bookings = computed(() => data.value?.bookings ?? []);
watch(data, (response) => {
  if (response) {
    setMeta(response);
  }
});
</script>
<style scoped>
.admin-bookings-container {
  padding: 20px;
  border-radius: 15px;
  font-family: "Lora", serif;
}

@media (max-width: 768px) {
  .admin-bookings-container {
    margin: 20px;
    padding: 10px;
  }
}
</style>
