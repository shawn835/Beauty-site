<template>
  <div class="register">
    <BaseForm
      title="register"
      subtitle="register to enjoy full experience"
      :fields="formFields"
      :meta="fieldsMeta"
      :form="form"
      button-text="register"
      :loading="loading"
      :errors="errors"
      @submit="submitRegister"
    >
      <template #form-extra>
        <p class="extra-text">
          Already registered?
          <RouterLink to="/login" class="extra-link">Login here</RouterLink>
        </p>
      </template>
    </BaseForm>
  </div>
</template>
<script setup>
import { reactive, computed } from "vue";
import { useUserApi } from "@/components/composables/userApi";
import BaseForm from "../BaseForm.vue";
import { useToast } from "../composables/useToast";
import { fieldsMeta } from "@/Utility/meta";
import { useFormErrors } from "@/Utility/useFormErrors.js";
const { show } = useToast();
const { handleRegister, loading } = useUserApi();

const { errors, setErrors, clearErrors } = useFormErrors();
const formFields = computed(() => ["name", "phone", "email", "password"]);
const form = reactive({});
formFields.value.forEach((field) => {
  form[field] = "";
});

const submitRegister = async (registerData) => {
  try {
    clearErrors();

    const { message } = await handleRegister(registerData);

    show({
      message: message || "Registered successfully!",
      type: "success",
    });
  } catch (err) {
    if (err.errors) {
      setErrors(err.errors);
      return;
    }else {
      show({
        message: err.message || "Registration failed. Please try again.",
        type: "error",
      });
    }
  }
};
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  background: #1a1f22;
}

.register-card {
  width: 100%;
  max-width: 440px;
  background: #252b2e;
  border-radius: 20px;
  padding: 2.5rem 2rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(245, 214, 152, 0.1);
}

.extra-text {
  text-align: center;
  margin: 1.4rem 0 0;
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

@media (max-width: 480px) {
  .register-card {
    padding: 2rem 1.4rem;
  }
}
</style>
