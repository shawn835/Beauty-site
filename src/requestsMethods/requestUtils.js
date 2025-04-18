// src/requestMethods/requestUtils.js
import { ref } from "vue";
import { validatePhoneNumber } from "./validation.js";
import { useToast } from "vue-toastification";
const apiUrl = import.meta.env.VITE_API_URL;
const toast = useToast();
export const showBookingCard = ref(false);

//min date
export const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

export const getCurrentTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0"); // Format hour as 2 digits
  const minutes = String(now.getMinutes()).padStart(2, "0"); // Format minutes as 2 digits

  // Return time in HH:mm format (24-hour format)
  return `${hours}:${minutes}`;
};

// src/utils/bookingUtils.js
export const validateFields = (bookingData) => {
  const errors = {};

  if (!bookingData.name) {
    errors.name = "Name is required.";
  }

  if (!validatePhoneNumber(bookingData.phone)) {
    errors.phone =
      "Invalid phone number. Use a Kenyan format like 07xxxxxxxx or +2547xxxxxxxx.";
  }

  if (!bookingData.date) {
    errors.date = "Date is required.";
  }

  if (!bookingData.time) {
    errors.time = "Time is required.";
  }

  if (!bookingData.services.length) {
    errors.services = "At least one service is required.";
  }

  if (!bookingData.technician) {
    errors.technician = "Technician is required.";
  }
  return errors;
};

// Get the duration of each service
export const getServiceDuration = (services) => {
  return services.reduce((acc, service) => {
    acc[service.category] = service.duration;
    return acc;
  }, {});
};

// Calculate the total duration based on selected services
export const calculateTotalDuration = (selectedServices, serviceDurations) => {
  return selectedServices.reduce((total, service) => {
    return total + (serviceDurations[service] || 0); // Fallback to 60 mins if undefined
  }, 0);
};

/* Booking details method */
export const bookingDetails = ref(null);

// Clear local storage
export const clearLocalStorage = () => {
  localStorage.removeItem("bookingForm");
};

export const uploadFileToServer = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${apiUrl}/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "File upload failed");
    }

    return data.url;
  } catch (error) {
    toast.error(error.message);
    return null;
  }
};

export const submitBooking = async (bookingData) => {
  const errors = validateFields(bookingData);

  if (Object.keys(errors).length > 0) {
    Object.values(errors).forEach((err) => toast.error(err));
    return;
  }

  // Convert samples to URLs
  const sampleUrls = bookingData.samples.map((sample) => sample.url);

  const payload = {
    name: bookingData.name,
    phone: bookingData.phone,
    date: bookingData.date,
    time: bookingData.time,
    duration: bookingData.duration,
    technician: bookingData.technician,
    galleryImages: bookingData.galleryImages,
    samples: sampleUrls,
    services: bookingData.services,
  };

  try {
    const response = await fetch(`${apiUrl}/online-bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || data.message || "Failed to submit booking."
      );
    }
    bookingDetails.value = data.booking;
    toast.success(data.success);
    clearLocalStorage();
  } catch (error) {
    toast.error("Booking failed: " + error.message);
    console.log("Error submitting booking:", error.message);
  }
};
