<template>
  <BaseForm
    title="enter your code"
    subtitle="register to enjoy full experience"
    :fields="sendCodeField"
    button-text="send code"
    :loading="loading"
    @submit="submitCode">
    <template #extra>
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
import BaseForm from "../utility/BaseForm.vue";
import { useVerifyEmail } from "../composables/useVerifyEmail";
import { onMounted } from "vue";
import { useToast } from "../composables/useToast";

const { handleVerifyToken, startTimer, loading, resendCode, timer } =
  useVerifyEmail();
const { show } = useToast();

const sendCodeField = [
  {
    id: "code",
    label: "enter code",
    type: "text",
    required: true,
    placeholder: "Enter code",
    value: "",
  },
];

const submitCode = async (tokenData) => {
  try {
    const { message } = await handleVerifyToken(tokenData);
    show({
      message: message || "Verification successful!",
      type: "success",
    });
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
