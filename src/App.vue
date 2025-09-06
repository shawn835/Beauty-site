<template>
  <navbar v-if="!$route.meta.hideLayout" />
  <RouterView />
  <footerSection v-if="!$route.meta.hideLayout" />
</template>

<script setup>
import { onMounted } from "vue";
import { useUserStore } from "./components/store/userStore";
import navbar from "./components/Home/navbar.vue";
import { RouterView } from "vue-router";
import footerSection from "./components/global/footerSection.vue";
const userStore = useUserStore();
onMounted(() => {
  userStore.fetchUser();
});
</script>
