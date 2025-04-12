<template>
  <div class="hamburger" @click="handleClick" :style="props.display">
    <span class="top" :style="props.style"></span>
    <span class="middle" :style="props.style"></span>
    <span class="bottom" :style="props.style"></span>
  </div>
</template>

<script setup>
const props = defineProps({
  style: Object,
  display: Object,
  customClick: Function,
});
const emit = defineEmits(["toggle-menu"]);
const handleClick = () => {
  if (props.customClick) {
    props.customClick();
  } else {
    emit("toggle-menu");
  }
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
