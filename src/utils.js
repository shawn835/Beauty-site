import { ref } from "vue";

export const toast = ref({ visible: false, message: "" });

//duration helper
export function formatDuration(minutes) {
  if (!minutes || minutes <= 0) return "N/A";

  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;

  let result = "";
  if (hrs > 0) result += `${hrs}h`;
  if (mins > 0) result += hrs > 0 ? ` ${mins}m` : `${mins}m`;

  return result;
}

export const showToast = (msg) => {
  toast.value.message = msg;
  toast.value.visible = true;
  setTimeout(() => (toast.value.visible = false), 2500);
};

export const formatDate = (dateInput, { withTime = false } = {}) => {
  const date = new Date(dateInput);

  if (withTime) {
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Africa/Nairobi",
      hour12: true,
    });
  }

  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatTimeRange = (start, end) => {
  if (!start || !end) return "-";

  const format = (dateString) =>
    new Date(dateString).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  return `${format(start)} - ${format(end)}`;
};

// ...
export const getStatusClass = (status) => {
  const s = status?.toLowerCase() || "";
  if (s.includes("pending")) return "pending";
  if (s.includes("confirmed")) return "confirmed";
  if (s.includes("progress")) return "in-progress";
  if (s.includes("completed")) return "completed";
  if (s.includes("cancelled")) return "cancelled";
  if (s.includes("no-show")) return "no-show";
  if (s.includes("paid") || s.includes("success")) return "paid";
  if (s.includes("failed")) return "failed";
  if (s.includes("pending")) return "pending-payment";
  if (s.includes("refunded")) return "refunded";
  return "";
};
