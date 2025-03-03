export const bookService = (image) => {
  // local storage retrieve
  const storedData = JSON.parse(localStorage.getItem("bookingForm")) || {};
  if (!storedData.samples) storedData.samples = [];

  // Ensure both arrays exist
  storedData.services = storedData.services || [];
  storedData.galleryImages = storedData.galleryImages || [];

  // Add category if not already in services
  if (!storedData.services.includes(image.category)) {
    storedData.services.push(image.category);
  }

  // Add image URL to galleryImages
  if (!storedData.galleryImages.includes(image.image)) {
    storedData.galleryImages.push(image.image);
  }

  // Save updated data to local storage
  localStorage.setItem("bookingForm", JSON.stringify(storedData));
};
