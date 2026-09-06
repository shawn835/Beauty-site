<template>
  <section class="testimonials-section">
    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <Spinner message="Loading testimonials..." />
    </div>

    <div class="section-header">
      <h2 class="title">What Our Clients Say</h2>
      <p class="subtitle">Real experiences from real clients in Nakuru</p>
    </div>

    <!-- Testimonials Carousel (renders only when items exist) -->
    <div
      v-if="testimonials.length"
      class="testimonial-carousel-container"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
    >
      <div class="testimonial-carousel">
        <button
          class="nav-btn prev"
          :disabled="current === 0"
          aria-label="Previous Testimonial"
          @click="prevSlide"
        >
          <font-awesome-icon icon="fa-solid fa-chevron-left" />
        </button>

        <div class="carousel-window">
          <div
            class="testimonial-track"
            :style="{ transform: `translateX(-${current * 100}%)` }"
          >
            <div
              v-for="t in testimonials"
              :key="t.id || t._id"
              class="testimonial-card"
            >
              <div class="stars">
                <StarRating :rating="t.rating" size="md" />
              </div>

              <p class="review-text">"{{ t.comment }}"</p>

              <div class="client-info">
                <h4 class="client-name">{{ t.name }}</h4>
                <div v-if="t.services?.length" class="services">
                  <span
                    v-for="(service, i) in t.services"
                    :key="i"
                    class="service-tag"
                  >
                    {{ service }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          class="nav-btn next"
          :disabled="current === testimonials.length - 1"
          aria-label="Next Testimonial"
          @click="nextSlide"
        >
          <font-awesome-icon icon="fa-solid fa-chevron-right" />
        </button>
      </div>

      <!-- Pagination Dots -->
      <div class="dots">
        <span
          v-for="(t, i) in testimonials"
          :key="i"
          class="dot"
          :class="{ active: i === current }"
          @click="goToSlide(i)"
        ></span>
      </div>
    </div>

    <!-- Fallback Empty State -->
    <div v-else class="empty-state">
      <i class="fa-regular fa-comments empty-icon"></i>
      <p>No client reviews available yet.</p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import Spinner from "../Spinner.vue";
import StarRating from "../StarRating.vue";
import { useApi } from "../composables/useFetch";

const url = `${import.meta.env.VITE_API_URL}/api/testimonials`;
const { data, loading } = useApi(url);

// Safely access data using optional chaining to avoid null errors
const testimonials = computed(() => data.value?.testimonials || []);

const current = ref(0);
let autoplayTimer = null;

// Touch Swipe State
let touchStartX = 0;
let touchEndX = 0;

const nextSlide = () => {
  if (!testimonials.value.length) return;
  current.value =
    current.value === testimonials.value.length - 1 ? 0 : current.value + 1;
};

const prevSlide = () => {
  if (!testimonials.value.length) return;
  current.value =
    current.value === 0 ? testimonials.value.length - 1 : current.value - 1;
};

const goToSlide = (index) => {
  current.value = index;
  restartAutoplay();
};

const startAutoplay = () => {
  autoplayTimer = setInterval(() => {
    nextSlide();
  }, 5000);
};

const stopAutoplay = () => {
  if (autoplayTimer) clearInterval(autoplayTimer);
};

const restartAutoplay = () => {
  stopAutoplay();
  startAutoplay();
};

// Touch Gestures for Mobile Swiping
const handleTouchStart = (e) => {
  touchStartX = e.changedTouches[0].screenX;
};

const handleTouchEnd = (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
};

const handleSwipe = () => {
  const swipeThreshold = 50;
  if (touchStartX - touchEndX > swipeThreshold) {
    nextSlide();
    restartAutoplay();
  } else if (touchEndX - touchStartX > swipeThreshold) {
    prevSlide();
    restartAutoplay();
  }
};

onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  stopAutoplay();
});
</script>
<style scoped>
.testimonials-section {
  padding: 5rem 2rem;
  background: #1a1f22;
  color: #e5e7eb;
  text-align: center;
}

.section-header {
  max-width: 640px;
  margin: 0 auto 3.5rem;
}

.section-header h2 {
  font-size: 2.5rem;
  color: #f5d698;
  margin-bottom: 0.7rem;
}

.section-header p {
  color: #aaa;
  font-size: 1.15rem;
}

/* Carousel */
.testimonial-carousel {
  position: relative;
  max-width: 780px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.carousel-window {
  flex: 1;
  overflow: hidden;
  border-radius: 20px;
}

.testimonial-track {
  display: flex;
  transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.testimonial-card {
  min-width: 100%;
  background: #252b2e;
  padding: 3rem 2.5rem;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(245, 214, 152, 0.1);
}

.review-text {
  font-size: 1.25rem;
  line-height: 1.7;
  color: #ddd;
  font-style: italic;
  margin: 0 0 2rem;
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;
}

.client-info h4 {
  margin: 0 0 0.3rem;
  font-size: 1.2rem;
  color: #f5d698;
}

.services {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 0.5rem;
}

.service-tag {
  background: rgba(245, 214, 152, 0.12);
  color: #f5d698;
  font-size: 0.9rem;
  padding: 4px 12px;
  border-radius: 9999px;
}

/* Nav Buttons */
.nav-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid rgba(245, 214, 152, 0.3);
  background: #252b2e;
  color: #f5d698;
  font-size: 1.3rem;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-btn:hover {
  background: #f5d698;
  color: #2e3538;
  border-color: #f5d698;
}

:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Dots */
.dots {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 2rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #555;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background: #f5d698;
  transform: scale(1.25);
}

.dot:hover {
  background: #f5d698;
}

/* Responsive */
@media (max-width: 768px) {
  .testimonials-section {
    padding: 3.5rem 1.2rem;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .testimonial-card {
    padding: 2.2rem 1.5rem;
  }

  .review-text {
    font-size: 1.1rem;
  }

  .nav-btn {
    width: 40px;
    height: 40px;
    font-size: 1.1rem;
  }
}
</style>
