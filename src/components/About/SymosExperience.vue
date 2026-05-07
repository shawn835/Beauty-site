<template>
  <DisplayCard
    heading="the symos experience"
    sub-heading=" From the moment you arrive until you leave, every detail is crafted for
        your comfort and satisfaction"
    :features="journey"
  />
  <section class="experience-section">
    <div class="journey-container">
      <div class="journey-step" v-for="(step, index) in journey" :key="index">
        <div class="step-number">{{ index + 1 }}</div>

        <div class="step-content">
          <div class="step-icon">{{ step.icon }}</div>
          <h3>{{ step.title }}</h3>
          <p>{{ step.description }}</p>
        </div>
      </div>
    </div>

    <!-- Highlight Bar -->
    <div class="experience-highlights">
      <div class="highlight-item">
        <span class="highlight-icon"
          ><FontAwesomeIcon icon="spa" class="spa"
        /></span>
        <span>Warm &amp; Personalized Welcome</span>
      </div>
      <div class="highlight-item">
        <span class="highlight-icon"
          ><FontAwesomeIcon icon="soap" class="soap"
        /></span>
        <span>Immaculate Cleanliness</span>
      </div>
      <div class="highlight-item">
        <span class="highlight-icon"
          ><FontAwesomeIcon icon="chair" class="chair"
        /></span>
        <span>Calming &amp; Comfortable Space</span>
      </div>
      <div class="highlight-item">
        <span class="highlight-icon"
          ><FontAwesomeIcon icon="star" class="star"
        /></span>
        <span>Attention to Every Detail</span>
      </div>
    </div>
  </section>
</template>
<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import DisplayCard from "../DisplayCard.vue";

const journey = [
  {
    icon: "door-open",
    title: "Warm Welcome",
    description:
      "You are greeted with a smile, offered refreshing water or herbal tea, and made to feel at home immediately.",
  },
  {
    icon: "comments",
    title: "Personal Consultation",
    description:
      "Our technician listens carefully to your preferences, lifestyle, and desired look before recommending the best treatment.",
  },
  {
    icon: "hands",
    title: "Signature Treatment",
    description:
      "Enjoy a luxurious, hygienic, and relaxing service using premium products in a calm and serene environment.",
  },
  {
    icon: "hand-sparkles",
    title: "Finishing Touches",
    description:
      "We perfect every detail — from nail shape and cuticle care to final massage and shine. You leave feeling truly pampered.",
  },
];
</script>
<style scoped>
.experience-section {
  padding: 100px 24px;
  background: var(--bg-dark);
  color: var(--text-light);
}

.section-header {
  text-align: center;
  max-width: 720px;
  margin: 0 auto 80px;
}

.section-header h2 {
  font-size: 2.8rem;
  margin-bottom: 16px;
}

.section-header p {
  color: var(--text-gray);
  font-size: 1.2rem;
}

.journey-container {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 40px;
}

.journey-step {
  position: relative;
  padding-left: 70px;
}

.step-number {
  position: absolute;
  left: 0;
  top: 0;
  width: 52px;
  height: 52px;
  background: var(--bg-pink);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  box-shadow: 0 8px 20px rgba(216, 27, 96, 0.3);
}

.step-content {
  background: #2e3538;
  padding: 32px 28px;
  border-radius: 20px;
  height: 100%;
  transition: all 0.4s ease;
}

.journey-step:hover .step-content {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(216, 27, 96, 0.15);
}

.step-icon {
  font-size: 2.8rem;
  margin-bottom: 16px;
}

.step-content h3 {
  font-size: 1.4rem;
  margin-bottom: 12px;
  color: white;
}

.step-content p {
  color: var(--text-gray);
  line-height: 1.7;
}

/* Highlights */
.experience-highlights {
  max-width: 1000px;
  margin: 90px auto 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  background: #242a2d;
  padding: 40px 30px;
  border-radius: 20px;
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.1rem;
  color: var(--text-light);
}

.highlight-icon {
  font-size: 1.6rem;
}

/* Responsive */
@media (max-width: 768px) {
  .experience-section {
    padding: 80px 20px;
  }

  .journey-container {
    gap: 28px;
  }

  .experience-highlights {
    gap: 24px;
    padding: 30px 20px;
  }
}
</style>
