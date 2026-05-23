<template>
  <BaseForm
    title="login"
    subtitle="login for access"
    :fields="formFields"
    button-text="login"
    :loading="loading"
    :meta="fieldsMeta"
    :form="form"
    @submit="submitLogin"
  >
    <template #form-extra>
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
import { reactive, computed } from "vue";
import { fieldsMeta } from "@/Utility/meta";
import BaseForm from "../BaseForm.vue";
import { useUserApi } from "../composables/userApi";
import { useToast } from "../composables/useToast";
import { useUserStore } from "../store/userStore";
import { useRouter } from "vue-router";

const router = useRouter();

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
    const { owner, message } = await handleLogin(loginData);
    show({ message: message || "logged in successfully", type: "success" });
    userStore.setUser(owner);
    router.push("/");
  } catch (error) {
    console.error(error.message);
    show({ message: error.message || "login failed" });
  }
};
</script>
