<template>
  <div class="content-container">
    <div class="content-track" :style="style">
      <div class="content-info" v-for="(image, index) in array" :key="index">
        <div class="image" :style="style">
          <slot name="images" :content="image" />
          <div class="custom-content-info" :style="customContentStyle">
            <slot name="custom-content" :content="image"></slot>
          </div>
        </div>

        <slot name="extra-custom-content" :content="image"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  array: Array,
  style: Object,
  customContentStyle: Object,
});
</script>

<style scoped>
.content-container {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.content-track {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
}

.content-info {
  min-width: 25%;
  padding: 10px;
  text-align: center;
}

.image {
  overflow: hidden;
}

.image:hover::after {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  border-radius: 12px;
  pointer-events: none;
}

.image::after {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: transparent;
  pointer-events: none;
  transition: background-color 0.3s ease-in-out;
}

.custom-content-info {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 20px;
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translateX(-50%);
  font-size: larger;
  z-index: 10;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
}

.image:hover .custom-content-info {
  visibility: visible;
  opacity: 1;
}

@media (max-width: 992px) {
  .content-track {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 578px) {
  .content-track {
    grid-template-columns: 1fr;
  }

  .custom-content-info {
    visibility: visible;
    opacity: 1;
  }
}
</style>
