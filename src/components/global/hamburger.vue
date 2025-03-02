<template>
  <div class="hamburger" @click="emitToggleMenu">
    <span class="top"></span>
    <span class="middle"></span>
    <span class="bottom"></span>
  </div>
</template>

<script setup>
const emit = defineEmits(["toggle-menu"]);

const emitToggleMenu = () => {
  emit("toggle-menu");
};
</script>

<style scoped>
.hamburger {
  width: 25px;
  height: 30px;
  position: fixed;
  top: 15px;
  right: 20px;
  z-index: 50;
  cursor: pointer;
  display: none;
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
}

.middle {
  transform: translateY(5px);
  width: 50%;
}
.bottom {
  transform: translateY(10px);
}

@media (max-width: 992px) {
  .hamburger {
    display: block;
  }
}
</style>
