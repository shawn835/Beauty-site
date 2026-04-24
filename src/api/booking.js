// /api/bookings.js
const BASE = import.meta.env.VITE_API_URL;
import { handleResponse } from "@/components/utility/response";

export const postBooking = async (formData) => {
  const res = await fetch(`${BASE}/api/book`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  return handleResponse(res);
};

export const cancelBookingAPI = async (bookingId) => {
  const res = await fetch(`${BASE}/api/cancel/booking`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: { bookingId: bookingId },
  });

  return handleResponse(res);
};

export const getBookingById = async (bookingId) => {
  const res = await fetch(`${BASE}/api/bookings?bookingId=${bookingId}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  const data = await handleResponse(res);
  return data.booking;
};
