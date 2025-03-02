<template>
  <div class="container">
    <div class="accordion">
      <div class="accordion-header" @click="toggleAccordion">
        <slot name="accordion-header"></slot>
        <span class="icon">{{ isOpen ? "-" : "+" }}</span>
      </div>
      <div class="accordion-body" v-if="isOpen">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isOpen = ref(false);

const toggleAccordion = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style scoped>
.accordion {
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  /* margin-bottom: 10px; */
  max-width: 900px;
  margin: auto;
}

.accordion-header {
  background: #f5f5f5;
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.accordion-body {
  padding: 10px;

  transition: transform 0.5s ease;
}

.icon {
  font-size: 18px;
  transition: transform 0.2s ease;
}
.container {
  margin-top: 1rem;
}
</style>
