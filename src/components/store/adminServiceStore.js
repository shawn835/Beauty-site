import { defineStore } from "pinia";
import { ref } from "vue";
import { handleResponse } from "@/Utility/response";
import { mapBookingToFormData } from "@/Utility/utils";

export const useAdminServiceStore = defineStore("adminService", () => {
  const subServices = ref([]);
  const selectedSubService = ref(null);

  const isLoadingList = ref(false);
  const isLoadingDetails = ref(false);
  const isDeleting = ref(false);
  const isSaving = ref(false);
  const isUploading = ref(false);

  //get sub services
  const fetchSubServices = async () => {
    isLoadingList.value = true;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/services`,
        {
          credentials: "include",
        },
      );

      const data = await handleResponse(res);
      subServices.value = data.services;
    } catch (err) {
      console.error("Error fetching sub-services:", err);
    } finally {
      isLoadingList.value = false;
    }
  };

  const fetchSubServiceDetails = async (id) => {
    isLoadingDetails.value = true;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/subservices/${id}`,
        {
          credentials: "include",
        },
      );

      const data = await handleResponse(res);

      selectedSubService.value = data.subService;
    } catch (err) {
    } finally {
      isLoadingDetails.value = false;
    }
  };

  //local state update
  const patchSubService = (subServiceId, patch) => {
    const item = subServices.value.find((s) => s.subServiceId === subServiceId);
    if (item) Object.assign(item, patch);

    if (selectedSubService.value?.subServiceId === subServiceId) {
      Object.assign(selectedSubService.value, patch);
    }
  };

  const toggleSubServiceStatus = async (subServiceId, isActive) => {
    isSaving.value = true;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/subservices/${subServiceId}/status`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isActive }),
        },
      );

      const data = await handleResponse(res);

      // update detail view
      if (selectedSubService.value?.subServiceId === subServiceId) {
        Object.assign(selectedSubService.value, { isActive });
      }

      // update list state
      patchSubService(subServiceId, { isActive });
      return data;
    } catch (err) {
      console.error("Error toggling sub-service active status:", err);
    } finally {
      isSaving.value = false;
    }
  };

  //featured toogle
  const toggleSubServiceFeatured = async (subServiceId, isFeatured) => {
    isSaving.value = true;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/subservices/${subServiceId}/featured`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isFeatured }),
        },
      );

      const data = await handleResponse(res);
      // update detail view
      if (selectedSubService.value?.subServiceId === subServiceId) {
        Object.assign(selectedSubService.value, { isFeatured });
      }

      // update list state
      patchSubService(subServiceId, { isFeatured });
      return data;
    } catch (err) {
      console.error("Error toggling sub-service featured status:", err);
    } finally {
      isSaving.value = false;
    }
  };

  const deleteSubService = async (subServiceId) => {
    isDeleting.value = true;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/subservices/${subServiceId}/delete`,
        {
          method: "PATCH",
          credentials: "include",
        },
      );

      const data = await handleResponse(res);
      subServices.value = subServices.value.filter(
        (s) => s.subServiceId !== subServiceId,
      );
      if (selectedSubService.value?.subServiceId === subServiceId) {
        selectedSubService.value = null;
      }
      return data;
    } catch (err) {
      console.error("Error deleting sub-service:", err);
    } finally {
      isDeleting.value = false;
    }
  };

  const updateSubService = async (subServiceId, form) => {
    isSaving.value = true;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/update/subservice/${subServiceId}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
      );

      const data = await handleResponse(res);

      // update detail view
      if (selectedSubService.value?.subServiceId === subServiceId) {
        Object.assign(selectedSubService.value, data.updated);
      }

      // update list
      patchSubService(subServiceId, data.updated);

      return data;
    } catch (error) {
      console.error("Error updating sub-service:", error);
    } finally {
      isSaving.value = false;
    }
  };
  const subServiceImagesUpload = async (payload) => {
    isUploading.value = true;

    try {
      const fd = mapBookingToFormData(payload);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/subservice/images`,
        {
          method: "POST",
          credentials: "include",
          body: fd,
        },
      );

      return await handleResponse(res);
    } catch (error) {
      console.error("Error uploading images:", error);
      throw error;
    } finally {
      isUploading.value = false;
    }
  };

  return {
    fetchSubServices,
    fetchSubServiceDetails,
    updateSubService,
    toggleSubServiceStatus,
    toggleSubServiceFeatured,
    deleteSubService,
    subServiceImagesUpload,
    isSaving,
    isDeleting,
    selectedSubService,
    isLoadingList,
    isUploading,
    isLoadingDetails,
    subServices,
  };
});
