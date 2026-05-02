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
            @click="goToBooking(row.bookingCode)"
          >
            <td v-for="col in columns" :key="col.key">
              <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
                <!-- Default rendering -->
                {{ row[col.key] }}
              </slot>
            </td>
          </tr>

          <!-- Empty State -->
          <tr v-if="data.length === 0" class="empty-row">
            <td :colspan="columns.length" class="empty-state">
              No bookings found
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination controls -->
    <div class="pagination-controls" v-if="totalPages < 1">
      <Paginator
        :page="currentPage"
        :total-pages="totalPages"
        :next-page="nextPage"
        :prev-page="prevPage"
      />
    </div>
  </div>
</template>

<script setup>
import Paginator from "./Paginator.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goToBooking = (bookingCode) => {
  router.push(`/admin/bookings/${bookingCode}`);
};
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

  currentPage: {
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
  width: 100%;
  background: var(--bg-light);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.table-toolbar {
  padding: 20px 24px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.table-title {
  margin: 0;
  font-size: 1.4rem;
  color: var(--text-heading);
  font-weight: 600;
}

.table-wrapper {
  overflow-x: auto; /* Horizontal scroll on mobile */
  -webkit-overflow-scrolling: touch;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 900px; /* Forces horizontal scroll when needed */
}

.data-table thead {
  background: var(--bg-dark);
}

.data-table th {
  padding: 18px 16px;
  text-align: left;
  font-weight: 600;
  color: var(--text-light);
  font-size: 0.95rem;
  white-space: nowrap;
  border-bottom: 1px solid rgba(245, 214, 152, 0.2);
}

.data-table td {
  padding: 16px;
  border-bottom: 1px solid #f0e6e0;
  color: var(--text-dark);
  font-size: 0.97rem;
}

.table-row {
  transition: background 0.2s ease;
  cursor: pointer;
}

.table-row:hover {
  background: #fffaf5;
}

.table-row:last-child td {
  border-bottom: none;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 20px !important;
  color: var(--dark-gray);
  font-size: 1.1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .table-wrapper {
    max-height: 70vh;
  }

  .data-table th,
  .data-table td {
    padding: 14px 10px;
    font-size: 0.92rem;
  }
}
</style>
