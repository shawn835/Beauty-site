<template>
  <BaseForm
    title="Create New Service"
    subtitle="Add a new service to your offering "
    :fields="formFields"
    buttonText="Create Service"
    :loading="loading"
    @submit="handleSubmit"
    :meta="fieldsMeta"
    :form="form"
  >
    <!-- Extra content for toggle -->
    <!-- <template #extra>
      <div class="toggle-wrapper">
        <label class="toggle-label">
          <input type="checkbox" v-model="form.isActive" class="toggle-input" />
          <span class="toggle-slider"></span>
          <span class="toggle-text">
            {{ form.isActive ? "Service is Active" : "Service is Inactive" }}
          </span>
        </label>
      </div>
    </template> -->
  </BaseForm>
</template>

<script setup>
import { reactive, computed } from "vue";
import BaseForm from "@/components/BaseForm.vue";
import { useServiceApi } from "@/components/composables/serviceApi";
import { useToast } from "@/components/composables/useToast";
import { fieldsMeta } from "@/Utility/meta";
import { resetForm } from "@/Utility/utils";
const { show } = useToast();

const { createService, loading } = useServiceApi();

const form = reactive({});

const formFields = computed(() => ["name", "description"]);
formFields.value.forEach((f) => {
  form[f] = "";
});

const handleSubmit = async (data) => {
  try {
    const { message } = await createService(data);

    show({
      message,
      type: "success",
    });

    resetForm(form, formFields.value);
  } catch (error) {
    show({
      message: error.message || "Failed to submit main service.",
      type: "error",
    });
  }
};
</script>

<style scoped>
.toggle-wrapper {
  margin-top: 20px;
  padding: 16px 20px;
  background: #242a2d;
  border-radius: 12px;
}

.toggle-label {
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  user-select: none;
}

.toggle-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: relative;
  width: 52px;
  height: 28px;
  background: #555;
  border-radius: 50px;
  transition: background 0.3s;
}

.toggle-slider:before {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  width: 22px;
  height: 22px;
  background: white;
  border-radius: 50%;
  transition: transform 0.3s;
}

.toggle-input:checked + .toggle-slider {
  background: var(--bg-pink);
}

.toggle-input:checked + .toggle-slider:before {
  transform: translateX(24px);
}

.toggle-text {
  color: var(--text-light);
  font-weight: 500;
}
</style>
