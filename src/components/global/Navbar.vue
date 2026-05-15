<template>
  <header class="header">
    <!-- Mini Bar -->
    <div class="mini-bar" :class="{ hidden: isScrolled }">
      <div class="mini-container">
        <div class="mini-left">
          <span><font-awesome-icon icon="location-pin" /> Nairobi, Kenya</span>
          <span class="mini-divider">•</span>
          <span>
            <font-awesome-icon icon="clock" class="clock" />
            Mon - Sat: 6AM - 9PM
          </span>
        </div>

        <div class="mini-right">
          <BaseButton
            label="+254724300399"
            variant="outline"
            icon-left="phone"
            size="small"
            @click="callCustomer('0724300399')"
          />

          <span class="mini-divider">•</span>

          <a href="mailto:hello@symosnailspa.com" class="mini-contact">
            <font-awesome-icon icon="envelope" class="envelope" />
            hello@symosnailspa.com
          </a>
        </div>
      </div>
    </div>

    <!-- Main Navbar -->
    <nav class="navbar" :class="{ scrolled: isScrolled }">
      <router-link to="/" class="logo">
        symos<span class="logo-pink">spa</span>
      </router-link>

      <div class="nav-container">
        <!-- Logo -->

        <!-- Desktop Navigation -->
        <DesktopNav :navLinks="navLinks" />

        <!-- Actions -->
        <NavbarActions />
      </div>

      <!-- Hamburger -->
      <div class="mobile-only">
        <hamburger :isOpen="menuOpen" />
      </div>
    </nav>

    <!-- Mobile Overlay + Menu -->
    <MobileNav
      :open="menuOpen"
      :navLinks="navLinks"
      @close="menuOpen = false"
    />
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

import DesktopNav from "./DesktopNav.vue";
import NavbarActions from "./NavbarActions.vue";
import MobileNav from "./MobileNav.vue";
import hamburger from "./hamburger.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import BaseButton from "../BaseButton.vue";
import { callCustomer } from "@/Utility/utils";

const menuOpen = ref(false);
const isScrolled = ref(false);

const navLinks = [
  { text: "Home", path: "/" },
  { text: "Services", path: "/services" },
  { text: "About", path: "/about" },
  { text: "Contact", path: "/contact" },
];

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
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

/* ====================== MINI BAR ====================== */
.mini-bar {
  background: #1f2528;
  color: #ddd;
  font-size: 0.92rem;
  padding: 9px 0;
  border-bottom: 1px solid #333;
  transition: all 0.35s ease;
}

.mini-bar.hidden {
  opacity: 0;
  transform: translateY(-12px);
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
  transition: color 0.25s ease;
}

.mini-contact:hover {
  color: var(--bg-pink);
}

/* ====================== LOGO ====================== */
.logo {
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
}

.logo-pink {
  color: var(--bg-pink);
}

/* navbar */
.navbar {
  background: rgba(46, 53, 56, 0.97);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #444;
  transition: all 0.35s ease;
  padding: 1rem 0;
}

.navbar.scrolled {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.35);
  background: rgba(46, 53, 56, 0.98);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mobile-only {
  display: none;
}
/* media */

@media (max-width: 768px) {
  .mobile-only {
    display: flex;
  }

  .nav-container {
    display: none;
  }
}
</style>
