import { ref } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/userStore";

export function useBooking() {
  const loading = ref(false);
  const toast = useToast();
  const error = ref(null);
  const userStore = useUserStore();

  const handleBooking = async (form) => {
    loading.value = true;
    error.value = null;

    try {
      const fd = new FormData();

      // simple fields
      fd.append("date", form.date);
      fd.append("time", form.time);
      fd.append("technician", form.staff);
      fd.append("notes", form.notes);
      // Services array
      if (Array.isArray(form.services) && form.services.length > 0) {
        form.services.forEach((s) => fd.append("services[]", s));
      }
      if (Array.isArray(form.gallery) && form.gallery.length > 0) {
        form.gallery.forEach((url) => fd.append("gallery[]", url));
      }
      if (Array.isArray(form.custom) && form.custom.length > 0) {
        form.custom.forEach((file) => fd.append("custom[]", file));
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings`, {
        method: "POST",
        body: fd,
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        // prefer backend error if present
        throw new Error(
          data.error || data.message || "Failed to create booking"
        );
      }

      toast.success(data.message || "Booking created successfully!");
      return data;
    } catch (err) {
      error.value = err.message;
      console.log(err.stack);

      toast.error(err.message);
    } finally {
      loading.value = false;
    }
  };

  return { handleBooking };
}
