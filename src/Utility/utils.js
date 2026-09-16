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
    timeZone: "Africa/Nairobi",
  });
};

export const formatTimeRange = (start, end) => {
  if (!start || !end) return "-";

  const format = (dateString) =>
    new Date(dateString).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "Africa/Nairobi",
      hour12: true,
    });

  return `${format(start)} - ${format(end)}`;
};

export function formatTime(datetime) {
  if (!datetime) return "";

  const date = new Date(datetime);

  if (isNaN(date.getTime())) return "";

  return date.toLocaleTimeString("en-KE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function mapBookingToFormData(payload) {
  const fd = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value == null) {
      return;
    }

    if (Array.isArray(value)) {
      if (value.length && value[0] instanceof File) {
        value.forEach((file) => fd.append(key, file));
      } else {
        fd.append(key, JSON.stringify(value));
      }

      return;
    }

    if (value instanceof File) {
      fd.append(key, value);
      return;
    }

    if (typeof value === "object") {
      fd.append(key, JSON.stringify(value));
      return;
    }

    fd.append(key, String(value));
  });

  return fd;
}

const formatKenyanNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.startsWith("0")) {
    return "254" + cleaned.slice(1);
  }

  return cleaned;
};

export const callCustomer = (phone) => {
  if (!phone) return;

  window.location.href = `tel:${phone}`;
};

export const messageCustomer = (phone) => {
  if (!phone) return;

  const phoneNumber = formatKenyanNumber(phone);

  const message = encodeURIComponent(
    "Hello, this is regarding your booking. How can we assist you?",
  );

  window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
};

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function resetForm(form, fields) {
  fields.forEach((f) => {
    form[f] = "" || null;
  });
}
