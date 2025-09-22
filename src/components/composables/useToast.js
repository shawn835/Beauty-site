// /composables/useToast.js
import { reactive } from "vue";

const toasts = reactive([]);

export function useToast() {
  const show = ({
    message,
    title = "Notification",
    type = "info",
    duration = 4000,
  }) => {
    const id = Date.now() + Math.random();
    toasts.push({ id, message, title, type, duration });

    // auto-remove after duration
    setTimeout(() => {
      const index = toasts.findIndex((t) => t.id === id);
      if (index !== -1) toasts.splice(index, 1);
    }, duration);
  };

  // Remove a toast manually (optional)
  const remove = (id) => {
    const index = toasts.findIndex((t) => t.id === id);
    if (index !== -1) toasts.splice(index, 1);
  };

  return { toasts, show, remove };
}
