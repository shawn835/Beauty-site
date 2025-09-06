<template>
  <navbar
    :navLinks="[
      { text: 'Home', path: '/' },
      { text: 'About', path: '/about-us' },
      { text: 'Services', path: '/services' },
      { text: 'Gallery', path: '/photos' },
      { text: 'Blog', path: '/blogposts' },
      { text: 'Contact', path: '/contact-us' },
      { text: 'View Booking', action: navigateToBookingDetails },
    ]"
    :isMenuOpen="isAdminMenuOpen"
    :toggleMenu="toggleAdminMenu" />
</template>
<script setup>
import navbar from "../Home/navbar.vue";
import {
  defineEmits,
  ref,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  watch,
} from "vue";

const isAdminMenuOpen = ref(false);
const isMobile = ref(window.innerWidth < 992);

const toggleAdminMenu = (state) => {
  isAdminMenuOpen.value =
    typeof state === "boolean" ? state : !isAdminMenuOpen.value;
};

// Disable scrolling when menu is open
watch(isAdminMenuOpen, (newValue) => {
  document.body.style.overflow = newValue ? "hidden" : "";
});

onBeforeUnmount(() => {
  document.body.style.overflow = "";
});

// Check screen width and close menu if switching to desktop
// const checkScreenWidth = () => {
//   const isNowMobile = window.innerWidth < 992;

//   if (isNowMobile !== isMobile.value) {
//     isMobile.value = isNowMobile;

//     if (!isNowMobile) {
//       isAdminMenuOpen.value = false;
//     }
//   }
// };

// onMounted(() => {
//   checkScreenWidth();
//   window.addEventListener("resize", checkScreenWidth);
// });

// onUnmounted(() => {
//   window.removeEventListener("resize", checkScreenWidth);
// });
</script>
