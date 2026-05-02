<template>
  <div class="filter-bar-container">
    <div class="filter-header">
      <h2 class="filter-title">Filter Appointments</h2>
      <button
        class="toggle-btn"
        @click="showFilters = !showFilters"
        :class="{ active: showFilters }"
      >
        {{ showFilters ? "Hide Filters" : "Show Filters" }}
      </button>
    </div>

    <div class="filter-belt" :class="{ show: showFilters }">
      <div class="filters-grid">
        <!-- Search -->
        <div class="filter-group">
          <label>Search</label>
          <div class="search-input-wrapper">
            <input
              v-model="localFilters.search"
              type="text"
              placeholder="Client name, phone, or booking ID..."
              class="filter-input search-input"
            />
            <span class="search-icon">🔍</span>
          </div>
        </div>

        <!-- Date Range -->
        <div class="filter-group">
          <label>Date Range</label>
          <div class="date-range">
            <input
              v-model="localFilters.startDate"
              type="date"
              class="filter-input"
            />
            <span class="date-separator">to</span>
            <input
              v-model="localFilters.endDate"
              type="date"
              class="filter-input"
            />
          </div>
        </div>

        <!-- Technician -->
        <div class="filter-group">
          <label>Technician</label>
          <select
            v-model="localFilters.technicianId"
            class="filter-input"
            v-if="technicians && technicians.length > 0"
          >
            <option value="">All Technicians</option>
            <option
              v-for="tech in technicians"
              :key="tech.technician_id"
              :value="tech.technician_id"
            >
              {{ tech.name }}
            </option>
          </select>
        </div>

        <!-- Service -->
        <div class="filter-group">
          <label>Service</label>
          <select v-model="localFilters.serviceId" class="filter-input">
            <option value="">All Services</option>

            <option v-for="srv in services" :key="srv.id" :value="srv.id">
              {{ srv.name }}
            </option>
          </select>
        </div>

        <!-- Status -->
        <div class="filter-group">
          <label>Appointment Status</label>
          <select v-model="localFilters.status" class="filter-input">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <!-- Payment Status -->
        <div class="filter-group">
          <label>Payment Status</label>
          <select v-model="localFilters.paymentStatus" class="filter-input">
            <option value="">All Payments</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="filter-actions">
        <button @click="resetFilters" class="btn secondary-btn">
          Reset Filters
        </button>
        <button @click="applyFilters" class="btn primary-btn">
          Apply Filters
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  technicians: { type: Array, default: () => [] },
  services: { type: Array, default: () => [] },
  modelValue: { type: Object, required: true },
});

const emit = defineEmits(["update:modelValue", "apply"]);

const showFilters = ref(true);

const localFilters = ref({ ...props.modelValue });

// Sync with parent
watch(
  localFilters,
  (newVal) => {
    emit("update:modelValue", newVal);
  },
  { deep: true },
);

const applyFilters = () => {
  emit("apply", localFilters.value);
};

const resetFilters = () => {
  localFilters.value = {
    search: "",
    startDate: "",
    endDate: "",
    technicianId: "",
    serviceId: "",
    status: "",
    paymentStatus: "",
  };
  emit("apply", localFilters.value);
};
</script>

<style scoped>
.filter-bar-container {
  background: var(--bg-dark);
  color: var(--text-light);
  padding: 1.5rem 2rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
}

.filter-title {
  color: var(--text-light);
  font-size: 1.35rem;
  font-weight: 600;
  margin: 0;
}

.toggle-btn {
  background: transparent;
  border: 2px solid var(--primary-button-background);
  color: var(--primary-button-color);
  padding: 8px 16px;
  border-radius: 9999px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
}

.toggle-btn:hover,
.toggle-btn.active {
  background: var(--primary-button-background);
  color: var(--primary-button-color);
}

.filter-belt {
  display: none;
  flex-direction: column;
  gap: 1.8rem;
}

.filter-belt.show {
  display: flex;
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.4rem 2rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.filter-group label {
  font-weight: 600;
  color: var(--nav-links);
  font-size: 0.95rem;
}

.filter-input {
  background: var(--bg-dark);
  border: 1px solid rgba(245, 214, 152, 0.3);
  color: var(--text-light);
  padding: 12px 14px;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s;
}

.filter-input:focus {
  outline: none;
  border-color: var(--hover-color);
  box-shadow: 0 0 0 3px rgba(247, 103, 6, 0.2);
}

.search-input-wrapper {
  position: relative;
}

.search-input {
  padding-left: 45px;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--nav-links);
  font-size: 1.1rem;
}

.date-range {
  display: flex;
  align-items: center;
  gap: 12px;
}

.date-separator {
  color: var(--text-gray);
  font-weight: 500;
  white-space: nowrap;
}

.filter-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  min-width: 140px;
}

.primary-btn {
  background: var(--primary-button-background);
  color: var(--primary-button-color);
}

.primary-btn:hover {
  background: var(--hover-bg);
  color: var(--hover-color);
}

.secondary-btn {
  background: var(--secondary-button-background);
  color: var(--secondary-button-color);
}

.secondary-btn:hover {
  background: #f5d698dd;
}

/* Responsive */
@media (max-width: 768px) {
  .filter-bar-container {
    padding: 1.2rem 1rem;
  }

  .filters-grid {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }

  .filter-actions {
    justify-content: stretch;
  }

  .btn {
    flex: 1;
  }
}
</style>
