<template>
  <div class="hamburger" @click="$emit('toggle')" :class="{ open: isOpen }">
    <span class="top"></span>
    <span class="middle"></span>
    <span class="bottom"></span>
  </div>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
});
</script>
<style scoped>
.hamburger {
  width: 26px;
  height: 20px;
  position: relative;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* bars */
.top,
.middle,
.bottom {
  width: 100%;
  height: 2px;
  background: white;
  border-radius: 999px;
  transition: all 0.3s ease;
  transform-origin: center;
}

/* shorter middle line */
.middle {
  width: 60%;
  align-self: flex-end;
}

/* ================= OPEN ANIMATION ================= */

.hamburger.open .top {
  transform: translateY(9px) rotate(45deg);
}

.hamburger.open .middle {
  opacity: 0;
  transform: scaleX(0);
}

.hamburger.open .bottom {
  transform: translateY(-9px) rotate(-45deg);
}
</style>
