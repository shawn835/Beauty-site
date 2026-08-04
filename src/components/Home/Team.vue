<template>
  <section class="team-section">
    <div class="section-header">
      <h2>Meet Our Expert Team</h2>
      <p>
        Passionate, certified technicians dedicated to your beauty and comfort
      </p>
    </div>

    <div class="team-grid">
      <div
        v-for="technician in technicianStore.technicians"
        :key="technician.technicianId"
        class="team-card"
      >
        <div class="team-image">
          <img :src="technician.profilePhoto" :alt="technician.name" />
          <div class="experience-badge">
            {{ technician.yearsOfExperience }} Years experience
          </div>
        </div>

        <div class="team-info">
          <h3>{{ technician.name }}</h3>
          <p class="specialty">all services</p>

          <div class="stats">
            <div class="rating">
              <span class="stars">★ {{ technician.rating }}</span>
              <span class="reviews"
                >({{ technician.totalReviews }} reviews)</span
              >
            </div>
            <div class="bookings">
              {{ technician.completedBookings }} bookings completed
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

import { useTechnicianStore } from "../store/TechnicianStore";
const technicianStore = useTechnicianStore();

const team = ref([
  {
    id: 1,
    name: "Aisha Mwangi",
    specialty: "Senior Nail Artist",
    experience: 8,
    rating: 4.9,
    reviews: 128,
    bookings: 540,
    tags: ["Friendly", "Certified"],
    image: "https://picsum.photos/id/64/600/700",
  },
  {
    id: 2,
    name: "Fatima Hassan",
    specialty: "Gel & Acrylic Specialist",
    experience: 6,
    rating: 4.8,
    reviews: 96,
    bookings: 412,
    tags: ["Certified", "Detail-oriented"],
    image: "https://picsum.photos/id/1027/600/700",
  },
  {
    id: 3,
    name: "Grace Kimani",
    specialty: "Nail Art Expert",
    experience: 5,
    rating: 4.9,
    reviews: 84,
    bookings: 367,
    tags: ["Creative", "Friendly"],
    image: "https://picsum.photos/id/201/600/700",
  },
  {
    id: 4,
    name: "Sophie Wanjiku",
    specialty: "Pedicure Specialist",
    experience: 7,
    rating: 4.7,
    reviews: 112,
    bookings: 489,
    tags: ["Gentle", "Certified"],
    image: "https://picsum.photos/id/338/600/700",
  },
]);
</script>

<style scoped>
.team-section {
  padding: 5rem 2rem;
  background: #1a1f22;
  color: #e5e7eb;
}

.section-header {
  text-align: center;
  max-width: 680px;
  margin: 0 auto 3.5rem;
}

.section-header h2 {
  font-size: 2.6rem;
  color: #f5d698;
  margin-bottom: 0.8rem;
}

.section-header p {
  color: #aaa;
  font-size: 1.15rem;
  line-height: 1.6;
}

/* Grid */
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Card */
.team-card {
  background: #252b2e;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.35s ease;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(245, 214, 152, 0.08);
}

.team-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.45);
  border-color: rgba(245, 214, 152, 0.3);
}

/* Image */
.team-image {
  position: relative;
  height: 280px;
  overflow: hidden;
}

.team-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.team-card:hover .team-image img {
  transform: scale(1.08);
}

.experience-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: #f5d698;
  color: #2e3538;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 6px 14px;
  border-radius: 9999px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* Info */
.team-info {
  padding: 1.6rem 1.5rem 1.8rem;
}

.team-info h3 {
  margin: 0 0 0.35rem;
  font-size: 1.4rem;
  color: #f5d698;
}

.specialty {
  color: #aaa;
  margin: 0 0 1.2rem;
  font-size: 1rem;
}

/* Stats block */
.stats {
  background: rgba(0, 0, 0, 0.25);
  border-radius: 14px;
  padding: 1rem 1.2rem;
  margin-bottom: 1.2rem;
}

.rating {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 0.5rem;
}

.stars {
  color: #fbbf24;
  font-weight: 700;
  font-size: 1.1rem;
}

.reviews {
  color: #bbb;
  font-size: 0.95rem;
}

.bookings {
  color: #ddd;
  font-size: 0.98rem;
}

/* Tags */
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background: rgba(245, 214, 152, 0.12);
  color: #f5d698;
  font-size: 0.88rem;
  font-weight: 500;
  padding: 5px 12px;
  border-radius: 9999px;
}

/* Responsive */
@media (max-width: 768px) {
  .team-section {
    padding: 3.5rem 1.2rem;
  }

  .section-header h2 {
    font-size: 2.1rem;
  }

  .team-grid {
    grid-template-columns: 1fr;
  }
}
</style>
