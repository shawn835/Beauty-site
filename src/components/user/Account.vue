<template>
  <div class="account-details">
    <!-- Page Header -->
    <header class="page-header">
      <div class="header-text">
        <h1 class="page-title">Account Details</h1>
        <p class="page-subtitle">
          Manage your personal information and profile settings.
        </p>
      </div>

      <BaseButton
        v-if="!isEditing"
        class="edit-btn"
        label="Edit Profile"
        variant="outline"
        icon-left="pen"
        @click="enableEditing"
      />
    </header>

    <!-- Main Card Body -->
    <div class="account-card" :class="{ 'is-editing': isEditing }">
      <BaseForm
        :title="isEditing ? 'Edit Account Details' : 'Your Information'"
        :subtitle="isEditing ? 'Update your personal information below' : ''"
        :fields="formFields"
        :buttonText="isEditing ? 'Save Changes' : ''"
        :loading="loading"
        :showButton="isEditing"
        :form="form"
        :meta="fieldsMeta"
        :disabled="!isEditing"
        class="account-form"
        @submit="handleSubmit"
      >
        <!-- Form Actions Slot (Cancel + Submit handling) -->
        <template #actions v-if="isEditing">
          <div class="form-actions-wrapper">
            <BaseButton
              label="Cancel"
              variant="warning"
              fullWidth
              size="medium"
              @click="cancelEditing"
            />
          </div>
        </template>
      </BaseForm>
    </div>
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
/* Page Container */
.account-details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
}

/* Header Section */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.header-text .page-title {
  color: var(--text-light);
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.02em;
}

.header-text .page-subtitle {
  color: var(--text-gray);
  font-size: 0.875rem;
  margin: 0.35rem 0 0;
}

/* Edit Toggle Button */
.edit-btn {
  background-color: var(--primary-button-background);
  color: var(--primary-button-color);
  border: 1px solid var(--primary-button-color);
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.edit-btn:hover {
  background-color: var(--hover-bg);
  color: var(--hover-color);
  border-color: var(--hover-color);
}

/* Form Container Card */
.account-card {
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: var(--gap);
  transition:
    border-color 0.3s ease,
    background-color 0.3s ease;
}

.account-card.is-editing {
  background-color: rgba(255, 255, 255, 0.035);
  border-color: rgba(216, 27, 96, 0.3); /* Subtle accent glow */
}

/* Responsive Scaling */
@media (max-width: 600px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .edit-btn {
    width: 100%;
    text-align: center;
  }

  .form-actions-wrapper {
    flex-direction: column-reverse;
  }
}
</style>
