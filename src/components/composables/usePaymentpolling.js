import { ref, onUnmounted } from "vue";
import { useToast } from "./useToast";
const { show } = useToast();
export function usePaymentPolling(router) {
  const isProcessing = ref(false);
  let pollInterval = null;
  let timeoutHandle = null;

  const startPolling = (bookingId) => {
    if (pollInterval) return;

    isProcessing.value = true;

    // Safety timeout (60s)
    timeoutHandle = setTimeout(() => {
      stopPolling();
      show({ message: "Payment timeout. Please try again.", type: "error" });
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
          show({
            message: data.message || "Payment successful. Booking confirmed!",
            type: "success",
          });
          router.push(`/orders/track-order/${bookingId}`);
        } else if (data.status === "payment_failed") {
          stopPolling();
          show({
            message: data.message || "Payment failed. Please try again.",
            type: "error",
          });
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
