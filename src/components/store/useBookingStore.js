import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useBookingStore = defineStore("booking", () => {
  const selectedServices = ref([]);
  const serviceIds = ref([]);

  const addService = (service) => {
    if (!selectedServices.value.some((s) => s.subId === service.subId)) {
      selectedServices.value.push(service);
      addServiceId(service.serviceId);
    }
  };

  const addServiceId = (id) => {
    if (!serviceIds.value.includes(id)) {
      serviceIds.value.push(id);
    }
  };

  const isServiceSelected = (serviceId) => {
    return serviceIds.value.includes(serviceId);
  };

  const isSubServiceSelected = (subId) => {
    return selectedServices.value.some((s) => s.subId === subId);
  };

  const removeService = (subId, serviceId) => {
    selectedServices.value = selectedServices.value.filter(
      (s) => s.subId !== subId,
    );

    const stillExists = selectedServices.value.some(
      (s) => s.serviceId === serviceId,
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
    selectedServices.value.reduce((sum, s) => sum + (s.price || 0), 0),
  );

  const totalDuration = computed(() =>
    selectedServices.value.reduce((sum, s) => sum + (s.duration || 0), 0),
  );

  return {
    selectedServices,
    serviceIds,
    addServiceId,
    addService,
    removeService,
    clearServices,
    isServiceSelected,
    isSubServiceSelected,
    totalDuration,
    totalPrice,
  };
});
