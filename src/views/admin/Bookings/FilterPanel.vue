<template>
  <div class="filter-panel">
    <div class="filter-group">
      <label>Date Range</label>
      <input type="date" v-model="filters.dateFrom" />
      <input type="date" v-model="filters.dateTo" />
    </div>

    <div class="filter-group">
      <label>Service Type</label>
      <select v-model="filters.serviceType">
        <option value="">All Services</option>
        <option v-for="s in servicesNames" :key="s.name" :value="s.name">
          {{ s.name }}
        </option>
      </select>
    </div>

    <div class="filter-group">
      <label>Booking Status</label>
      <select v-model="filters.bookingStatus">
        <option value="">All Statuses</option>
        <option v-for="s in bookingStatuses" :key="s" :value="s">
          {{ s }}
        </option>
      </select>
    </div>

    <div class="filter-group">
      <label>Technicians</label>
      <select v-model="filters.technician">
        <option value="">All</option>
        <option v-for="t in technicians" :key="t.name" :value="t.name">
          {{ t.name }}
        </option>
      </select>
    </div>

    <button @click="$emit('applyFilters')" class="filter-btn">
      Apply Filters
    </button>
  </div>
</template>

<script setup>
import { useTechnicians } from "@/components/composables/useTechnician";
import { useServices } from "@/components/composables/useServices";
import { onMounted, watch } from "vue";

const { technicians, fetchData: fetchTechnicians } = useTechnicians();
const { fetchData: fetchServices, servicesNames } = useServices();
const bookingStatuses = ["Rescheduled", "Completed", "Cancelled", "upcoming"];
defineProps({
  filters: Object,
});

onMounted(async () => {
  await fetchTechnicians();
  await fetchServices();
});
</script>

<style scoped>
.filter-panel {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  padding: 15px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

label {
  font-size: 0.9rem;
  color: #333;
  font-weight: 500;
}

input[type="date"],
input[type="time"],
select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  font-family: "Lora", serif;
  transition: border-color 0.3s ease;
}

input[type="date"]:focus,
input[type="time"]:focus,
select:focus {
  outline: none;
  border-color: #d81b60;
  box-shadow: 0 0 5px rgba(216, 27, 96, 0.3);
}

.filter-btn {
  padding: 10px 20px;
  background-color: #d81b60;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.filter-btn:hover {
  background-color: #ad1457;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .filter-panel {
    flex-direction: column;
    padding: 10px;
  }

  .filter-group {
    width: 100%;
  }
}
</style>
