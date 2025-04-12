<template>
  <navbar @toggle-modal="isModalOpen = true" v-if="!$route.meta.hideLayout" />
  <RouterView />
  <footerSection v-if="!$route.meta.hideLayout" />

  <CodeModal v-if="isModalOpen" @close-modal="isModalOpen = false" />
</template>

<script setup>
import { ref, watch } from "vue";
import navbar from "./components/global/clientNavbar.vue";
import { RouterView } from "vue-router";
import footerSection from "./components/global/footerSection.vue";
import CodeModal from "./components/utility/CodeModal.vue";

const isModalOpen = ref(false);
watch(isModalOpen, (newValue) => {
  document.body.style.overflow = newValue ? "hidden" : "";
});
</script>
