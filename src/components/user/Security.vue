<template>
  <div class="security-page">
    <header class="page-header">
      <h1 class="page-title">Security Settings</h1>
      <p class="page-subtitle">
        Manage your account credentials, email verification, and security
        options.
      </p>
    </header>

    <!-- Change Password Card -->
    <div class="section-card">
      <h2 class="section-title">Change Password</h2>
      <BaseForm
        title="Update Your Password"
        subtitle="Keep your account secure by using a strong password"
        :fields="formFields"
        buttonText="Update Password"
        :form="form"
        :meta="fieldsMeta"
        :loading="passwordLoading"
        class="security-form"
        @submit="handlePasswordChange"
      />
    </div>

    <!-- Email Verification Card -->
    <div class="section-card">
      <h2 class="section-title">Email Verification</h2>

      <div class="verification-status">
        <div class="status-item">
          <div class="icon-wrapper">
            <i class="fa-solid fa-envelope"></i>
          </div>
          <div class="status-info">
            <strong class="info-label">Email Address</strong>
            <p class="info-value">
              {{ userStore.user?.email || "No email address found" }}
            </p>
          </div>
        </div>

        <div class="verify-badge" :class="{ verified: isEmailVerified }">
          <i
            class="fa-solid"
            :class="
              isEmailVerified ? 'fa-check-circle' : 'fa-triangle-exclamation'
            "
          ></i>
          <span>{{ isEmailVerified ? "Verified" : "Not Verified" }}</span>
        </div>
      </div>

      <button
        v-if="!isEmailVerified"
        class="resend-btn"
        @click="resendVerification"
      >
        Resend Verification Email
      </button>
    </div>

    <!-- Danger Zone Card -->
    <div class="section-card danger-zone">
      <div class="danger-header">
        <h3 class="danger-title">Danger Zone</h3>
        <p class="warning-text">
          Irreversible actions. Please proceed with caution.
        </p>
      </div>

      <div class="danger-actions">
        <BaseButton
          iconLeft="fa-solid fa-right-from-bracket"
          label="Logout"
          variant="warning"
          class="action-btn logout-btn"
          fullWidth
          @click="logout"
        />

        <BaseButton
          label="Delete Account Permanently"
          iconLeft="fa-solid fa-trash-can"
          variant="danger"
          class="action-btn delete-btn"
          fullWidth
          @click="showDeleteModal = true"
        />
      </div>
    </div>
  </div>

  <ConfirmModal
    :isOpen="showDeleteModal"
    title="Delete Your Account?"
    message="Are you sure you want to delete your account? This action cannot be undone."
    warningText="All your data will be lost! including bookings, payments, and favourites."
    type="danger"
    :loading="isDeleting"
    @confirm="deleteAccount()"
    @cancel="showDeleteModal = false"
  />
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import BaseForm from "@/components/BaseForm.vue";
import { useUserApi } from "../composables/userApi";
import { useToast } from "../composables/useToast";
import BaseButton from "../BaseButton.vue";
import ConfirmModal from "../ConfirmModal.vue";
import { useRouter } from "vue-router";
import { fieldsMeta } from "@/Utility/meta";
import { resetForm } from "@/Utility/utils.js";
import { useUserStore } from "../store/userStore";
const userStore = useUserStore();

const router = useRouter();
const passwordLoading = ref(false);
const isEmailVerified = ref(userStore.user?.isVerified);
const showDeleteModal = ref(false);
const isDeleting = ref(false);
const isLoggingOut = ref(false);
const { handleDeleteAccount, logOutUser, updatePassword } = useUserApi();
const { show } = useToast();
const form = reactive({});
const formFields = computed(() => [
  "currentPassword",
  "newPassword",
  "confirmPassword",
]);
formFields.value.forEach((field) => {
  form[field] = "";
});

//password change
const handlePasswordChange = async (formData) => {
  passwordLoading.value = true;
  try {
    const { message } = await updatePassword(formData);
    show({
      message: message || "Password updated successfully",
      type: "success",
    });
    resetForm(form, formFields.value);
  } catch (err) {
    console.error("Password update failed:", err);
    show({
      message: err.message || "Failed to update password.",
      type: "error",
      duration: 5000,
    });
  } finally {
    passwordLoading.value = false;
  }
};

const resendVerification = () => alert("Verification email sent!");

