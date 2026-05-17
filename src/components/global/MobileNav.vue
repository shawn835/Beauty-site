<template>
  <!-- Overlay -->
  <div v-if="open" class="overlay" @click="$emit('close')" />

  <!-- Drawer -->
  <aside class="mobile-drawer" :class="{ open }">
    <div class="drawer-header">
      <div class="logo">symos<span class="logo-pink">spa</span></div>
    </div>

    <!-- Navigation Links -->
    <nav class="mobile-nav">
      <ul>
        <li v-for="item in navLinks" :key="item.text">
          <router-link
            :to="item.path"
            @click="$emit('close')"
            class="mobile-link"
          >
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
        label="book now"
      />

      <BaseButton v-else @click="handleRegister" label="Register" />

      <BaseButton
        v-if="userStore.user?.role === 'admin'"
        @click="goToAdmin"
        label="Admin Panel"
        variant="outline"
      >
        Admin Panel
      </BaseButton>
    </div>

    <!-- Account Section -->
    <div v-if="userStore.user" class="mobile-account">
      <h3 class="account-title">Account</h3>
      <logged />
    </div>
  </aside>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "../store/userStore";
import logged from "../user/logged.vue";
import BaseButton from "../BaseButton.vue";

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  navLinks: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const router = useRouter();
const userStore = useUserStore();

const handleBooking = () => {
  router.push("/book/appointment");
  emit("close");
};

const handleRegister = () => {
  router.push("/register");
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
</style>
