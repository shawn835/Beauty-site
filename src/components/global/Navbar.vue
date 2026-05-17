<template>
  <header class="header">
    <!-- MiniBar (now animated) -->
    <MiniBar :progress="progress" />

    <!-- Main Navbar -->
    <nav
      class="navbar"
      :style="{
        transform: `translateY(${-progress * 42}px)`,
      }"
    >
      <div class="nav-container">
        <!-- Logo -->
        <div class="logo">
          <router-link to="/">
            symos<span class="logo-pink">spa</span>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <DesktopNav :navLinks="navLinks" />

        <!-- Desktop Actions -->
        <div class="nav-right">
          <NavbarActions />
        </div>
      </div>
    </nav>

    <!-- Floating Mobile Hamburger -->
    <div class="hamburger-wrapper mobile-only">
      <Hamburger :isOpen="menuOpen" @toggle="menuOpen = !menuOpen" />
    </div>

    <!-- Mobile Navigation -->
    <MobileNav
      :open="menuOpen"
      :navLinks="navLinks"
      @close="menuOpen = false"
    />
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import MiniBar from "./MiniBar.vue";
import DesktopNav from "./DesktopNav.vue";
import NavbarActions from "./NavbarActions.vue";
import MobileNav from "./MobileNav.vue";
import Hamburger from "./Hamburger.vue";
const menuOpen = ref(false);

const navLinks = [
  { text: "Home", path: "/" },
  { text: "Services", path: "/services" },
  { text: "About", path: "/about" },
  { text: "Contact", path: "/contact" },
];

watch(menuOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

// raw scroll
const scrollY = ref(0);

// smooth motion (critical for premium feel)
const smooth = ref(0);

const handleScroll = () => {
  scrollY.value = window.scrollY;
};

// animation loop (inertia)
const animate = () => {
  smooth.value += (scrollY.value - smooth.value) * 0.12;
  requestAnimationFrame(animate);
};

// normalized progress (0 → 1)
const progress = computed(() => {
  const p = smooth.value / 180;
  return Math.min(Math.max(p, 0), 1);
});

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  animate();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
/* ================= HEADER ================= */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

/* ================= LOGO ================= */

.logo a {
  color: white;
  text-decoration: none;
  font-size: 1.75rem;
  font-weight: 700;
}

.logo-pink {
  color: var(--bg-pink);
}

/* ================= NAVBAR ================= */
.navbar {
  background: rgba(46, 53, 56, 0.97);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #444;

  padding: 1rem 0;

  will-change: transform;
}

.navbar.scrolled {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.35);
  background: rgba(46, 53, 56, 0.98);
}

/* ================= CONTAINER ================= */
.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* ================= RIGHT SIDE ================= */
.nav-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* ================= MOBILE ONLY ================= */
.mobile-only {
  display: none;
}

/* hamburger button */
.hamburger-btn {
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  z-index: 1100;
}

.no-scroll {
  overflow: hidden;
  height: 100vh;
}

/* ================= RESPONSIVE ================= */

@media (max-width: 768px) {
  .mobile-only {
    display: flex;
  }

  .desktop-nav,
  .nav-actions {
    display: none;
  }

  .hamburger-wrapper {
    position: fixed;
    top: 28px;
    right: 24px;
    z-index: 1200;
  }
}
</style>
