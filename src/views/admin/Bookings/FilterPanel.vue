<template>
  <div class="filter-bar-container">
    <div class="filter-header">
      <h2 class="filter-title">Filter Appointments</h2>

      <BaseButton
        :label="showFilters ? 'Hide Filters' : 'Show Filters'"
        @click="showFilters = !showFilters"
        variant="warning"
        size="small"
      />
    </div>

    <div :class="{ show: showFilters }" class="filter-belt">
      <div class="filters-grid">
        <!-- Search -->
        <div class="filter-group">
          <label for="search">Search</label>

          <div class="search-input-wrapper">
            <input
              id="search"
              v-model.trim="localFilters.search"
              type="text"
              class="filter-input search-input"
              placeholder="Client name, phone or booking ID..."
              @keyup.enter="applyFilters"
            />

            <span class="search-icon">🔍</span>
          </div>
        </div>

        <!-- Technician -->
        <div class="filter-group">
          <label for="technician">Technician</label>

          <select
            id="technician"
            v-model="localFilters.technicianId"
            class="filter-input"
          >
            <option value="">All Technicians</option>

            <option
              v-for="tech in technicians"
              :key="tech.technicianId"
              :value="tech.technicianId"
            >
              {{ tech.name }}
            </option>
          </select>
        </div>

        <!-- Dynamic Select Filters -->
        <div
          v-for="group in filterGroups"
          :key="group.modelKey"
          class="filter-group"
        >
          <label :for="group.modelKey">
            {{ group.label }}
          </label>

          <select
            :id="group.modelKey"
            v-model="localFilters[group.modelKey]"
            class="filter-input"
          >
            <option value="">
              {{ group.defaultOption }}
            </option>

            <option
              v-for="option in group.options"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
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

      <div class="filter-actions">
        <BaseButton
          label="Reset Filters"
          variant="warning"
          @click="resetFilters"
          :disabled="loading || !hasActiveFilters"
        />

        <BaseButton
          label="Search"
          variant="success"
          @click="applyFilters"
          :disabled="loading"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, toRef, watch, computed } from "vue";
import { useDebounce } from "@/components/composables/useDebounce";
import BaseButton from "@/components/BaseButton.vue";
const props = defineProps({
  technicians: {
    type: Array,
    default: () => [],
  },
  services: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["apply"]);

const showFilters = ref(true);

const defaultFilters = {
  search: "",
  startDate: "",
  endDate: "",
  technicianId: "",
  status: "",
  paymentStatus: "",
};

const localFilters = reactive({ ...defaultFilters });

const debouncedSearch = useDebounce(toRef(localFilters, "search"), 400);

watch(debouncedSearch, () => {
  emit("apply", { ...localFilters });
});

const applyFilters = () => {
  emit("apply", { ...localFilters });
};

const resetFilters = () => {
  Object.assign(localFilters, defaultFilters);

  emit("apply", { ...localFilters });
};

const hasActiveFilters = computed(() => {
  return Object.values(localFilters).some(
    (value) => value !== "" && value !== null,
  );
});

const filterGroups = [
  {
    label: "Appointment Status",
    modelKey: "status", // Matches localFilters.status
    defaultOption: "All Status",
    options: [
      { value: "pending", label: "Pending" },
      { value: "confirmed", label: "Confirmed" },
      { value: "completed", label: "Completed" },
      { value: "cancelled", label: "Cancelled" },
    ],
  },
  {
    label: "Payment Status",
    modelKey: "paymentStatus", // Matches localFilters.paymentStatus
    defaultOption: "All Payments",
    options: [
      { value: "paid", label: "Paid" },
      { value: "pending", label: "Pending" },
      { value: "partial", label: "partial" },
      { value: "failed", label: "Failed" },
    ],
  },
];
</script>

<style scoped>
.filter-bar-container {
  background: var(--bg-dark);
  color: var(--text-light);
  padding: 0.5rem 0.9rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin-bottom: 1.2rem; */
}

.filter-title {
  color: var(--text-light);
  font-size: 1.35rem;
  font-weight: 600;
  margin: 0;
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
}
</style>
