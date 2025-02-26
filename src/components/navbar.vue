<template>
  <hamburger @toggle-menu="toggleMenu" />
  <div :class="['navbar', { active: isMenuOpen }]">
    <div class="logo">beauty</div>

    <div class="close-icon">
      <span @click="toggleMenu">X</span>
    </div>
    <nav>
      <ul class="navbar-list">
        <li>
          <router-link to="/" exact-active-class="isActive">home</router-link>
        </li>
        <li>
          <router-link to="/about-us" exact-active-class="isActive"
            >about</router-link
          >
        </li>
        <li>
          <router-link to="/services" exact-active-class="isActive"
            >services</router-link
          >
        </li>
        <li>
          <router-link to="/photos" exact-active-class="isActive"
            >gallery</router-link
          >
        </li>
        <li>
          <router-link to="/contact-us" exact-active-class="isActive"
            >contact</router-link
          >
        </li>
        <li @click.prevent="navigateToBookingDetails">bookings</li>
      </ul>
    </nav>
    <router-link to="/online-bookings"
      ><buttons button-text="book appointment" class-name="primary-button"
    /></router-link>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineEmits } from "vue";

import buttons from "./utility/buttons.vue";
import hamburger from "./hamburger.vue";

//reactive state
const isMenuOpen = ref(false);
const isMobile = ref(window.innerWidth < 992);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const checkScreenWidth = () => {
  const isNowMobile = window.innerWidth < 992;

  // Update isMobile only if it changes
  if (isNowMobile !== isMobile.value) {
    isMobile.value = isNowMobile;

    // Close the menu when switching to desktop mode
    if (!isNowMobile) {
      isMenuOpen.value = false;
    }
  }
};

onMounted(() => {
  checkScreenWidth(); //check width on mount
  window.addEventListener("resize", checkScreenWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreenWidth);
});

//**toggling confirmation modal */
const emit = defineEmits(["toggle-modal"]);

//booking details route
const navigateToBookingDetails = () => {
  emit("toggle-modal");
};
</script>
<style scoped>
.navbar-list {
  display: flex;
  gap: 20px;
  color: var(--nav-links);
  padding: 0.8rem 0;
}

.navbar-list li {
  cursor: pointer;
  font-size: large;
  text-transform: uppercase;
  transition: all ease-in 0.3s;
}

.navbar-list li:hover {
  background-color: var(--hover-bg);
  color: var(--hover-color);
  border-radius: 10px;
  padding: 0 2px;
}

/* Reset default styles for links */
.navbar-list li a {
  color: inherit; /* Inherit text color from parent */
  text-decoration: none;
}

.navbar-list li a:hover {
  text-decoration: none; /* Prevent underline on hover */
}
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-weight: 600;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  z-index: 10;
  overflow: hidden;
}

.isActive {
  background-color: var(--hover-bg);
  border-radius: 10px;
  padding: 0 2px;
}

.close-icon {
  position: absolute;
  top: 10px;
  left: 10px;
  color: var(--secondary-icon-color);
  font-size: 1.5rem;
  border-bottom: 1px solid var(--secondary-icon-color);
  width: 100%;
  display: none;
}

.close-icon span {
  cursor: pointer;
}

@media (max-width: 992px) {
  .logo {
    display: none;
  }

  nav {
    width: 100%;
  }

  .navbar {
    top: 0;
    right: 0;
    flex-direction: column;
    justify-content: start;
    width: 300px;
    background-color: var(--background-primary);
    align-items: flex-start;
    height: 100vh;
    padding: 10px;
    transform: translateX(100%);
    transform-origin: right;
    overflow: hidden;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    opacity: 0;
    transition: transform 0.5s ease, opacity 0.5s ease;
  }

  .navbar.active {
    transform: scale(1);
    opacity: 1;
  }

  .navbar-list {
    flex-direction: column;
    margin-top: 30px;
    color: var(--text-primary);
  }

  .close-icon {
    display: block;
  }

  .navbar-list li {
    border-bottom: 1px solid var(--background-secondary);
    width: 100%;
  }
}
</style>
