<template>
  <div class="gallery">
    <div class="gallery-hero">
      <hero
        :style="{ backgroundColor: 'none', height: '95vh' }"
        background-image="">
        <template #hero-header>
          <Headings heading="content of what you desire" />
        </template>
        <template #heading-text><span>lets have a look</span> </template>
      </hero>
    </div>

    <div class="container">
      <div class="pagination-container">
        <TeamGallery
          :images="paginatedItems"
          :style="{ gridTemplateColumns: 'repeat(3, 1fr)' }"
          :custom-content-style="{
            flexDirection: 'column',
            gap: '10px',
            top: '50%',
            color: 'var(--text-secondary)',
          }">
          <template #images="{ content }">
            <img v-lazy="content.image" :alt="content.image" />
          </template>

          <template #custom-content="{ content }">
            <span class="name">
              {{
                content.category === "ear"
                  ? `ear ${content.category}`
                  : content.name === "facial"
                  ? `${content.category} treatment`
                  : content.category === "pedicure" ||
                    content.category === "manicure"
                  ? content.category
                  : `nail ${content.category}`
              }}
            </span>

            <buttons
              @click="
                navigateToBookings(router, content.image, content.category)
              "
              :button-text="`book this`"
              class-name="secondary-button"
              :style="{ borderRadius: '0' }" />
          </template>
        </TeamGallery>

        <div class="pagination-controls">
          <buttons
            @click="prevPage"
            class-name="primary-button"
            button-text="previous"
            :disabled="currentPage === 1" />
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <buttons
            @click="nextPage"
            class-name="primary-button"
            button-text="next"
            :disable="currentPage === totalPages" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import hero from "../utility/hero.vue";
import Headings from "../utility/Headings.vue";
import buttons from "../utility/buttons.vue";
import TeamGallery from "../utility/TeamGallery.vue";
import { useRouter } from "vue-router";
import galleryImages from "@/assets/gallery.json";
import { navigateToBookings } from "@/navigateToBooking.js";

const router = useRouter();
//pagination settings
const itemsPerPage = 6; //image numbers per page
const currentPage = ref(1);

//total number of pages
const totalPages = computed(() =>
  Math.ceil(galleryImages.length / itemsPerPage)
);

// Get the items for the current page
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return galleryImages.slice(start, end);
});

//navigate previous page
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

//navigate to the next page
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};
</script>

<style scoped>
.pagination-container {
  margin-top: 2rem;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 1rem;
}

img:hover {
  transform: scale(1.2);
}

img {
  border-radius: 12px;
  transition: transform 0.5s ease-in-out;
}

.name {
  font-weight: bold;
  font-size: 30px;
}
</style>
