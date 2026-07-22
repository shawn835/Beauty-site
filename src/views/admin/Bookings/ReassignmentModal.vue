<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="closeModal">
      <div class="modal-content" @click.stop>
        <BaseForm
          title="reassign Technician"
          subtitle="reassign a new technician to this booking"
          buttonText="reassign"
          :form="form"
          :loading="loading"
          :fields="formFields"
          :meta="fieldsMeta"
          :show-button="true"
          :disabled="loading"
          :options="selectOptions"
          @submit="reassignTechnician"
        >
          <template #form-extra>
            <div class="form-note">
              <i class="fa-solid fa-shield-halved"></i>
              this technician will get notified on the new reassignment.
            </div>
          </template>

          <template #actions>
            <BaseButton
              label="Cancel"
              variant="warning"
              :disabled="loading"
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
import { reactive, ref, computed } from "vue";
import BaseForm from "@/components/BaseForm.vue";
import { useTechnicianStore } from "@/components/store/TechnicianStore";
import BaseButton from "@/components/BaseButton.vue";
import { fieldsMeta } from "@/Utility/meta";
import { handleResponse } from "@/Utility/response";
import { useToast } from "@/components/composables/useToast";
const props = defineProps({
  bookingId: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["close"]);
const technicianStore = useTechnicianStore();
const loading = ref(false);

const formFields = ["technicians"];
const { show } = useToast();

const form = reactive({});
formFields.forEach((field) => {
  form[field] = "";
});

const selectOptions = computed(() => ({
  technicians: technicianStore.technicians.map((t) => ({
    label: t.name,
    value: t.technicianId,
  })),
}));

const reassignTechnician = async () => {
  loading.value = true;
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/bookings/${props.bookingId}/reassign`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ technicianId: form.technicians }),
        credentials: "include",
      },
    );
    const data = await handleResponse(res);

    show({
      message: data.message || "technician assigned successfully",
      type: "success",
    });
    closeModal();
  } catch (err) {
    show({
      message: err.message || "error re-assigning technician",
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
