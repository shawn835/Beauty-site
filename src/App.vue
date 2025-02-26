<template>
  <navbar @toggle-modal="isModalOpen = true" />
  <RouterView />
  <footerSection />

  <CodeModal v-if="isModalOpen" @close-modal="isModalOpen = false" />
</template>

<script setup>
import { ref } from "vue";
import navbar from "./components/navbar.vue";
import { RouterView } from "vue-router";
import footerSection from "./components/footerSection.vue";
import CodeModal from "./components/utility/CodeModal.vue";

const isModalOpen = ref(false);
</script>
