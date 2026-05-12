// stores/booking.js
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { useFileUpload } from "../composables/useFileUpload";
import { usePaymentCalculation } from "../composables/usePaymentCalculation";
import { useUserStore } from "./userStore";
const userStore = useUserStore();

export const useBookingStore = defineStore("booking", () => {
  const { removeFile, previews, files, handleFileUpload, clearAll } =
    useFileUpload();

  //refs
  const paymentOption = ref("deposit");
  const selectedServices = ref([]);
  const selectedTechnician = ref(null);

  // payment composable
  const {
    totalPrice,
    totalDuration,
    depositAmount,
    amountToPay,
    remainingBalance,
    paymentLabel,
  } = usePaymentCalculation(selectedServices, paymentOption);

  //user form
  const form = reactive({
    phoneNumber: userStore.user.phone,
    date: "",
    time: "",
    notes: "",
  });

  //COMPUTED
  const serviceIds = computed(() => [
    ...new Set(selectedServices.value.map((s) => s.serviceId)),
  ]);

  const subServiceIds = computed(() => [
    ...new Set(
      selectedServices.value.map((s) => s.subId).filter((id) => id != null),
    ),
  ]);

  //bbooking payload
  const bookingPayload = computed(() => ({
    subServiceIds: subServiceIds.value,
    technicianId: selectedTechnician.value?.technicianId || null,
    phoneNumber: form.phoneNumber.trim(),
    paymentOption: paymentOption.value,
    date: form.date,
    time: form.time,
    notes: form.notes.trim(),
    files: files.value,
  }));

  /** ACTIONS */
  const addService = (payload) => {
    const normalized = {
      serviceId: payload.serviceId ?? payload.id,
      serviceName: payload.serviceName ?? payload.name,

      subId: payload.subServiceId ?? null,
      subServiceName: payload.subServiceName ?? null,

      price: Number(payload.price ?? 0),
      duration: Number(payload.duration ?? 60),
    };

    const exists = selectedServices.value.some(
      (s) =>
        s.serviceId === normalized.serviceId && s.subId === normalized.subId,
    );

    if (!exists) {
      selectedServices.value.push(normalized);
    }
  };

  const removeService = (serviceId, subId = null) => {
    selectedServices.value = selectedServices.value.filter(
      (s) => !(s.serviceId === serviceId && s.subId === subId),
    );
  };

  const toggleService = (payload) => {
    const serviceId = payload.serviceId ?? payload.id;
    const subId = payload.subServiceId ?? null;

    if (
      selectedServices.value.some(
        (s) => s.serviceId === serviceId && s.subId === subId,
      )
    ) {
      removeService(serviceId, subId);
    } else {
      addService(payload);
    }
  };

  const isServiceSelected = (serviceId) => {
    return selectedServices.value.some((s) => s.serviceId === serviceId);
  };

  const isSubServiceSelected = (subId) =>
    selectedServices.value.some((service) => service.subId === subId);

  const addTechnician = (tech) => {
    selectedTechnician.value = tech;
  };

  const clearTechnician = () => {
    selectedTechnician.value = null;
  };

  const isDetailsComplete = computed(() => {
    return !!(
      selectedServices.value.length &&
      form.date &&
      form.time &&
      form.phoneNumber
    );
  });

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

  return {
    // refs
    previews: previews.value,
    selectedServices,
    paymentOption,

    // derived
    serviceIds,
    subServiceIds,
    totalDuration,
    depositAmount,
    totalPrice,
    amountToPay,
    remainingBalance,
    paymentLabel,
    selectedTechnician,
    isDetailsComplete,
    form,
    bookingPayload,

    // actions
    toggleService,
    isServiceSelected,
    isSubServiceSelected,
    addTechnician,
    clearTechnician,
    handleFileUpload,
    removeFile,
    resetBooking,
  };
});
