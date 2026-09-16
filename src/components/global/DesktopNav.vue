<template>
  <ul class="desktop-nav">
    <li v-for="item in navLinks" :key="item.text">
      <router-link
        :to="item.path"
        exact-active-class="isActive"
        class="nav-link"
      >
        {{ item.text }}
      </router-link>
    </li>
  </ul>
</template>

<script setup>
defineProps({
  navLinks: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
/* ================= DESKTOP NAV ================= */
.desktop-nav {
  display: flex;
  list-style: none;
  gap: 32px;
  margin: 0;
  padding: 0;
}

.nav-link {
  position: relative;
  color: var(--text-light);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.25s ease;
}

/* underline animation */
.nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 0%;
  height: 2px;
  background: var(--bg-pink);
  transition: width 0.3s ease;
}

.nav-link:hover,
.nav-link.isActive {
  color: var(--bg-pink);
}

.nav-link:hover::after,
.nav-link.isActive::after {
  width: 100%;
}
</style>
