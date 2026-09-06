<template>
  <ToastContainer />
  <navbar v-if="!isAuthPage" />
  <RouterView />
  <footerSection v-if="!isAuthPage" />
</template>

<script setup>
import navbar from "./components/global/Navbar.vue";
import { RouterView } from "vue-router";
import { onMounted, computed } from "vue";
import footerSection from "./components/global/Footer.vue";
import ToastContainer from "./components/ToastContainer.vue";
import { useUserStore } from "./components/store/userStore";
import { useRoute } from "vue-router";
const route = useRoute();
const isAuthPage = computed(() =>
  ["login", "register", "verify"].includes(route.name),
);

const userStore = useUserStore();
onMounted(async () => {
  await userStore.fetchUser();
});
</script>
