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
