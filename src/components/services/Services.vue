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
      :activeFilter="activeFilter"
      :services="services"
      :showHeader="true"
      :showViewAll="false"
      :filters="appStore.services"
      @change-filter="activeFilter = $event"
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
import Paginator from "../Paginator.vue";
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

const categoryName = computed(() => {
  if (!activeFilter.value) return "";
  const cat = appStore.services.find(
    (c) => Number(c.id) === activeFilter.value,
  );

  return cat?.name || "";
});
</script>

<style scoped>
.services-page {
  padding: 40px 24px 100px;
  background: var(--bg-dark);
  min-height: 80vh;
}

/* Responsive */
@media (max-width: 768px) {
  .services-page {
    padding: 30px 16px 80px;
  }
}
</style>
