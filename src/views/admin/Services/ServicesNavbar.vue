<template>
  <nav class="services-navbar">
    <div class="nav-buttons" v-if="!isMobile">
      <button @click="$emit('open-modal', 'add')" class="nav-button">
        <i class="fas fa-plus"></i> Add Service
      </button>
      <button
        @click="$emit('open-modal', 'edit')"
        class="nav-button"
        :disabled="!selectedService">
        <i class="fas fa-edit"></i> Edit
      </button>
      <button
        @click="$emit('toggle-status')"
        class="nav-button"
        :disabled="!selectedService">
        <i class="fas fa-toggle-on"></i>
        {{ selectedService?.status === "Active" ? "Deactivate" : "Activate" }}
      </button>
      <button @click="$emit('open-modal', 'categorize')" class="nav-button">
        <i class="fas fa-tags"></i> Categorize
      </button>
      <button @click="$emit('open-modal', 'bulk')" class="nav-button">
        <i class="fas fa-sync"></i> Bulk Update
      </button>
    </div>

    <!-- Mobile -->
    <div class="nav-dropdown" v-else>
      <button @click="dropdown = !dropdown" class="dropdown-toggle">
        <i class="fas fa-bars"></i> Actions
      </button>
      <ul v-if="dropdown" class="dropdown-menu">
        <li @click="$emit('open-modal', 'add')">Add New Service</li>
        <li
          @click="$emit('open-modal', 'edit')"
          :class="{ disabled: !selectedService }">
          Edit Service
        </li>
        <li
          @click="$emit('toggle-status')"
          :class="{ disabled: !selectedService }">
          {{ selectedService?.status === "Active" ? "Deactivate" : "Activate" }}
        </li>
        <li @click="$emit('open-modal', 'categorize')">Categorize Services</li>
        <li @click="$emit('open-modal', 'bulk')">Bulk Update</li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  selectedService: Object,
  isMobile: Boolean,
});

const dropdown = ref(false);
</script>

<style scoped>
.nav-item {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.nav-item i {
  font-size: 20px;
  margin-right: 15px;
  color: #e6b8b8;
}

.nav-item span {
  font-size: 16px;
}

.nav-item:hover {
  background-color: #3c3c3c;
}

.nav-item.active {
  background-color: #d89b9b;
}

.nav-item.active i,
.nav-item.active span {
  color: #fff;
}

.main-content {
  flex: 1;
  padding: 20px;
}

.images-navbar {
  margin-bottom: 20px;
}

.nav-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 10px;
  border-radius: 8px;
}

.nav-button {
  padding: 10px 20px;
  background-color: #e6b8b8;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
}

.nav-button i {
  margin-right: 8px;
}

.nav-button:hover {
  background-color: #d89b9b;
  transform: translateY(-2px);
}

.nav-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  transform: none;
}

.nav-dropdown {
  position: relative;
}

.dropdown-toggle {
  padding: 10px 20px;
  background-color: #e6b8b8;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  text-align: left;
}

.dropdown-toggle i {
  margin-right: 8px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #2e2e2e;
  border-radius: 5px;
  list-style: none;
  padding: 10px 0;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.dropdown-menu li {
  padding: 10px 20px;
  color: #fff;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background-color: #3c3c3c;
}

.dropdown-menu li.disabled {
  color: #ccc;
  cursor: not-allowed;
}
</style>
