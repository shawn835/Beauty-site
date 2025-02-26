import { ref } from "vue";
import { useToast } from "vue-toastification";

export const selectedImage = ref(null); // ✅ Exported
export const selectedCategory = ref(null); // ✅ Exported

export function navigateToBookings(router, imagePath, category) {
  const toast = useToast();

  if (!imagePath || !category) {
    toast.error(
      "Image URL and category are required to navigate to the booking page."
    );
    return;
  }

  selectedImage.value = imagePath;
  selectedCategory.value = category;

  router.push("/online-bookings");
}

export const getSelectedImageAndCategory = () => ({
  imagePath: selectedImage.value,
  category: selectedCategory.value,
});
