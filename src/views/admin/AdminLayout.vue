<template>
  <div class="dashboard-container">
    <!-- Sidebar -->
    <aside :class="{ sidebar: true, 'sidebar-collapsed': !isSidebarOpen }">
      <div class="sidebar-header">
        <Font-awesome-icon icon="spa" class="spa" @click="toggleSidebar" />
      </div>

      <nav class="sidebar-nav">
        <ul>
          <li
            v-for="item in navItems"
            :key="item.route"
            :class="['nav-item', { active: activeRoute === item.route }]"
            @click="goTo(item.route)"
          >
            <Font-awesome-icon :icon="item.icon" :class="item.icon" />
            <span v-if="isSidebarOpen">{{ item.label }}</span>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Dynamic Page Content -->
      <section class="dashboard-content">
        <router-view />
      </section>
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
  min-height: 100vh;
  background-color: #f8f1f1;
  font-family: "Playfair Display", serif;
}

.sidebar {
  width: 250px;
  background-color: #2e2e2e; /* Dark charcoal */
  color: #fff;
  transition: width 0.3s ease;
  overflow: hidden;
}

.sidebar-collapsed {
  width: 60px;
}

.sidebar-header {
  padding: 20px;
  text-align: center;
}

.spa {
  font-size: 24px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.nav-item i {
  font-size: 20px;
  margin-right: 15px;
  color: #e6b8b8;
}

.nav-item span {
  font-size: 16px;
}

.nav-item:hover {
  background-color: #3c3c3c;
}

.nav-item.active {
  background-color: #d89b9b; /* Active item highlight */
}

.nav-item.active i,
.nav-item.active span {
  color: #fff;
}

.main-content {
  padding: 20px;
  width: 100%;
}

.dashboard-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Responsive Design */
@media (max-width: 768px) {
  .sidebar {
    width: 60px; /* Collapsed by default on mobile */
  }

  .sidebar-collapsed {
    width: 60px;
  }

  .sidebar-nav span {
    display: none; /* Hide text by default */
  }

  .sidebar:hover {
    width: 250px; /* Expand on hover */
  }

  .sidebar:hover .sidebar-nav span {
    display: inline; /* Show text on hover */
  }

  .dashboard-header h1 {
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .dashboard-header h1 {
    font-size: 20px;
  }

  .dashboard-content {
    padding: 15px;
  }
}
</style>
