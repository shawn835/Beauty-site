<template>
  <div class="card">
    <h3>Booking Activity</h3>
    <div class="activity-list">
      <div v-for="(log, i) in activityLog" :key="i" class="activity-item">
        <span class="time">{{ log.time }} </span>
        <span>{{ log.text }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  activityLog: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>
<style scoped>
.card {
  background: #3a4246;
  border-radius: 16px;
  padding: 26px;
  margin-bottom: 24px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}
</style>
