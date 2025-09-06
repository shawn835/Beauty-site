<template>
  <div class="verify-page">
    <div class="verify-box">
      <h1>Verify Your Email</h1>
      <p class="instruction">
        Please enter the 6-digit code we sent to your email.
      </p>

      <form @submit.prevent="submitCode">
        <input
          v-model="code"
          type="text"
          maxlength="6"
          placeholder="Enter verification code"
          class="verify-input" />

        <button type="submit" :disabled="loading" class="verify-btn">
          {{ loading ? "Verifying..." : "Verify" }}
        </button>
      </form>

      <p class="resend">
        <span v-if="timer > 0">
          You can resend code in <strong>{{ timer }}</strong> second<span
            v-if="timer > 1"
            >s</span
          >.
        </span>
        <span v-else>
          Didn't receive the code?
          <a href="#" @click.prevent="resendCode">Resend</a>
        </span>
      </p>

      <p v-if="error" class="error-message">{{ error }}</p>
      <p v-if="success" class="success-message">{{ success }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const code = ref("");
const loading = ref(false);
const error = ref("");
const success = ref("");
const timer = ref(60);
const toast = useToast();
const router = useRouter();
let interval = null;

const startTimer = () => {
  timer.value = 60;
  if (interval) clearInterval(interval);
  interval = setInterval(() => {
    if (timer.value > 0) {
      timer.value--;
    } else {
      clearInterval(interval);
    }
  }, 1000);
};

onMounted(() => {
  startTimer();
});

const email = ref(localStorage.getItem("pendingEmail") || "");

const submitCode = async () => {
  error.value = "";
  success.value = "";

  if (code.value.length !== 6 || isNaN(code.value)) {
    error.value = "Code must be 6 digits.";
    return;
  }

  loading.value = true;

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        code: code.value,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Verification failed");
    }

    success.value = data.message || "Verification successful!";
    toast.success(success.value);
    localStorage.removeItem("pendingEmail");
    router.push("/login");
  } catch (err) {
    error.value = err.message || "Something went wrong.";
    toast.error(error.value);
  } finally {
    loading.value = false;
  }
};

const resendCode = async () => {
  success.value = "";
  error.value = "";
  code.value = "";

  if (!email.value) {
    error.value = "Email not found. Please register again.";
    return;
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/resend-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.value }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to resend code");
    }

    success.value = data.message || "A new code has been sent to your email.";
    startTimer();
  } catch (err) {
    error.value = err.message || "Something went wrong";
  }
};
</script>

<style scoped>
.verify-page {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  min-height: 100vh;
  background: #f5f7fa;
}

.verify-box {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.instruction {
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 1.5rem;
}

.verify-input {
  width: 100%;
  padding: 0.75rem;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
}

.verify-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #2e7dff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.verify-btn:disabled {
  background-color: #a0c1ff;
  cursor: not-allowed;
}

.verify-btn:hover:not(:disabled) {
  background-color: #105ce2;
}

.resend {
  margin-top: 1rem;
  font-size: 0.9rem;
}

.resend a {
  color: #2e7dff;
  text-decoration: underline;
  cursor: pointer;
}

.error-message {
  color: #d32f2f;
  margin-top: 1rem;
  font-size: 0.9rem;
}

.success-message {
  color: #2e7d32;
  margin-top: 1rem;
  font-size: 0.9rem;
}
</style>
