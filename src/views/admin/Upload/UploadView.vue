<template>
  <div class="service-management">
    <div class="page-header">
      <h1>Service Management</h1>
      <p class="subtitle">
        Create and manage your nail spa services and add-ons
      </p>
    </div>

    <!-- Tab Navigation -->
    <div class="tabs">
      <button
        :class="{ active: activeTab === 'main' }"
        @click="activeTab = 'main'"
      >
        Main Services
      </button>
      <button
        :class="{ active: activeTab === 'sub' }"
        @click="activeTab = 'sub'"
      >
        Sub-Services / Add-ons
      </button>
    </div>

    <div class="form-wrapper">
      <!-- Main Service Form -->
      <ServicesUpload v-if="activeTab === 'main'" />

      <!-- Sub-Service Form -->
      <SubServiceUpload v-if="activeTab === 'sub'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ServicesUpload from "./ServicesUpload.vue";
import SubServiceUpload from "./SubServiceUpload.vue";

const activeTab = ref("main");
</script>
<style scoped>
.service-management {
  padding: 40px 20px;
  background: var(--bg-dark);
  min-height: 100vh;
  color: var(--text-light);
  width: 100%;
}

.page-header {
  text-align: center;
  margin-bottom: 50px;
}

.page-header h1 {
  font-size: 2.6rem;
  margin-bottom: 8px;
  color: white;
}

.subtitle {
  color: var(--text-gray);
  font-size: 1.15rem;
}

/* Tabs */
.tabs {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 50px;
  border-bottom: 1px solid #444;
  padding-bottom: 4px;
}

.tabs button {
  padding: 14px 32px;
  background: #2e3538;
  border: none;
  border-radius: 50px;
  color: #ddd;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.tabs button.active {
  background: var(--bg-pink);
  color: white;
  box-shadow: 0 8px 20px rgba(216, 27, 96, 0.3);
}

/* Form Container */
.form-wrapper {
  max-width: 720px;
  margin: 0 auto;
  background: #2e3538;
  border-radius: 24px;
  padding: 40px;
}

/* Responsive */
@media (max-width: 768px) {
  .service-management {
    padding: 20px 12px;
  }

  .form-wrapper {
    padding: 28px 20px;
  }

  .tabs button {
    padding: 12px 24px;
    font-size: 0.98rem;
  }
}
</style>
