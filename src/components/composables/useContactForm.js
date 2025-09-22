import { ref } from "vue";
import { handleResponse } from "../utility/response";

export function useContactForm() {
  const loading = ref(false);

  const handleContactForm = async (formdata) => {
    loading.value = true;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contactus`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });

      const data = await handleResponse(res);
      return data;
    } catch (error) {
      console.error("Error submitting contact form:", error);
      throw error;
    } finally {
      loading.value = false;
    }
  };

  return { handleContactForm, loading };
}
