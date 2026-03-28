<template>
  <BaseForm
    title="Update Profile"
    subtitle="Keep your details up to date"
    :fields="formFields"
    button-text="Update Profile"
    :loading="loading"
    @submit="submitProfile"
  />
</template>

<script setup>
import { computed } from "vue";
import BaseForm from "./utility/BaseForm.vue";
import { useUserStore } from "./store/userStore";
import { useSendUserData } from "./composables/sendUserData";
import { useToast } from "./composables/useToast";
import { useRouter } from "vue-router";

const router = useRouter();

const { show } = useToast();

const userStore = useUserStore();
const { updateProfile, loading } = useSendUserData();

const submitProfile = async (formData) => {
  try {
    const data = await updateProfile(formData);

    const { safeUser, message, pendingEmail } = data;

    // If backend sent an email (means verification started)
    if (pendingEmail && pendingEmail !== userStore.user.email) {
      localStorage.setItem("pendingEmail", pendingEmail);
      show({
        message: "We sent a verification code to your new email.",
        type: "info",
      });
      router.push("/token/confirmation"); // move user to verification screen
    }
    // Normal update (no email verification required)
    else if (safeUser) {
      userStore.user = { ...userStore.user, ...safeUser };
      show({ message: message, type: "success" });
    } else {
      show({ message: message || "No changes made.", type: "info" });
    }
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
