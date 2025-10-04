import { ref } from "vue";
import { handleResponse } from "../utility/response";

export function useBooking() {
  const loading = ref(false);

  // post booking
  const handleBooking = async (form) => {
    loading.value = true;

    try {
      const fd = new FormData();

      // simple fields
      fd.append("date", form.date);
      fd.append("time", form.time);
      fd.append("technician", form.staff);
      fd.append("notes", form.notes);
      // Services array

      if (form.gallery.length === 0) {
        //to avoid services duplication
        if (Array.isArray(form.services) && form.services.length > 0) {
          form.services.forEach((s) => fd.append("services[]", s));
        }
      }

      form.gallery.forEach((item) =>
        fd.append("gallery[]", JSON.stringify(item))
      );

      if (Array.isArray(form.custom) && form.custom.length > 0) {
        form.custom.forEach((file) => fd.append("custom[]", file));
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings`, {
        method: "POST",
        body: fd,
        credentials: "include",
      });

      const data = await handleResponse(res);
      return data;
    } catch (err) {
      console.log(err.stack);
      loading.value = false;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // cancel booking
  const cancelBooking = async (bookingId) => {
    loading.value = true;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/bookings/${bookingId}/cancel`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await handleResponse(res);

      return data;
    } catch (error) {
      console.log(error.stack);
      loading.value = false;
      throw error;
    } finally {
      loading.value = false;
    }
  };

  // fetch booking by id
  const fetchBookingById = async (bookingId) => {
    loading.value = true;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/bookings/${bookingId}`,
        {
          credentials: "include",
        }
      );

      const data = await handleResponse(res);

      return data.booking;
    } catch (error) {
      console.error("something went wrong", err);
      loading.value = false;
      throw error;
    } finally {
      loading.value = false;
    }
  };

  return { handleBooking, cancelBooking, fetchBookingById, loading };
}
