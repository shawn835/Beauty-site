<template>
  <div class="inspiration-page">
    <!-- HERO SECTION -->
    <div class="hero-section">
      <div class="hero-image-container">
        <img
          :src="selectedImage?.image_url"
          :alt="subService?.name"
          class="hero-image"
        />
        <div class="hero-overlay"></div>
      </div>

      <div class="hero-content">
        <div class="container">
          <div class="badge-category">{{ subService.serviceName }}</div>

          <h1 class="service-title">{{ subService.name }}</h1>

          <div class="service-meta">
            <div class="meta-item">
              <span class="meta-value"
                >KES {{ subService.price.toLocaleString() }}</span
              >
            </div>
            <div class="meta-item">
              <span class="meta-value">{{
                formatDuration(subService.duration)
              }}</span>
            </div>
          </div>

          <BaseButton
            :label="
              bookingStore.isSubServiceSelected(subService.subServiceId)
                ? 'Remove'
                : 'Book this'
            "
            @click="handleBookClick(subService)"
            size="large"
          />
        </div>
      </div>
    </div>

    <!-- INSPIRATION GALLERY -->
    <div class="gallery-section">
      <div class="container">
        <div class="section-header">
          <h2>Inspiration Gallery</h2>
          <p class="subtitle">
            Click any image below to see different looks for the same service
          </p>
        </div>

        <div class="thumbnails-grid">
          <div
            v-for="(img, index) in subService.images"
            :key="img.id"
            class="thumbnail-card"
            :class="{ active: selectedImage === img.image_url }"
            @click="selectImage(img)"
          >
            <img
              :src="img.image_url"
              :alt="`${subService.subServiceName} inspiration ${index + 1}`"
              class="thumbnail"
            />
            <div class="thumbnail-overlay"></div>
          </div>
        </div>

        <div class="note">
          <p>
            All these images represent the same service:
            <strong>{{ subService.subServiceName }}</strong>
          </p>
          <p>
            Price and duration remain the same regardless of the style you
            choose.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useApi } from "../composables/useFetch";
import BaseButton from "../BaseButton.vue";
import { useRoute } from "vue-router";
import { formatDuration } from "@/Utility/utils";
import { useServiceBookingActions } from "../composables/useServiceBookingActions";
import { useBookingStore } from "../store/useBookingStore";
const { handleBookService } = useServiceBookingActions();
const route = useRoute();
const bookingStore = useBookingStore();

const id = computed(() => route.params.subServiceId);

const url = computed(
  () => `${import.meta.env.VITE_API_URL}/api/public/subservices/${id.value}`,
);

const { data } = useApi(url, { credentials: "include" });

const subService = computed(() => data.value?.subService);

const selectedImage = ref(null);

// set first image after data loads
watch(subService, (val) => {
  if (val?.images?.length) {
    selectedImage.value = val.images[0];
  }
});

const selectImage = (img) => {
  selectedImage.value = img;
};

const handleBookClick = (subService) => {
  if (!subService) return;

  handleBookService({
    type: "subService",
    serviceId: subService.serviceId,
    subServiceId: subService.subServiceId,
    subServiceName: subService.name,
    price: Number(subService.price),
    duration: Number(subService.duration),
    inspirationImageId: selectedImage.value?.id ?? null,
  });
};
</script>

<style scoped>
.inspiration-page {
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  background: #f8f6f3;
  min-height: 100vh;
}

/* HERO */
.hero-section {
  position: relative;
  height: 85vh;
  min-height: 650px;
  display: flex;
  align-items: center;
}

.hero-image-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.6s ease;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25),
    rgba(46, 53, 56, 0.75)
  );
}

.hero-content {
  position: relative;
  z-index: 2;
  color: white;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.badge-category {
  display: inline-block;
  background: var(--nav-links);
  color: var(--bg-dark);
  padding: 6px 18px;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 1.05rem;
  margin-bottom: 1rem;
}

.service-title {
  font-size: clamp(2.8rem, 6vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: var(--text-secondary);
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
}

.service-meta {
  display: flex;
  gap: 3rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.meta-item {
  font-size: 1.4rem;
}

.meta-value {
  font-weight: 700;
  color: var(--nav-links);
}

.book-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(245, 214, 152, 0.4);
  background: #f5d698;
}

/* GALLERY */
.gallery-section {
  padding: 5rem 2rem;
  background: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header h2 {
  font-size: 2.4rem;
  color: var(--text-heading);
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  font-size: 1.15rem;
}

.thumbnails-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
}

.thumbnail-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  aspect-ratio: 1 / 1.1;
}

.thumbnail-card:hover {
  transform: scale(1.05);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.thumbnail-card.active {
  box-shadow: 0 0 0 5px #f5d698;
  transform: scale(1.03);
}

.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.thumbnail-card:hover .thumbnail {
  transform: scale(1.08);
}

.thumbnail-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}

.thumbnail-card:hover .thumbnail-overlay {
  opacity: 1;
}

.note {
  margin-top: 4rem;
  text-align: center;
  color: #555;
  font-size: 1.1rem;
  background: #f8f6f3;
  padding: 2rem;
  border-radius: 16px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-section {
    height: 70vh;
  }

  .service-meta {
    gap: 2rem;
  }

  .thumbnails-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
}
</style>
