<template>
  <div class="services-page">
    <!-- Services Grid -->
    <ServiceCard
      :title="activeFilter === null ? 'All Services' : categoryName"
      :subtitle="
        activeFilter === null
          ? 'Choose from our full range of luxury nail treatments'
          : `Premium ${categoryName} services`
      "
      :services="services"
      :showHeader="true"
      :showViewAll="false"
      :filters="appStore.services"
      @change-filter="activeFilter = $event"
      @book-service="addToBooking"
    />

    <!-- Pagination -->
    <div class="pagination-wrapper">
      <Paginator
        :page="currentPage"
        :total-pages="totalPages"
        :next-page="nextPage"
        :prev-page="prevPage"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import { useApi } from "../composables/useFetch";
import { useBookingStore } from "../store/useBookingStore";
import { useToast } from "../composables/useToast";
import Paginator from "../utility/Paginator.vue";
import { useAppStore } from "../store/appStore";
import ServiceCard from "./ServiceCard.vue";
const appStore = useAppStore();
const activeFilter = ref(null);
const url = computed(
  () =>
    `${import.meta.env.VITE_API_URL}/api/services?serviceId=${activeFilter.value}`,
);
const {
  data,
  page: currentPage,
  totalPages,
  fetchData,
  nextPage,
  prevPage,
} = useApi(url, {
  perPage: 8,
});

onMounted(async () => {
  await fetchData();
});
const services = computed(() => data.value?.services || []);

const { show } = useToast();
const bookingStore = useBookingStore();

const addToBooking = (sub) => {
  //subservices details
  bookingStore.addService({
    name: sub.subServiceName,
    // image: sub.image,
    subId: sub.subServiceId,
    serviceId: sub.serviceId,
    price: sub.price,
    duration: sub.duration,
  });

  show({
    message: `${sub.subServiceName} added to your preview`,
    type: "success",
  });
};

const categoryName = computed(() => {
  if (!activeFilter.value) return "";
  const cat = appStore.services.find((c) => c.id === activeFilter.value);
  return cat?.name || "";
});
</script>

<style scoped>
.services-page {
  padding: 40px 24px 100px;
  background: var(--bg-dark);
  min-height: 80vh;
}

.service-filters {
  max-width: 1400px;
  margin: 0 auto 50px;
}

.filters-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  padding: 20px 0;
  border-bottom: 1px solid #444;
}

.filter-btn {
  background: #2e3538;
  color: var(--text-light);
  border: 2px solid transparent;
  padding: 12px 28px;
  border-radius: 50px;
  font-weight: 500;
  font-size: 1.02rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.filter-btn:hover {
  background: #3a4246;
  transform: translateY(-2px);
}

.filter-btn.active {
  background: var(--bg-pink);
  color: white;
  border-color: var(--bg-pink);
  box-shadow: 0 8px 20px rgba(216, 27, 96, 0.25);
}

/* Responsive */
@media (max-width: 768px) {
  .filters-container {
    gap: 10px;
    padding: 15px 0;
  }

  .filter-btn {
    padding: 10px 20px;
    font-size: 0.98rem;
  }

  .services-page {
    padding: 30px 16px 80px;
  }
}
</style>
