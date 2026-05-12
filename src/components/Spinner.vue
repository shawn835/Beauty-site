<template>
  <div class="spinner-overlay" v-if="show">
    <div class="spinner-container">
      <!-- Spinner -->
      <div class="spinner"></div>

      <!-- Message -->
      <p v-if="message" class="spinner-message">
        {{ message }}
      </p>

      <!-- Subtext (optional) -->
      <p v-if="subtext" class="spinner-subtext">
        {{ subtext }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: true,
  },
  message: {
    type: String,
    default: "Please wait...",
  },
  subtext: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "medium", // small, medium, large
    validator: (v) => ["small", "medium", "large"].includes(v),
  },
});
</script>
<style scoped>
.spinner-overlay {
  position: fixed;
  inset: 0;
  background: rgba(31, 37, 40, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(8px);
}

.spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.spinner {
  border: 4px solid rgba(216, 27, 96, 0.2);
  border-top: 4px solid var(--bg-pink);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.small .spinner {
  width: 32px;
  height: 32px;
}
.medium .spinner {
  width: 48px;
  height: 48px;
}
.large .spinner {
  width: 64px;
  height: 64px;
}

.spinner-message {
  margin-top: 24px;
  font-size: 1.1rem;
  color: white;
  font-weight: 500;
}

.spinner-subtext {
  margin-top: 8px;
  font-size: 0.95rem;
  color: var(--text-gray);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
