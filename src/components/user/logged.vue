<template>
  <div class="logged-wrapper" v-if="userStore.user">
    <div class="logged-in">
      {{ greetingData.text }}, <font-awesome-icon :icon="greetingData.icon" />

      <div>
        <router-link to="/profile/user">
          <span class="icon">
            <font-awesome-icon icon="user" class="user" />
          </span>
          <span class="user-name">{{ firstName }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useUserStore } from "../store/userStore";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { getGreeting } from "@/Utility/greetings";
const greetingData = getGreeting();

const userStore = useUserStore();

//take only the first name
const firstName = computed(() => {
  if (userStore.user && userStore.user.name) {
    return userStore.user.name.split(" ")[0];
  }
  return "";
});
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
