<template>
  <div class="gallery">
    <div class="gallery-hero">
      <hero background-image="/gallery/manicure-image-10.jpg">
        <template #hero-header>
          <Headings heading="content of what you desire" />
        </template>
        <template #heading-text><span>lets have a look</span> </template>
      </hero>
    </div>

    <div class="container">
      <Headings
        heading="look for what you like"
        :style="{ color: 'var(--text-heading)' }" />

      <div class="services-grid">
        <div v-for="img in images" :key="img.serviceId" class="service-card">
          <!-- Image + overlay -->
          <div class="card-image">
            <img :src="img.subservice.image" :alt="img.subservice.name" />
            <div class="image-overlay">
              <span class="overlay-text">{{ img.serviceName }}</span>
            </div>
          </div>

          <!-- Card content -->
          <div class="card-content">
            <h3 class="card-title">{{ img.subservice.name }}</h3>
            <p class="card-duration">
              Duration: {{ formatDuration(img.subservice.duration) }}
            </p>
            <p class="card-price">KSh {{ img.subservice.price }}</p>
            <p class="card-description">{{ img.subservice.description }}</p>
            <button
              @click="addToBooking(img)"
              class="primary-button"
              :aria-label="`Book ${img.subservice.name}`">
              book this
            </button>
          </div>
        </div>

        <!-- Pagination controls -->
        <div class="pagination-controls">
          <Paginator
            :page="currentPage"
            :total-pages="totalPages"
            :next-page="nextPage"
            :prev-page="prevPage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import hero from "../utility/Hero.vue";
import Headings from "../utility/Headings.vue";
import { useApi } from "../composables/useFetch";
import { formatDuration } from "@/utils";
import { useBookingStore } from "../store/useBookingStore";
import { useToast } from "../composables/useToast";
import Paginator from "../utility/Paginator.vue";

const {
  data,
  page: currentPage,
  totalPages,
  fetchData,
  nextPage,
  prevPage,
} = useApi(`${import.meta.env.VITE_API_URL}/api/gallery/images`, {
  perPage: 8,
});
const { show } = useToast();
const bookingStore = useBookingStore();

const addToBooking = (item) => {
  const sub = item.subservice;

  //subservices details
  bookingStore.addService({
    serviceId: item.serviceId,
    name: sub.name,
    price: sub.price,
    duration: sub.duration,
    image: sub.image,
  });

  show({ message: `${sub.name} added to your preview`, type: "success" });
};

onMounted(async () => {
  await fetchData();
});
const images = computed(() => data.value?.images || []);
</script>

<style scoped>
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 50px auto;
  padding: 0 20px;
}

.service-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(135deg, #fff5f7 0%, #ffe4e1 100%);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.card-image {
  position: relative;
  width: 100%;
  aspect-ratio: 2 / 1;
  overflow: hidden;
}

.card-image img {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.card-image:hover img {
  transform: scale(1.05);
  opacity: 0.9;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card-image:hover .image-overlay {
  opacity: 1;
}

.overlay-text {
  color: #fff;
  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  padding: 0 10px;
}

.card-content {
  padding: 20px;
  text-align: center;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-title {
  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
  color: #d81b60;
  margin-bottom: 5px;
  font-weight: 700;
}

.card-duration {
  font-family: "Lora", serif;
  font-size: 0.95rem;
  color: #444;
  margin-bottom: 5px;
}

.card-price {
  font-family: "Lora", serif;
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 10px;
  font-weight: 500;
}

.card-description {
  font-family: "Lora", serif;
  font-size: 0.95rem;
  color: #666;
  line-height: 1.5;
  margin-bottom: 20px;
}

.book-button {
  padding: 10px 20px;
  background-color: #d81b60;
  color: #fff;
  border: none;
  border-radius: 25px;
  font-family: "Lora", serif;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.book-button:hover {
  background-color: #ad1457;
  transform: translateY(-2px);
}

.pagination-controls {
  grid-column: 1/-1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>
