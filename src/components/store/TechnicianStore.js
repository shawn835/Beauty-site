import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useApi } from "../composables/useFetch";
import { handleResponse } from "@/Utility/response";
import { mapBookingToFormData } from "@/Utility/utils";
const BASE_URL = import.meta.env.VITE_API_URL;

export const useTechnicianStore = defineStore("technician", () => {
  const isUploadingProfile = ref(false);
  const isGettingDetails = ref(false);
  const isUpdating = ref(false);

  const selectedTechnician = ref(null);

  /***********************
   * TECHNICIANS
   ***********************/
  const technicianUrl = `${BASE_URL}/api/technicians`;

  const {
    data: techniciansData,
    loading: isLoadingTechnicians,
    fetchData: fetchTechnicians,
  } = useApi(technicianUrl, {
    credentials: "include",
  });

  const technicians = computed(() => techniciansData.value?.technicians ?? []);

  console.log("tech", technicians.value);

  const technicianStats = computed(() => techniciansData.value?.stats ?? null);

  /***********************
   * LOCAL PATCH
   ***********************/
  const patchTechnician = (technicianId, patch) => {
    const technician = techniciansData.value?.technicians?.find(
      (t) => t.technicianId === technicianId,
    );

    if (technician) {
      Object.assign(technician, patch);
    }

    if (selectedTechnician.value?.technicianId === technicianId) {
      Object.assign(selectedTechnician.value, patch);
    }
  };

  /***********************
   * GET TECHNICIAN DETAILS
   ***********************/
  const technicianDetails = async (technicianId) => {
    isGettingDetails.value = true;

    try {
      const res = await fetch(
        `${BASE_URL}/api/admin/technician/${technicianId}`,
        {
          credentials: "include",
        },
      );

      const data = await handleResponse(res);

      selectedTechnician.value = data;

      return data;
    } finally {
      isGettingDetails.value = false;
    }
  };

  /***********************
   * UPLOAD PROFILE PHOTO
   ***********************/
  const uploadProfilePhoto = async (payload) => {
    isUploadingProfile.value = true;

    try {
      console.log("uploadProfilePhoto payload", payload);
      const fd = mapBookingToFormData(payload);
      const res = await fetch(
        `${BASE_URL}/api/admin/technician/profile-photo`,
        {
          method: "PATCH",
          credentials: "include",
          body: fd,
        },
      );

      const data = await handleResponse(res);

      // Update local state if backend returns updated technician
      if (data.technician) {
        patchTechnician(data.technician.technicianId, data.technician);
      }

      return data;
    } finally {
      isUploadingProfile.value = false;
    }
  };

  const updateTechnician = async (technicianId, payload) => {
    isUpdating.value = true;
    try {
      const res = await fetch(
        `${BASE_URL}/api/admin/technician/${technicianId}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await handleResponse(res);

      // Update local state if backend returns updated technician
      // if (data.technician) {
      //   patchTechnician(data.technician.technicianId, data.technician);
      // }

      return data;
    } catch (error) {
      console.error("Error updating technician:", error);
      throw error;
    } finally {
      isUpdating.value = false;
    }
  };

  const toggleTechnicianStatus = async (id, isActive) => {
    isUpdating.value = true;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/technicians/${id}/status`,
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
      // if (selectedTechnician.value?.technicianId === id) {
      //   Object.assign(selectedTechnician.value, { isActive });
      // }

      // update list state
      // patchSubService(subServiceId, { isActive });

      return data;
    } catch (err) {
      console.error("Error toggling technician active status:", err);
      throw err;
    } finally {
      isUpdating.value = false;
    }
  };

  return {
    // state
    technicians,
    technicianStats,
    selectedTechnician,

    // loading
    isUploadingProfile,
    isLoadingTechnicians,
    isGettingDetails,
    isUpdating,

    // actions
    fetchTechnicians,
    technicianDetails,
    uploadProfilePhoto,
    patchTechnician,
    updateTechnician,
    toggleTechnicianStatus,
  };
});
