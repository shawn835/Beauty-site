import { ref, onUnmounted } from "vue";
import { useToast } from "./useToast";
const { show } = useToast();
export function usePaymentPolling(router) {
  const isProcessing = ref(false);

  let pollInterval = null;
  let timeoutHandle = null;

  const startPolling = (bookingCode) => {
    if (pollInterval) return;

    isProcessing.value = true;

    // soft timeout (UX only — NOT failure)
    timeoutHandle = setTimeout(() => {
      show({
        message:
          "We are still confirming your payment. If successful, it will reflect shortly.",
        type: "info",
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

        console.log("poll status:", status);

        if (status === "pending_payment" || status === "processing") {
          return; // keep polling silently
        }

        stopPolling();

        const msg = message || "";

        if (status === "confirmed") {
          show({ message: msg || "Payment successful!", type: "success" });
          router.push(`/orders/track-order/${bookingCode}`);
          return;
        }

        if (status === "completed") {
          show({ message: msg || "Service completed.", type: "success" });
          router.push(`/orders/track-order/${bookingCode}`);
          return;
        }

        if (status === "payment_failed") {
          show({ message: msg || "Payment not completed.", type: "error" });
          return;
        }

        console.warn("Unknown status:", status);
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
