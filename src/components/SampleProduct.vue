<template>
  <div class="container">
    <div class="sample-products">
      <Headings
        heading="sample products"
        :style="{ color: 'var(--text-heading)' }" />
    </div>
    <ul class="sample-list">
      <li
        v-for="category in categories"
        :key="category.category"
        @click="setCategory(category.category)"
        :class="{ active: currentCategory === category.category }">
        {{ category.category }}
      </li>
    </ul>
    <galleryShowcase
      :services="selectedCategoryProducts"
      :style-two="{
        backgroundColor: 'var(--background-secondary)',
      }">
      <template #image="{ service }">
        <img v-lazy="service.image" :alt="service.product" />
      </template>

      <template #custom="{ service }">
        <div class="product-name">
          <span>{{ service.product }}</span>
          <buttons button-text="learn more" class-name="primary-button" />
        </div>
      </template>
    </galleryShowcase>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Headings from "./utility/Headings.vue";
import sampleProducts from "@/assets/products.json";
import galleryShowcase from "./utility/galleryShowcase.vue";
import buttons from "./utility/buttons.vue";

const categories = sampleProducts;
const currentCategory = ref(categories[0].category);

const selectedCategoryProducts = computed(() => {
  const category = categories.find(
    (cat) => cat.category === currentCategory.value
  );
  return category ? category.products : [];
});

const setCategory = (categoryName) => {
  currentCategory.value = categoryName;
};
</script>

<style scoped>
.sample-products {
  margin-top: 1.8rem;
}

.sample-list {
  display: flex;
  justify-content: center;
  gap: 30px;
  color: var(--text-primary);
  margin-bottom: 10px;
}

li {
  cursor: pointer;
  font-size: larger;
  transition: all ease-in 0.3s;
}

li:hover {
  color: var(--hover-color);
}

.product-name {
  position: absolute;
  font-size: larger;
  bottom: 10px;
  transform: translateX(-50%);
  left: 50%;
  transform-origin: center;
  overflow: hidden;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.product-name:hover {
  color: var(--hover-color);
  cursor: pointer;
}

.active {
  color: var(--hover-color);
  text-decoration: underline;
}

@media (max-width: 992px) {
  .sample-list {
    flex-direction: column;
    align-items: center;
    gap: 10px;
    font-weight: bold;
  }
}
</style>
