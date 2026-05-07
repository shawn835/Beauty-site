<template>
  <Transition name="modal-fade">
    <div v-if="isOpen" class="modal-overlay" @click.self="handleBackdropClick">
      <div class="modal-content">
        <!-- Icon -->
        <div class="modal-icon" :class="type">
          {{ getIcon() }}
        </div>

        <!-- Title -->
        <h3 class="modal-title">{{ title }}</h3>

        <!-- Message -->
        <p class="modal-message">{{ message }}</p>

        <!-- Extra Warning (for dangerous actions) -->
        <p v-if="warningText" class="warning-text">
          {{ warningText }}
        </p>

        <!-- Buttons -->
        <div class="modal-actions">
          <button class="btn-cancel" @click="cancel" :disabled="loading">
            {{ cancelText }}
          </button>
          <button
            class="btn-confirm"
            :class="type"
            @click="confirm"
            :disabled="loading"
          >
            <span v-if="loading" class="spinner"></span>
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  isOpen: { type: Boolean, required: true },
  title: { type: String, default: "Are you sure?" },
  message: { type: String, required: true },
  warningText: { type: String, default: "" },
  confirmText: { type: String, default: "Confirm" },
  cancelText: { type: String, default: "Cancel" },
  type: {
    type: String,
    default: "default",
    validator: (v) => ["default", "danger", "warning"].includes(v),
  },
  loading: { type: Boolean, default: false },
});

const emit = defineEmits(["confirm", "cancel", "update:isOpen"]);

const handleBackdropClick = () => {
  if (!props.loading) emit("cancel");
};

const confirm = () => {
  emit("confirm");
};

const cancel = () => {
  if (!props.loading) emit("cancel");
};

const getIcon = () => {
  if (props.type === "danger") return "⚠️";
  if (props.type === "warning") return "⚠️";
  return "ℹ️";
};

// Close on Escape key
watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      document.addEventListener("keydown", handleEscape);
    } else {
      document.removeEventListener("keydown", handleEscape);
    }
  },
);

const handleEscape = (e) => {
  if (e.key === "Escape" && !props.loading) {
    cancel();
  }
};
</script>
<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: var(--overlay-color);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background: #2e3538;
  border-radius: 20px;
  width: 90%;
  max-width: 420px;
  padding: 32px;
  text-align: center;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  border: 1px solid #444;
}

.modal-icon {
  font-size: 3.2rem;
  margin-bottom: 20px;
}

.modal-icon.danger {
  color: #ef4444;
}
.modal-icon.warning {
  color: #f59e0b;
}

.modal-title {
  font-size: 1.5rem;
  margin-bottom: 12px;
  color: white;
}

.modal-message {
  color: var(--text-gray);
  line-height: 1.6;
  font-size: 1.05rem;
  margin-bottom: 8px;
}

.warning-text {
  color: #ef4444;
  font-weight: 500;
  margin-top: 16px;
  font-size: 0.98rem;
}

.modal-actions {
  display: flex;
  gap: 12px;
  margin-top: 32px;
}

.btn-cancel,
.btn-confirm {
  flex: 1;
  padding: 14px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-cancel {
  background: transparent;
  border: 2px solid #666;
  color: var(--text-light);
}

.btn-cancel:hover:not(:disabled) {
  border-color: var(--text-gray);
}

.btn-confirm {
  border: none;
  color: white;
}

.btn-confirm.default {
  background: var(--bg-pink);
}

.btn-confirm.danger {
  background: #ef4444;
}

.btn-confirm.warning {
  background: #f59e0b;
  color: black;
}

.btn-confirm:hover:not(:disabled) {
  transform: translateY(-2px);
}

.spinner {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Transition */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
