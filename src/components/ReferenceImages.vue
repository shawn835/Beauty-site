<template>
  <div class="reference-images">
    <h3 class="section-title">Reference Images</h3>

    <!-- Custom Images -->
    <div v-if="customImages.length" class="images-section">
      <h4 class="subsection-title">Submitted Custom Images</h4>
      <div class="gallery-grid">
        <div
          v-for="(img, i) in customImages"
          :key="i"
          class="gallery-item"
          @click="openLightbox(img, 'custom')"
        >
          <img :src="img.imageUrl || img.url" alt="Custom image" />
          <div class="overlay">
            <button class="overlay-btn">View</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Inspiration Images -->
    <div v-if="inspirationImages.length" class="images-section">
      <h4 class="subsection-title">Inspiration from Services</h4>
      <div class="inspiration-container">
        <div
          v-for="(sub, index) in inspirationImages"
          :key="index"
          class="inspo-sub"
        >
          <h5 class="sub-title">{{ sub.name || "sub" }}</h5>
          <div class="gallery-grid">
            <div
              v-for="(img, i) in sub.images"
              :key="i"
              class="gallery-item"
              @click="openLightbox(img, 'inspiration')"
            >
              <img :src="img.imageUrl || img.url" alt="Inspiration" />
              <div class="overlay">
                <button class="overlay-btn">View</button>
              </div>
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
import { ref, computed } from "vue";
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

// sub inspirations by service (if needed)
// const subedInspirations = computed(() => {
//   const map = new Map();

//   props.inspirationImages.forEach((img) => {
//     const service = img.serviceName || "General Inspiration";
//     if (!map.has(service)) map.set(service, []);
//     map.get(service).push(img);
//   });

//   return Array.from(map, ([serviceName, images]) => ({ serviceName, images }));
// });
</script>
<style scoped>
.inspiration-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 1rem;
}
.reference-images {
  background: #2e3538;
  border-radius: 20px;
  padding: 32px;
}

.section-title {
  color: var(--bg-pink);
  margin-bottom: 24px;
  font-size: 1.55rem;
}

.subsection-title {
  color: #ddd;
  margin: 32px 0 18px;
  font-size: 1.2rem;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 18px;
}

.gallery-item {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  cursor: pointer;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  transition: transform 0.4s ease;
}

.gallery-item:hover {
  transform: scale(1.05);
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.gallery-item:hover .overlay {
  opacity: 1;
}

.overlay-btn {
  background: white;
  color: #111;
  border: none;
  padding: 10px 20px;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
}

/* sub Titles */
.sub-title {
  color: #ccc;
  margin: 28px 0 14px;
  font-size: 1.1rem;
}
</style>
