<template>
  <div class="admin-bookings-container">
    <h1 class="page-title">Admin Booking Management</h1>
    <p class="page-subtitle">Manage and oversee all booking activities</p>

    <FilterPanel
      :filters="filters"
      @applyFilters="applyFilters"
      @search="onSearch" />

    <BookingsTable
      :bookings="bookings"
      @openDetails="openDetails"
      @openCustomerInfo="openCustomerInfo"
      @reschedule="rescheduleBooking"
      @cancel="cancelBooking"
      @complete="markCompleted"
      @updatePayment="updatePayment" />

    <BookingModal
      v-if="selectedBooking"
      :booking="selectedBooking"
      :modalType="modalType"
      v-model:rescheduleDate="rescheduleDate"
      v-model:rescheduleTime="rescheduleTime"
      v-model:paymentStatus="paymentStatus"
      v-model:refundOption="refundOption"
      :paymentStatuses="paymentStatuses"
      @close="closeModal"
      @confirmReschedule="confirmReschedule"
      @confirmCancel="confirmCancel"
      @confirmPaymentUpdate="confirmPaymentUpdate" />
  </div>
</template>

<script setup>
import { ref, computed, reactive, watch } from "vue";
import { formatDate } from "@/utils";
import FilterPanel from "./FilterPanel.vue";
import BookingsTable from "./BookingsTable.vue";
import BookingModal from "./BookingModal.vue";
import { useApi } from "@/components/composables/useFetch";

const filters = reactive({
  dateFrom: "",
  dateTo: "",
  bookingStatus: "",
  technician: "",
  serviceType: "",
  search: "",
});

const url = ref(`${import.meta.env.VITE_API_URL}/api/admin/allbookings`);

const { data, loading, page, totalPages, nextPage, prevPage, fetchData } =
  useApi(url, {
    perPage: 8,
    withCredentials: true,
  });

const bookings = computed(() => data.value?.bookings || []);

// Button trigger
const applyFilters = async () => {
  const query = new URLSearchParams();

  if (filters.dateFrom && filters.dateTo) {
    query.append("startDate", filters.dateFrom);
    query.append("endDate", filters.dateTo);
  }
  if (filters.bookingStatus) {
    query.append("status", filters.bookingStatus);
  }
  if (filters.technician) {
    query.append("technician", filters.technician);
  }

  console.log(query);

  // update the url used by useApi
  url.value = `${import.meta.env.VITE_API_URL}/api/admin/allbookings?${query}`;

  // now fetch with the new url
  await fetchData();
};

let searchTimeout;
const onSearch = (term) => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    filters.search = term.trim();
  }, 500);
};

// ================== MODAL LOGIC ==================
const selectedBooking = ref(null);
const modalType = ref("");
const rescheduleDate = ref("");
const rescheduleTime = ref("");
const paymentStatus = ref("");
const refundOption = ref(false);

const paymentStatuses = ["Paid", "Pending", "Refunded"];

const openDetails = (booking) => {
  selectedBooking.value = { ...booking };
  modalType.value = "Booking";
};

const openCustomerInfo = (booking) => {
  selectedBooking.value = { ...booking };
  modalType.value = "Customer";
};

const rescheduleBooking = (booking) => {
  selectedBooking.value = { ...booking };
  modalType.value = "Reschedule";
  rescheduleDate.value = booking.date;
  rescheduleTime.value = booking.time;
};

const confirmReschedule = () => {
  selectedBooking.value.date = rescheduleDate.value;
  selectedBooking.value.time = rescheduleTime.value;
  alert(
    `Booking rescheduled to ${formatDate(rescheduleDate.value)} at ${
      rescheduleTime.value
    }`
  );
  closeModal();
};

const cancelBooking = (booking) => {
  selectedBooking.value = { ...booking };
  modalType.value = "Cancel";
};

const confirmCancel = () => {
  selectedBooking.value.bookingStatus = "Cancelled";
  if (refundOption.value) {
    selectedBooking.value.paymentStatus = "Refunded";
    alert("Booking cancelled and refunded!");
  } else {
    alert("Booking cancelled!");
  }
  closeModal();
};

const markCompleted = (booking) => {
  booking.bookingStatus = "Completed";
  alert("Booking marked complete!");
};

const updatePayment = (booking) => {
  selectedBooking.value = { ...booking };
  modalType.value = "Payment";
};

const confirmPaymentUpdate = () => {
  selectedBooking.value.paymentStatus = paymentStatus.value;
  alert(`Payment updated to ${paymentStatus.value}`);
  closeModal();
};

const closeModal = () => {
  selectedBooking.value = null;
  modalType.value = "";
  rescheduleDate.value = "";
  rescheduleTime.value = "";
  paymentStatus.value = "";
  refundOption.value = false;
};
</script>

<style scoped>
.admin-bookings-container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
  background: linear-gradient(135deg, #fff5f7 0%, #ffe4e1 100%);
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  font-family: "Lora", serif;
}

.page-title {
  font-family: "Playfair Display", serif;
  font-size: 2.5rem;
  color: #d81b60;
  margin-bottom: 10px;
  text-align: center;
}

@media (max-width: 768px) {
  .admin-bookings-container {
    margin: 20px;
    padding: 10px;
  }
}
</style>
