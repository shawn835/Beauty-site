<template>
  <div class="subservice-form">
    <BaseForm
      title="Create New Sub-Service"
      subtitle="Add a new add-on or variation to a parent service"
      :fields="formFields"
      buttonText="Create Sub-Service"
      :loading="loading"
      @submit="handleSubmit"
      :meta="fieldsMeta"
      :options="selectOptions"
      :form="form"
      :upload="upload"
    >
      <!-- Image Upload Section -->
      <template #form-extra>
        <div class="images-section">
          <!-- Image Previews -->
          <div class="preview-grid" v-if="upload.previews.value.length > 0">
            <div
              v-for="(img, index) in upload.previews.value"
              :key="index"
              class="preview-item"
            >
              <img :src="img" alt="preview" />
              <button
                class="remove-image-btn"
                @click="upload.removeFile(index)"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      </template>
    </BaseForm>
  </div>
</template>
<script setup>
import { reactive, computed } from "vue";
import BaseForm from "@/components/BaseForm.vue";
import { useAppStore } from "@/components/store/appStore";
import { resetForm } from "@/Utility/utils";
import { useServiceApi } from "@/components/composables/serviceApi";
import { useToast } from "@/components/composables/useToast";
import { useFileUpload } from "@/components/composables/useFileUpload";
const upload = useFileUpload();
import { fieldsMeta } from "@/Utility/meta";

const { show } = useToast();
const { createSubService, loading } = useServiceApi();
const appStore = useAppStore();

const form = reactive({});
const selectOptions = computed(() => ({
  parentServices: appStore.services.map((s) => ({
    label: s.name,
    value: s.id,
  })),
}));

const formFields = [
  "parentService",
  "name",
  "description",
  "price",
  "duration",
  "images",
];

formFields.forEach((f) => {
  form[f] = "";
});

const handleSubmit = async (formData) => {
  const payload = { ...formData };

  if (upload.files.value.length) {
    payload.images = upload.files.value;
  }

  try {
    const data = await createSubService(payload);

    show({
      message: data.message || "Sub-Service created successfully!",
      type: "success",
    });

    resetForm(formData, formFields);

    upload.clearAll();
  } catch (err) {
    show({
      message: err.message || "Failed to create sub-service.",
      type: "error",
    });
  }
};
</script>
<style scoped>
.images-section {
  margin-top: 32px;
}

.images-section h4 {
  color: var(--bg-pink);
  margin-bottom: 8px;
}

.help-text {
  color: var(--text-gray);
  font-size: 0.95rem;
  margin-bottom: 16px;
}

.upload-area {
  border: 2px dashed #666;
  border-radius: 16px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.upload-area:hover {
  border-color: var(--bg-pink);
  background: rgba(216, 27, 96, 0.05);
}

.upload-area i {
  font-size: 2.8rem;
  color: var(--bg-pink);
  margin-bottom: 12px;
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 12px;
  margin-top: 20px;
}

.preview-item {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.preview-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-image-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1rem;
}
</style>
