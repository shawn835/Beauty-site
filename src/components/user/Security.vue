<template>
  <div class="security-page">
    <h1 class="page-title">Security Settings</h1>

    <!-- Change Password -->
    <div class="section-card">
      <h2>Change Password</h2>

      <BaseForm
        title="update your password"
        subtitle="Keep your account secure by using a strong password"
        :fields="passwordFields"
        buttonText="Update Password"
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
            <p>{{ user?.email }}</p>
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

    <!-- Active Sessions -->
    <!-- <div class="section-card"> -->
    <!-- <h2>Active Sessions</h2>
      <p class="section-desc">You're currently logged in on these devices</p>

      <div class="sessions-list">
        <div class="session-item current">
          <div class="session-info">
            <i class="fa-solid fa-desktop"></i>
            <div>
              <strong>This Device</strong>
              <small>Chrome on Windows • Last active: Just now</small>
            </div>
          </div>
          <span class="current-badge">Current</span>
        </div> -->

    <!-- Other sessions example -->
    <!-- <div
          v-for="session in otherSessions"
          :key="session.id"
          class="session-item"
        >
          <div class="session-info">
            <i class="fa-solid fa-mobile-screen-button"></i>
            <div>
              <strong>{{ session.device }}</strong>
              <small
                >{{ session.browser }} • Last active:
                {{ session.lastActive }}</small
              >
            </div>
          </div>
          <button class="logout-session-btn" @click="logoutSession(session.id)">
            Logout
          </button>
        </div>
      </div>
    </div> -->

    <!-- Danger Zone -->
    <div class="danger-zone">
      <h3>Danger Zone</h3>
      <p class="warning-text">
        Irreversible actions. Please proceed with caution.
      </p>

      <div class="danger-actions">
        <!-- <button class="danger-btn" @click="logoutAllDevices">
          <i class="fa-solid fa-right-from-bracket"></i>
          Logout from All Devices
        </button>

        <button class="danger-btn delete" @click="deactivateAccount">
          <i class="fa-solid fa-user-slash"></i>
          Deactivate Account
        </button> -->
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
import { ref } from "vue";
import BaseForm from "@/components/BaseForm.vue";
import { useUserApi } from "../composables/userApi";
import { useToast } from "../composables/useToast";
import BaseButton from "../BaseButton.vue";
import ConfirmModal from "../ConfirmModal.vue";

const passwordLoading = ref(false);
const isEmailVerified = ref(true);
const { handleDeleteAccount, logOutUser } = useUserApi();
const { show } = useToast();

const passwordFields = [
  {
    id: "currentPassword",
    label: "Current Password",
    type: "password",
    required: true,
  },
  {
    id: "newPassword",
    label: "New Password",
    type: "password",
    required: true,
  },
  {
    id: "confirmPassword",
    label: "Confirm New Password",
    type: "password",
    required: true,
  },
];

const otherSessions = [
  { id: 2, device: "iPhone 14", browser: "Safari", lastActive: "2 days ago" },
  { id: 3, device: "MacBook Pro", browser: "Chrome", lastActive: "1 week ago" },
];

const handlePasswordChange = () => {
  passwordLoading.value = true;
  setTimeout(() => {
    alert("Password updated successfully!");
    passwordLoading.value = false;
  }, 1500);
};

const resendVerification = () => alert("Verification email sent!");
const logoutAllDevices = () => alert("Logged out from all other devices");
const deactivateAccount = () => alert("Deactivate account flow...");
///DELETE ACCOUNT
const showDeleteModal = ref(false);
const isDeleting = ref(false);

const deleteAccount = async () => {
  isDeleting.value = true;
  try {
    const data = await handleDeleteAccount();
    show({
      message: data.message || `account deleted successfully`,
      type: "success",
    });
    showDeleteModal.value = false;
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
const isLoggingOut = ref(false);
const logout = async () => {
  isLoggingOut.value = true;
  try {
    const data = await logOutUser();
    show({
      message: data.message || "logged out successfully",
      type: "success",
    });
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
.security-page {
  padding: 30px 20px;
  max-width: 780px;
  margin: 0 auto;
}

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
</style>
