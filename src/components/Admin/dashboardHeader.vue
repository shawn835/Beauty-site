<template>
  <div class="dashboard-header">
    <h3>Admin Dashboard</h3>
    <div class="log-out" @click="logout">
      <i class="fa-solid fa-right-from-bracket"></i>
      log-out
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const logout = () => {
  localStorage.removeItem("admin");
  router.push("/admin/login");
};
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
