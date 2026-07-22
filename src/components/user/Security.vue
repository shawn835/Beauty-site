<template>
  <div class="security-page">
    <h1 class="page-title">Security Settings</h1>

    <!-- Change Password -->
    <div>
      <h2>Change Password</h2>

      <BaseForm
        title="update your password"
        subtitle="Keep your account secure by using a strong password"
        :fields="formFields"
        buttonText="Update Password"
        :form="form"
        :meta="fieldsMeta"
        :loading="passwordLoading"
        @submit="handlePasswordChange"
      />
    </div>

    <!-- Email Verification -->
    <div class="section-card">
      <h2>Email Verification</h2>
      <div class="verification-status">
        <div class="status-item">
          <i class="fa-solid fa-envelope"></i>
          <div>
            <strong>Email Address</strong>
            <p>{{ userStore.user?.email }}</p>
          </div>
        </div>

        <div class="verify-badge" :class="{ verified: isEmailVerified }">
          <i
            class="fa-solid"
            :class="
              isEmailVerified ? 'fa-check-circle' : 'fa-exclamation-triangle'
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

    <!-- Danger Zone -->
    <div class="danger-zone">
      <h3>Danger Zone</h3>
      <p class="warning-text">
        Irreversible actions. Please proceed with caution.
      </p>

      <div class="danger-actions">
        <BaseButton
          iconLeft="fa-solid fa-right-from-bracket"
          label="logout"
          variant="warning"
          fullWidth
          @click="logout"
        />

        <BaseButton
          label="delete account permanently"
          iconLeft="fa-solid fa-trash-can"
          variant="danger"
          fullWidth
          @click="showDeleteModal = true"
        />
      </div>
    </div>
  </div>

  <ConfirmModal
    :isOpen="showDeleteModal"
    title="delete your account?"
    message="Are you sure you want to delete your account? This action
            cannot be undone."
    warningText="All your data will be lost! including bookings, payments and favourites"
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
.page-title {
  font-size: 2.2rem;
  margin-bottom: 10px;
  color: white;
}

.section-card {
  background: #2e3538;
  border-radius: 20px;
  padding: 32px;
  margin-bottom: 32px;
}

.section-card h2 {
  margin-top: 0;
  color: var(--bg-pink);
  font-size: 1.5rem;
}

.verification-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #242a2d;
  padding: 20px;
  border-radius: 16px;
  margin: 20px 0;
}

.verify-badge {
  padding: 8px 20px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.verify-badge.verified {
  background: #10b981;
  color: white;
}

.verify-badge:not(.verified) {
  background: #f59e0b;
  color: black;
}

.resend-btn {
  background: transparent;
  border: 2px solid var(--bg-pink);
  color: var(--bg-pink);
  padding: 12px 28px;
  border-radius: 50px;
  font-weight: 600;
}

.sessions-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.session-item {
  background: #242a2d;
  padding: 20px;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.session-info {
  display: flex;
  gap: 16px;
  align-items: center;
}

.current-badge {
  background: #10b981;
  color: white;
  padding: 6px 14px;
  border-radius: 30px;
  font-size: 0.85rem;
  font-weight: 600;
}

/* Danger Zone */
.danger-zone {
  background: #2e3538;
  border-radius: 20px;
  padding: 32px;
  border: 1px solid #ef444430;
}

.danger-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.danger-zone h3 {
  color: #ef4444;
}

.warning-text {
  color: #f87171;
  margin-bottom: 24px;
}

@media (max-width: 768px) {
  .danger-actions {
    flex-direction: column;
  }

  .verification-status {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
  .session-info p {
    margin: 0;
  }
  .session-info p:first-child {
    font-weight: 600;
  }
}
</style>
