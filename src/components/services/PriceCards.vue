<template>
  <div class="container">
    <Headings
      heading="our services and pricing"
      :style="{ color: 'var(--text-heading)' }" />
    <div class="pricing-cards">
      <div
        v-for="service in servicesInfo"
        :key="service.id"
        class="card-content">
        <div class="card-top card">
          <h3 class="service-category">{{ service.category }}</h3>
          <span class="starting-price">
            <p class="start-text">from</p>
            <p>ksh{{ service.servicesList[0].price }}</p>
          </span>
        </div>

        <router-link
          :to="`/services/${generateSlug(
            service.category,
            service.id
          )}/serviceslist`">
          <div class="card-middle card">
            <div class="sample-service-list">
              <ul>
                <li v-for="item in service.servicesList" :key="item.name">
                  {{
                    service.category === "nail enhancement"
                      ? item.name
                      : `${item.name} ${service.category}`
                  }}
                </li>
              </ul>
            </div>
          </div>

          <div class="card-button">
            <buttons
              class-name="primary-button"
              button-text="check services"
              :style="{ borderRadius: '0', width: '100%' }" />
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import Headings from "../utility/Headings.vue";
import buttons from "../utility/buttons.vue";
import servicesData from "@/assets/services.json";
import { generateSlug } from "@/slug.js";

const servicesInfo = servicesData.services;
</script>

<style scoped>
.pricing-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  align-items: center;
  justify-content: center;
  max-width: 950px;
  margin: auto;
  border-radius: 10px;
}
.container {
  margin-top: 2rem;
}

.card-content {
  border-radius: 10px;
}

.card-top {
  line-height: 35px;
  background-color: #ffd1ba;
  color: #800020;
  width: 100%;
  padding-top: 20px;
  font-weight: bold;
  text-align: center;
}

.starting-price {
  display: flex;
  gap: 6px;
  justify-content: center;
}
.start-text {
  color: #908f8f;
}

.card-middle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background-color: #f8e1e7;
  color: #333333;
  width: 100%;
  padding-top: 20px;
  cursor: pointer;
}

ul {
  line-height: 35px;
  font-size: 20px;
}
.card-button {
  width: 100%;
}

a {
  text-decoration: none;
}

@media (max-width: 992px) {
  .pricing-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 578px) {
  .pricing-cards {
    grid-template-columns: 1fr;
  }
}
</style>
