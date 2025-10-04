<template>
  <section class="services-content">
    <table class="services-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Price (KES)</th>
          <th>Duration (min)</th>
          <th>Description</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="srv in services"
          :key="srv.subservice.subserviceId"
          @click="$emit('select', srv)"
          :class="{
            selected:
              selectedService?.subservice?.subserviceId ===
              srv.subservice.subserviceId,
          }">
          <td>{{ srv.serviceName }}</td>
          <td>{{ srv.subservice.name }}</td>
          <td>{{ srv.subservice.price }}</td>
          <td>{{ srv.subservice.duration }}</td>
          <td>{{ srv.subservice.description || "N/A" }}</td>
          <td>{{ srv.subservice.status }}</td>
          <td>
            <button
              class="primary-button"
              @click="toggleStatus(srv)"
              :disabled="loadingStates[srv.subservice.subserviceId]">
              <Spinner v-if="loadingStates[srv.subservice.subserviceId]" />
              <span v-else>
                {{
                  srv.subservice.status === "active" ? "Deactivate" : "Activate"
                }}
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup>
import { useAdmin } from "@/components/composables/useAdmin";
import { useToast } from "@/components/composables/useToast";
import Spinner from "@/components/utility/Spinner.vue";
const props = defineProps({
  services: Array,
  selectedService: Object,
});

const { show } = useToast();

const { loadingStates, toggleStatus } = useAdmin();
const statusToggler = async (srv) => {
  try {
    const { message } = await toggleStatus(srv);
    show({ message: message, type: "success" });
  } catch (error) {
    show({ message: error.message, type: "error" });
  }
};

defineEmits(["select", "edit"]);
</script>

<style scoped>
.services-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.services-table th,
.services-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.services-table th {
  background-color: #2e2e2e;
  color: #fff;
}

.services-table tr:hover {
  background-color: #f5f5f5;
}

.services-table tr.selected {
  background-color: #e6b8b8;
  color: #fff;
}

.action-button {
  padding: 8px 12px;
  margin-right: 5px;
  background-color: #d89b9b;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.action-button:hover {
  background-color: #c88a8a;
}

@media (max-width: 768px) {
  .services-table {
    display: block;
    overflow-x: auto;
  }
}

@media (max-width: 480px) {
  .services-table th,
  .services-table td {
    font-size: 14px;
    padding: 8px;
  }
}
</style>
