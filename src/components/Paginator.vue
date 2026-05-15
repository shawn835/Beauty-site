<template>
  <div class="paginator">
    <BaseButton
      :disabled="page === 1"
      @click="prevPage"
      label="prev"
      variant="primary"
    />

    <span class="page-info"> Page {{ page }} of {{ totalPages }} </span>

    <BaseButton
      :disabled="page === totalPages"
      @click="nextPage"
      label="next"
      variant="primary"
    />
  </div>
</template>

<script setup>
import BaseButton from "./BaseButton.vue";
const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  nextPage: {
    type: Function,
    default: null,
  },
  prevPage: {
    type: Function,
    default: null,
  },
});
</script>

<style scoped>
.paginator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.page-info {
  font-size: 0.9rem;
  color: #555;
}
</style>
