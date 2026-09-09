<template>
  <!-- Overlay -->
  <div v-if="open" class="overlay" @click="closeMenu" />

  <!-- Drawer -->
  <aside class="mobile-drawer" :class="{ open }">
    <!-- HEADER -->
    <div class="drawer-header">
      <div class="back-btn" v-if="currentView === 'profile'">
        <font-awesome-icon
          icon="arrow-left"
          class="arrow-left"
          @click="goBack"
        />
      </div>

      <div class="logo" v-if="currentView === 'main'">
        symos<span class="logo-pink">spa</span>
      </div>
    </div>

    <!-- MAIN MENU -->
    <template v-if="currentView === 'main'">
      <!-- Navigation Links -->
      <nav class="mobile-nav">
        <ul>
          <li v-for="item in navLinks" :key="item.text">
            <router-link :to="item.path" @click="closeMenu" class="mobile-link">
              {{ item.text }}
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- Actions -->
      <div class="mobile-actions">
        <BaseButton
          v-if="!userStore.user"
          @click="handleRegister"
          label="Register"
        />

        <BaseButton
          v-if="userStore.user?.role === 'admin'"
          @click="goToAdmin"
          label="Admin Panel"
          variant="outline"
        />
      </div>

      <!-- ACCOUNT ENTRY -->
      <div
        v-if="userStore.user"
        class="mobile-account-entry"
        @click="openProfileMenu"
      >
        <div class="account-info">
          <h3>{{ userStore.user.name }}</h3>
          <p>
            Manage account
            <FontAwesomeIcon icon="arrow-right" class="arrow-right" />
          </p>
        </div>
      </div>
    </template>

    <!-- PROFILE MENU -->
    <template v-else>
      <div class="welcome-section">
        {{ greeting.text }}, <font-awesome-icon :icon="greeting.icon" />
        <p>{{ userStore.user.name }}</p>

        <p>Manage your account and bookings</p>
      </div>
      <nav class="mobile-nav">
        <ul class="profile-links">
          <li v-for="item in profileLinks" :key="item.name">
            <router-link
              :to="{ name: item.name }"
              @click="closeMenu"
              class="mobile-link"
            >
              <font-awesome-icon :icon="item.icon" />
              {{ item.label }}
            </router-link>
          </li>
        </ul>
      </nav>
    </template>
  </aside>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/userStore";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { getGreeting } from "@/Utility/greetings";
const greeting = getGreeting();

import BaseButton from "../BaseButton.vue";

const currentView = ref("main");
const emit = defineEmits(["close"]);
const router = useRouter();
const userStore = useUserStore();

const openProfileMenu = () => {
  currentView.value = "profile";
};
const goBack = () => {
  currentView.value = "main";
};

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  navLinks: {
    type: Array,
    required: true,
  },
  profileLinks: {
    type: Array,
    default: () => [],
  },
});

const handleRegister = () => {
  router.push("/register");
  emit("close");
};
const closeMenu = () => {
  currentView.value = "main";
  emit("close");
};

const goToAdmin = () => {
  router.push("/admin");
  emit("close");
};
</script>

<style scoped>
/* Overlay */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
  z-index: 998;
}

/* Drawer */
.mobile-drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: min(320px, 86vw);
  height: 100vh;
  background: #1f2528;
  z-index: 999;
  transform: translateX(-105%);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  padding: 1.4rem 1.2rem 1.6rem;
  border-right: 1px solid rgba(245, 214, 152, 0.1);
  box-shadow: 8px 0 30px rgba(0, 0, 0, 0.35);
}

.mobile-drawer.open {
  transform: translateX(0);
}

/* Header */
.drawer-header {
  display: flex;
  align-items: center;
  min-height: 48px;
  margin-bottom: 1.5rem;
}

.logo {
  font-size: 1.6rem;
  font-weight: 700;
  color: #f5d698;
  letter-spacing: 0.5px;
}

.logo-pink {
  color: #f76706;
}

.back-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  color: #f5d698;
  cursor: pointer;
  transition: background 0.2s;
}

.back-btn:hover {
  background: rgba(245, 214, 152, 0.1);
}

.arrow-left {
  font-size: 1.1rem;
}

/* Nav */
.mobile-nav {
  flex: 1;
  overflow-y: auto;
}

.mobile-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mobile-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 14px;
  color: #ddd;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 500;
  font-size: 1.05rem;
  transition: all 0.2s ease;
}

.mobile-link:hover,
.mobile-link.router-link-active {
  background: rgba(245, 214, 152, 0.12);
  color: #f5d698;
}

/* Actions */
.mobile-actions {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin: 1.5rem 0 1.2rem;
}

/* Account entry */
.mobile-account-entry {
  margin-top: auto;
  background: rgba(245, 214, 152, 0.08);
  border: 1px solid rgba(245, 214, 152, 0.15);
  border-radius: 14px;
  padding: 1rem 1.1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mobile-account-entry:hover {
  background: rgba(245, 214, 152, 0.14);
}

.account-info h3 {
  margin: 0 0 0.25rem;
  color: #f5d698;
  font-size: 1.1rem;
}

.account-info p {
  margin: 0;
  color: #aaa;
  font-size: 0.92rem;
  display: flex;
  align-items: center;
  gap: 6px;
}

.arrow-right {
  font-size: 0.8rem;
}

/* PROFILE MENU ONLY */
.welcome-section {
  margin-bottom: 1.5rem;
  padding: 0.4rem 0.2rem 1.3rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  color: #f5d698;
  font-size: 1.25rem;
  font-weight: 600;
}

.welcome-section p {
  margin: 0.45rem 0 0;
  font-size: 0.95rem;
  font-weight: 400;
  color: #cfcfcf;
}

.welcome-section p:last-child {
  color: #999;
  font-size: 0.9rem;
}

.profile-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.profile-links .mobile-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  color: #e5e7eb;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.profile-links .mobile-link:hover,
.profile-links .mobile-link.router-link-active {
  background: rgba(245, 214, 152, 0.12);
  color: #f5d698;
}
</style>
