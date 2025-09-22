<template>
  <BaseForm
    title="register"
    subtitle="register to enjoy full experience"
    :fields="registerFields"
    button-text="register"
    :loading="loading"
    @submit="submitRegister">
    <template #extra>
      <p class="extra-text">
        Already registered?
        <RouterLink to="/login" class="extra-link">Login here</RouterLink>
      </p>
    </template>
  </BaseForm>
</template>
<script setup>
import { useSendUserData } from "@/components/composables/sendUserData";
import BaseForm from "../utility/BaseForm.vue";
import { useToast } from "../composables/useToast";
const { show } = useToast();

const { handleRegister, loading } = useSendUserData();
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

const registerFields = [
  {
    id: "name",
    label: "enter your name",
    type: "text",
    required: true,
    placeholder: "Enter your name ",
    value: "",
  },
  {
    id: "phoneNumber",
    label: "your phone number",
    type: "text",
    required: true,
    placeholder: "Enter your phone number ",
    value: "",
  },
  {
    id: "email",
    label: "enter your email",
    type: "email",
    required: true,
    placeholder: "Enter your email ",
    value: "",
  },
  {
    id: "password",
    label: "enter password",
    type: "password",
    required: true,
    placeholder: "Enter password ",
    value: "",
  },
];
</script>
