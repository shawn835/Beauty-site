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
  {
    label: "wallet",
    route: "admin-wallet",
    active: "wallet",
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

<style>
/* Base Layout */
.dashboard-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: var(--bg-grey);
  font-family: inherit;
}

/* =========================================
   SIDEBAR STYLING (Mobile-First / Responsive)
   ========================================= */
.sidebar {
  width: 260px;
  background-color: var(--bg-dark);
  color: var(--text-light);
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 100;
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.15);
}

/* Collapsed state for Desktop */
.sidebar.sidebar-collapsed {
  width: 80px;
}

.sidebar-header {
  padding: 1.25rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  cursor: pointer;
  font-weight: 700;
  font-size: 1.15rem;
  letter-spacing: 0.5px;
  color: var(--nav-links);
}

.spa-icon {
  font-size: 1.5rem;
  color: var(--primary-icon-color);
  min-width: 1.5rem;
  text-align: center;
}

.logo-text {
  white-space: nowrap;
  text-transform: capitalize;
}

/* Navigation List */
.sidebar-nav {
  flex: 1;
  padding: 1rem 0;
  overflow-y: auto;
  overflow-x: hidden;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.85rem 1.25rem;
  color: var(--text-secondary);
  cursor: pointer;
  transition:
    background 0.2s,
    color 0.2s;
  font-size: 0.95rem;
  white-space: nowrap;
  border-left: 4px solid transparent;
}

.nav-item svg {
  min-width: 1.25rem;
  font-size: 1.2rem;
  color: var(--primary-icon-color);
  text-align: center;
}

.nav-item:hover {
  background-color: var(--hover-bg);
  color: var(--hover-color);
}

.nav-item.active {
  background-color: rgba(245, 214, 152, 0.08);
  color: var(--nav-links);
  border-left-color: var(--hover-color);
  font-weight: 600;
}

/* Sidebar Footer */
.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background-color: var(--footer-bg);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  font-size: 1.8rem;
  background: var(--bg-pink);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.user-details {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.user-details strong {
  color: var(--text-light);
  font-size: 0.9rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.user-details small {
  color: var(--text-gray);
  font-size: 0.75rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

/* =========================================
   MAIN CONTENT & TOP BAR
   ========================================= */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background-color: var(--bg-light);
}

.top-bar {
  height: 70px;
  background-color: var(--bg-light);
  border-bottom: 1px solid var(--bg-grey);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  flex-shrink: 0;
  gap: 1rem;
}

.top-bar-left {
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 0; /* Allows text truncation if needed */
}

.toggle-btn {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: var(--text-dark);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.toggle-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.page-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-heading);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.top-bar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Search Bar */
.search-bar {
  display: flex;
  align-items: center;
  background-color: #f4f6f8;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  gap: 0.5rem;
  border: 1px solid transparent;
  transition: border-color 0.2s;
}

.search-bar:focus-within {
  border-color: var(--bg-pink);
  background-color: var(--bg-light);
}

.search-bar svg {
  color: var(--dark-gray);
  font-size: 0.9rem;
}

.search-bar input {
  border: none;
  background: none;
  outline: none;
  font-size: 0.9rem;
  color: var(--text-dark);
  width: 140px;
}

.notifications {
  position: relative;
  cursor: pointer;
  font-size: 1.2rem;
  color: var(--dark-gray);
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.notifications:hover {
  background-color: rgba(0, 0, 0, 0.05);
  color: var(--text-dark);
}

.profile .avatar {
  font-size: 1.5rem;
  width: 36px;
  height: 36px;
  background: var(--bg-pink);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content-area {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  background-color: #f9fafb;
}

/* =========================================
   MOBILE RESPONSIVENESS (The Magic Part ✨)
   ========================================= */
@media (max-width: 768px) {
  /* Hide search bar on smaller phones to save top bar space */
  .search-bar {
    display: none;
  }

  .page-title {
    font-size: 1rem;
  }

  .top-bar {
    padding: 0 1rem;
  }

  /* Make sidebar behave like a toggleable overlay drawer on mobile */
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    transform: translateX(-100%);
    box-shadow: none;
  }

  /* When sidebar is NOT collapsed on mobile, slide it in over the screen */
  .sidebar:not(.sidebar-collapsed) {
    transform: translateX(0);
    width: 280px;
    box-shadow: 10px 0 25px var(--overlay-color);
  }

  /* Optional backdrop overlay when mobile menu is active */
  .dashboard-container::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--overlay-color);
    z-index: 99;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }

  .dashboard-container:has(.sidebar:not(.sidebar-collapsed))::before {
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
