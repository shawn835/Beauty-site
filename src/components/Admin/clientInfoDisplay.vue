<template>
  <div v-for="(arr, index) in array" :key="index" class="booking-item">
    <span data-label="Name"><slot name="name" :item="arr"></slot></span>
    <span data-label="Date"><slot name="date" :item="arr"></slot></span>
    <span data-label="Time"><slot name="time" :item="arr"></slot></span>
    <span data-label="Staus"><slot name="status" :item="arr"></slot></span>
    <span data-label="Phone"><slot name="phone" :item="arr"></slot></span>
    <span data-label="Technician"
      ><slot name="technician" :item="arr"></slot
    ></span>
    <span data-label="Services"><slot name="services" :item="arr"></slot></span>

    <!-- Images Column -->
    <div data-label="Images" class="image-preview">
      <slot name="image" :item="arr"></slot>
    </div>

    <span data-label="Booking Code">
      <slot name="code" :item="arr"></slot>
    </span>
  </div>
</template>

<script setup>
defineProps({
  array: Array,
});
</script>

<style scoped>
.booking-item {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  border-bottom: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  align-items: center;
}

.image-preview {
  display: flex;
  gap: 5px;
  justify-content: center;
  flex-wrap: wrap;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .booking-item {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 15px;
    border-bottom: 1px solid #ddd;
  }

  .booking-item span {
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 14px;
  }

  /* Labels for clarity */
  .booking-item span::before {
    content: attr(data-label);
    font-weight: bold;
    margin-right: 10px;
    color: #555;
  }

  /* Images should be larger on small screens */
  .image-preview img {
    width: 60px;
    height: 60px;
  }
}
</style>
