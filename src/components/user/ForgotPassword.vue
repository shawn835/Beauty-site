<template>
  <div class="form-wrapper">
    <BaseForm
      title="Forgot Password"
      subtitle="Enter your email address and we'll send you a link to reset your password"
      button-text="Send Reset Link"
      :loading="loading"
      :fields="formFields"
      :meta="fieldsMeta"
      :form="form"
      @submit="handleForgotPassword"
    >
      <template #form-extra>
        <p class="extra-text">
          Remember your password?
          <router-link to="/login" class="extra-link"
            >Back to Login</router-link
          >
        </p>
      </template>
    </BaseForm>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "@/components/composables/useToast";
import BaseForm from "../BaseForm.vue";
import { fieldsMeta } from "@/Utility/meta.js";
import { handleResponse } from "@/Utility/response.js";

const router = useRouter();
const { show } = useToast();

const form = ref({ email: "" });
const formFields = ["email"];
const loading = ref(false);

const handleForgotPassword = async () => {
  loading.value = true;
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(form.value),
      },
    );

    const data = await handleResponse(res);
    show({ message: data.message, type: "success" });
    router.push("/login");
  } catch (error) {
    console.error(error);
    show({ message: error.message || "failed", type: "error" });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.forgot-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1f22;
  padding: 2rem 1rem;
}

.forgot-container {
  width: 100%;
  max-width: 440px;
}

.form-wrapper {
  background: #2e3538;
  padding: 2.8rem 2.2rem;
  border-radius: 20px;
}

.extra-text {
  text-align: center;
  margin-top: 2rem;
  color: #aaa;
  font-size: 1rem;
}

.extra-link {
  color: #f5d698;
  font-weight: 600;
  text-decoration: none;
}

.extra-link:hover {
  text-decoration: underline;
}
</style>
