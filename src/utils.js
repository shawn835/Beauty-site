import { ref } from "vue";

export const toast = ref({ visible: false, message: "" });

export function handleFileUpload(event, previews, form) {
  // Clear existing previews and custom files
  previews.value.forEach((p) => URL.revokeObjectURL(p.url));
  previews.value = [];
  form.custom = [];

  const files = Array.from(event.target.files);

  files.forEach((file) => {
    // Store the actual file for submission
    form.custom.push(file);

    // Generate preview
    const reader = new FileReader();
    reader.onload = (e) => {
      previews.value.push(e.target.result);
    };
    reader.readAsDataURL(file);
  });
}

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
