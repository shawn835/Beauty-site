<template>
  <section class="gallery-section">
    <div class="section-header">
      <h2>Our Art in Motion</h2>
      <p>Real results • Real clients • Real luxury</p>
    </div>

    <div class="gallery-container">
      <!-- Filter Tabs -->
      <div class="gallery-filters">
        <button
          v-for="filter in filters"
          :key="filter"
          :class="{ active: activeFilter === filter }"
          @click="activeFilter = filter"
        >
          {{ filter }}
        </button>
      </div>

      <!-- Gallery Grid -->
      <div class="gallery-grid">
        <div
          v-for="(item, index) in filteredItems"
          :key="index"
          class="gallery-item"
          :class="{ video: item.type === 'video' }"
          @click="openLightbox(item)"
        >
          <div class="media-wrapper">
            <img
              v-if="item.type === 'image'"
              :src="item.url"
              :alt="item.title"
            />

            <div v-else class="video-thumb">
              <img :src="item.thumbnail" :alt="item.title" />
              <div class="play-overlay">
                <span class="play-btn">▶</span>
              </div>
            </div>

            <div class="gallery-overlay">
              <div class="overlay-content">
                <h4>{{ item.title }}</h4>
                <p v-if="item.category">{{ item.category }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- View More -->
    <div class="view-more">
      <button class="btn-view-more" @click="viewFullGallery">
        Explore Full Gallery →
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";

const activeFilter = ref("All");

const filters = [
  "All",
  "Nail Art",
  "Manicure",
  "Pedicure",
  "Before & After",
  "Client Moments",
];

const galleryItems = [
  {
    id: 1,
    type: "image",
    url: "https://picsum.photos/600/800?random=20",
    title: "Chrome French Tips",
    category: "Nail Art",
  },
  {
    id: 2,
    type: "image",
    url: "https://picsum.photos/600/800?random=21",
    title: "3D Floral Design",
    category: "Nail Art",
  },
  {
    id: 3,
    type: "image",
    url: "https://picsum.photos/600/800?random=22",
    title: "Luxury Spa Pedicure",
    category: "Pedicure",
  },
  {
    id: 4,
    type: "video",
    thumbnail: "https://picsum.photos/600/800?random=23",
    url: "/videos/nail-art-reel.mp4",
    title: "Butterfly Nail Art Time-lapse",
    category: "Nail Art",
  },
  {
    id: 5,
    type: "image",
    url: "https://picsum.photos/600/800?random=24",
    title: "Before & After Acrylic",
    category: "Before & After",
  },
  {
    id: 6,
    type: "image",
    url: "https://picsum.photos/600/800?random=25",
    title: "Happy Client Moment",
    category: "Client Moments",
  },
  {
    id: 7,
    type: "image",
    url: "https://picsum.photos/600/800?random=26",
    title: "Ombré Gel Manicure",
    category: "Manicure",
  },
  {
    id: 8,
    type: "video",
    thumbnail: "https://picsum.photos/600/800?random=27",
    url: "/videos/pedicure-reel.mp4",
    title: "Relaxing Pedicure Experience",
    category: "Pedicure",
  },
];

const filteredItems = computed(() => {
  if (activeFilter.value === "All") return galleryItems;
  return galleryItems.filter((item) => item.category === activeFilter.value);
});

const openLightbox = (item) => {
  alert(`Lightbox opened for: ${item.title} (Video or full image)`);
  // You can implement a proper lightbox later
};

const viewFullGallery = () => {
  alert("Going to full gallery page...");
};
</script>

<style scoped>
.gallery-section {
  padding: 100px 24px;
  background: #2a3134;
  color: var(--text-light);
}

.section-header {
  text-align: center;
  margin-bottom: 50px;
}

.section-header h2 {
  font-size: 2.8rem;
  margin-bottom: 12px;
}

.section-header p {
  color: var(--text-gray);
  font-size: 1.2rem;
}



.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.gallery-item {
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  aspect-ratio: 4 / 4.5;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  transition: transform 0.4s ease;
}

.gallery-item:hover {
  transform: scale(1.03);
}

.media-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.gallery-item:hover img {
  transform: scale(1.1);
}

.video-thumb .play-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
}

.play-btn {
  width: 60px;
  height: 60px;
  background: var(--bg-pink);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  box-shadow: 0 0 30px rgba(216, 27, 96, 0.6);
}

.gallery-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.85));
  padding: 30px 20px 20px;
  color: white;
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.4s ease;
}

.gallery-item:hover .gallery-overlay {
  transform: translateY(0);
  opacity: 1;
}

.view-more {
  text-align: center;
  margin-top: 60px;
}

.btn-view-more {
  padding: 16px 48px;
  background: transparent;
  border: 2px solid var(--bg-pink);
  color: var(--bg-pink);
  font-size: 1.1rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-view-more:hover {
  background: var(--bg-pink);
  color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .gallery-section {
    padding: 70px 20px;
  }

  .gallery-grid {
    gap: 16px;
  }
}
</style>
