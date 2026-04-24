<!-- DataTable.vue -->
<template>
  <div class="table-container">
    <!-- Table Header / Title -->
    <div class="table-header" v-if="title">
      <h2>{{ title }}</h2>
      <slot name="header-actions"></slot>
    </div>

    <div class="table-wrapper">
      <table class="admin-table">
        <thead>
          <tr>
            <!-- Dynamic Headers -->
            <th
              v-for="(header, index) in headers"
              :key="index"
              :class="{ 'actions-col': index === headers.length - 1 }"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- Empty State -->
          <tr v-if="items.length === 0">
            <td :colspan="headers.length" class="empty-state">
              <p>No records found</p>
            </td>
          </tr>

          <!-- Data Rows -->
          <tr
            v-for="(item, rowIndex) in items"
            :key="rowIndex"
            class="data-row"
          >
            <!-- Dynamic Cells -->
            <td v-for="(header, colIndex) in headers" :key="colIndex">
              <!-- Last column = Actions -->
              <div v-if="colIndex === headers.length - 1" class="actions-cell">
                <slot name="actions" :item="item" :index="rowIndex"></slot>
              </div>

              <!-- Regular data cells -->
              <template v-else>
                <slot
                  :name="`column-${header.toLowerCase().replace(/\s+/g, '-')}`"
                  :item="item"
                  :value="item[header.toLowerCase()]"
                >
                  {{ getNestedValue(item, header) }}
                </slot>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Slot -->
    <div class="table-footer" v-if="showPagination">
      <slot name="pagination"></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  headers: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
  showPagination: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["row-click"]);

// Helper to handle nested values if needed (e.g. item.client.name)
const getNestedValue = (obj, key) => {
  if (!key) return "";
  const keys = key.toLowerCase().split(".");
  let value = obj;
  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) return "";
  }
  return value;
};
</script>

<style scoped>
.table-container {
  background: var(--bg-light);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  margin-bottom: 2rem;
}

.table-header {
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  background: var(--bg-dark);
  color: var(--text-light);
}

.table-header h2 {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
}

.table-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px; /* Forces horizontal scroll on small screens */
}

.admin-table thead {
  background: var(--bg-dark);
  color: var(--nav-links);
}

.admin-table th {
  padding: 1.1rem 1.2rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.admin-table th.actions-col {
  text-align: center;
  width: 140px;
}

.admin-table td {
  padding: 1.1rem 1.2rem;
  border-bottom: 1px solid #f0f0f0;
  vertical-align: middle;
  color: var(--text-dark);
}

.data-row {
  transition: background 0.2s ease;
}

.data-row:hover {
  background: #f9f6f2;
}

.actions-cell {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--dark-gray);
  font-size: 1.1rem;
}

.empty-state p {
  margin: 0;
}

/* Action Buttons inside table */
.actions-cell button,
.actions-cell .action-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 8px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.view-btn {
  background: #3498db;
  color: white;
}

.edit-btn {
  background: #f39c12;
  color: white;
}

.delete-btn {
  background: #e74c3c;
  color: white;
}

.action-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

/* Responsive Improvements */
@media (max-width: 768px) {
  .table-header {
    padding: 1.2rem 1rem;
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .admin-table th,
  .admin-table td {
    padding: 0.9rem 0.8rem;
    font-size: 0.9rem;
  }

  .actions-cell {
    flex-direction: column;
    gap: 6px;
  }

  .actions-cell button {
    width: 100%;
    justify-content: center;
  }
}
</style>
