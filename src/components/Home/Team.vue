<template>
  <section class="team-section">
    <div class="section-header">
      <h2>Meet Our Expert Team</h2>
      <p>
        Passionate, certified technicians dedicated to your beauty and comfort
      </p>
    </div>

    <div class="team-grid">
      <div v-for="technician in team" :key="technician.id" class="team-card">
        <div class="team-image">
          <img :src="technician.image" :alt="technician.name" />
          <div class="experience-badge">{{ technician.experience }} Years</div>
        </div>

        <div class="team-info">
          <h3>{{ technician.name }}</h3>
          <p class="specialty">{{ technician.specialty }}</p>

          <div class="team-footer">
            <div class="rating">★★★★☆</div>
            <button class="book-with-btn" @click="bookWith(technician)">
              Book with {{ technician.name.split(" ")[0] }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const team = [
  {
    id: 1,
    name: "Esther Wanjiku",
    specialty: "Gel Polish & Nail Art Specialist",
    experience: 6,
    image: "https://picsum.photos/600/700?random=40",
  },
  {
    id: 2,
    name: "Grace Muthoni",
    specialty: "Spa Pedicure & Foot Care Expert",
    experience: 8,
    image: "https://picsum.photos/600/700?random=41",
  },
  {
    id: 3,
    name: "Aisha Njeri",
    specialty: "Acrylic Extensions & Design",
    experience: 5,
    image: "https://picsum.photos/600/700?random=42",
  },
  {
    id: 4,
    name: "Lilian Chebet",
    specialty: "Luxury Manicure & Bridal Nails",
    experience: 7,
    image: "https://picsum.photos/600/700?random=43",
  },
];

const bookWith = (tech) => {
  alert(`Booking flow opened with ${tech.name}`);
  // router.push(`/book?technician=${tech.id}`)
};
</script>

<style scoped>
.team-section {
  padding: 100px 24px;
  background: var(--bg-dark);
  color: var(--text-light);
}

.section-header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 70px;
}

.section-header h2 {
  font-size: 2.8rem;
  margin-bottom: 16px;
}

.section-header p {
  color: var(--text-gray);
  font-size: 1.2rem;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
}

.team-card {
  background: #3a4246;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s ease;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
}

.team-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 20px 40px rgba(216, 27, 96, 0.15);
}

.team-image {
  position: relative;
  height: 380px;
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
  bottom: 20px;
  left: 20px;
  background: var(--bg-pink);
  color: white;
  padding: 6px 16px;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.team-info {
  padding: 24px;
  text-align: center;
}

.team-info h3 {
  margin: 0 0 6px 0;
  font-size: 1.45rem;
}

.specialty {
  color: var(--text-gray);
  margin-bottom: 20px;
  font-size: 1.05rem;
  line-height: 1.4;
}

.team-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}

.rating {
  color: #fbbf24;
  font-size: 1.1rem;
}

.book-with-btn {
  background: transparent;
  border: 2px solid var(--bg-pink);
  color: var(--bg-pink);
  padding: 8px 20px;
  border-radius: 30px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.book-with-btn:hover {
  background: var(--bg-pink);
  color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .team-section {
    padding: 70px 20px;
  }
  
  .team-grid {
    gap: 24px;
  }
  
  .team-image {
    height: 340px;
  }
}
</style>