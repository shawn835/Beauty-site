<!-- In your Appointments page -->
<template>
  <dataTable
    title="All Appointments"
    :headers="[
      'bookingId', 
      'name',
      'Date',
      'date',
      'service',
      'technician',
      'bookingstatus',
      'Actions',
    ]"
    :items="bookings"
  >
    <!-- Custom column slots (optional) -->
    <template #column-status="{ item }">
      <span class="status-badge" :class="item.status">
        {{ item.status }}
      </span>
    </template>

    <template #column-payment="{ item }">
      <span class="payment-badge" :class="item.paymentStatus">
        {{ item.paymentStatus }}
      </span>
    </template>

    <!-- Actions Column -->
    <template #actions="{ item }">
      <button class="action-btn view-btn" @click="viewAppointment(item)">
        View
      </button>
      <button class="action-btn edit-btn" @click="editAppointment(item)">
        Edit
      </button>
      <button class="action-btn delete-btn" @click="deleteAppointment(item)">
        Delete
      </button>
    </template>

    <!-- Optional header actions (Export, Add new, etc.) -->
    <template #header-actions>
      <button class="export-btn">Export to CSV</button>
    </template>
  </dataTable>
</template>

<script setup>
import { ref, computed } from "vue";
import dataTable from "@/components/utility/dataTable.vue";
import { useApi } from "@/components/composables/useFetch";

const url = ref(`${import.meta.env.VITE_API_URL}/api/allbookings`);

const { data, loading, page, totalPages, nextPage, prevPage, fetchData } =
  useApi(url, {
    perPage: 8,
    withCredentials: true,
  });

const bookings = computed(() => data.value?.bookings || []);
</script>
