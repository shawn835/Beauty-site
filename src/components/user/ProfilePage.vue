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
  background: #1a1f22;
  color: #e5e7eb;
}

.profile-banner {
  height: 260px;
  background: linear-gradient(135deg, #2e3538, #1f2528);
  position: relative;
  overflow: hidden;
}

.banner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent, rgba(26, 31, 34, 0.85));
}

.banner-content {
  position: absolute;
  bottom: 2rem;
  left: 2.5rem;
  z-index: 2;
}

.banner-title {
  font-size: 2.4rem;
  font-weight: 700;
  color: #f5d698;
  margin: 0;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
  text-align: center;
  margin: auto;
  width: 100%;
}

/* Container */
.profile-container {
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 2.5rem;
  gap: 2.5rem;
  margin-top: -80px;
  position: relative;
  z-index: 3;
}

@media (max-width: 1024px) {
  .profile-container {
    flex-direction: column;
    margin-top: -40px;
  }
}

/* Sidebar */
.profile-sidebar {
  width: 280px;
  background: #252b2e;
  border-radius: 20px;
  padding: 2rem 1.5rem;
  height: fit-content;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  flex-shrink: 0;
}

.avatar-section {
  text-align: center;
  margin-bottom: 2rem;
}

.avatar {
  width: 110px;
  height: 110px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  background: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 5px solid #f5d698;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-icon {
  font-size: 3.5rem;
  color: white;
}

.user-details h2 {
  margin: 0 0 0.3rem;
  color: #f5d698;
}

.phone,
.email {
  margin: 0;
  color: #aaa;
  font-size: 0.95rem;
}

/* Menu */
.menu-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  color: #ddd;
  text-decoration: none;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.menu-item:hover {
  background: rgba(245, 214, 152, 0.1);
  color: #f5d698;
}

.menu-item.active {
  background: rgba(245, 214, 152, 0.15);
  color: #f5d698;
  font-weight: 600;
}

/* Main Content */
.profile-content {
  flex: 1;
  background: #252b2e;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  min-height: 600px;
}

/* Responsive */
@media (max-width: 768px) {
  .profile-sidebar {
    width: 100%;
  }

  .profile-content {
    padding: 2rem 1.5rem;
  }
}
</style>
