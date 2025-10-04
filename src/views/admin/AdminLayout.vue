<template>
  <div class="dashboard-container">
    <!-- Sidebar -->
    <aside :class="{ sidebar: true, 'sidebar-collapsed': !isSidebarOpen }">
      <div class="sidebar-header">
        <i class="fas fa-spa toggler-icon" @click="toggleSidebar"></i>
      </div>
      <nav class="sidebar-nav">
        <ul>
          <li
            :class="{ 'nav-item': true, active: activeRoute === 'dashboard' }"
            @click="goTo('admin-dashboard')">
            <i class="fas fa-home"></i>
            <span v-if="isSidebarOpen">Dashboard</span>
          </li>
          <li
            :class="{ 'nav-item': true, active: activeRoute === 'bookings' }"
            @click="goTo('admin-bookings')">
            <i class="fas fa-calendar-check"></i>
            <span v-if="isSidebarOpen">Bookings</span>
          </li>
          <li
            :class="{ 'nav-item': true, active: activeRoute === 'services' }"
            @click="goTo('admin-services')">
            <i class="fas fa-paint-brush"></i>
            <span v-if="isSidebarOpen">Services</span>
          </li>
          <li
            :class="{ 'nav-item': true, active: activeRoute === 'users' }"
            @click="goTo('admin-users')">
            <i class="fas fa-users"></i>
            <span v-if="isSidebarOpen">Users</span>
          </li>
          <li
            :class="{ 'nav-item': true, active: activeRoute === 'payments' }"
            @click="goTo('admin-payments')">
            <i class="fas fa-credit-card"></i>
            <span v-if="isSidebarOpen">Payments</span>
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
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const isSidebarOpen = ref(true);
const activeRoute = ref("dashboard"); // default

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const goTo = (name) => {
  router.push({ name });
};

// Watch for route change to highlight active tab
watch(
  () => route.name,
  (newName) => {
    activeRoute.value = newName?.replace("admin-", "") || "dashboard";
  },
  { immediate: true }
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

.toggler-icon {
  font-size: 24px;
  cursor: pointer;
  color: #e6b8b8; /* Soft pink accent */
  transition: color 0.3s ease;
}

.toggler-icon:hover {
  color: #d89b9b;
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
  flex: 1;
  padding: 20px;
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
