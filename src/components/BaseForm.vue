<template>
  <div class="form-wrapper">
    <div class="form-container">
      <!-- Heading -->
      <div class="form-header">
        <h1 class="title">{{ title }}</h1>
        <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
      </div>

      <!-- Form -->

      <form class="form" @submit.prevent="handleSubmit">
        <div
          class="form-group"
          v-for="field in validFields"
          :key="field"
          :class="{ 'has-file': meta[field].type === 'file' }"
        >
          <label class="form-label">
            {{ meta[field].label || meta[field].placeholder }}
            <span v-if="meta[field].required" class="required">*</span>
          </label>

          <!-- File input – inline assignment + nice styling -->
          <div v-if="meta[field].type === 'file'" class="file-upload-area">
            <i class="fa-solid fa-cloud-arrow-up"></i>
            <p>
              {{
                meta[field].placeholder || "Drop files here or click to browse"
              }}
            </p>
            <small class="file-hint">PNG, JPG, JPEG up to 5MB</small>
            <input
              type="file"
              :accept="meta[field].accept || 'image/*'"
              @change="upload.handleFileUpload"
              multiple
              class="file-input"
              :id="`file-${field}`"
            />
            <label
              :for="`file-${field}`"
              class="file-label"
              :class="{ 'has-file': props.form[field] }"
            >
              <span class="file-icon">📷</span>
              <span class="file-text">
                {{
                  props.form[field]?.name ||
                  meta[field].placeholder ||
                  "Choose file..."
                }}
              </span>
            </label>
          </div>
          <!-- Select -->
          <select
            v-else-if="meta[field].type === 'select'"
            v-model="props.form[field]"
            class="form-select"
            :required="meta[field].required"
          >
            <option disabled value="">
              {{ meta[field].placeholder || "Select option" }}
            </option>
            <option
              v-for="opt in options[meta[field].optionsKey] || []"
              :key="opt.value"
              :value="opt.value"
            >
              {{ opt.label }}
            </option>
            >
          </select>

          <!-- Text, email, tel, number, password -->
          <input
            v-else-if="
              [
                'text',
                'email',
                'password',
                'number',
                'tel',
                'date',
                'time',
              ].includes(meta[field].type)
            "
            v-model="props.form[field]"
            :type="meta[field].type"
            :placeholder="meta[field].placeholder"
            class="form-input"
            :required="meta[field].required"
            autocomplete="on"
          />

          <!-- Textarea -->
          <textarea
            v-else-if="meta[field].type === 'textarea'"
            v-model="props.form[field]"
            :placeholder="meta[field].placeholder"
            class="form-textarea"
            rows="4"
            :required="meta[field].required"
          />
        </div>

        <!-- Submit Button -->
        <div v-if="showButton || $slots.actions" class="form-actions">
          <slot name="actions" />
          <BaseButton
            v-if="showButton"
            :label="buttonText"
            variant="primary"
            size="medium"
            :loading="loading"
          />
        </div>
        <!-- Extra content slot -->
        <div class="form-extra">
          <slot name="form-extra"></slot>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import BaseButton from "./BaseButton.vue";

const emit = defineEmits(["submit"]);

const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
  fields: { type: Array, required: true },
  meta: { type: Object, required: true },
  buttonText: { type: String, default: "Submit" },
  loading: { type: Boolean, default: false },
  showButton: { type: Boolean, default: true },
  options: { type: Object, default: () => ({}) },
  upload: { type: Object, default: () => ({}) },
  form: Object,
});

const validFields = computed(() => props.fields.filter((f) => props.meta?.[f]));

const handleSubmit = () => {
  emit("submit", props.form);
};
</script>
<style scoped>
.form-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: var(--bg-dark);
  padding: 20px;
}

.form-container {
  background: #3a4246;
  max-width: 480px;
  width: 100%;
  border-radius: 24px;
  padding: 40px 36px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
}

.form-header {
  text-align: center;
  margin-bottom: 36px;
}

.title {
  font-size: 2.1rem;
  color: white;
  margin-bottom: 8px;
}

.subtitle {
  color: var(--text-gray);
  font-size: 1.05rem;
  line-height: 1.5;
}

/* Form Group */
.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #ddd;
  font-weight: 500;
  font-size: 0.98rem;
}

.required {
  color: #ef4444;
  margin-left: 4px;
}

/* Input Fields */
.form-input,
.form-textarea {
  width: 100%;
  padding: 14px 18px;
  background: #2e3538;
  border: 2px solid #555;
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--bg-pink);
  box-shadow: 0 0 0 4px rgba(216, 27, 96, 0.15);
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
}

/* Extra Content */
.form-extra {
  margin-top: 28px;
  text-align: center;
  font-size: 0.95rem;
  color: var(--text-gray);
}
.form-actions {
  display: flex;
  gap: 1rem;
}

.form-actions > * {
  flex: 1;
}

/* Select Styling */
.form-select {
  width: 100%;
  padding: 14px 18px;
  background: #2e3538;
  border: 2px solid #555;
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.form-select:focus {
  outline: none;
  border-color: var(--bg-pink);
  box-shadow: 0 0 0 4px rgba(216, 27, 96, 0.15);
}

/* File Upload Area - Same style as Sub-Service */
.file-upload-area {
  border: 2px dashed #666;
  border-radius: 16px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #242a2d;
}

.file-upload-area:hover {
  border-color: var(--bg-pink);
  background: rgba(216, 27, 96, 0.08);
}

.file-upload-area i {
  font-size: 2.8rem;
  color: var(--bg-pink);
  margin-bottom: 12px;
  display: block;
}

.file-hint {
  color: var(--text-gray);
  font-size: 0.85rem;
}

/* Responsive */
@media (max-width: 540px) {
  .form-container {
    padding: 32px 24px;
  }

  .title {
    font-size: 1.9rem;
  }
}
</style>
