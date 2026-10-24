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
/* =========================================
   BOOKING FILTER PANEL STYLING
   ========================================= */
.filter-bar-container {
  background-color: var(--bg-light);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  padding: 1.25rem 1.5rem;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

.filter-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.filter-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-heading);
  margin: 0;
}

/* Filter Belt (Collapsible section) */
.filter-belt {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition:
    max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.25s ease,
    margin-top 0.3s ease;
  margin-top: 0;
}

.filter-belt.show {
  max-height: 1000px; /* Generous height allowance for transition */
  opacity: 1;
  margin-top: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--bg-grey);
}

/* Filters Grid Layout */
.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.filter-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--dark-gray);
}

/* Form Controls (Inputs & Selects) */
.filter-input {
  width: 100%;
  padding: 0.65rem 0.85rem;
  border-radius: 8px;
  border: 1px solid var(--bg-grey);
  background-color: #fafafa;
  color: var(--text-dark);
  font-size: 0.9rem;
  outline: none;
  transition: all 0.2s ease;
}

.filter-input:focus {
  border-color: var(--bg-pink);
  background-color: var(--bg-light);
  box-shadow: 0 0 0 3px rgba(216, 27, 96, 0.1);
}

/* Search input wrapper alignment */
.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  padding-right: 2.5rem;
}

.search-icon {
  position: absolute;
  right: 0.85rem;
  font-size: 0.9rem;
  pointer-events: none;
  opacity: 0.6;
}

/* Date Range Customization */
.date-range {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.date-separator {
  font-size: 0.85rem;
  color: var(--dark-gray);
  font-weight: 500;
  flex-shrink: 0;
}

/* Filter Action Buttons Layout */
.filter-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  padding-top: 0.5rem;
  border-top: 1px dashed rgba(0, 0, 0, 0.05);
}

/* =========================================
   MOBILE RESPONSIVENESS (Phones)
   ========================================= */
@media (max-width: 768px) {
  .filter-bar-container {
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 10px;
  }

  .filters-grid {
    grid-template-columns: 1fr; /* Full stack on mobile */
  }

  .date-range {
    flex-direction: column;
    align-items: stretch;
  }

  .date-separator {
    text-align: center;
  }

  .filter-actions {
    flex-direction: column-reverse; /* Stack buttons nicely, action button prominent on top */
    width: 100%;
  }

  .filter-actions :deep(button),
  .filter-actions button {
    width: 100%;
    justify-content: center;
  }
}
</style>
