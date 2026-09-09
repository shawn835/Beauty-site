<template>
  <div class="login-page">
    <BaseForm
      title="Welcome Back"
      subtitle="Sign in to manage your salon"
      :fields="formFields"
      button-text="Login"
      :loading="loading"
      :meta="fieldsMeta"
      :form="form"
      :errors="errors"
      @submit="submitLogin"
    >
      <template #form-extra>
        <!-- Forgot Password -->
        <div class="forgot-password">
          <router-link to="/forgot-password" class="forgot-link">
            Forgot your password?
          </router-link>
        </div>

        <p class="extra-text">
          Don't have an account?
          <router-link to="/register" class="extra-link"
            >Register here</router-link
          >
        </p>
      </template>
    </BaseForm>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import { fieldsMeta } from "@/Utility/meta";
import BaseForm from "../BaseForm.vue";
import { useUserApi } from "../composables/userApi";
import { useToast } from "../composables/useToast";
import { useUserStore } from "../store/userStore";
import { useRouter } from "vue-router";
import { useFormErrors } from "@/Utility/useFormErrors.js";
import { resetForm } from "@/Utility/utils.js";
const router = useRouter();
const { errors, setErrors, clearErrors } = useFormErrors();

const { show } = useToast();
const userStore = useUserStore();
const { handleLogin, loading } = useUserApi();
const form = reactive({});
const formFields = computed(() => ["email", "password"]);
formFields.value.forEach((field) => {
  form[field] = "";
});

const submitLogin = async (loginData) => {
  try {
    clearErrors();

    const result = await handleLogin(loginData);

    if (result.requiresVerification) {
      userStore.setPendingVerificationEmail(result.email);

      show({
        message: result.message,
        type: "info",
      });

      router.push("/token/confirmation");
      return;
    }

    show({
      message: result.message,
      type: "success",
    });

    userStore.setUser(result.owner);

    resetForm(form, formFields.value);

    router.push("/");
  } catch (error) {
    if (error.errors) {
      setErrors(error.errors);
      return;
    }

    show({
      message: error.message || "login failed",
    });
  }
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  background: #1a1f22;
}

.login-card {
  width: 100%;
  max-width: 440px;
  background: #252b2e;
  border-radius: 20px;
  padding: 2.5rem 2rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(245, 214, 152, 0.1);
}

/* Extra content under the form */
.forgot-password {
  text-align: right;
  margin: 0.4rem 0 1.4rem;
}

.forgot-link {
  color: #f5d698;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.forgot-link:hover {
  color: #f76706;
  text-decoration: underline;
}

.extra-text {
  text-align: center;
  margin: 0;
  color: #aaa;
  font-size: 0.98rem;
}

.extra-link {
  color: #f5d698;
  font-weight: 600;
  text-decoration: none;
}

.extra-link:hover {
  text-decoration: underline;
}

/* Mobile */
@media (max-width: 480px) {
  .login-card {
    padding: 2rem 1.4rem;
  }
}
</style>
