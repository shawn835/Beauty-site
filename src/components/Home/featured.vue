<template>
  <ServiceCard
    title="Our Signature Services"
    subtitle="Professional nail care with premium products and experienced technicians"
    :services="featuredServices"
    @view-all="viewAllServices"
  />
</template>

<script setup>
import { computed } from "vue";
import { useApi } from "../composables/useFetch.js";
import ServiceCard from "../services/ServiceCard.vue";
import { useRouter } from "vue-router";
const router = useRouter();

const url = computed(() => `${import.meta.env.VITE_API_URL}/api/featured`);

const { data } = useApi(url);
const featuredServices = computed(() => data?.value?.featured);

const viewAllServices = () => {
  router.push("/services");
};
</script>

<style scoped>
.services-preview {
  padding: 100px 24px;
  background: var(--bg-dark);
  color: var(--text-light);
}

.section-header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 60px;
}

.section-header h2 {
  font-size: 2.8rem;
  margin-bottom: 16px;
  color: white;
}

.section-header p {
  font-size: 1.15rem;
  color: var(--text-gray);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 28px;
  max-width: 1400px;
  margin: 0 auto;
}

.service-card {
  background: #3a4246;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.4s ease;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}

.service-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 20px 40px rgba(216, 27, 96, 0.15);
}

.card-image {
  position: relative;
  height: 240px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.service-card:hover .card-image img {
  transform: scale(1.08);
}

.price-tag {
  position: absolute;
  top: 16px;
  right: 16px;
  background: var(--bg-pink);
  color: white;
  padding: 8px 16px;
  border-radius: 30px;
  font-size: 0.95rem;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.card-body {
  padding: 24px;
  text-align: center;
}

.icon {
  font-size: 2.4rem;
  margin-bottom: 12px;
  display: block;
}

.card-body h3 {
  font-size: 1.35rem;
  margin: 0 0 12px 0;
  color: white;
}

.description {
  color: var(--text-gray);
  line-height: 1.6;
  margin-bottom: 24px;
  min-height: 66px;
}

.book-btn {
  background: transparent;
  color: var(--bg-pink);
  border: 2px solid var(--bg-pink);
  padding: 12px 32px;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.book-btn:hover {
  background: var(--bg-pink);
  color: white;
  transform: translateY(-2px);
}

.view-all {
  text-align: center;
  margin-top: 60px;
}

.btn-view-all {
  background: transparent;
  color: var(--text-light);
  border: 2px solid var(--text-gray);
  padding: 14px 40px;
  border-radius: 50px;
  font-size: 1.05rem;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-view-all:hover {
  border-color: var(--bg-pink);
  color: var(--bg-pink);
}

/* Responsive */
@media (max-width: 768px) {
  .services-preview {
    padding: 70px 20px;
  }

  .section-header h2 {
    font-size: 2.4rem;
  }

  .services-grid {
    gap: 20px;
  }
}
</style>
