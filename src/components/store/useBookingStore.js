import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useBookingStore = defineStore("booking", () => {
  const selectedServices = ref([]);
  const serviceIds = ref([]);

  const addService = (service) => {
    if (!selectedServices.value.find((s) => s.name === service.name)) {
      selectedServices.value.push(service);
      addServiceId(service.serviceId);
    }
  };

  const addServiceId = (id) => {
    if (!serviceIds.value.includes(id)) {
      serviceIds.value.push(id);
    }
  };

  // emove subservice and clean serviceId if no subs left
  const removeService = (name, serviceId) => {
    selectedServices.value = selectedServices.value.filter(
      (s) => s.name !== name
    );

    // check if any subservice still uses this serviceId
    const stillExists = selectedServices.value.some(
      (s) => s.serviceId === serviceId
    );

    if (!stillExists) {
      serviceIds.value = serviceIds.value.filter((id) => id !== serviceId);
    }
  };

  const clearServices = () => {
    selectedServices.value = [];
    serviceIds.value = [];
  };

  //totals
  const totalPrice = computed(() =>
    selectedServices.value.reduce((sum, s) => sum + (s.price || 0), 0)
  );

  const totalDuration = computed(() =>
    selectedServices.value.reduce((sum, s) => sum + (s.duration || 0), 0)
  );

  return {
    selectedServices,
    serviceIds,
    addServiceId,
    addService,
    removeService,
    clearServices,
    totalDuration,
    totalPrice,
  };
});
