<template>
  <Teleport to="body">
    <div class="modal-overlay">
      <div class="waiting-card">
        <!-- 1. Spinner -->
        <div class="spinner-wrapper">
          <div class="spinner"></div>
          <div class="spinner-icon">💳</div>
        </div>

        <!-- 2. Title -->
        <h2 class="title">
          {{ title }}
        </h2>

        <!-- 3. Message -->
        <p class="message">
          {{ message }}
        </p>

        <!-- 4. Countdown -->
        <div class="countdown">
          <span class="countdown-label">Time remaining</span>
          <span class="countdown-value">{{ formattedTime }}</span>
        </div>

        <!-- 5. Reassurance -->
        <p class="reassurance">
          {{ reassurance }}
        </p>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "Verifying Your Payment",
  },
  message: {
    type: String,
    default:
      "Please wait while we confirm your payment. This usually takes a few moments.",
  },
  reassurance: {
    type: String,
    default:
      "Do not close this page or press the back button while verification is in progress.",
  },
  verificationExpiresAt: {
    type: [String, Date, Number],
    required: true,
  },
});

const emit = defineEmits(["timeout"]);

const now = ref(Date.now());
let timer = null;

const remaining = computed(() => {
  const expiresAt = new Date(props.verificationExpiresAt).getTime();
  return Math.max(0, Math.ceil((expiresAt - now.value) / 1000));
});

const formattedTime = computed(() => {
  const minutes = Math.floor(remaining.value / 60);
  const seconds = remaining.value % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
});

let hasTimedOut = false;

const updateTimer = () => {
  now.value = Date.now();
  if (remaining.value === 0 && !hasTimedOut) {
    hasTimedOut = true;
    clearInterval(timer);
    emit("timeout");
  }
};

onMounted(() => {
  updateTimer();
  timer = setInterval(updateTimer, 1000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1.5rem;
}

.waiting-card {
  background: #252b2e;
  border-radius: 24px;
  padding: 3rem 2.5rem;
  max-width: 440px;
  width: 100%;
  text-align: center;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(245, 214, 152, 0.12);
  animation: popIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.85) translateY(30px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Spinner */
.spinner-wrapper {
  position: relative;
  width: 90px;
  height: 90px;
  margin: 0 auto 2rem;
}

.spinner {
  width: 90px;
  height: 90px;
  border: 4px solid rgba(245, 214, 152, 0.2);
  border-top-color: #f5d698;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.spinner-icon {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Title */
.title {
  font-size: 1.7rem;
  color: #f5d698;
  margin: 0 0 1rem;
}

/* Message */
.message {
  color: #ddd;
  font-size: 1.05rem;
  line-height: 1.6;
  margin: 0 0 2rem;
}

/* Countdown */
.countdown {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 14px;
  padding: 1rem 1.5rem;
  margin-bottom: 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.countdown-label {
  color: #aaa;
  font-size: 0.9rem;
}

.countdown-value {
  font-size: 2rem;
  font-weight: 700;
  color: #f5d698;
  letter-spacing: 2px;
}

/* Reassurance */
.reassurance {
  color: #888;
  font-size: 0.92rem;
  line-height: 1.5;
  margin: 0;
}
</style>
