<template>
  <div class="profile-page">
    <!-- Top Banner -->
    <div class="profile-banner">
      <div class="banner-overlay"></div>
    </div>

    <div class="profile-container">
      <!-- Sidebar -->
      <aside class="profile-sidebar">
        <div class="avatar-section">
          <div class="avatar">
            <font-awesome-icon icon="user" class="user" />
          </div>
          <div class="user-details">
            <h2>{{ user?.name || "Guest" }}</h2>
            <p class="phone">{{ user?.phone }}</p>
          </div>
        </div>

        <router-link
          v-for="item in menuItems"
          :key="item.name"
          :to="{ name: item.name }"
          class="menu-item"
          :class="{ active: isActive(item.name) }"
        >
          <font-awesome-icon :icon="item.icon" />
          <span>{{ item.label }}</span>
        </router-link>
      </aside>

      <!-- Main Content -->
      <main class="profile-content">
        <router-view />
      </main>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "../store/userStore";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const userStore = useUserStore();
const route = useRoute();

const user = computed(() => userStore.user);
const menuItems = [
  { label: "Account Details", name: "user-account", icon: "fa-solid fa-user" },
  {
    label: "Security",
    name: "user-security",
    icon: "lock",
  },
  {
    label: "Bookings",
    name: "user-bookings",
    icon: "calendar",
  },
  { label: "Favourites", name: "user-favourites", icon: "heart" },
];

const isActive = (name) => route.name === name;
</script>
<style scoped>
.profile-page {
  background: var(--bg-dark);
  min-height: 100vh;
}

.profile-banner {
  height: 180px;
  background: linear-gradient(135deg, var(--bg-pink), #9f1239);
  position: relative;
  border-bottom: 6px solid #2e3538;
}

.banner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(transparent, rgba(46, 53, 56, 0.7));
}

/* Container */
.profile-container {
  /* max-width: 1200px; */
  margin: -60px auto 0;
  padding: 30px 20px;
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 30px;
}

/* Sidebar */
.profile-sidebar {
  background: #2e3538;
  border-radius: 24px;
  padding: 32px 24px;
  height: fit-content;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  position: sticky;
  top: 100px;
}

.avatar-section {
  text-align: center;
  margin-bottom: 40px;
}

.avatar {
  font-size: 5.5rem;
  color: var(--bg-pink);
  margin-bottom: 16px;
  filter: drop-shadow(0 8px 15px rgba(216, 27, 96, 0.3));
}

.user-details h2 {
  margin: 0 0 6px;
  font-size: 1.45rem;
}

.phone {
  color: var(--text-gray);
  font-size: 0.98rem;
}

/* Menu */
.menu-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  color: #ddd;
  text-decoration: none;
  border-radius: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.menu-item:hover {
  background: #3a4246;
  transform: translateX(6px);
}

.menu-item.active {
  background: var(--bg-pink);
  color: white;
  font-weight: 600;
}

/* Danger Zone */
.danger-zone {
  margin-top: 50px;
  padding-top: 20px;
  border-top: 1px solid #444;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Main Content */
.profile-content {
  background: #2e3538;
  border-radius: 24px;
  padding: 40px;
  min-height: 75vh;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

/* Responsive */
@media (max-width: 992px) {
  .profile-container {
    grid-template-columns: 1fr;
  }

  .profile-sidebar {
    position: relative;
    top: 0;
  }
}
</style>

<!-- <template>
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
import BaseForm from "./BaseForm.vue";
import { useUserStore } from "../store/userStore";
import { useSendUserData } from "../composables/sendUserData";
import { useToast } from "../composables/useToast";
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
</script> -->
