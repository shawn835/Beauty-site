<template>
  <div class="reset-page">
    <BaseForm
      title="Reset Password"
      subtitle="Please create a new password for your account"
      button-text="Reset Password"
      :loading="loading"
      :fields="formFields"
      :meta="fieldsMeta"
      :form="form"
      @submit="handleResetPassword"
    >
      <template #form-extra>
        <p class="extra-text">
          Remember your password?
          <router-link to="/login" class="extra-link">Login here</router-link>
        </p>
      </template>
    </BaseForm>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { useToast } from "@/components/composables/useToast";
import { useRouter, useRoute } from "vue-router";
import BaseForm from "../BaseForm.vue";
import { fieldsMeta } from "@/Utility/meta.js";
import { handleResponse } from "@/Utility/response.js";

const router = useRouter();
const route = useRoute();
const { show } = useToast();

const token = route.query.token;

const form = reactive({});
const loading = ref(false);

const formFields = computed(() => ["password", "confirmPassword"]);
formFields.value.forEach((field) => {
  form[field] = "";
});

const handleResetPassword = async () => {
  if (!token) {
    show({
      message: "Invalid or expired password reset link.",
      type: "error",
    });
    return;
  }

  if (form.password !== form.confirmPassword) {
    show({
      message: "Passwords do not match.",
      type: "error",
    });
    return;
  }

  loading.value = true;

  const payload = {
    token,
    password: form.password,
    confirmPassword: form.confirmPassword,
  };

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/reset-password`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    const data = await handleResponse(res);

    show({
      message: data.message || "Password reset successfully. Please log in.",
      type: "success",
    });

    router.push("/login");
  } catch (error) {
    show({
      message: error.message ?? "Failed to reset password. Please try again.",
      type: "error",
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.reset-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: #1a1f22;
}

.reset-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  min-height: 100vh;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.6);
}

@media (max-width: 1024px) {
  .reset-container {
    grid-template-columns: 1fr;
  }
  .image-side {
    display: none;
  }
}

/* Image Side */
.image-side {
  position: relative;
  overflow: hidden;
}

.bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(46, 53, 56, 0.88),
    rgba(30, 35, 38, 0.75)
  );
}

.brand-text {
  position: absolute;
  bottom: 15%;
  left: 10%;
  color: white;
  z-index: 2;
}

.brand-text h1 {
  font-size: 2.8rem;
  color: #f5d698;
  margin-bottom: 0.5rem;
}

.brand-text p {
  font-size: 1.25rem;
  opacity: 0.9;
}

/* Form Side */
.form-side {
  background: #2e3538;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.form-wrapper {
  width: 100%;
  max-width: 440px;
}

.extra-text {
  text-align: center;
  margin-top: 1.8rem;
  color: #aaa;
}

.extra-link {
  color: #f5d698;
  font-weight: 600;
}

.extra-link:hover {
  text-decoration: underline;
}
</style>
