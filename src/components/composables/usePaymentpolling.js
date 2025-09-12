import { ref, onUnmounted } from "vue";

export function usePaymentPolling(toast, router) {
  const isProcessing = ref(false);
  let pollInterval = null;
  let timeoutHandle = null;

  const startPolling = (bookingId) => {
    if (pollInterval) return;

    isProcessing.value = true;

    // Safety timeout (60s)
    timeoutHandle = setTimeout(() => {
      stopPolling();
      toast.error("Payment timeout. Please try again.");
    }, 60000);

    // Poll every 3s
    pollInterval = setInterval(async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/booking/status/${bookingId}`,
          { credentials: "include" }
        );

        if (!res.ok) throw new Error("Failed to fetch order status");

        const data = await res.json();

        console.log(data.status);

        if (data.status === "confirmed") {
          stopPolling();
          toast.success(
            data.message || "Payment successful. Booking confirmed 🎉"
          );
          router.push(`/orders/track-order/${bookingId}`);
        } else if (data.status === "payment_failed") {
          stopPolling();
          toast.error(data.message || "Payment failed. Please try again.");
        }
      } catch (error) {
        console.error("Error polling payment status:", error);
        // silently retry — user still sees spinner
      }
    }, 3000);
  };

  const stopPolling = () => {
    if (pollInterval) clearInterval(pollInterval);
    if (timeoutHandle) clearTimeout(timeoutHandle);
    pollInterval = null;
    timeoutHandle = null;
    isProcessing.value = false;
  };

  // Cleanup if component unmounts
  onUnmounted(() => {
    stopPolling();
  });

  return {
    isProcessing,
    startPolling,
    stopPolling,
  };
}
