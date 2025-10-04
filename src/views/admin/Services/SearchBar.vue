<template>
  <div class="search-bar">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Search services..." />
  </div>
</template>

<script setup>
defineProps({ modelValue: String });
defineEmits(["update:modelValue"]);
</script>

<style scoped>
.search-bar {
  margin-bottom: 20px;
}

.search-bar input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-family: "Playfair Display", serif;
}

@media (max-width: 480px) {
  .search-bar input {
    font-size: 14px;
  }
}
</style>
