import { handleResponse } from "@/Utility/response";
import { ref } from "vue";
const BASE_URL = import.meta.env.VITE_API_URL;
import { delay, mapBookingToFormData } from "@/Utility/utils";
import { useFileUpload } from "./useFileUpload";
const { files } = useFileUpload();

export const useServiceApi = () => {
  const loading = ref(false);

  const createService = async (service) => {
    loading.value = true;
    try {
      await delay(800);

      const res = await fetch(`${BASE_URL}/api/admin/service`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(service),
      });

      const data = await handleResponse(res);

      return data;
    } finally {
      loading.value = false;
    }
  };

  const createSubService = async (subService) => {
    loading.value = true;
    try {
      await delay(800);

      const fd = mapBookingToFormData(subService);

      const res = await fetch(`${BASE_URL}/api/admin/subservice`, {
        method: "POST",
        body: fd,
        credentials: "include",
      });

      const data = await handleResponse(res);

      return data;
    } finally {
      loading.value = false;
    }
  };

  return { createService, createSubService, loading };
};
