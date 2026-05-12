import { ref, onUnmounted } from "vue";
export function usePaymentPolling() {
  const isProcessing = ref(false);

  let pollInterval = null;
  let timeoutHandle = null;

  const startPolling = (bookingCode, onEvent) => {
    if (pollInterval) return;

    isProcessing.value = true;

    timeoutHandle = setTimeout(() => {
      onEvent?.({
        type: "info",
        message:
          "We are still confirming your payment. If successful, it will reflect shortly.",
      });
    }, 60000);

    pollInterval = setInterval(async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/booking/status?bookingCode=${bookingCode}`,
          { credentials: "include" },
        );

        if (!res.ok) throw new Error("Failed to fetch status");

        const { status, message } = await res.json();

        if (status === "pending_payment" || status === "processing") return;

        stopPolling();

        onEvent?.({
          type: status,
          message,
          bookingCode,
        });
      } catch (error) {
        console.error("Polling error:", error);
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

  onUnmounted(() => stopPolling());

  return {
    isProcessing,
    startPolling,
    stopPolling,
  };
}
