<template>
  <header class="header">
    <!-- Mini Bar -->
    <div class="mini-bar" :class="{ hidden: isScrolled }">
      <div class="mini-container">
        <div class="mini-left">
          <span>📍 Nairobi, Kenya</span>
          <span class="mini-divider">•</span>
          <span>🕒 Mon - Sat: 6AM - 9PM</span>
        </div>
        <div class="mini-right">
          <a href="tel:+254712345678" class="mini-contact">
            📞 +254 712 345 678
          </a>
          <span class="mini-divider">•</span>
          <a href="mailto:hello@symosnailspa.com" class="mini-contact">
            ✉️ hello@symosnailspa.com
          </a>
        </div>
      </div>
    </div>

    <!-- Main Navbar -->
    <nav class="navbar" :class="{ scrolled: isScrolled }">
      <div class="nav-container">
        <!-- Logo -->
        <router-link to="/" class="logo">
          symos<span class="logo-pink">spa</span>
        </router-link>

        <!-- Desktop Navigation -->
        <nav class="desktop-nav">
          <ul class="navbar-list">
            <li v-for="item in navLinks" :key="item.text">
              <router-link :to="item.path" exact-active-class="isActive">
                {{ item.text }}
              </router-link>
            </li>
          </ul>
        </nav>

        <!-- Desktop Buttons & User -->
        <div class="nav-right">
          <button
            v-if="userStore.user"
            class="primary-button"
            @click="goBooking"
          >
            Book Appointment
          </button>
          <button v-else class="primary-button" @click="goRegister">
            Register
          </button>

          <button
            class="primary-button admin-btn"
            @click="goTo('admin')"
            v-if="userStore.user?.role === 'admin'"
          >
            Admin
          </button>

          <div class="desktop-user-profile">
            <logged />
          </div>

          <!-- Hamburger -->
          <hamburger :isOpen="menuOpen" @toggle="menuOpen = !menuOpen" />
        </div>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div v-if="menuOpen" class="overlay" @click="menuOpen = false"></div>

    <div v-if="menuOpen" class="mobile-menu" :class="{ show: menuOpen }">
      <!-- Your existing mobile menu content -->
      <ul>
        <li v-for="item in navLinks" :key="item.text">
          <router-link :to="item.path" @click="menuOpen = false">
            {{ item.text }}
          </router-link>
        </li>
      </ul>

      <div class="buttons mobile-buttons">
        <button v-if="userStore.user" class="primary-button" @click="goBooking">
          Book Appointment
        </button>
        <button v-else class="primary-button" @click="goRegister">
          Register
        </button>
      </div>

      <div v-if="userStore.user">
        <h3 class="mobile-account-heading">Account</h3>
       
      </div>
    </div>
  </header>
</template>
<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/userStore";
import hamburger from "../global/hamburger.vue";
import logged from "../user/logged.vue";

const router = useRouter();
const userStore = useUserStore();
const menuOpen = ref(false);
const isScrolled = ref(false);

const navLinks = [
  { text: "Home", path: "/" },
  { text: "About", path: "/about-us" },
  { text: "Services", path: "/services" },
  // { text: "Blog", path: "/blogposts" },
  { text: "Contact", path: "/contact-us" },
];

function goRegister() {
  router.push("/register");
}

function goTo(route) {
  router.push(`/${route}`);
}

function goBooking() {
  router.push("/book-appointment");
}
// Scroll Effect
onMounted(() => {
  window.addEventListener("scroll", () => {
    isScrolled.value = window.scrollY > 100;
  });
});

onUnmounted(() => {
  window.removeEventListener("scroll", () => {});
});

watch(menuOpen, (val) => {
  document.body.style.overflow = val ? "hidden" : "";
});
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.mini-bar {
  background: #1f2528;
  color: #ddd;
  font-size: 0.92rem;
  padding: 9px 0;
  border-bottom: 1px solid #333;
  transition: all 0.4s ease;
}

.mini-bar.hidden {
  opacity: 0;
  transform: translateY(-100%);
  pointer-events: none;
}

.mini-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.mini-divider {
  opacity: 0.4;
  margin: 0 8px;
}

.mini-contact {
  color: #ddd;
  text-decoration: none;
  transition: color 0.3s;
}

.mini-contact:hover {
  color: var(--bg-pink);
}

/* ====================== MAIN NAVBAR ====================== */
.navbar {
  background: rgba(46, 53, 56, 0.97);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #444;
  transition: all 0.4s ease;
}

.navbar.scrolled {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.35);
  transform: translateY(-4px);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  height: 78px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
}

.logo-pink {
  color: var(--bg-pink);
}

.navbar-list {
  display: flex;
  gap: 32px;
  list-style: none;
}

.navbar-list a {
  color: var(--text-light);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.navbar-list a:hover,
.navbar-list a.isActive {
  color: var(--bg-pink);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

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

/* Mobile */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
}

.mobile-menu {
  position: fixed;
  top: 78px;
  left: 0;
  right: 0;
  background: var(--bg-dark);
  z-index: 1000;
  padding: 20px;
  transform: translateY(-100%);
  transition: transform 0.4s ease;
}

.mobile-menu.show {
  transform: translateY(0);
}
</style>
