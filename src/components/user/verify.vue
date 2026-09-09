<template>
  <BaseForm
    title="enter your code"
    subtitle="register to enjoy full experience"
    button-text="send code"
    :loading="loading"
    :fields="sendCodeField"
    :meta="fieldsMeta"
    :form="form"
    @submit="submitCode"
  >
    <template #form-extra>
      <p class="extra-text">
        <span v-if="timer > 0">
          You can resend code in <strong>{{ timer }}</strong> second<span
            v-if="timer > 1"
            >s</span
          >.
        </span>
        <span v-else>
          Didn't receive the code?
          <a class="extra-link" href="#" @click.prevent="handleResend"
            >Resend</a
          >
        </span>
      </p>
    </template>
  </BaseForm>
</template>

<script setup>
import { reactive, computed } from "vue";
import BaseForm from "../BaseForm.vue";
import { useVerifyEmail } from "../composables/useVerifyEmail";
import { onMounted } from "vue";
import { useToast } from "../composables/useToast";
import { fieldsMeta } from "@/Utility/meta";
import { resetForm } from "@/Utility/utils.js";
import { useRouter } from "vue-router";
const router = useRouter();

const { handleVerifyToken, startTimer, loading, resendCode, timer } =
  useVerifyEmail();
const { show } = useToast();
const form = reactive({});
const sendCodeField = computed(() => ["code"]);
sendCodeField.value.forEach((field) => {
  form[field] = "";
});

const submitCode = async (tokenData) => {
  try {
    const { message } = await handleVerifyToken(tokenData);
    resetForm(form, sendCodeField.value);
    show({
      message: message || "Verification successful!",
      type: "success",
    });
    setTimeout(() => {
      router.push("/login");
    }, 1200);
  } catch (err) {
    show({
      message: err.message || "Verification failed",
      type: "error",
      duration: 5000,
    });
  }
};

const handleResend = async () => {
  try {
    const { message } = await resendCode();
    show({
      message: message || "Code resent successfully",
      type: "success",
    });
    startTimer();
  } catch (error) {
    show({
      message: error.message || "Something went wrong",
      type: "error",
    });
  }
};

onMounted(() => {
  startTimer();
});
</script>

<style scoped>
/* Page Layout Centering */
:host,
.verify-code-page {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  width: 100%;
  box-sizing: border-box;
}

/* BaseForm Card Container */
:deep(.base-form-container),
:deep(.form-card) {
  width: 100%;
  max-width: 420px;
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 2.5rem 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(10px);
  margin: 0 auto;
}

/* Headings & Subtitles */
:deep(.form-title),
:deep(h1),
:deep(h2) {
  color: var(--text-light, #ffffff);
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0 0 0.35rem 0;
  text-align: center;
  text-transform: capitalize;
}

:deep(.form-subtitle),
:deep(p.subtitle) {
  color: var(--text-gray, #9ca3af);
  font-size: 0.875rem;
  margin-bottom: 1.75rem;
  text-align: center;
}

/* Form Inputs */
:deep(.form-group) {
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
}

:deep(label) {
  color: var(--text-secondary, #d1d5db);
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: block;
}

:deep(input[type="text"]),
:deep(input[type="number"]) {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: var(--text-light, #ffffff);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 1.1rem;
  letter-spacing: 0.1em;
  text-align: center;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

:deep(input:focus) {
  outline: none;
  border-color: var(--nav-links, #f5d698);
  box-shadow: 0 0 0 3px rgba(245, 214, 152, 0.1);
}

/* Primary Action Button */
:deep(button[type="submit"]),
:deep(.submit-btn) {
  width: 100%;
  background-color: var(--bg-pink, #d81b60);
  color: var(--text-light, #ffffff);
  border: none;
  border-radius: 8px;
  padding: 0.85rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;
  margin-top: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  text-transform: capitalize;
}

:deep(button[type="submit"]:hover:not(:disabled)),
:deep(.submit-btn:hover:not(:disabled)) {
  background-color: #b0134c;
}

:deep(button:disabled) {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Extra Text & Resend Timer Slot */
.extra-text {
  color: var(--text-gray, #9ca3af);
  font-size: 0.875rem;
  text-align: center;
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.extra-text strong {
  color: var(--nav-links, #f5d698);
  font-weight: 600;
}

.extra-link {
  color: var(--nav-links, #f5d698);
  font-weight: 600;
  text-decoration: none;
  margin-left: 0.25rem;
  transition: opacity 0.2s ease;
}

.extra-link:hover {
  text-decoration: underline;
  opacity: 0.9;
}

/* Mobile Screen Support */
@media (max-width: 480px) {
  :deep(.base-form-container),
  :deep(.form-card) {
    padding: 1.75rem 1.25rem;
    border-radius: 10px;
  }
}
</style>
