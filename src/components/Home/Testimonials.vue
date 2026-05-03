<template>
  <section class="testimonials-section">
    <div class="section-header">
      <h2>What Our Clients Say</h2>
      <p>Real experiences from real clients in Nairobi</p>
    </div>

    <!-- Carousel -->
    <div class="testimonial-carousel">
      <button class="nav-btn prev" @click="prevSlide">←</button>

      <div
        class="testimonial-track"
        :style="{ transform: `translateX(-${current * 100}%)` }"
      >
        <div
          v-for="(review, index) in reviews"
          :key="index"
          class="testimonial-card"
        >
          <div class="stars">★★★★★</div>

          <p class="review-text">"{{ review.text }}"</p>

          <div class="client-info">
            <div class="client-avatar">
              <img :src="review.avatar" :alt="review.name" />
            </div>
            <div>
              <h4>{{ review.name }}</h4>
              <p class="client-detail">
                {{ review.location }} • {{ review.service }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <button class="nav-btn next" @click="nextSlide">→</button>
    </div>

    <!-- Dots -->
    <div class="dots">
      <span
        v-for="(review, i) in reviews"
        :key="i"
        class="dot"
        :class="{ active: i === current }"
        @click="goToSlide(i)"
      >
      </span>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const current = ref(0);

const reviews = [
  {
    text: "Best gel polish I've had in Nairobi. Lasted almost 3 weeks with zero chipping. Esther is amazing!",
    name: "Michelle W.",
    location: "Westlands",
    service: "Gel Manicure",
    avatar: "https://picsum.photos/150/150?random=50",
  },
  {
    text: "The home service was such a luxury! They came with everything and my nails look incredible. Highly recommend.",
    name: "Sarah K.",
    location: "Karen",
    service: "Home Spa Pedicure",
    avatar: "https://picsum.photos/150/150?random=51",
  },
  {
    text: "Professional, hygienic and the nail art was exactly what I wanted. My go-to place now.",
    name: "Aisha N.",
    location: "Lavington",
    service: "Nail Art",
    avatar: "https://picsum.photos/150/150?random=52",
  },
  {
    text: "The team is so warm and friendly. I felt completely relaxed. Best pedicure experience ever.",
    name: "Grace M.",
    location: "Parklands",
    service: "Spa Pedicure",
    avatar: "https://picsum.photos/150/150?random=53",
  },
];

const nextSlide = () => {
  current.value = (current.value + 1) % reviews.length;
};

const prevSlide = () => {
  current.value = (current.value - 1 + reviews.length) % reviews.length;
};

const goToSlide = (index) => {
  current.value = index;
};

// Auto-slide every 6 seconds
setInterval(() => {
  nextSlide();
}, 6000);
</script>

<style scoped>
.testimonials-section {
  padding: 100px 24px;
  background: var(--bg-dark);
  color: var(--text-light);
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-header h2 {
  font-size: 2.8rem;
  margin-bottom: 12px;
}

.section-header p {
  color: var(--text-gray);
  font-size: 1.2rem;
}

.testimonial-carousel {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  overflow: hidden;
}

.testimonial-track {
  display: flex;
  transition: transform 0.6s cubic-bezier(0.32, 0.72, 0, 1);
}

.testimonial-card {
  min-width: 100%;
  padding: 40px 30px;
  background: #3a4246;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.stars {
  color: #fbbf24;
  font-size: 1.8rem;
  margin-bottom: 20px;
}

.review-text {
  font-size: 1.25rem;
  line-height: 1.7;
  margin-bottom: 32px;
  font-style: italic;
  color: #e5e5e5;
}

.client-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.client-avatar img {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--bg-pink);
}

.client-detail {
  color: var(--text-gray);
  margin: 2px 0 0;
  font-size: 0.95rem;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(46, 53, 56, 0.9);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 1.4rem;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s;
}

.nav-btn:hover {
  background: var(--bg-pink);
}

.prev {
  left: -25px;
}
.next {
  right: -25px;
}

.dots {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 40px;
}

.dot {
  width: 12px;
  height: 12px;
  background: #555;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
}

.dot.active {
  background: var(--bg-pink);
  width: 28px;
  border-radius: 20px;
}

/* Responsive */
@media (max-width: 768px) {
  .testimonials-section {
    padding: 70px 20px;
  }

  .nav-btn {
    width: 42px;
    height: 42px;
    font-size: 1.2rem;
  }

  .prev {
    left: 10px;
  }
  .next {
    right: 10px;
  }
}
</style>
