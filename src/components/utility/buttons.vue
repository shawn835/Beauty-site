<template>
  <button :class="[computedClass]">
    {{ buttonText }} <i class="fas fa-arrow-right"></i>
  </button>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  buttonText: String,
  className: String,
});

const computedClass = computed(() => props.className);
</script>
<style scoped>
button {
  border-radius: 12px;
  padding: 12px 18px;
  border: none;
  font-size: medium;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
}

button:hover {
  opacity: 0.9;
}

i {
  color: var(--primary-icon-color);
}

button.primary-button {
  background-color: var(--primary-button-background);
  color: var(--primary-button-color);
  border-radius: 25px;
}

button.secondary-button {
  background-color: var(--secondary-button-background);
  color: var(--secondary-button-color);
  border-radius: 30px;
}

.primary-button:hover {
  background-color: var(--secondary-button-background);
  color: var(--secondary-button-color);
}
.secondary-button:hover {
  color: var(--primary-button-color);
  background-color: var(--primary-button-background);
}

.secondary-button:hover i {
  color: var(--secondary-button-background);
}

.primary-button:hover i {
  color: var(--secondary-button-color);
}

.secondary-button i {
  color: var(--secondary-icon-color);
}

@media (max-width: 992px) {
  button {
    padding: 8px 8px;
  }

  i {
    display: none;
  }
}
</style>
