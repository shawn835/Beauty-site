<template>
  <hero
    background-image="/hero-images/service-list-hero-image.jpg"
    :style="{ height: '80vh' }">
    <template #hero-header>
      <Headings :heading="`${formattedCategory} services`" />
    </template>
    <template #heading-text>
      <p>choose your desired service</p>
    </template>
  </hero>

  <div class="service-list-gallery">
    <Headings
      :heading="`${formattedCategory} treatment`"
      :style="{ color: 'var(--text-heading)' }" />
    <TeamGallery :array="filteredServices">
      <template #images="{ content }">
        <img v-lazy="content.image" :alt="content.name" />
      </template>

      <template #custom-content="{ content }">
        <buttons
          @click="bookThis(content)"
          class-name="secondary-button"
          button-text="book this"
          :style="{ borderRadius: '0' }" />
      </template>

      <template #extra-custom-content="{ content }">
        <div class="service-info">
          <span>{{ content.name }}</span>
          <span>ksh {{ content.price }}</span>
        </div>
      </template>
    </TeamGallery>
  </div>
</template>

<script setup>
import Headings from "../utility/Headings.vue";
import TeamGallery from "../utility/TeamGallery.vue";
import hero from "../utility/hero.vue";
import buttons from "../utility/buttons.vue";
import { computed } from "vue";
import servicesData from "@/assets/services.json"; // Import the services JSON
import { bookService } from "../../../navigateToBookings";
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();

const formattedCategory = computed(() => {
  return route.params.category
    ? route.params.category.replace(/-/g, " ")
    : "Category Not Found";
});

const categoryId = computed(() => route.params.id || "");

const filteredServices = computed(() => {
  if (!formattedCategory) {
    return [];
  }

  const categoryData = servicesData.services.find(
    (service) =>
      service.category.toLowerCase() === formattedCategory.value.toLowerCase()
  );

  return categoryData ? categoryData.servicesList : [];
});

const bookThis = (image) => {
  bookService(image);
  router.push("/online-bookings");
};
</script>

<style scoped>
.service-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 10px;
}

.service-list-gallery {
  margin-top: 2rem;
}

.service-info span:nth-child(1) {
  font-size: large;
  font-weight: bold;
  color: #800020;
}
.service-info span:nth-child(2) {
  color: #908f8f;
  font-weight: 600;
}

img:hover {
  transform: scale(1.2);
}

img {
  border-radius: 12px;
  transition: transform 0.5s ease-in-out;
}
</style>
