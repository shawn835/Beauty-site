<template>
  <div class="nav-actions">
    <!-- Primary action -->
    <BaseButton
      v-if="userStore.user"
      @click="handleBooking"
      label="secure a spot"
      size="medium"
    />

    <BaseButton v-else @click="goRegister" label="register" />

    <!-- Admin -->
    <BaseButton
      v-if="userStore.user?.role === 'admin'"
      @click="goAdmin"
      label="admin"
      variant="outline"
      size="medium"
    />

    <!-- Profile -->
    <div v-if="userStore.user" class="user-profile">
      <logged />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "../store/userStore";
import logged from "../user/logged.vue";
import BaseButton from "../BaseButton.vue";

const router = useRouter();
const userStore = useUserStore();

const handleBooking = () => {
  router.push("/book/appointment");
};

const goRegister = () => {
  router.push("/register");
};

const goAdmin = () => {
  router.push("/admin");
};
</script>

<style scoped>
/* ================= NAV ACTIONS ================= */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* ================= BUTTONS ================= */
.primary-button {
  background: var(--bg-pink);
  color: white;
  border: none;
  padding: 12px 26px;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
}

.primary-button:hover {
  transform: translateY(-2px);
  filter: brightness(1.1);
}

.primary-button:active {
  transform: translateY(0);
}

.admin-btn {
  background: transparent;
  border: 2px solid var(--bg-pink);
  color: var(--bg-pink);
}

/* ================= PROFILE ================= */
.user-profile {
  display: flex;
  align-items: center;
}
</style>
