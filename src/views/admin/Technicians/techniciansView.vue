<template>
  <div class="technicians-page">
    <div class="container">
      <TechnicianBar
        :total-technicians="technicianStore?.technicianStats?.totalTechnicians"
        :inactive-technicians="
          technicianStore?.technicianStats?.inactiveTechnicians
        "
        :active-technicians="
          technicianStore?.technicianStats?.activeTechnicians
        "
        :avg-exp="technicianStore?.technicianStats?.averageExperience"
      />
      <TechniciansTable
        :technicians="technicianStore.technicians"
        :columns="columns"
      />
    </div>
  </div>
</template>

<script setup>
import TechnicianBar from "./TechnicianBar.vue";
import TechniciansTable from "./TechniciansTable.vue";
import { useTechnicianStore } from "@/components/store/TechnicianStore.js";
const technicianStore = useTechnicianStore();

const columns = [
  { key: "name", label: "name" },
  { key: "yearsOfExperience", label: "experience" },
  { key: "email", label: "email" },
  { key: "phone", label: "phone number" },
  { key: "status", label: "status" },
];
</script>

<style scoped>
.technicians-page {
  background: var(--bg-dark);
  color: var(--text-light);
  min-height: 100vh;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
