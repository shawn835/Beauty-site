import { computed } from "vue";

export function usePaymentCalculation(selectedServices, paymentOption) {
  const totalPrice = computed(() =>
    selectedServices.value.reduce((sum, s) => sum + Number(s.price || 0), 0),
  );

  const depositAmount = computed(() => {
    // all free / consultation / quote-based services
    if (totalPrice.value <= 0) {
      return 500;
    }

    // priced services
    return Math.round(totalPrice.value * 0.3);
  });

  const remainingBalance = computed(() =>
    Math.max(0, totalPrice.value - depositAmount.value),
  );

  const amountToPay = computed(() =>
    paymentOption.value === "full" ? totalPrice.value : depositAmount.value,
  );

  const totalDuration = computed(() =>
    selectedServices.value.reduce((sum, s) => sum + Number(s.duration || 0), 0),
  );

  const paymentLabel = computed(() =>
    totalPrice.value <= 0
      ? "reservation deposit"
      : "minimum booking deposit (30%) - recommended",
  );

  return {
    totalPrice,
    totalDuration,
    depositAmount,
    amountToPay,
    remainingBalance,
    paymentLabel,
  };
}
