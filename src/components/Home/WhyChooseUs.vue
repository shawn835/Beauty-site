<template>
  <section class="why-choose-us">
    <div class="section-header">
      <h2>Why Choose Symos Spa?</h2>
      <p>We don’t just do nails — we deliver a luxury experience you’ll love</p>
    </div>

    <div class="features-grid">
      <div v-for="feature in features" :key="feature.id" class="feature-card">
        <div class="icon-wrapper">
          <span class="feature-icon">{{ feature.icon }}</span>
        </div>
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    id: 1,
    icon: "✨",
    title: "Premium Products",
    description:
      "We use only high-quality, long-lasting products from leading international brands.",
  },
  {
    id: 2,
    icon: "🧼",
    title: "Sterile Equipment",
    description:
      "All tools are professionally sterilized after every client for your safety.",
  },
  {
    id: 3,
    icon: "👩‍🔬",
    title: "Skilled Technicians",
    description:
      "Certified and experienced technicians with years of expertise.",
  },
  {
    id: 4,
    icon: "🚗",
    title: "Home Appointments",
    description:
      "Premium salon experience delivered conveniently to your doorstep in Nairobi.",
  },
];
</script>

<style scoped>
.why-choose-us {
  padding: 100px 24px;
  background: #242a2d;
  color: var(--text-light);
}

.section-header {
  text-align: center;
  max-width: 720px;
  margin: 0 auto 70px;
}

.section-header h2 {
  font-size: 2.7rem;
  margin-bottom: 16px;
}

.section-header p {
  font-size: 1.2rem;
  color: var(--text-gray);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: #3a4246;
  padding: 40px 28px;
  border-radius: 20px;
  text-align: center;
  transition: all 0.4s ease;
  border: 1px solid transparent;
}

.feature-card:hover {
  transform: translateY(-10px);
  border-color: var(--bg-pink);
  box-shadow: 0 15px 35px rgba(216, 27, 96, 0.12);
}

.icon-wrapper {
  width: 90px;
  height: 90px;
  background: rgba(216, 27, 96, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  font-size: 2.8rem;
  transition: transform 0.4s ease;
}

.feature-card:hover .icon-wrapper {
  transform: scale(1.1);
  background: rgba(216, 27, 96, 0.15);
}

.feature-card h3 {
  font-size: 1.45rem;
  margin-bottom: 14px;
  color: white;
}

.feature-card p {
  color: var(--text-gray);
  line-height: 1.65;
  font-size: 1.02rem;
}

/* Responsive */
@media (max-width: 768px) {
  .why-choose-us {
    padding: 70px 20px;
  }

  .features-grid {
    gap: 24px;
  }

  .feature-card {
    padding: 32px 20px;
  }
}
</style>
