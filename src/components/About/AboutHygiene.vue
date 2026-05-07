<template>
  <DisplayCard
    heading="Our Hygiene Standards"
    sub-heading="Your safety and trust are our highest priority"
    :features="hygieneStandards"
  />
  <section class="hygiene-section">
    <!-- Trust Bar -->
    <div class="trust-bar">
      <div class="trust-item">
        <span><FontAwesomeIcon icon="hospital" class="hospital" /></span>
        <span>Hospital-grade sterilization</span>
      </div>
      <div class="trust-item">
        <span><FontAwesomeIcon icon="flask" class="flask" /></span>
        <span>Single-use materials where possible</span>
      </div>
      <div class="trust-item">
        <span><FontAwesomeIcon icon="check" class="check" /></span>
        <span>Daily deep cleaning protocols</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import DisplayCard from "../DisplayCard.vue";

const hygieneStandards = [
  {
    icon: "fire",
    title: "Professional Sterilization",
    description:
      "All metal tools are sterilized in a medical-grade autoclave after every client, following strict international hygiene protocols.",
  },
  {
    id: 2,
    icon: "mitten",
    title: "Fresh Tools & Materials",
    description:
      "We use fresh files, buffers, and disposable materials for every client. Nothing is ever reused without proper sterilization.",
  },
  {
    id: 3,
    icon: "bottle-droplet",
    title: "Premium & Safe Products",
    description:
      "We only use high-quality, reputable brands that are dermatologically tested and free from harmful chemicals.",
  },
  {
    id: 4,
    icon: "soap",
    title: "Strict Safety Practices",
    description:
      "Technicians wear fresh gloves when necessary, maintain perfect hand hygiene, and follow rigorous sanitation between services.",
  },
];
</script>
<style scoped>
.hygiene-section {
  padding: 100px 24px;
  background: #1f2528;
  color: var(--text-light);
}
/* Trust Bar */
.trust-bar {
  max-width: 1000px;
  margin: 80px auto 0;
  display: flex;
  justify-content: center;
  gap: 50px;
  flex-wrap: wrap;
  padding: 30px;
  background: rgba(46, 53, 56, 0.6);
  border-radius: 16px;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.05rem;
  color: var(--text-light);
}

/* Responsive */
@media (max-width: 768px) {
  .hygiene-section {
    padding: 80px 20px;
  }

  .trust-bar {
    gap: 30px;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
