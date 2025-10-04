<template>
  <div class="details-header">
    <h2 class="service-title">{{ service }}</h2>
    <span v-if="status" class="status" :class="status.toLowerCase()">
      {{ status }}
    </span>
  </div>
</template>

<script setup>
defineProps({
  service: String,
  status: String,
});
</script>

<style scoped>
.details-header {
  margin-bottom: 20px;
}

.service-title {
  font-size: 1.8rem;
  color: #d81b60;
  margin: 0;
  font-weight: 600;
}

.status {
  font-size: 1rem;
  padding: 5px 10px;
  border-radius: 15px;
  display: inline-block;
  margin-top: 5px;
}

.status.confirmed {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.status.pending {
  background-color: #fff3e0;
  color: #ed6c02;
}

.status.completed {
  background-color: #e0f2e9;
  color: #1b5e20;
}

.status.cancelled {
  background-color: #ffebee;
  color: #d32f2f;
}
</style>
