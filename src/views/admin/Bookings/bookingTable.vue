<!-- In your Appointments page -->
<template>
  <DataTable
    title="All Bookings"
    :columns="columns"
    :data="bookings"
    :page="page"
    ,
    :next-page="nextPage"
    :prev-page="prevPage"
    :total-pages="totalPages"
  >
    <!-- Custom cell rendering -->
    <template #cell-status="{ value }">
      <span class="status-badge" :class="getStatusClass(value)">
        {{ value }}
      </span>
    </template>

    <template #cell-amount="{ row }">
      <strong>KSh {{ row.toLocaleString() }}</strong>
    </template>

    <template #cell-date="{ row }">
      {{ formatDate(row.startTime) }}
    </template>

    <template #cell-time="{ row }">
      {{ formatTimeRange(row.startTime, row.endTime) }}
    </template>
  </DataTable>
</template>
<script setup>
import DataTable from "@/components/utility/dataTable.vue";
import { formatDate, formatTimeRange, getStatusClass } from "@/utils";

defineProps({
  bookings: {
    type: Array,
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
  page: {
    type: Number,
  },
});

const columns = [
  { key: "bookingCode", label: "booking code", width: "120px" },
  { key: "customerName", label: "Customer" },
  { key: "phone", label: "Phone" },
  { key: "technician", label: "Technician" },
  { key: "date", label: "Date" },
  { key: "time", label: "Time" },
  { key: "status", label: "Status" },
  { key: "price", label: "Amount" },
];
</script>
