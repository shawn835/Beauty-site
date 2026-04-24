<!-- BookingBasicInfo.vue -->
<template>
  <div class="basic-info">
    <div class="form-row">
      <div class="form-group">
        <label>Date <span class="required">*</span></label>
        <input type="date" v-model="localDate" :min="today" required />
      </div>

      <div class="form-group">
        <label>Time <span class="required">*</span></label>
        <input type="time" v-model="localTime" :min="minTime" required />
      </div>
    </div>

    <div class="form-group">
      <label>Select technician <span class="required">*</span></label>
      <select v-model="localtechnician" required>
        <option value="" disabled>Select technician</option>
        <option
          v-for="t in technicians"
          :key="t.technician_id"
          :value="t.technician_id"
        >
          {{ t.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  date: String,
  time: String,
  technician: String,
  technicians: Array,
  today: String,
  minTime: String,
});

const emit = defineEmits(["update:date", "update:time", "update:technician"]);

const localDate = computed({
  get: () => props.date,
  set: (val) => emit("update:date", val),
});

const localTime = computed({
  get: () => props.time,
  set: (val) => emit("update:time", val),
});

const localtechnician = computed({
  get: () => props.technician,
  set: (val) => emit("update:technician", val),
});
</script>

<style scoped>
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  color: #34495e;
  margin-bottom: 8px;
}

.required {
  color: #e74c3c;
}

input,
select {
  padding: 12px 14px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s;
}

input:focus,
select:focus {
  outline: none;
  border-color: #9b59b6;
  box-shadow: 0 0 0 3px rgba(155, 89, 182, 0.12);
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
