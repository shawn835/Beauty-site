<template>
  <!-- HEADER -->
  <header class="page-header">
    <div class="container">
      <h1 class="page-title">Technicians</h1>
      <BaseButton
        label="+ technician"
        variant="warning"
        full-width
        @click="showCreateModal = true"
      />
    </div>
  </header>

  <!-- STATS -->
  <div class="stats-row">
    <div class="stat-card">
      <p class="stat-label">Total Technicians</p>
      <h3 class="stat-value">{{ totalTechnicians }}</h3>
    </div>
    <div class="stat-card">
      <p class="stat-label">Active</p>
      <h3 class="stat-value active">{{ activeTechnicians }}</h3>
    </div>
    <div class="stat-card">
      <p class="stat-label">Inactive</p>
      <h3 class="stat-value">{{ inactiveTechnicians }}</h3>
    </div>
    <div class="stat-card">
      <p class="stat-label">Avg Experience</p>
      <h3 class="stat-value">{{ avgExp }} yrs</h3>
    </div>
  </div>

  <!-- FILTERS & SEARCH -->
  <div class="toolbar">
    <div class="search-box">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search technicians..."
        class="search-input"
      />
    </div>

    <select v-model="selectedStatus" class="filter-select">
      <option :value="status.key" v-for="status in statuses" :key="status.key">
        {{ status.label }}
      </option>
    </select>
  </div>

  <!-- Modal -->
  <CreateTechnicianModal
    v-if="showCreateModal"
    @close="showCreateModal = false"
  />
</template>

<script setup>
import { ref } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import CreateTechnicianModal from "./CreateTechnicianModal.vue";

const showCreateModal = ref(false);
defineProps({
  totalTechnicians: {
    type: String,
    required: true,
  },
  activeTechnicians: {
    type: String,
    required: true,
  },
  inactiveTechnicians: {
    type: String,
    required: true,
  },
  avgExp: {
    type: String,
    required: true,
  },
});

const statuses = [
  { key: "active", label: "active" },
  { key: "inactive", label: "inactive" },
];
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2.6rem;
  color: var(--nav-links);
}

.add-btn {
  background: var(--nav-links);
  color: #2e3538;
  padding: 0.9rem 1.8rem;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.08);
  padding: 1.5rem;
  border-radius: 16px;
}

.stat-label {
  color: #aaa;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 2.2rem;
  font-weight: 700;
}

.stat-value.active {
  color: #4ade80;
}

/* Toolbar */
.toolbar {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.search-input {
  padding: 0.9rem 1.2rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: white;
  width: 320px;
}

.filter-select {
  padding: 0.9rem 1.2rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.15);
}
</style>
