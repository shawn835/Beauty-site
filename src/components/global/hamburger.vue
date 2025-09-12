<template>
  <div class="hamburger" @click="$emit('toggle')" :class="{ open: isOpen }">
    <span class="top"></span>
    <span class="middle"></span>
    <span class="bottom"></span>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: Boolean,
});
</script>

<style scoped>
.hamburger {
  width: 25px;
  height: 30px;
  position: fixed;
  top: 10px;
  right: 20px;
  z-index: 50;
  cursor: pointer;
  display: none;
  transition: transform 0.3s ease;
}

.top,
.middle,
.bottom {
  position: absolute;
  width: 100%;
  height: 2px;
  top: 0;
  left: 0;
  background: white;
  transition: all 0.3s ease;
  color: #fff;
}

.middle {
  transform: translateY(5px);
  width: 50%;
}

.bottom {
  transform: translateY(10px);
}

/* X transition */
.open {
  transform: rotate(90deg);
}

.hamburger.open .top {
  transform: rotate(45deg) translateY(6px) translateX(6px);
}

.hamburger.open .middle {
  display: none;
}

.hamburger.open .bottom {
  transform: rotate(-45deg) translateY(6px) translateX(-6px);
}

@media (max-width: 992px) {
  .hamburger {
    display: block;
  }
}
</style>
