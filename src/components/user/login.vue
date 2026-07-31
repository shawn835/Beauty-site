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
    const { owner, message } = await handleLogin(loginData);
    show({ message: message || "logged in successfully", type: "success" });
    userStore.setUser(owner);
    router.push("/");
  } catch (error) {
    if (error.errors) {
      setErrors(error.errors);
      return;
    }
    show({ message: error.message || "login failed" });
  }
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: #1a1f22;
}

@media (max-width: 1024px) {
  .login-container {
    grid-template-columns: 1fr;
  }
  .image-side {
    display: none;
  }
}

/* Forgot Password */
.forgot-password {
  text-align: right;
  margin: 0.8rem 0 1.5rem;
}

.forgot-link {
  color: #f5d698;
  text-decoration: none;
  font-size: 0.98rem;
  font-weight: 500;
  transition: all 0.2s;
}

.forgot-link:hover {
  color: #f76706;
  text-decoration: underline;
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
