<template>
  <div class="logged-wrapper" v-if="userStore.user">
    <div class="logged-in">
      welcome
      <div>
        <router-link to="/profile/user">
          <span class="icon">
            <font-awesome-icon icon="user" class="user" />
          </span>
          <span class="user-name">{{ userStore.user.name }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "../store/userStore";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const userStore = useUserStore();
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

.user-name {
  color: white;
}
</style>
