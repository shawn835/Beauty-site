<template>
  <div class="admin-bookings-container">
    <!-- <h1 class="page-title">Admin Booking Management</h1>
    <p class="page-subtitle">Manage and oversee all booking activities</p> -->

    <BookingBar
      v-model="filters"
      :technicians="appStore.technicians"
      :services="appStore.services"
      @apply="applyFilters"
    />

    <!-- Your appointments table below -->

    <bookingTable :bookings="bookings" />
  </div>
</template>

<script setup>
import { ref, computed, reactive, watch, onMounted } from "vue";
import { formatDate } from "@/utils";
import BookingBar from "./BookingBar.vue";
import bookingTable from "./bookingTable.vue";
import { useApi } from "@/components/composables/useFetch";
import { useAppStore } from "@/components/store/appStore";

const appStore = useAppStore();

const filters = reactive({
  search: "",
  startDate: "",
  endDate: "",
  technician: "",
  service: "",
  status: "",
  paymentStatus: "",
});

// const applyFilters = (newFilters) => {
//   // Fetch data with these filters
//   console.log("Applying filters:", newFilters);
//   // Call your API here
// };

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
    }`,
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
