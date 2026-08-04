<template>
  <div class="profile-page">
    <!-- Top Banner -->
    <div class="profile-banner">
      <div class="banner-overlay"></div>
      <div class="banner-content">
        <h1 class="banner-title">My Profile</h1>
      </div>
    </div>

    <div class="profile-container">
      <!-- Sidebar -->
      <aside class="profile-sidebar">
        <div class="avatar-section">
          <div class="avatar">
            <img v-if="user?.avatar" :src="user.avatar" alt="Profile" />
            <font-awesome-icon v-else icon="user" class="user-icon" />
          </div>
          <div class="user-details">
            <h2>{{ user?.name || "Guest User" }}</h2>
            <p class="phone">{{ user?.phone || "No phone added" }}</p>
            <p class="email">{{ user?.email }}</p>
          </div>
        </div>

        <div class="menu-list">
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
        </div>
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
  min-height: 100vh;
  background-color: var(--bg-dark);
  color: var(--text-light);
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    sans-serif;
}

/* Banner Styling */
.profile-banner {
  position: relative;
  height: 180px;
  background: linear-gradient(135deg, var(--bg-dark) 0%, #1a1e20 100%);
  border-bottom: 2px solid var(--bg-pink);
  display: flex;
  align-items: flex-end;
  padding: 0 2rem 1.5rem;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--overlay-color);
}

.banner-content {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.banner-title {
  color: var(--nav-links);
  font-size: 2.25rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: 0.5px;
}

/* Container Layout */
.profile-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--gap);
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: var(--gap);
}

/* Sidebar Styling */
.profile-sidebar {
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: fit-content;
  backdrop-filter: blur(10px);
}

/* Avatar Header Section */
.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: var(--secondary-button-background);
  border: 3px solid var(--bg-pink);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-icon {
  font-size: 2.5rem;
  color: var(--secondary-icon-color);
}

.user-details h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-light);
  margin: 0 0 0.25rem;
}

.user-details p {
  margin: 0.2rem 0;
  font-size: 0.875rem;
}

.user-details .phone {
  color: var(--text-gray);
}

.user-details .email {
  color: var(--text-secondary);
  word-break: break-all;
}

/* Sidebar Navigation Menu */
.menu-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  color: var(--nav-links);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
}

.menu-item .item-icon {
  color: var(--primary-icon-color);
  font-size: 1.1rem;
  transition:
    transform 0.2s ease,
    color 0.2s ease;
}

.menu-item:hover {
  background-color: var(--hover-bg);
  color: var(--hover-color);
}

.menu-item:hover .item-icon {
  color: var(--hover-color);
  transform: translateX(2px);
}

.menu-item.active {
  background-color: var(--bg-pink);
  color: var(--text-light);
  box-shadow: 0 2px 8px rgba(216, 27, 96, 0.3);
}

.menu-item.active .item-icon {
  color: var(--text-light);
}

/* Main Content Wrapper */
.profile-content {
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.75rem;
  min-height: 400px;
}

/* Responsive Styles */
@media (max-width: 768px) {
  /* Hides the aside sidebar on mobile/tablet viewports */
  .profile-sidebar {
    display: none;
  }

  .profile-container {
    grid-template-columns: 1fr;
    padding: 1rem;
  }

  .profile-banner {
    height: 140px;
    padding: 0 1rem 1rem;
  }

  .banner-title {
    font-size: 1.75rem;
  }
}
</style>
