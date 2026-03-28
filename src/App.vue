<template>
  <ToastContainer />
  <navbar v-if="!$route.meta.hideLayout" />
  <RouterView />
  <footerSection v-if="!$route.meta.hideLayout" />
</template>

<script setup>
import navbar from "./components/Home/navbar.vue";
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import footerSection from "./components/global/footerSection.vue";
import ToastContainer from "./components/utility/ToastContainer.vue";
import { useUserStore } from "./components/store/userStore";

const userStore = useUserStore();
onMounted(async () => {
  await userStore.fetchUser();
});
</script>
