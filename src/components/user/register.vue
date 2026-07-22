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
const { show } = useToast();
const { handleRegister, loading } = useUserApi();

const formFields = computed(() => ["name", "phone", "email", "password"]);
const form = reactive({});
formFields.value.forEach((field) => {
  form[field] = "";
});

const submitRegister = async (registerData) => {
  try {
    const { message } = await handleRegister(registerData);
    show({
      message: message || "registered successfully!",
      type: "success",
    });
  } catch (err) {
    show({
      message: err.message || "failed to register",
      type: "error",
      duration: 5000,
    });
  }
};
</script>

<style scoped>
.register {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: #1a1f22;
  margin-top: 4rem;
  padding: 1rem;
}
</style>
