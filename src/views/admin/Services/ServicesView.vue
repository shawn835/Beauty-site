<template>
  <div class="services-container">
    <main class="main-content">
      <ServicesHeader />

      <ServicesNavbar
        :selected-service="selectedService"
        :is-mobile="isMobile"
        @open-modal="openModal" />

      <SearchBar v-model="searchQuery" />

      <ServicesTable
        :services="services"
        :selected-service="selectedService"
        @select="handleSelect"
        @edit="(service) => openModal('edit', service)" />

      <ServiceModal
        v-if="modal.open"
        :type="modal.type"
        :service="modal.service"
        :loading="loading"
        @close="closeModal" />

      <Paginator
        :page="page"
        :total-pages="totalPages"
        :next-page="nextPage"
        :prev-page="prevPage" />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import ServicesHeader from "./ServicesHeader.vue";
import ServicesNavbar from "./ServicesNavbar.vue";
import SearchBar from "./SearchBar.vue";
import ServicesTable from "./ServicesTable.vue";
import ServiceModal from "./ServiceModal.vue";
import { useApi } from "@/components/composables/useFetch";
import Paginator from "@/components/utility/Paginator.vue";

const searchQuery = ref("");
const selectedService = ref(null);

const { data, fetchData, loading, totalPages, page, nextPage, prevPage } =
  useApi(`${import.meta.env.VITE_API_URL}/api/gallery/images`, {
    perPage: 8,
  });

onMounted(async () => {
  await fetchData();
});

const services = computed(() => data.value?.images || []);

//mobilde
const isMobile = ref(window.innerWidth <= 768);
window.addEventListener("resize", () => {
  isMobile.value = window.innerWidth < 768;
});

//modal
const modal = reactive({ open: false, type: "", service: null });

const openModal = (type, service = null) => {
  modal.open = true;
  modal.type = type;
  modal.service = service;
};

const closeModal = () => {
  modal.open = false;
  modal.type = "";
  modal.service = null;
};

const handleSelect = (sub) => {
  selectedService.value = sub;
};
</script>

<style scoped>
.services-container {
  display: flex;
  min-height: 100vh;
  background-color: #f8f1f1;
  font-family: "Playfair Display", serif;
}
</style>
