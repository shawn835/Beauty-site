// src/requestMethods/requestUtils.js
import { watch, ref, onMounted, computed } from "vue";
import { getSelectedImageAndCategory } from "@/navigateToBooking.js";
import { validatePhoneNumber } from "./validation.js";
import { selectedImage, selectedCategory } from "@/navigateToBooking.js";
import { useToast } from "vue-toastification";
const apiUrl = import.meta.env.VITE_API_URL;

const toast = useToast();
export const showBookingCard = ref(false);

export const isGallerySelection = ref(false);
const saveBookingData = (bookingData) => {
  localStorage.setItem("bookingData", JSON.stringify(bookingData));
};

export const initializeBookingForm = (bookingData) => {
  onMounted(() => {
    const savedData = JSON.parse(localStorage.getItem("bookingData"));

    if (savedData) {
      //ensure arrays exist
      // savedData.samples = savedData.samples || [];
      savedData.samplePreviews = savedData.samplePreviews || [];

      Object.assign(bookingData.value, savedData);
    }

    //restore gallery images on page load
    const selectedData = getSelectedImageAndCategory();
    if (selectedData.imagePath && selectedData.category) {
      updateBookingWithGallerySelection(selectedData, bookingData);
    }
  });

  //  for gallery selections
  watch(
    () => getSelectedImageAndCategory(),
    (selectedData) => {
      if (selectedData.imagePath && selectedData.category) {
        updateBookingWithGallerySelection(selectedData, bookingData);
      }
    },
    { immediate: true }
  );

  watch(
    bookingData,
    (newData) => {
      const dataToStore = {
        ...newData,
        samples: newData.samples.map((file) => ({
          name: file.name,
          type: file.type,
        })),
        samplePreviews: [...newData.samplePreviews], // 🛠 Ensure gallery previews persist
      };

      localStorage.setItem("bookingData", JSON.stringify(dataToStore));
    },
    { deep: true }
  );
};

const updateBookingWithGallerySelection = async (
  { category, imagePath },
  bookingData
) => {
  if (!Array.isArray(bookingData.value.samplePreviews)) {
    bookingData.value.samplePreviews = []; // Ensure samplePreviews is initialized
  }
  // Ensure arrays exist
  bookingData.value.services = bookingData.value.services || [];
  bookingData.value.galleryImages = bookingData.value.galleryImages || [];

  // Add category if not already selected
  if (!bookingData.value.services.includes(category)) {
    bookingData.value.services.push(category);
  }

  // Store image path instead of converting to a File
  if (!bookingData.value.galleryImages.includes(imagePath)) {
    bookingData.value.galleryImages.push(imagePath);
  }

  if (!bookingData.value.samplePreviews.includes(imagePath)) {
    bookingData.value.samplePreviews.push(imagePath);
    toast.success("Gallery image added!");
  } else {
    toast.success("Gallery image already exists:", imagePath);
  }

  // Save updated booking data to localStorage
  saveBookingData(bookingData.value);
};

export const resetGallerySelection = () => {
  isGallerySelection.value = false;
};

///file upload
export const handleFileUpload = (event, bookingData, toast) => {
  const files = Array.from(event.target.files);

  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  const maxFileSize = 5 * 1024 * 1024; // 5MB

  const invalidFiles = files.filter(
    (file) => file.size > maxFileSize || !allowedTypes.includes(file.type)
  );

  if (invalidFiles.length > 0) {
    toast.error("Only JPG, PNG, and GIF files under 5MB are allowed.");
    event.target.value = null;
    return;
  }

  // new files without overwriting
  bookingData.samples.push(...files);

  //  Create previews
  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      bookingData.samplePreviews.push(e.target.result);
      saveBookingData(bookingData); // everything after updating
    };
    reader.readAsDataURL(file);
  });
};

export const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

// Compute minTime dynamically based on selectedDate
export const minTime = computed((selectedDate) => {
  const todayDate = getTodayDate();
  const now = new Date();

  // If today is selected, limit time to the current hour or later
  if (selectedDate === todayDate) {
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  // If another date is selected, allow any time
  return "00:00";
});

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

  if (!bookingData.email || !/\S+@\S+\.\S+/.test(bookingData.email)) {
    errors.email = "Valid email is required.";
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
    return total + (serviceDurations[service] || 60); // Fallback to 60 mins if undefined
  }, 0);
};

/* booking details method*/
export const bookingDetails = ref(null);

export const submitBooking = async (bookingData, toast, fileInput) => {
  const errors = validateFields(bookingData);

  if (Object.keys(errors).length > 0) {
    Object.values(errors).forEach((err) => toast.error(err));
    return;
  }

  try {
    // Use FormData for file upload
    const bookingFormData = new FormData();

    Object.entries(bookingData).forEach(([key, value]) => {
      if (key === "samples" && Array.isArray(value)) {
        value.forEach((file) => {
          if (file instanceof File) {
            bookingFormData.append("samples", file);
          }
        });
      } else if (key === "galleryImages") {
        //gallery images a json string
        bookingFormData.append(key, JSON.stringify(value));
      } else if (Array.isArray(value)) {
        //other arrays
        bookingFormData.append(key, JSON.stringify(value));
      } else if (value !== null && value !== undefined) {
        //  other fields
        bookingFormData.append(key, value);
      }
    });

    // Submit the form data
    const response = await fetch(`${apiUrl}/online-bookings`, {
      method: "POST",
      body: bookingFormData,
    });

    const data = await response.json();
    bookingDetails.value = data.booking;

    if (response.ok) {
      toast.success(data.success);

      // Reset form
      Object.assign(bookingData, {
        name: "",
        phone: "",
        date: "",
        time: "",
        services: [],
        technician: "",
        email: "",
        samples: [],
        samplePreviews: [],
        galleryImages: [],
        duration: 0,
      });

      // Clear file input field
      if (fileInput.value) {
        fileInput.value.value = "";
      }

      // Clear localStorage
      localStorage.removeItem("bookingData");

      // Reset gallery selection
      selectedCategory.value = null;
      selectedImage.value = null;
    } else {
      toast.error(data.error || "Failed to submit booking.");
      return false;
    }
  } catch (error) {
    toast.error("Booking failed: " + error.message);
  }
};
