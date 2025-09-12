<template>
  <div class="logged-wrapper" @click="toggleMenu" v-if="userStore.user">
    <div class="logged-in">
      welcome
      <div>
        <span class="icon">
          <i class="fa-solid fa-user"></i>
        </span>
        <span class="user-name">{{ userStore.user.name }}</span>
      </div>
    </div>

    <!-- Desktop drawer -->
    <drawer v-if="menuOpen" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import drawer from "./drawer.vue";
import { useUserStore } from "../store/userStore";

const userStore = useUserStore();

const menuOpen = ref(false);

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

// function handleClickOutside(event) {
//   if (!wrapper.value.contains(event.target)) {
//     menuOpen.value = false;
//   }
// }

// onMounted(() => document.addEventListener("click", handleClickOutside));
// onUnmounted(() => document.removeEventListener("click", handleClickOutside));
</script>

<style scoped>
.logged-wrapper {
  position: relative;
  display: inline-block;
  cursor: pointer;
  color: white;
  font-size: large;
}

.logged-in {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.menu-drawer {
  position: absolute;
  top: 2.8rem;
  right: 0;
  z-index: 10000;
}
</style>
