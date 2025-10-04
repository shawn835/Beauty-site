<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h2>
        {{
          type === "add"
            ? "Add New Service"
            : type === "edit"
            ? "Edit Service"
            : type === "categorize"
            ? "Categorize Services"
            : "Bulk Update"
        }}
      </h2>

      <BaseForm
        v-if="type === 'edit'"
        title="Update Service"
        subtitle="Keep your services"
        :fields="formFields"
        button-text="Update Service"
        :loading="loading" />

      <button @click="$emit('close')" class="close-btn">Close</button>
    </div>
  </div>
</template>

<script setup>
import BaseForm from "@/components/utility/BaseForm.vue";

defineProps({
  type: String,
  service: Object,
  loading: Boolean,
});

defineEmits(["close"]);

const formFields = [
  { name: "name", label: "Name", type: "text" },
  { name: "category", label: "Category", type: "text" },
  { name: "price", label: "Price", type: "number" },
  { name: "duration", label: "Duration", type: "number" },
  { name: "description", label: "Description", type: "textarea" },
];
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  animation: slideIn 0.3s ease;
}

.modal-content h2 {
  margin-bottom: 20px;
  color: #2e2e2e;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .modal-content {
    width: 95%;
  }
}
</style>
