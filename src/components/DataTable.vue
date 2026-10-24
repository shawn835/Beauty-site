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
  background-color: var(--bg-light);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.table-toolbar {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--bg-grey);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.table-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-heading);
  margin: 0;
}

/* Wrapper for desktop horizontal overflow safety */
.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.9rem;
  color: var(--text-dark);
}

.data-table th {
  background-color: #fafbfc;
  color: var(--dark-gray);
  font-weight: 600;
  padding: 0.85rem 1rem;
  border-bottom: 1px solid var(--bg-grey);
  white-space: nowrap;
}

.data-table td {
  padding: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  vertical-align: middle;
}

.table-row {
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.table-row:hover {
  background-color: rgba(216, 27, 96, 0.02); /* Soft pink hover tint */
}

.table-row:last-child td {
  border-bottom: none;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--dark-gray);
  font-weight: 500;
  font-style: italic;
}

/* Pagination Footer */
.pagination-controls {
  padding: 1rem 1.5rem;
  background-color: #fafbfc;
  border-top: 1px solid var(--bg-grey);
  display: flex;
  justify-content: flex-end;
}

/* =========================================
   MOBILE RESPONSIVENESS (Card Transformation)
   ========================================= */
@media (max-width: 768px) {
  .table-toolbar {
    padding: 1rem;
  }

  /* Hide traditional table headers on mobile */
  .data-table thead {
    display: none;
  }

  .data-table,
  .data-table tbody,
  .data-table tr,
  .data-table td {
    display: block;
    width: 100%;
  }

  /* Transform each row into a gorgeous separated card */
  .table-row {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin: 0.75rem 1rem;
    background: #ffffff;
    border: 1px solid var(--bg-grey);
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
    cursor: pointer;
  }

  .table-row:hover {
    background-color: #ffffff;
    border-color: var(--bg-pink);
  }

  .data-table td {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.04);
    text-align: right;
  }

  .data-table td:last-child {
    border-bottom: none;
  }

  .pagination-controls {
    justify-content: center;
    padding: 0.75rem 1rem;
  }
}
</style>
