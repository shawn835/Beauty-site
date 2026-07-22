<template>
  <div class="reference-images">
    <h3 class="section-title">Reference Images</h3>

    <!-- Custom Images -->
    <div v-if="customImages.length" class="images-section">
      <h4 class="subsection-title">Your Custom Images</h4>
      <div class="gallery-grid">
        <div
          v-for="(img, i) in customImages"
          :key="i"
          class="gallery-item"
          @click="openLightbox(img, 'custom')"
        >
          <img :src="img.imageUrl || img.url" alt="Custom reference" />
          <div class="overlay">
            <button class="overlay-btn">View Full</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Inspiration Images -->
    <div v-if="inspirationImages.length" class="images-section">
      <h4 class="subsection-title">Inspiration from Services</h4>

      <div class="inspiration-grid">
        <div v-for="sub in inspirationImages" :key="sub.id" class="inspo-card">
          <h5 class="sub-title">{{ sub.name }}</h5>

          <div
            v-if="sub.inspiration"
            class="gallery-item"
            @click="openLightbox(sub.inspiration, 'inspiration')"
          >
            <img :src="sub.inspiration.imageUrl" alt="Inspiration" />
            <div class="overlay">
              <button class="overlay-btn">View</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <ImageLightbox
      v-if="lightboxVisible"
      :image="currentImage"
      @close="closeLightbox"
    />
  </div>
</template>
<script setup>
import { ref } from "vue";
import ImageLightbox from "./ImageLightbox.vue";

const props = defineProps({
  customImages: {
    type: Array,
    default: () => [],
  },
  inspirationImages: {
    type: Array,
    default: () => [],
  },
});

const lightboxVisible = ref(false);
const currentImage = ref(null);

const openLightbox = (img, type) => {
  currentImage.value = {
    ...img,
    type,
  };
  lightboxVisible.value = true;
};

const closeLightbox = () => {
  lightboxVisible.value = false;
  currentImage.value = null;
};
</script>
<style scoped>
.reference-images {
  margin-top: 3rem;
}

.section-title {
  font-size: 1.85rem;
  color: #f5d698;
  margin-bottom: 2rem;
  border-bottom: 2px solid rgba(245, 214, 152, 0.2);
  padding-bottom: 0.8rem;
}

.subsection-title {
  font-size: 1.35rem;
  color: #ddd;
  margin: 2.5rem 0 1.2rem;
  font-weight: 600;
}

/* Gallery Grid */
.gallery-grid,
.inspiration-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.6rem;
}

.gallery-item {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.gallery-item:hover {
  transform: scale(1.04);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.gallery-item:hover img {
  transform: scale(1.08);
}

/* Overlay */
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .overlay {
  opacity: 1;
}

.overlay-btn {
  background: #f5d698;
  color: #2e3538;
  border: none;
  padding: 10px 24px;
  border-radius: 9999px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.overlay-btn:hover {
  background: white;
  transform: scale(1.05);
}

/* Inspiration Section */
.inspo-card {
  background: #252b2e;
  border-radius: 16px;
  padding: 1rem;
  transition: all 0.3s;
}

.inspo-card:hover {
  background: #2e3538;
}

.sub-title {
  margin: 0 0 1rem 0;
  color: #ddd;
  font-size: 1.1rem;
  text-align: center;
}

/* Empty / Loading States */
.loading-state,
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #888;
}

/* Responsive */
@media (max-width: 768px) {
  .gallery-grid,
  .inspiration-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  .section-title {
    font-size: 1.6rem;
  }
}
</style>
