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
  margin-top: 1.5rem;
  width: 100vw;
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
  margin: -60px auto 0;
  padding: 30px 20px;
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 30px;
  width: 100%;
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
  margin-top: 1rem;
  background: #2e3538;
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  width: 100%;
}

/* Responsive */
@media (max-width: 992px) {
  .profile-container {
    grid-template-columns: 1fr;
    margin: 0 auto;
    padding: 20px;
  }

  .profile-sidebar,
  .profile-banner {
    display: none;
  }
}
</style>
