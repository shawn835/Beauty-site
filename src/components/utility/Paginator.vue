<script setup>
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

<template>
  <div class="paginator">
    <button class="primary-button" :disabled="page === 1" @click="prevPage">
      Prev
    </button>

    <span class="page-info"> Page {{ page }} of {{ totalPages }} </span>

    <button
      class="primary-button"
      :disabled="page === totalPages"
      @click="nextPage">
      Next
    </button>
  </div>
</template>

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
