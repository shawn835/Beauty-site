<template>
  <div class="overlay" v-if="isMenuOpen" @click="isMenuOpen = false"></div>
  <hamburger @toggle-menu="toggleMenu" />
  <div :class="['navbar', { active: isMenuOpen }]">
    <router-link to="/">
      <div class="logo">symos-spa</div>
    </router-link>

    <div class="close-icon">
      <span @click="toggleMenu">X</span>
    </div>

    <nav>
      <ul class="navbar-list">
        <li v-for="item in navLinks" :key="item.text">
          <router-link
            v-if="item.to"
            :to="item.to"
            exact-active-class="isActive">
            {{ item.text }}
          </router-link>
          <span v-else @click="item.action">{{ item.text }}</span>
        </li>
      </ul>
    </nav>

    <div class="buttons">
      <router-link
        v-for="(button, index) in btns"
        :key="index"
        :to="button.path">
        <buttons :button-text="button.text" :class-name="button.className" />
      </router-link>
    </div>

    <div class="socials">
      <div>
        <i v-for="(icon, index) in socialIcons" :key="index" :class="icon"></i>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, watch, onBeforeUnmount } from "vue";

import buttons from "./buttons.vue";
import hamburger from "../global/hamburger.vue";

defineProps({
  navLinks: { type: Array, required: true },
  btns: { type: Array },
  socialIcons: { type: Array },
});

//reactive state
const isMenuOpen = ref(false);
const isMobile = ref(window.innerWidth < 992);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

onMounted(() => {
  watch(isMenuOpen, (newValue) => {
    document.body.style.overflow = newValue ? "hidden" : "";
  });
});

onBeforeUnmount(() => {
  document.body.style.overflow = "";
});

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
</script>

<style scoped>
.logo {
  color: var(--background-secondary);
  font-style: oblique;
  font-size: 1.5rem;
}
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

a {
  color: inherit;
  text-decoration: none;
}

.navbar-list li a:hover {
  text-decoration: none;
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
  z-index: 50;
  overflow: hidden;
}

.navbar-list li .isActive {
  color: var(--hover-color);
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

.buttons {
  display: flex;
  gap: 20px;
}

.socials {
  display: none;
  flex-direction: column;
  gap: 20px;
  padding: 20px 0;
}
.socials > div {
  display: flex;
  gap: 20px;
}

.socials i {
  background-color: var(--primary-icon-color);
  width: 40px;
  height: 40px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  color: var(--secondary-icon-color);
  transition: all 0.3s ease-in;
}

.socials i:hover {
  transform: rotate(360deg);
}

@media (max-width: 992px) {
  .logo {
    display: none;
  }

  nav {
    width: 100%;
  }

  .overlay {
    position: fixed;
    inset: 0; /*top 0, left 0, height and witdh 100vh/100vw*/
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 18;
    cursor: pointer;
    overflow: hidden;
  }

  .navbar {
    top: 0;
    right: 0;
    flex-direction: column;
    justify-content: start;
    width: 300px;
    background-color: var(--background-secondary);
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
    border-bottom: 1px solid var(--text-primary);
    width: 100%;
  }

  .navbar-list li:hover {
    background: none;
  }

  .isActive {
    background: none;
  }

  .navbar-list li .isActive {
    color: var(--hover-color);
  }

  .socials {
    display: flex;
  }
}
</style>
