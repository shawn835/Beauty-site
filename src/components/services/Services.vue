<template>
  <Spinner v-if="loading" />
  <div class="services-page" v-if="userStore.user">
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
        v-if="totalPages > 1"
        :page="page"
        :total-pages="totalPages"
        :next-page="nextPage"
        :prev-page="prevPage"
      />
    </div>
  </div>
</template>

<script setup>
import { watch, computed, ref } from "vue";
import { useApi } from "../composables/useFetch";
import Paginator from "../Paginator.vue";
import { useAppStore } from "../store/appStore";
import ServiceCard from "./ServiceCard.vue";
import { usePagination } from "../composables/usePagination";
import { useUserStore } from "../store/userStore";
import Spinner from "../Spinner.vue";
const appStore = useAppStore();
const userStore = useUserStore();
const activeFilter = ref(null);

const { nextPage, prevPage, limit, page, totalPages, setMeta } =
  usePagination();

const url = computed(() => {
  const params = new URLSearchParams({
    page: String(page.value),
    limit: String(limit.value),
  });

  if (activeFilter.value) {
    params.set("serviceId", String(activeFilter.value));
  }

  return `${import.meta.env.VITE_API_URL}/api/users/services?${params.toString()}`;
});

const { data, loading } = useApi(url);
watch(data, (response) => {
  if (response) {
    setMeta(response);
  }
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
