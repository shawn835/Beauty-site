import { useToast } from "vue-toastification";
const apiUrl = import.meta.env.VITE_API_URL;
const toast = useToast();

export const fetchBookings = async () => {
  try {
    const response = await fetch(`${apiUrl}/admin/bookings`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Unable to fetch blogs");
    }
    let data = await response.json();

    return (data = data.map((booking) => ({
      ...booking,
      imagePaths: booking.imagePaths.map((img) =>
        img.startsWith("/BookingSamplesImages/") ? `${apiUrl}${img}` : img
      ),
    })));
  } catch (error) {
    toast.error(error?.message || "Server error");
    return [];
  }
};
