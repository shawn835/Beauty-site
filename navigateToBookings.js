export const bookService = (image) => {
  // Retrieve existing form data or initialize an empty object
  const storedData = JSON.parse(localStorage.getItem("bookingForm")) || {};

  // Ensure `services` and `galleryImages` arrays exist
  storedData.services = storedData.services || [];
  storedData.galleryImages = storedData.galleryImages || [];

  // Add category if not already in services
  if (!storedData.services.includes(image.category)) {
    storedData.services.push(image.category);
  }

  // Add image URL to galleryImages
  storedData.galleryImages.push(image.image);

  // Save updated data to local storage
  localStorage.setItem("bookingForm", JSON.stringify(storedData));
};
