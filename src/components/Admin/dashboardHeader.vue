<template>
  <div class="dashboard-header">
    <h3>Admin Dashboard</h3>
    <div class="log-out" @click="logout">
      <i class="fa-solid fa-right-from-bracket"></i>
    </div>
    <!-- <hamburger
      :style="{ background: 'black' }"
      :display="{ display: 'block' }"
      :custom-click="toggleAdminMenu" />-->
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import hamburger from "../global/hamburger.vue";
import { defineEmits } from "vue";
const router = useRouter();
const logout = () => {
  localStorage.removeItem("admin");
  router.push("/admin/login");
};
// const emit = defineEmits(["toggle-admin-menu"]);
// const toggleAdminMenu = () => {
//   emit("toggle-admin-menu");
// };
</script>

<style scoped>
.log-out {
  cursor: pointer;
  font-size: 20px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
</style>
