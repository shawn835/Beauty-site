<template>
  <div class="account-details">
    <div class="page-header">
      <h1>Account Details</h1>
      <BaseButton
        v-if="!isEditing"
        class="edit-btn"
        @click="enableEditing"
        label="Edit Profile"
        variant="outline"
        icon-left="pen"
      />
    </div>

    <BaseForm
      :title="isEditing ? 'Edit Account Details' : 'Your Information'"
      :subtitle="isEditing ? 'Update your personal information' : ''"
      :fields="formFields"
      :buttonText="isEditing ? 'Save Changes' : ''"
      :loading="loading"
      :showButton="isEditing"
      @submit="handleSubmit"
      :form="form"
      :meta="fieldsMeta"
      :disabled="!isEditing"
    >
      <!-- Extra slot for Cancel button when editing -->

      <template #actions v-if="isEditing">
        <BaseButton
          label="Cancel"
          variant="warning"
          size="medium"
          full-width
          @click="cancelEditing"
        />
      </template>
    </BaseForm>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import BaseForm from "../BaseForm.vue";
import BaseButton from "../BaseButton.vue";
import { useToast } from "../composables/useToast";
import { useUserStore } from "../store/userStore";
import { useUserApi } from "../composables/userApi";
import { fieldsMeta } from "@/Utility/meta";

const userStore = useUserStore();
const { show } = useToast();
const { updateProfile, loading } = useUserApi();

const formFields = computed(() => {
  return Object.keys(fieldsMeta).filter((key) =>
    ["name", "email", "phone"].includes(key),
  );
});

const form = reactive({});
Object.assign(
  form,
  Object.fromEntries(
    formFields.value.map((f) => [f, userStore.user?.[f] || ""]),
  ),
);
const isEditing = ref(false);

const enableEditing = () => {
  isEditing.value = true;
};

const cancelEditing = () => {
  isEditing.value = false;
  // Reset form to original values
  if (userStore.user) {
    Object.assign(form, {
      name: userStore.user.name || "",
      email: userStore.user.email || "",
      phone: userStore.user.phone || "",
    });
  }
};

const handleSubmit = async (formData) => {
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
    show({
      message: err.message || "Failed to update profile.",
      type: "error",
      duration: 5000,
    });
  }
};
</script>
<style scoped>
/* Extra styles for Account Details */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.edit-btn {
  background: transparent;
  border: 2px solid var(--bg-pink);
  color: var(--bg-pink);
  padding: 10px 24px;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.edit-btn:hover {
  background: rgba(216, 27, 96, 0.1);
}

/* Make disabled inputs look better */
.form-input:disabled,
.form-textarea:disabled {
  background: #242a2d;
  color: #aaa;
  cursor: not-allowed;
  border-color: #555;
}
</style>
