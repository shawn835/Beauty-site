<!-- BookingServices.vue -->
<template>
  <div class="services-section">
    <div class="form-group">
      <label>Select Service(s) <span class="required">*</span></label>
      <select v-model="localServices" multiple size="4" required>
        <option
          v-for="service in services"
          :key="service.id"
          :value="service.id"
          :disabled="bookingStore.isServiceSelected(service.id)"
        >
          {{ service.name }}
        </option>
      </select>

      <!-- <small class="helper-text">
        Hold Ctrl (or Cmd) to select multiple services
      </small> -->
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed, watch } from "vue";
import { useBookingStore } from "@/components/store/useBookingStore";
const bookingStore = useBookingStore();
const props = defineProps({
  modelValue: Array,
  services: Array,
});

//sync incase gallery updates
watch(
  () => bookingStore.serviceIds,
  (ids) => {
    props.services = [...ids];
  },
  { immediate: true },
);

watch(
  () => props.services,
  (newVal) => {
    props.services = [
      ...new Set([
        ...newVal,
        ...bookingStore.serviceIds, // force locked ones back
      ]),
    ];
  },
);
const emit = defineEmits(["update:modelValue"]);

const localServices = computed({
  get: () => props.modelValue || [],
  set: (val) => emit("update:modelValue", val),
});
</script>

<style scoped>
.form-group label {
  font-weight: 600;
  color: #34495e;
  margin-bottom: 8px;
  display: block;
}

select[multiple] {
  width: 100%;
  padding: 10px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  min-height: 130px;
  font-size: 1rem;
}

select:focus {
  border-color: #9b59b6;
  box-shadow: 0 0 0 3px rgba(155, 89, 182, 0.12);
}

.helper-text {
  font-size: 0.82rem;
  color: #7f8c8d;
  margin-top: 6px;
}
</style>
