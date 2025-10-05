<template>
  <div class="homepage-container">
    <!-- Services Overview -->
    <section class="services-section">
      <h2 class="section-title">Our Services</h2>
      <div class="services-grid">
        <div
          v-for="service in services"
          :key="service.name"
          class="service-card"
          @click="goToServiceBooking(service.id)">
          <img
            :src="service.subService.image"
            :alt="service._id"
            class="service-icon" />
          <h3 class="service-name">{{ service.subService.name }}</h3>
          <p class="service-desc">{{ service.subService.description }}</p>
        </div>
      </div>
    </section>

    <!-- How It Works / Steps -->
    <section class="steps-section">
      <h2 class="section-title">How It Works</h2>
      <div class="steps-grid">
        <div v-for="(step, index) in steps" :key="index" class="step-card">
          <div class="step-icon">{{ index + 1 }}</div>
          <h3 class="step-title">{{ step.title }}</h3>
          <p class="step-desc">{{ step.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Featured Slots / Quick Booking -->
    <!-- <section class="slots-section" v-if="featuredSlots.length">
      <h2 class="section-title">Popular Slots Today</h2>
      <div class="slots-grid">
        <div v-for="slot in featuredSlots" :key="slot.id" class="slot-card">
          <p class="slot-time">
            {{ formatDate(slot.date) }} at {{ slot.time }}
          </p>
          <button @click="quickBook(slot)" class="slot-btn">Book Now</button>
        </div>
      </div>
    </section> -->

    <!-- Testimonials -->
    <section class="testimonials">
      <h2 class="section-title">What Our Clients Say</h2>
      <div class="testimonial-grid">
        <div v-for="(t, i) in testimonials" :key="i" class="testimonial-card">
          <p class="testimonial-text">“{{ t.text }}”</p>
          <span class="testimonial-author">— {{ t.author }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useApi } from "../composables/useFetch";
import { formatDate } from "@/utils";

const { data, fetchData } = useApi(
  `${import.meta.env.VITE_API_URL}/api/homeservices`
);

// Sample data
const services = computed(() => data.value?.services || []);

onMounted(async () => {
  await fetchData();
});

const testimonials = [
  {
    text: "Absolutely love my nails! The staff is so friendly.",
    author: "Jane M.",
  },
  {
    text: "Best nail spa in town. My gel polish lasts forever!",
    author: "Cynthia W.",
  },
  { text: "Beautiful ambience and professional service.", author: "Lucy A." },
];

const steps = ref([
  { title: "Choose Service", desc: "Select your desired nail treatment" },
  { title: "Pick Date & Time", desc: "Find a slot that suits you" },
  { title: "Confirm & Pay", desc: "Secure your booking" },
  { title: "Get Confirmation", desc: "Receive your booking details" },
]);

// Router
const router = useRouter();

const goToServiceBooking = (serviceId) => {
  router.push(`/booking?service=${serviceId}`);
};
</script>

<style scoped>
.homepage-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.services-section,
.steps-section,
.slots-section {
  margin-bottom: 40px;
}

.section-title {
  font-family: "Playfair Display", serif;
  font-size: 2rem;
  color: var(--text-pink);
  text-align: center;
  margin-bottom: 20px;
}

.services-grid,
.steps-grid,
.slots-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 0 10px;
}

.service-card,
.step-card,
.slot-card {
  background: var(--text-light);
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.service-icon {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 15px;
}

.service-name {
  font-size: 1.2rem;
  color: var(--text-dark);
  margin-bottom: 10px;
}

.service-desc {
  font-size: 0.9rem;
  color: var(--dark-gray);
  line-height: 1.4;
}

.step-icon {
  font-size: 2rem;
  color: var(--text-pink);
  margin-bottom: 10px;
}

.step-title {
  font-size: 1.1rem;
  color: var(--text-dark);
  margin-bottom: 5px;
}

.step-desc {
  font-size: 0.9rem;
  color: var(--dark-gray);
}

/* .slot-time {
  font-size: 1rem;
  color: #333;
  margin-bottom: 10px;
}

.slot-btn {
  padding: 8px 15px;
  background-color: #d81b60;
  color: #fff;
  border: none;
  border-radius: 15px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.slot-btn:hover {
  background-color: #ad1457;
  transform: translateY(-2px);
} */

/* Testimonials */
.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}
.testimonial-card {
  background: var(--bg-light);
  padding: 1rem;
  border-left: 4px solid var(--text-pink);
  border-radius: 8px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);
}
.testimonial-text {
  font-style: italic;
  margin-bottom: 0.5rem;
}
.testimonial-author {
  font-size: 0.85rem;
  color: var(--dark-gray);
}

@media (max-width: 768px) {
  .services-grid,
  .steps-grid,
  .slots-grid {
    grid-template-columns: 1fr;
  }

  .service-card,
  .step-card,
  .slot-card {
    padding: 15px;
  }

  .section-title {
    font-size: 1.8rem;
  }
}
</style>
