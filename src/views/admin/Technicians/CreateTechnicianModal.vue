<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="closeModal">
      <div class="modal-content" @click.stop>
        <BaseForm
          title="Create Technician"
          subtitle="Create a new technician by providing their email address"
          buttonText="Create Technician"
          :form="form"
          :loading="loading"
          :fields="formFields"
          :meta="fieldsMeta"
          :show-button="true"
          :disabled="loading"
          @submit="createTechnician"
        >
          <template #form-extra>
            <div class="form-note">
              <i class="fa-solid fa-shield-halved"></i>
              The technician will receive an email with instructions to set up
              their account.
            </div>
          </template>

          <template #actions>
            <BaseButton
              label="Cancel"
              variant="warning"
              size="medium"
              @click="closeModal"
            />
          </template>
        </BaseForm>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import BaseForm from "@/components/BaseForm.vue";
import { fieldsMeta } from "@/Utility/meta";
import { useToast } from "@/components/composables/useToast";
import BaseButton from "@/components/BaseButton.vue";
import { handleResponse } from "@/Utility/response";

const emit = defineEmits(["close"]);

const form = ref({ email: "" });
const formFields = ["email"];
const loading = ref(false);
const { show } = useToast();

const createTechnician = async () => {
  if (!form.value.email) {
    show({ message: "Email is required", type: "error" });
    return;
  }

  loading.value = true;

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/admin/technician/email`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form.value),
      },
    );

    const data = await handleResponse(res);
    show({
      message: data.message || "Technician created successfully",
      type: "success",
    });
    closeModal();
  } catch (error) {
    show({
      message: error.message || "Failed to create technician",
      type: "error",
    });
  } finally {
    loading.value = false;
  }
};

const closeModal = () => {
  emit("close");
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  animation: popIn 0.3s ease forwards;
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.85) translateY(40px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.form-note {
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(245, 214, 152, 0.1);
  border-radius: 12px;
  color: #ddd;
  font-size: 0.95rem;
  display: flex;
  gap: 12px;
  align-items: flex-start;
}
</style>
