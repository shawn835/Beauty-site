<template>
  <header class="header">
    <!-- Main Navbar -->
    <nav class="navbar">
      <div class="nav-container">
        <!-- Logo -->
        <div class="logo">
          <router-link to="/">
            symos<span class="logo-pink">spa</span>
          </router-link>
        </div>

        <!-- Mobile Booking Action -->
        <BaseButton
          v-if="userStore.user"
          class="mobile-booking-btn"
          @click="handleBooking"
          :label="
            bookingStore.totalSelectedServices > 0
              ? `Book (${bookingStore.totalSelectedServices})`
              : 'Secure Spot'
          "
        />

        <!-- Desktop Navigation -->
        <DesktopNav :navLinks="navLinks" />

        <!-- Desktop Actions -->
        <div class="nav-right">
          <NavbarActions />
        </div>

        <!-- Mobile Hamburger -->
        <div class="hamburger-wrapper mobile-only">
          <Hamburger :isOpen="menuOpen" @toggle="menuOpen = !menuOpen" />
        </div>
      </div>
    </nav>

    <!-- Mobile Navigation -->
    <MobileNav
      :open="menuOpen"
      :navLinks="navLinks"
      :profileLinks="profileMenu"
      @close="menuOpen = false"
    />
  </header>
</template>
<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import DesktopNav from "./DesktopNav.vue";
import NavbarActions from "./NavbarActions.vue";
import MobileNav from "./MobileNav.vue";
import Hamburger from "./Hamburger.vue";
import BaseButton from "../BaseButton.vue";
import { useUserStore } from "../store/userStore.js";
import { useBookingStore } from "../store/useBookingStore.js";
import { useRouter } from "vue-router";
const router = useRouter();

const menuOpen = ref(false);
const userStore = useUserStore();
const bookingStore = useBookingStore();

const navLinks = [
  { text: "Home", path: "/" },
  { text: "Services", path: "/services" },
  { text: "About", path: "/about" },
  { text: "Contact", path: "/contact" },
];

const profileMenu = [
  { label: "Account Details", name: "user-account", icon: "fa-solid fa-user" },
  {
    label: "Security",
    name: "user-security",
    icon: "lock",
  },
  {
    label: "Bookings",
    name: "user-bookings",
    icon: "calendar",
  },
  { label: "Favourites", name: "user-favourites", icon: "heart" },
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

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  animate();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const handleBooking = () => {
  router.push("/book/appointment");
};
</script>

<style scoped>
/* ================= HEADER ================= */

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3000;
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
  position: relative;
  z-index: 3100;
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

/* ================= MOBILE BOOKING BUTTON ================= */

.mobile-booking-btn {
  display: none;
}

/* ================= MOBILE ONLY ================= */

.mobile-only {
  display: none;
}

/* ================= NO SCROLL ================= */

.no-scroll {
  overflow: hidden;
  height: 100vh;
}

/* ================= RESPONSIVE ================= */

@media (max-width: 768px) {
  .mobile-only {
    display: flex;
    position: relative;
    z-index: 3200;
  }

  .desktop-nav,
  .nav-actions {
    display: none;
  }

  /* Mobile navbar layout */
  .nav-container {
    padding: 0 16px;
    gap: 10px;
  }

  /* Keep logo from taking too much space */
  .logo a {
    font-size: 1.45rem;
  }

  /* Mobile booking button */
  .mobile-booking-btn {
    display: inline-flex;

    font-size: 0.75rem;
    padding: 7px 12px;
    min-height: 34px;

    white-space: nowrap;
  }

  /* Hamburger stays in normal flex layout */
  .hamburger-wrapper {
    display: flex;
    flex-shrink: 0;
  }
}
</style>
