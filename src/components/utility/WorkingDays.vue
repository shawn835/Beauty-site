<template>
  <div class="working-days">
    <h3 :style="style">working days and hours</h3>
    <div class="working-days-inner">
      <div class="schedule">
        <div class="schedule-item" v-for="day in schedule" :key="day.name">
          <span class="day">{{ day.name }}</span>
          <span class="time">{{ day.hours }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const schedule = [
  { name: "Monday", hours: "8AM-9PM" },
  { name: "Tuesday", hours: "8AM-9PM" },
  { name: "Wednesday", hours: "8AM-9PM" },
  { name: "Thursday", hours: "8AM-9PM" },
  { name: "Friday", hours: "8AM-9PM" },
  { name: "Saturday", hours: "8AM-9PM" },
  { name: "Sunday", hours: "8AM-9PM" },
];

defineProps({
  style: Object,
});
</script>

<style scoped>
.schedule {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.schedule-item {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
}

.day {
  font-weight: normal;
}

.time {
  font-weight: bold;
}

.working-days-inner {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

h3 {
  text-align: center;
}
</style>
