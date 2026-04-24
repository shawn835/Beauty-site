import { ref } from "vue";
import { useToast } from "./useToast";
import { handleResponse } from "../utility/response";

const BASE = import.meta.env.VITE_API_URL;
export function useBooking() {
  const loading = ref(false);
  const { show } = useToast();

  const submitBooking = async (form, reset, startPolling, files) => {
    loading.value = true;
    try {
      const fd = new FormData();
      fd.append("date", form.date);
      fd.append("time", form.time);
      fd.append("technician", form.technician);
      fd.append("notes", form.notes);

      files.value.forEach((file) => {
        fd.append("custom", file);
      });

      if (form.services?.length) {
        form.services?.forEach((s) => fd.append("services[]", s));
      }

      if (form.subServiceIds?.length) {
        form.subServiceIds.forEach((id) => fd.append("subServiceIds[]", id));
      }

      const res = await fetch(`${BASE}/api/book`, {
        method: "POST",
        body: fd,
        credentials: "include",
      });

      const data = await handleResponse(res);

      show({ message: data.message, type: "success" });

      if (data.requiresPayment) startPolling(data.bookingCode);
      reset();
      return data;
    } catch (err) {
      show({ message: err.message || "Something went wrong!", type: "error" });
      console.error(err);
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
    } catch (error) {
      console.error("error fetching booking:", error);
    } finally {
      loading.value = false;
    }
  };

  //cancel booking
  const cancelBooking = async (bookingCode) => {
    loading.value = true;
    try {
      const res = await fetch(`${BASE}/api/bookings`, {
        credentials: "include",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingCode }),
      });
      const data = await handleResponse(res);
      return data;
    } catch (error) {
      console.error("error canceling booking:", error);
      throw error;
    } finally {
      loading.value = false;
    }
  };

  return { loading, submitBooking, fetchBookingById, cancelBooking };
}
