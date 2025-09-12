<template>
  <div class="menu-drawer">
    <template v-for="item in userMenu" :key="item.label">
      <router-link v-if="item.route" :to="item.route" class="menu-item">
        {{ item.label }}
      </router-link>

      <button
        v-else-if="item.action === 'logout'"
        class="menu-item"
        @click="handleLogout"
        :disabled="loading">
        {{ loading ? "Logging out..." : item.label }}
      </button>
    </template>
  </div>
</template>

<script setup>
import { useUserStore } from "../store/userStore";
import { ref } from "vue";
import { useRouter } from "vue-router";

const loading = ref(false);
const userStore = useUserStore();
const router = useRouter();

const userMenu = [
  { label: "profile", route: "/my/profile" },
  { label: "bookings", route: "/my/bookings" },
  { label: "favourites", route: "/my/favourites" },
  { label: "logout", action: "logout" },
];

const handleLogout = async () => {
  loading.value = true;

  await new Promise((resolve) => setTimeout(resolve, 1500));

  await userStore.logOutUser(router);

  loading.value = false;
};
</script>

<style scoped>
.menu-drawer {
  position: absolute;
  top: 2.8rem;
  right: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  min-width: 150px;
  background: var(--background-primary);
  z-index: 10000;
}

.menu-item {
  cursor: pointer;
  padding: 6px 8px;
  transition: all 0.2s ease;
}

.menu-item:hover {
  color: var(--hover-color);
}

@media (max-width: 992px) {
  .menu-drawer {
    position: static;
    border: none;
    box-shadow: none;
    background: transparent;
    padding-left: 1.4rem;
    gap: 0.4rem;
  }
}
</style>
