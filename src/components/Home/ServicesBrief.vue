<template>
  <div class="services-overview">
    <div class="service-overview-header">
      <headings
        heading="Embrace Your Divine Beauty Every Day!"
        data-aos="fade-in"
        data-aos-duration="900"
        :style="{ color: 'var(--text-heading)' }" />
      <span data-aos="fade-in">
        Every day is a new chance to celebrate your unique beauty. When you
        embrace your true essence, you radiate confidence and grace. It's not
        about being perfect, but about loving yourself in every moment. Let your
        inner light shine and reflect the powerful, beautiful energy within.
        Embrace who you are, and the world will see the goddess you truly are!
      </span>
    </div>

    <galleryShowcase :services="services">
      <template #image="{ service }">
        <img v-lazy="service.image" :alt="service.product" />
      </template>

      <template #custom="{ service }">
        <div class="custom-gallery-content">
          <router-link
            :to="`/services/${generateSlug(
              service.category,
              service.id
            )}/serviceslist`">
            <div class="card">
              <div class="card-content">
                <span class="service-category">{{ service.category }}</span>
                <span class="service-description">{{
                  service.description
                }}</span>
                <buttons
                  :button-text="`${service.category} services`"
                  class-name="secondary-button" />
              </div>
            </div>
          </router-link>
        </div>
      </template>
    </galleryShowcase>
  </div>
</template>

<script setup>
import Headings from "../utility/Headings.vue";
import buttons from "../utility/buttons.vue";
import galleryShowcase from "../utility/galleryShowcase.vue";
import servicesData from "@/assets/services.json";
import { RouterLink } from "vue-router";
import { generateSlug } from "@/slug";

const services = servicesData.services;
</script>

<style scoped>
.service-overview-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 600px;
  margin: 1.5rem auto;
  text-align: center;
}

span {
  color: var(--text-primary);
  line-height: 35px;
}

.card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 1rem;
}

.service-category {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-secondary);
  transition: color 0.3s ease;
}

.service-description {
  color: var(--text-secondary);
  line-height: 30px;
  transition: color 0.3s ease;
}

.custom-gallery-content {
  position: relative;
}

.card {
  background-color: var(--button-background);
  position: absolute;
  bottom: -1rem;
  left: 50%;
  transform: translateX(-50%);
  transform-origin: center;
  overflow: hidden;
  transition: all 0.5s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  width: 250px;
  height: auto;
  padding: 1.5rem;
}

.card:hover {
  background-color: var(--background-secondary);
  transform: translateX(-50%) scale(1.05);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.card:hover .service-category,
.card:hover .service-description {
  color: var(--text-primary);
}

@media (max-width: 992px) {
  .card {
    max-width: 200px;
    width: 100%;
    height: auto;
    bottom: -18px;
  }

  .service-category {
    font-size: 1rem;
  }

  .service-description {
    font-size: 0.8rem;
    line-height: 20px;
  }
}
</style>
