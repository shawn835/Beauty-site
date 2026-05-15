<template>
  <!-- Overlay -->
  <div v-if="open" class="overlay" @click="$emit('close')" />

  <!-- Drawer -->
  <aside class="mobile-drawer" :class="{ open }">
    <!-- Navigation links -->
    <ul class="mobile-nav">
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

    <!-- Actions -->
    <div class="mobile-actions">
      <button
        v-if="userStore.user"
        class="primary-button"
        @click="handleBooking"
      >
        Book Appointment
      </button>

      <button v-else class="primary-button" @click="handleRegister">
        Register
      </button>

      <button
        v-if="userStore.user?.role === 'admin'"
        class="primary-button admin-btn"
        @click="goToAdmin"
      >
        Admin
      </button>
    </div>

    <!-- Account section -->
    <div v-if="userStore.user" class="mobile-account">
      <h3 class="mobile-account-title">Account</h3>
      <logged />
    </div>
  </aside>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "../store/userStore";
import logged from "../user/logged.vue";

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
  router.push("/booking");
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
/* ================= OVERLAY ================= */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(3px);
  z-index: 999;
}

/* ================= DRAWER ================= */
.mobile-drawer {
  position: fixed;
  top: 78px;
  left: 0;
  right: 0;
  background: var(--bg-dark);
  z-index: 1000;
  padding: 20px;

  opacity: 0;
  transform: translateY(-12px);
  pointer-events: none;

  transition: all 0.3s ease;
}

.mobile-drawer.open {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

/* ================= NAV LINKS ================= */
.mobile-nav {
  list-style: none;
  padding: 0;
  margin: 0 0 20px;
}

.mobile-nav li {
  margin-bottom: 14px;
}

.mobile-link {
  color: var(--text-light);
  text-decoration: none;
  font-weight: 500;
}

/* ================= ACTIONS ================= */
.mobile-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* ================= ACCOUNT ================= */
.mobile-account {
  margin-top: 20px;
}

.mobile-account-title {
  color: var(--text-light);
  margin-bottom: 10px;
}

/* ================= BUTTONS (optional reuse safety) ================= */
.primary-button {
  background: var(--bg-pink);
  color: white;
  border: none;
  padding: 12px 26px;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
}

.admin-btn {
  background: transparent;
  border: 2px solid var(--bg-pink);
  color: var(--bg-pink);
}
</style>
