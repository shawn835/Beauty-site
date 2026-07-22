<template>
  <div class="table-container">
    <!-- Table Header / Toolbar -->
    <div class="table-toolbar">
      <slot name="toolbar">
        <h2 class="table-title">{{ title }}</h2>
      </slot>
    </div>

    <div class="table-wrapper">
      <table class="data-table">
        <thead>
          <tr>
            <th
              v-for="col in columns"
              :key="col.key"
              :style="{ width: col.width }"
            >
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in data"
            :key="index"
            class="table-row"
            @click="$emit('navigate', row)"
          >
            <td v-for="col in columns" :key="col.key">
              <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
                {{ row[col.key] }}
              </slot>
            </td>
          </tr>

          <!-- Empty State -->
          <tr v-if="data.length === 0" class="empty-row">
            <td :colspan="columns.length" class="empty-state">
              No {{ title }} found
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="pagination-controls" v-if="totalPages > 1">
      <Paginator
        :page="page"
        :total-pages="totalPages"
        :next-page="nextPage"
        :prev-page="prevPage"
      />
    </div>
  </div>
</template>

<script setup>
import Paginator from "./Paginator.vue";

defineEmits(["edit", "toggle-status"]);

const props = defineProps({
  title: {
    type: String,
    default: "Bookings",
  },
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    default: () => [],
  },

  page: {
    type: Number,
  },
  totalPages: {
    type: Number,
  },

  nextPage: {
    type: Function,
  },

  prevPage: {
    type: Function,
  },
});
</script>

<style scoped>
.table-container {
  background: #2e3538; /* --bg-dark */
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.table-toolbar {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.table-title {
  margin: 0;
  color: #f5d698;
  font-size: 1.55rem;
  font-weight: 600;
}

/* Table Wrapper */
.table-wrapper {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  color: #e5e7eb;
}

.data-table th {
  background: rgba(0, 0, 0, 0.25);
  text-align: left;
  padding: 1.1rem 1.5rem;
  font-weight: 600;
  color: #d1d5db;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid rgba(245, 214, 152, 0.2);
}

.data-table td {
  padding: 1.1rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  vertical-align: middle;
}

/* Row Hover */
.table-row {
  transition: all 0.2s ease;
  cursor: pointer;
}

.table-row:hover {
  background: rgba(245, 214, 152, 0.08);
  transform: translateX(4px);
}

/* Empty State */
.empty-row .empty-state {
  padding: 4rem 2rem;
  text-align: center;
  color: #9ca3af;
  font-size: 1.1rem;
  background: rgba(0, 0, 0, 0.2);
}

/* Pagination */
.pagination-controls {
  padding: 1.2rem 2rem;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
}

/* Responsive */
@media (max-width: 768px) {
  .data-table th,
  .data-table td {
    padding: 1rem 0.9rem;
    font-size: 0.95rem;
  }
}
</style>
