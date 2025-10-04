import { ref } from "vue";
import { handleResponse } from "../utility/response";
import { reactive } from "vue";

export const useAdmin = () => {
  const loadingStates = reactive({});
  const loading = ref(false);

  const toggleStatus = async (srv) => {
    const prevStatus = srv.subservice.status;
    srv.subservice.status = prevStatus === "active" ? "inactive" : "active";

    const id = srv.subservice.subserviceId;
    loadingStates[id] = true;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/services/${
          srv.subservice.subserviceId
        }/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: srv.subservice.status }),
          credentials: "include",
        }
      );

      const data = await handleResponse(res);
      return data;
    } catch (err) {
      console.error("Failed to update status", err);
      srv.subservice.status = prevStatus;
      loadingStates[id] = false;
      throw err;
    } finally {
      setTimeout(() => {
        loadingStates[id] = false;
      }, 500);
    }
  };

  const markComplete = async (booking) => {
    loading.value = false;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/bookings/${
          booking.bookingId
        }/markcomplete`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookingStatus: booking.bookingStatus }),
          credentials: "include",
        }
      );

      const data = await handleResponse(res);
      return data;
    } catch (err) {
      console.error("Failed to mark as complete", err);
      loading.value = false;
      throw err;
    } finally {
      setTimeout(() => {
        loading.value = false;
      }, 500);
    }
  };

  return { loadingStates, toggleStatus, markComplete, loading };
};
