<template>
  <BaseForm
    title="Update password"
    subtitle="Keep your details up to date"
    :fields="passwordFields"
    button-text="Update Password"
    :loading="loading"
    @submit="submitPassword" />
</template>
<script setup>
import BaseForm from "./utility/BaseForm.vue";
import { useSendUserData } from "./composables/sendUserData";
import { useToast } from "./composables/useToast";

const { updatePassword, loading } = useSendUserData();
const { show } = useToast();

const submitPassword = async (formData) => {
  try {
    const { message } = await updatePassword(formData);
    show({
      message: message || "Password updated successfully",
      type: "success",
    });
  } catch (err) {
    console.error("Password update failed:", err);
    show({
      message: err.message || "Failed to update password.",
      type: "error",
      duration: 5000,
    });
  }
};

const passwordFields = [
  {
    id: "currentPassword",
    label: "current password",
    type: "password",
    required: true,
    placeholder: "Enter old password",
    value: "",
  },
  {
    id: "newPassword",
    label: "new password",
    type: "password",
    required: true,
    placeholder: "Enter new password",
    value: "",
  },
  {
    id: "confirmPassword",
    label: "confirm password",
    type: "password",
    required: true,
    placeholder: "Enter confirm password",
    value: "",
  },
];
</script>
