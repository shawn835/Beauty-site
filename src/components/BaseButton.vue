<template>
  <button
    class="base-button"
    :class="[
      variant,
      size,
      { disabled: disabled || loading },
      { 'full-width': fullWidth },
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <!-- Loading Spinner -->
    <span v-if="loading" class="spinner"></span>

    <!-- Icon (Left) -->
    <i v-if="iconLeft" :class="iconLeft" class="btn-icon left"></i>

    <!-- Text -->
    <span class="btn-text">{{ label }}</span>

    <!-- Icon (Right) -->
    <i v-if="iconRight" :class="iconRight" class="btn-icon right"></i>
  </button>
</template>
<script setup>
const props = defineProps({
  label: { type: String, required: true },
  variant: {
    type: String,
    default: "primary",
    validator: (v) =>
      [
        "primary",
        "secondary",
        "outline",
        "danger",
        "success",
        "warning",
        "ghost",
      ].includes(v),
  },
  size: {
    type: String,
    default: "medium",
    validator: (v) => ["small", "medium", "large"].includes(v),
  },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  fullWidth: { type: Boolean, default: false },
  iconLeft: { type: String, default: "" }, // e.g. "fa-solid fa-plus"
  iconRight: { type: String, default: "" },
});

const emit = defineEmits(["click"]);

const handleClick = (e) => {
  if (!props.disabled && !props.loading) {
    emit("click", e);
  }
};
</script>
<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  white-space: nowrap;
}

.base-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Variants */
.primary {
  background: var(--bg-pink);
  color: white;
}

.secondary {
  background: #3a4246;
  color: white;
}

.outline {
  background: transparent;
  border: 2px solid var(--bg-pink);
  color: var(--bg-pink);
}

.danger {
  background: #ef4444;
  color: white;
}

.success {
  background: #10b981;
  color: white;
}

.warning {
  background: #f59e0b;
  color: black;
}

.ghost {
  background: transparent;
  color: var(--text-gray);
}

/* Sizes */
.small {
  padding: 8px 20px;
  font-size: 0.9rem;
}

.medium {
  padding: 14px 28px;
  font-size: 1.02rem;
}

.large {
  padding: 18px 36px;
  font-size: 1.15rem;
}

.full-width {
  width: 100%;
}

/* Icons */
.btn-icon {
  font-size: 1.1em;
}

/* Loading Spinner */
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

/* Hover Effects */
.primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(216, 27, 96, 0.4);
}

.outline:hover:not(:disabled) {
  background: rgba(216, 27, 96, 0.1);
}
</style>
