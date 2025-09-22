<template>
  <BaseForm
    title="login"
    subtitle="login for access"
    :fields="loginFields"
    button-text="login"
    :loading="loading"
    @submit="submitLogin">
    <template #extra>
      <p class="extra-text">
        don't have an account?
        <router-link to="/register" class="extra-link"
          >register here</router-link
        >
      </p>
    </template>
  </BaseForm>
</template>

<script setup>
import BaseForm from "../utility/BaseForm.vue";
import { useSendUserData } from "../composables/sendUserData";
import { useToast } from "../composables/useToast";
import { useUserStore } from "../store/userStore";

const { show } = useToast();
const userStore = useUserStore();
const { handleLogin, loading } = useSendUserData();

const loginFields = [
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

const submitLogin = async (loginData) => {
  try {
    const { owner, message } = await handleLogin(loginData);
    show({ message: message || "logged in successfully", type: "success" });
    userStore.setUser(owner);
  } catch (error) {
    console.error(error.message);
    show({ message: error.message || "login failed" });
  }
};
</script>
