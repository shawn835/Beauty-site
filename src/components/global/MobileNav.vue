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
          v-if="userStore.user"
          @click="handleBooking"
          :label="
            bookingStore.totalSelectedServices > 0
              ? `Book (${bookingStore.totalSelectedServices})`
              : 'Secure Spot'
          "
        />

        <BaseButton v-else @click="handleRegister" label="Register" />

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
        <h5>Welcome, {{ userStore.user.name }}</h5>
        <p>{{ userStore.user.email }}</p>

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
import { useBookingStore } from "../store/useBookingStore";

import BaseButton from "../BaseButton.vue";

const currentView = ref("main");
const emit = defineEmits(["close"]);
const router = useRouter();
const userStore = useUserStore();
const bookingStore = useBookingStore();

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

const handleBooking = () => {
  router.push("/book/appointment");
  emit("close");
};

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
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: 999;
  backdrop-filter: blur(4px);
  opacity: 1;
  transition: opacity 0.3s ease;
}

/* Drawer */
.mobile-drawer {
  position: fixed;
  top: 0;
  right: -100%;
  width: 85%;
  max-width: 360px;
  height: 100vh;
  background: #2e3538;
  box-shadow: -8px 0 25px rgba(0, 0, 0, 0.4);
  z-index: 1000;
  transition: right 0.45s cubic-bezier(0.32, 0.72, 0, 1);
  overflow-y: auto;
  padding-bottom: 80px;
}

.mobile-drawer.open {
  right: 0;
}

/* Header */
.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #444;
}

.logo {
  font-size: 1.7rem;
  font-weight: 700;
  color: white;
}

.logo-pink {
  color: var(--bg-pink);
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.8rem;
  color: #ddd;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

/* Navigation */
.mobile-nav ul {
  list-style: none;
  padding: 20px 0;
}

li {
  border-bottom: 2px solid #444;
}

.back-btn {
  background: white;
  border-radius: 6px;
  padding: 6px;
}

.mobile-link {
  display: block;
  padding: 16px 28px;
  color: #ddd;
  text-decoration: none;
  font-size: 1.1rem;
  transition: all 0.3s;
}

.mobile-link:hover,
.mobile-link.router-link-active {
  background: #3a4246;
  color: var(--bg-pink);
  padding-left: 34px;
}

/* Actions */
.mobile-actions {
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Account */
.mobile-account {
  padding: 20px 24px;
  border-top: 1px solid #444;
  margin-top: 20px;
}

.account-title {
  color: var(--bg-pink);
  margin-bottom: 12px;
  font-size: 1.1rem;
}

.account-info {
  color: var(--text-light);
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-weight: 600;
  background: #242a2d;
  border-radius: 14px;
  cursor: pointer;
}

.welcome-section {
  padding: 20px 24px;
  border-bottom: 1px solid #444;
  color: var(--text-light);
  background: #242a2d;
  border-radius: 14px;
  margin: 20px;
}
</style>
