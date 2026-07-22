<template>
  <div class="dashboard-container">
    <!-- Fixed Sidebar -->
    <aside :class="{ sidebar: true, 'sidebar-collapsed': !isSidebarOpen }">
      <div class="sidebar-header">
        <div class="logo" @click="toggleSidebar">
          <Font-awesome-icon icon="spa" class="spa-icon" />
          <span v-if="isSidebarOpen" class="logo-text">symos nail</span>
        </div>
      </div>

      <nav class="sidebar-nav">
        <ul>
          <li
            v-for="item in navItems"
            :key="item.route"
            :class="['nav-item', { active: activeRoute === item.route }]"
            @click="goTo(item.route)"
          >
            <Font-awesome-icon :icon="item.icon" />
            <span v-if="isSidebarOpen">{{ item.label }}</span>
          </li>
        </ul>
      </nav>

      <div class="sidebar-footer" v-if="isSidebarOpen">
        <div class="user-info">
          <div class="user-avatar">👩‍💼</div>
          <div class="user-details">
            <strong>Admin</strong>
            <small>admin@luxenails.com</small>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Top Bar -->
      <header class="top-bar">
        <div class="top-bar-left">
          <button class="toggle-btn" @click="toggleSidebar">
            <Font-awesome-icon icon="bars" />
          </button>
          <h1 class="page-title">{{ `${activeRoute} Management` }}</h1>
        </div>

        <div class="top-bar-right">
          <div class="search-bar">
            <Font-awesome-icon icon="magnifying-glass" />
            <input type="text" placeholder="Search..." />
          </div>
          <div class="notifications">
            <Font-awesome-icon icon="bell" />
          </div>
          <div class="profile">
            <div class="avatar">👩‍💼</div>
          </div>
        </div>
      </header>

      <!-- Scrollable Content -->
      <div class="content-area">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const router = useRouter();
const route = useRoute();

const isSidebarOpen = ref(true);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const navItems = [
  {
    label: "Dashboard",
    route: "admin-dashboard",
    active: "dashboard",
    icon: "home",
  },
  {
    label: "Bookings",
    route: "admin-bookings",
    active: "bookings",
    icon: "calendar",
  },
  {
    label: "Services",
    route: "admin-services",
    active: "services",
    icon: "paint-brush",
  },
  {
    label: "Users",
    route: "admin-users",
    active: "users",
    icon: "user",
  },
  {
    label: "Payments",
    route: "admin-payments",
    active: "payments",
    icon: "credit-card",
  },
  {
    label: "Uploads",
    route: "admin-uploads",
    active: "uploads",
    icon: "upload",
  },
  {
    label: "technicians",
    route: "admin-technicians",
    active: "technicians",
    icon: "star",
  },
];

const activeRoute = computed(() => route.name);

const goTo = (name) => router.push({ name });

// Watch for route change to highlight active tab
watch(
  () => route.name,
  (newName) => {
    activeRoute.value = newName?.replace("admin-", "") || "dashboard";
  },
  { immediate: true },
);
</script>

<style scoped>
.dashboard-container {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background: #1a1f22;
}

.sidebar {
  width: 260px;
  background: #252b2e;
  border-right: 1px solid rgba(245, 214, 152, 0.12);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 100vh;
  overflow: hidden;
}

.sidebar-collapsed {
  width: 72px;
}

.sidebar-header,
.sidebar-footer {
  flex-shrink: 0;
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem 0;
  scrollbar-width: thin;
}

/* ==================== MAIN AREA ==================== */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.top-bar {
  height: 72px;
  background: #252b2e;
  border-bottom: 1px solid rgba(245, 214, 152, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  flex-shrink: 0;
}

.content-area {
  flex: 1;
  padding: 2rem;
  overflow-y: auto; /* Only this scrolls */
  background: #1a1f22;
}

/* Rest of your styles */
.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 1.8rem 1.5rem;
  color: #f5d698;
  cursor: pointer;
}

.spa-icon {
  font-size: 1.9rem;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 1.5rem;
  color: #ddd;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-item:hover,
.nav-item.active {
  background: rgba(245, 214, 152, 0.12);
  color: #f5d698;
}

.nav-item.active {
  border-left: 4px solid #f5d698;
}
.sidebar-footer {
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  font-size: 1.6rem;
}

.user-details small {
  color: #888;
}

/* ==================== MAIN CONTENT ==================== */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Top Bar */
.top-bar {
  height: 72px;
  background: #252b2e;
  border-bottom: 1px solid rgba(245, 214, 152, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  z-index: 90;
}

.top-bar-left {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.toggle-btn {
  background: none;
  border: none;
  color: #ddd;
  font-size: 1.4rem;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
}

.page-title {
  font-size: 1.65rem;
  color: #f5d698;
  margin: 0;
  font-weight: 600;
}

.top-bar-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.search-bar {
  display: flex;
  align-items: center;
  background: #2e3538;
  border-radius: 9999px;
  padding: 8px 16px;
  width: 260px;
}

.search-bar input {
  background: transparent;
  border: none;
  outline: none;
  color: white;
  margin-left: 10px;
  width: 100%;
}

.notifications,
.profile {
  cursor: pointer;
  font-size: 1.35rem;
  padding: 8px;
  border-radius: 50%;
  transition: background 0.2s;
}

.notifications:hover,
.profile:hover {
  background: rgba(245, 214, 152, 0.1);
}

.avatar {
  width: 38px;
  height: 38px;
  background: #f5d698;
  color: #2e3538;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

/* Content Area */
.content-area {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  background: #1a1f22;
}
</style>
