import { ref } from "vue";
import { handleResponse } from "@/Utility/response";
import { mapBookingToFormData } from "@/Utility/utils";

const BASE = import.meta.env.VITE_API_URL;
export function useBooking() {
  const loading = ref(false);

  const createBooking = async (payload) => {
    loading.value = true;
    try {
      const fd = mapBookingToFormData(payload);

      console.log("payload", payload);

      const res = await fetch(`${BASE}/api/book`, {
        method: "POST",
        body: fd,
        credentials: "include",
      });

      const data = await handleResponse(res);
      return data;
    } finally {
      loading.value = false;
    }
  };

  //retry booking
  const retryPayment = async (id) => {
    loading.value = true;
    try {
      const res = await fetch(`${BASE}/bookings/${id}/retry-payment`, {
        credentials: "include",
        method: "POST",
      });

      const data = await handleResponse(res);
      return data;
    } finally {
      loading.value = false;
    }
  };

  //get booking details
  const fetchBookingById = async (bookingCode) => {
    loading.value = true;
    try {
      const res = await fetch(
        `${BASE}/api/bookings?bookingCode=${bookingCode}`,
        {
          credentials: "include",
        },
      );

      const data = await handleResponse(res);
      return data.booking;
    } finally {
      loading.value = false;
    }
  };

  //cancel booking
  const cancelBooking = async (bookingId) => {
    loading.value = true;
    try {
      const res = await fetch(`${BASE}/api/bookings`, {
        credentials: "include",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId }),
      });
      const data = await handleResponse(res);
      return data;
    } finally {
      loading.value = false;
    }
  };

  const downloadReceipt = async (bookingId) => {
    try {
      const res = await fetch(`${BASE}/api/receipt/${bookingId}`, {
        credentials: "include",
      });

      const data = await handleResponse(res);
      return data;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    createBooking,
    fetchBookingById,
    cancelBooking,
    downloadReceipt,
    retryPayment,
  };
}
