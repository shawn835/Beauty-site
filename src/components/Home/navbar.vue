<template>
  <div v-if="menuOpen" class="overlay" @click="menuOpen = false"></div>
  <div class="navbar">
    <!-- Logo -->
    <router-link to="/">
      <div class="logo">symos-spa</div>
    </router-link>

    <!-- Hamburger for mobile -->
    <hamburger :isOpen="menuOpen" @toggle="menuOpen = !menuOpen" />

    <!-- Desktop nav links -->
    <nav class="desktop-nav">
      <ul class="navbar-list">
        <li v-for="item in navLinks" :key="item.text">
          <router-link :to="item.path" exact-active-class="isActive">
            {{ item.text }}
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Desktop buttons -->
    <div class="buttons desktop-buttons">
      <button v-if="userStore.user" class="primary-button" @click="goBooking">
        Book Appointment
      </button>
      <button v-else class="primary-button" @click="goRegister">
        Register
      </button>
    </div>

    <!-- User menu (desktop) -->
    <div class="desktop-user-profile">
      <logged />
    </div>
  </div>

  <!-- Mobile drawer -->
  <div v-if="menuOpen" class="mobile-menu" :class="{ show: menuOpen }">
    <ul>
      <li v-for="item in navLinks" :key="item.text">
        <router-link :to="item.path" @click="menuOpen = false">
          {{ item.text }}
        </router-link>
      </li>
    </ul>

    <!-- Mobile buttons -->
    <div class="buttons">
      <button v-if="userStore.user" class="primary-button" @click="goBooking">
        Book Appointment
      </button>
      <button v-else class="primary-button" @click="goRegister">
        Register
      </button>
    </div>

    <!-- User Menu Integration -->
    <div v-if="userStore.user">
      <h3 class="mobile-account-heading">Account</h3>
      <drawer />
      >
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/userStore";
import drawer from "../user/drawer.vue";
import hamburger from "../global/hamburger.vue";
import logged from "../user/logged.vue";

const router = useRouter();
const userStore = useUserStore();
const menuOpen = ref(false);

const navLinks = [
  { text: "Home", path: "/" },
  { text: "About", path: "/about-us" },
  { text: "Services", path: "/services" },
  { text: "Gallery", path: "/photos" },
  { text: "Blog", path: "/blogposts" },
  { text: "Contact", path: "/contact-us" },
];

function goRegister() {
  router.push("/register");
}

function goBooking() {
  router.push("/book-appointment");
}

watch(menuOpen, (val) => {
  document.body.style.overflow = val ? "hidden" : "";
});
</script>

<style scoped>
/* Desktop */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-weight: 600;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 50;
  padding: 0.5rem 1rem;
}

.logo {
  color: var(--background-secondary);
  font-style: oblique;
  font-size: 1.5rem;
}

.navbar-list {
  display: flex;
  gap: 20px;
  list-style: none;
}

.navbar-list li {
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

a {
  color: white;
  transition: 0.3s ease-in-out;
  text-transform: uppercase;
  font-weight: 800;
}

a:hover {
  color: #d81b60;
}

.navbar-list li .isActive {
  color: #d81b60;
}

.buttons {
  display: flex;
  gap: 20px;
}

.desktop-nav,
.desktop-buttons {
  display: flex;
}

@media (max-width: 992px) {
  /* Hide desktop links/buttons */
  .desktop-nav,
  .desktop-buttons,
  .logo,
  .desktop-user-profile {
    display: none;
  }

  /* Mobile drawer */
  .mobile-menu {
    position: fixed;
    top: 0;
    right: 0;
    width: 280px;
    height: 100vh;
    background-color: var(--background-secondary);
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    z-index: 40;
    overflow-y: auto;
    box-shadow: -4px 0 12px rgba(0, 0, 0, 0.2);
    opacity: 0;
    transition: opacity 0.3s ease-in;
  }

  .mobile-menu.show {
    opacity: 1;
  }

  .mobile-menu ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 0;
    margin: 0;
  }

  .mobile-menu li {
    border-bottom: 1px solid var(--text-primary);
    padding-bottom: 5px;
  }

  .mobile-account-heading {
    margin-top: 20px;
    font-weight: 800;
    font-size: 1.2rem;
    color: var(--text-primary);
    border-bottom: 2px solid black;
    text-align: center;
  }

  .overlay {
    position: fixed;
    inset: 0; /*top 0, left 0, height and witdh 100vh/100vw*/
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 18;
    cursor: pointer;
    overflow: hidden;
  }
}

/* desktop: hide mobile drawer */
@media (min-width: 993px) {
  .mobile-menu {
    display: none !important;
  }
}
</style>
