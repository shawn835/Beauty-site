<template>
  <transition name="toast-slide">
    <div v-if="isVisible" :class="['toast', `toast-${type}`]" role="alert">
      <div class="toast-icon">
        <span v-if="type === 'success'">✔</span>
        <span v-if="type === 'error'">✖</span>
        <span v-if="type === 'info'">ℹ</span>
      </div>
      <div class="toast-content">
        <h4 class="toast-title">{{ title }}</h4>
        <p class="toast-message">{{ message }}</p>
      </div>
      <button @click="dismissToast" class="toast-close">&times;</button>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  title: { type: String, default: "Notification" },
  message: { type: String, default: "" },
  type: {
    type: String,
    default: "info",
    validator: (v) => ["success", "error", "info"].includes(v),
  },
  duration: { type: Number, default: 4000 },
});

const emit = defineEmits(["close"]);
const isVisible = ref(false);
let timer = null;

const showToast = () => {
  isVisible.value = true;
  timer = setTimeout(() => dismissToast(), props.duration);
};

const dismissToast = () => {
  isVisible.value = false;
  emit("close");
  if (timer) clearTimeout(timer);
};

onMounted(() => {
  showToast();
});

defineExpose({ showToast, dismissToast });
</script>

<style scoped>
.toast {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
  pointer-events: auto;
  z-index: 10000;
}

.toast-success {
  border-left: 5px solid #2e7d32;
  background: #e8f5e9;
}

.toast-error {
  border-left: 5px solid #d32f2f;
  background: #ffebee;
}

.toast-info {
  border-left: 5px solid #d81b60;
  background: #fff5f7;
}

.toast-icon {
  font-size: 1.5rem;
  margin-right: 15px;
  display: flex;
  align-items: center;
}

.toast-content {
  flex-grow: 1;
  text-align: left;
}

.toast-title {
  font-size: 1.2rem;
  color: #333;
  margin: 0;
  font-weight: 600;
}

.toast-message {
  font-size: 0.95rem;
  color: #555;
  margin: 5px 0 0;
}

.toast-close {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #666;
  cursor: pointer;
  transition: color 0.3s ease;
  padding: 0 5px;
}
.toast-close:hover {
  color: #d81b60;
}

/* Transition animations */
.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.4s ease;
}
.toast-slide-enter-from,
.toast-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
