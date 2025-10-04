<template>
  <BaseForm
    title="Update Profile"
    subtitle="Keep your details up to date"
    :fields="formFields"
    button-text="Update Profile"
    :loading="loading"
    @submit="submitProfile" />
</template>

<script setup>
import { ref, computed } from "vue";
import BaseForm from "./utility/BaseForm.vue";
import { useUserStore } from "./store/userStore";
import { useSendUserData } from "./composables/sendUserData";
import { useToast } from "./composables/useToast";

const { show } = useToast();

const userStore = useUserStore();
const { updateProfile, loading } = useSendUserData();

const submitProfile = async (formData) => {
  try {
    const { safeUser, message } = await updateProfile(formData);
    userStore.user = { ...userStore.user, ...safeUser };

    show({ message: message, type: "success" });
  } catch (err) {
    console.error("Profile update failed:", err);
    show({
      message: err.message || "Failed to update profile.",
      type: "error",
      duration: 5000,
    });
  }
};

const formFields = computed(() => [
  {
    id: "name",
    label: "First Name",
    type: "text",
    required: true,
    placeholder: "Enter first name",
    value: userStore.user.name || "",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    required: true,
    placeholder: "Enter email",
    value: userStore.user.email || "",
  },
  {
    id: "phone",
    label: "Phone Number",
    type: "tel",
    required: true,
    placeholder: "Enter phone number",
    value: userStore.user.phone || "",
  },
]);
</script>
