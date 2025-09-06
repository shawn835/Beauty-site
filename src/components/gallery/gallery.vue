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
              class="book-button"
              :aria-label="`Book ${img.subservice.name}`">
              book this
            </button>
          </div>
        </div>

        <!-- Pagination controls -->
        <div class="pagination-controls">
          <button
            @click="prevPage"
            class="primary-button"
            :disabled="currentPage === 1">
            Previous
          </button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button
            @click="nextPage"
            class="primary-button"
            :disabled="currentPage === totalPages">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-if="toast.visible" class="toast">{{ toast.message }}</div>
</template>

<script setup>
import hero from "../utility/hero.vue";
import Headings from "../utility/Headings.vue";
import {
  images,
  fetchGalleryItems,
  currentPage,
  totalPages,
  loading,
} from "../composables/useFetch";
import { formatDuration } from "@/utils";
import { useBookingStore } from "../store/useBookingStore";
import { showToast, toast } from "@/utils";

const bookingStore = useBookingStore();

//navigate previous page
const prevPage = () => {
  if (currentPage.value > 1) {
    fetchGalleryItems(currentPage.value - 1);
  }
};

//navigate to the next page
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    fetchGalleryItems(currentPage.value + 1);
  }
};

const addToBooking = (item) => {
  const sub = item.subservice;

  //subservices details
  bookingStore.addService({
    serviceId: item.serviceId,
    name: sub.name,
    price: sub.price,
    duration: formatDuration(sub.duration),
    image: sub.image,
  });

  showToast(`${sub.name} added to your preview`);
};

fetchGalleryItems();
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
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

.primary-button {
  padding: 8px 15px;
  border-radius: 20px;
  border: none;
  background-color: #d81b60;
  color: #fff;
  cursor: pointer;
  transition: background 0.3s ease;
}

.primary-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.toast {
  position: fixed;
  top: 10%;
  right: 50%;
  background: linear-gradient(135deg, #ffdde1 0%, #ee9ca7 100%);
  color: #fff;
  font-family: "Lora", serif;
  font-size: 1rem;
  font-weight: 600;
  padding: 14px 22px;
  border-radius: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  opacity: 0;
  animation: fadeInOut 2.5s ease forwards;
  z-index: 9999;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  15% {
    opacity: 1;
    transform: translateY(0);
  }
  85% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(20px);
  }
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>