const deleteAccount = async () => {
  isDeleting.value = true;
  try {
    const data = await handleDeleteAccount();
    show({
      message: data.message || `account deleted successfully`,
      type: "success",
    });
    showDeleteModal.value = false;
    router.push("/register");
    userStore.clearUser();
  } catch (error) {
    show({
      message: error.message || "booking cancel failed",
      type: "error",
    });
    console.error(error);
  } finally {
    isDeleting.value = false;
  }
};

//logout

const logout = async () => {
  isLoggingOut.value = true;
  try {
    const data = await logOutUser();
    show({
      message: data.message || "logged out successfully",
      type: "success",
    });
    router.push("/login");
    userStore.clearUser();
  } catch (error) {
    show({
      message: error.message || "logged out failed",
      type: "error",
    });
  } finally {
    isLoggingOut.value = false;
  }
};
</script>
<style scoped>
/* Main Container */
.security-page {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  width: 100%;
}

/* Header Section */
.page-header {
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.page-title {
  color: var(--text-light);
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.02em;
}

.page-subtitle {
  color: var(--text-gray);
  font-size: 0.875rem;
  margin: 0.35rem 0 0;
}

/* Base Card Wrapper */
.section-card {
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  backdrop-filter: blur(8px);
}

.section-title {
  color: var(--nav-links);
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

/* Form Customizations */
:deep(.security-form h2),
:deep(.security-form .form-title) {
  color: var(--text-light);
  font-size: 1.05rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

:deep(.security-form .form-subtitle) {
  color: var(--text-gray);
  font-size: 0.85rem;
  margin-bottom: 1.25rem;
}

:deep(.form-group) {
  margin-bottom: 1.25rem;
}

:deep(label) {
  display: block;
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

:deep(input) {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: var(--text-light);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

:deep(input:focus) {
  outline: none;
  border-color: var(--nav-links);
  box-shadow: 0 0 0 3px rgba(245, 214, 152, 0.15);
}

:deep(button[type="submit"]) {
  background-color: var(--primary-button-background);
  color: var(--primary-button-color);
  border: 1px solid var(--primary-button-color);
  border-radius: 8px;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 0.5rem;
}

:deep(button[type="submit"]:hover) {
  background-color: var(--hover-color);
  color: var(--text-light);
  border-color: var(--hover-color);
}

/* Email Verification Section */
.verification-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 1rem 1.25rem;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon-wrapper {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: rgba(245, 214, 152, 0.1);
  color: var(--primary-icon-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

.status-info .info-label {
  display: block;
  color: var(--text-light);
  font-size: 0.95rem;
}

.status-info .info-value {
  color: var(--text-gray);
  font-size: 0.85rem;
  margin: 0.2rem 0 0;
}

/* Verification Badge */
.verify-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.85rem;
  border-radius: 20px;
  font-size: 0.825rem;
  font-weight: 600;
  background-color: rgba(247, 103, 6, 0.15);
  color: var(--hover-color);
  border: 1px solid rgba(247, 103, 6, 0.3);
}

.verify-badge.verified {
  background-color: rgba(46, 213, 115, 0.15);
  color: #2ed573;
  border-color: rgba(46, 213, 115, 0.3);
}

.resend-btn {
  align-self: flex-start;
  background-color: transparent;
  color: var(--nav-links);
  border: 1px solid var(--nav-links);
  border-radius: 8px;
  padding: 0.65rem 1.25rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.resend-btn:hover {
  background-color: var(--hover-bg);
  color: var(--hover-color);
  border-color: var(--hover-color);
}

/* Danger Zone Styling */
.danger-zone {
  background-color: rgba(216, 27, 96, 0.04);
  border: 1px solid rgba(216, 27, 96, 0.25);
}

.danger-title {
  color: var(--bg-pink);
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0;
}

.warning-text {
  color: var(--text-gray);
  font-size: 0.875rem;
  margin: 0.35rem 0 0;
}

.danger-actions {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.action-btn {
  border-radius: 8px;
  font-weight: 600;
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.logout-btn {
  background-color: transparent;
  color: var(--nav-links);
  border: 1px solid var(--nav-links);
}

.logout-btn:hover {
  background-color: var(--nav-links);
  color: var(--text-dark);
}

.delete-btn {
  background-color: var(--bg-pink);
  color: var(--text-light);
  border: 1px solid var(--bg-pink);
}

.delete-btn:hover {
  background-color: #b0134c;
  border-color: #b0134c;
  box-shadow: 0 4px 12px rgba(216, 27, 96, 0.3);
}

/* Mobile Responsiveness */
@media (max-width: 640px) {
  .verification-status {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .danger-actions {
    flex-direction: column;
  }

  .resend-btn {
    width: 100%;
    text-align: center;
  }
}
</style>
