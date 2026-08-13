// stores/booking.js
import { defineStore } from "pinia";
import { computed, reactive, ref, watch } from "vue";
import { useFileUpload } from "../composables/useFileUpload";
import { usePaymentCalculation } from "../composables/usePaymentCalculation";
import { useUserStore } from "./userStore";

export const useBookingStore = defineStore("booking", () => {
  /**
   * --------------------------------------------------------------------------
   * STATE
   * --------------------------------------------------------------------------
   */

  const userStore = useUserStore();
  const selectedServices = ref([]);
  const selectedTechnician = ref(null);
  const paymentOption = ref("deposit");

  const form = reactive({
    phoneNumber: userStore?.user?.phone ?? "",
    date: "",
    time: "",
    notes: "",
  });

  /**
   * --------------------------------------------------------------------------
   * COMPOSABLES
   * --------------------------------------------------------------------------
   */
  const { removeFile, previews, files, handleFileUpload, clearAll } =
    useFileUpload();

  const {
    totalPrice,
    totalDuration,
    depositAmount,
    amountToPay,
    remainingBalance,
    paymentLabel,
  } = usePaymentCalculation(selectedServices, paymentOption);

  /**
   * --------------------------------------------------------------------------
   * DERIVED STATE
   * --------------------------------------------------------------------------
   */

  const items = computed(() =>
    selectedServices.value.map((item) => {
      if (item.type === "service") {
        return {
          type: "service",
          serviceId: item.serviceId,
        };
      }

      return {
        type: "subservice",
        serviceId: item.serviceId,
        subServiceId: item.subServiceId,
        inspirationImageId: item.inspirationImageId,
      };
    }),
  );

  const bookingPayload = computed(() => ({
    items: items.value,
    technicianId: selectedTechnician.value?.technicianId ?? null,
    phoneNumber: form.phoneNumber.trim(),
    paymentOption: paymentOption.value,
    date: form.date,
    time: form.time,
    notes: form.notes.trim(),
    images: files.value,
  }));

  const isDetailsComplete = computed(() => {
    return !!(
      selectedServices.value.length &&
      form.date &&
      form.time &&
      form.phoneNumber
    );
  });

  /**
   * --------------------------------------------------------------------------
   * SERVICE ACTIONS
   * --------------------------------------------------------------------------
   */

  const addService = (payload) => {
    const exists = selectedServices.value.some(
      (service) =>
        service.serviceId === payload.serviceId &&
        service.subServiceId === payload.subServiceId,
    );

    console.log("payload", payload);

    if (exists) return;

    selectedServices.value.push({
      ...payload,
      subServiceId: payload.subServiceId ?? null,
      inspirationImageId: payload.inspirationImageId ?? null,
    });
  };

  const removeService = (serviceId, subServiceId = null) => {
    selectedServices.value = selectedServices.value.filter(
      (service) =>
        !(
          service.serviceId === serviceId &&
          service.subServiceId === subServiceId
        ),
    );
  };

  const toggleService = (payload) => {
    const serviceId = payload.serviceId;
    const subServiceId = payload.subServiceId ?? null;

    // Parent service cannot be selected when one of its
    // sub-services is already selected.
    if (subServiceId === null) {
      const hasSelectedSubService = selectedServices.value.some(
        (service) =>
          String(service.serviceId) === String(serviceId) &&
          service.type === "subService",
      );

      if (hasSelectedSubService) {
        return "blocked";
      }
    }

    const exists = selectedServices.value.some(
      (service) =>
        String(service.serviceId) === String(serviceId) &&
        String(service.subServiceId ?? null) === String(subServiceId),
    );

    if (exists) {
      removeService(serviceId, subServiceId);
      return "removed";
    }

    addService(payload);
    return "added";
  };

  const isServiceSelected = (serviceId) =>
    selectedServices.value.some((service) => service.serviceId === serviceId);

  const isSubServiceSelected = (subServiceId) =>
    selectedServices.value.some(
      (service) => service.subServiceId === (subServiceId ?? null),
    );

  const totalSelectedServices = computed(() => selectedServices.value.length);
  /**
   * --------------------------------------------------------------------------
   * TECHNICIAN ACTIONS
   * --------------------------------------------------------------------------
   */

  const addTechnician = (technician) => {
    selectedTechnician.value = technician;
  };

  const clearTechnician = () => {
    selectedTechnician.value = null;
  };

  /**
   * --------------------------------------------------------------------------
   * BOOKING ACTIONS
   * --------------------------------------------------------------------------
   */

  const resetBooking = () => {
    selectedServices.value = [];
    paymentOption.value = "deposit";

    Object.assign(form, {
      phoneNumber: "",
      date: "",
      time: "",
      notes: "",
    });

    clearTechnician();
    clearAll();
  };

  /**
   * --------------------------------------------------------------------------
   * EXPOSE
   * --------------------------------------------------------------------------
   */

  return {
    // State
    selectedServices,
    selectedTechnician,
    totalSelectedServices,
    paymentOption,
    form,

    // File uploads
    files,
    previews,
    handleFileUpload,
    removeFile,

    // Derived state
    items,
    bookingPayload,
    isDetailsComplete,

    // Payment
    totalPrice,
    totalDuration,
    depositAmount,
    amountToPay,
    remainingBalance,
    paymentLabel,

    // Service actions
    addService,
    removeService,
    toggleService,
    isServiceSelected,
    isSubServiceSelected,

    // Technician actions
    addTechnician,
    clearTechnician,

    // Booking actions
    resetBooking,
  };
});
