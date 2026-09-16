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
          :class="{
            'has-file': meta[field]?.type === 'file',
            'has-error': errors[field],
          }"
        >
          <label class="form-label" v-if="meta[field]?.type !== 'checkbox'">
            {{ meta[field]?.label || meta[field]?.placeholder }}
            <span v-if="meta[field]?.required" class="required">*</span>
          </label>

          <!-- File Upload -->
          <div v-if="meta[field]?.type === 'file'" class="file-upload-area">
            <i class="fa-solid fa-cloud-arrow-up upload-icon"></i>
            <p class="upload-text">
              {{
                meta[field]?.placeholder || "Drop files here or click to browse"
              }}
            </p>
            <small class="file-hint">PNG, JPG, JPEG • Max 5MB</small>

            <input
              type="file"
              :accept="meta[field]?.accept || 'image/*'"
              @change="upload.handleFileUpload"
              multiple
              class="file-input"
              :id="`file-${field}`"
            />

            <label :for="`file-${field}`" class="file-label">
              <span class="file-icon"></span>
              <span class="file-text">
                {{ props.form[field]?.name || "Choose file..." }}
              </span>
            </label>
          </div>

          <!-- Select -->

          <select
            v-else-if="meta[field]?.type === 'select'"
            v-model="props.form[field]"
            class="form-select"
            :required="meta[field]?.required"
          >
            <option disabled value="">
              {{ meta[field]?.placeholder || "Select option" }}
            </option>
            <option
              v-for="opt in options[meta[field]?.optionsKey] || []"
              :key="opt.value"
              :value="opt.value"
            >
              {{ opt.label }}
            </option>
          </select>

          <!-- Password Input with Eye -->
          <div
            v-else-if="meta[field]?.type === 'password'"
            class="password-wrapper"
          >
            <input
              v-model="props.form[field]"
              :type="showPassword[field] ? 'text' : 'password'"
              :placeholder="meta[field]?.placeholder"
              class="form-input password-input"
              :required="meta[field]?.required"
              :disabled="disabled"
            />
            <button
              type="button"
              class="eye-btn"
              @click="togglePasswordVisibility(field)"
            >
              <font-awesome-icon
                :icon="showPassword[field] ? 'eye-slash' : 'eye'"
              />
            </button>
          </div>

          <!-- Regular Inputs -->
          <input
            v-else-if="
              ['text', 'email', 'number', 'tel', 'date', 'time'].includes(
                meta[field]?.type,
              )
            "
            v-model="props.form[field]"
            :type="meta[field]?.type"
            :placeholder="meta[field]?.placeholder"
            class="form-input"
            :required="meta[field]?.required"
            :disabled="disabled"
            autocomplete="on"
          />

          <!-- Textarea -->
          <textarea
            v-else-if="meta[field]?.type === 'textarea'"
            v-model="props.form[field]"
            :placeholder="meta[field]?.placeholder"
            class="form-textarea"
            rows="5"
            :required="meta[field]?.required"
            :disabled="disabled"
          />

          <!-- Checkbox -->
          <div
            v-else-if="meta[field]?.type === 'checkbox'"
            class="checkbox-group"
          >
            <label class="checkbox-label">
              <input
                v-model="props.form[field]"
                type="checkbox"
                :required="meta[field]?.required"
                :disabled="disabled"
              />
              {{ meta[field]?.label }}
            </label>
          </div>

          <!-- Error Message -->
          <div v-if="errors[field]?.length" class="error-message">
            <div v-for="error in errors[field]" :key="error">
              {{ error }}
            </div>
          </div>
        </div>

        <!-- Submit Button & Extra -->
        <div v-if="showButton || $slots.actions" class="form-actions">
          <slot name="actions" />
          <BaseButton
            v-if="showButton"
            :label="buttonText"
            variant="primary"
            size="medium"
            :loading="loading"
            full-width
          />
        </div>
        <div class="form-extra">
          <slot name="form-extra"></slot>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
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
  disabled: { type: Boolean, default: false },
  errors: { type: Object, default: () => ({}) },
  form: Object,
});

const validFields = computed(() => props.fields.filter((f) => props.meta?.[f]));

const handleSubmit = () => {
  emit("submit", props.form);
};

// Password visibility
const showPassword = ref({});

const togglePasswordVisibility = (field) => {
  showPassword.value[field] = !showPassword.value[field];
};
</script>

<style scoped>
.form-wrapper {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
}

.form-container {
  background: #2e3538;
  padding: 2.5rem 2rem;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.title {
  font-size: 2.1rem;
  color: #f5d698;
  margin: 0 0 0.5rem;
  font-weight: 700;
}

.subtitle {
  color: #aaa;
  margin: 0;
  font-size: 1.05rem;
}

/* Form Fields */
.form-group {
  margin-bottom: 1.4rem;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  color: #ddd;
  font-weight: 500;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 14px 16px;
  background: #252b2e;
  border: 2px solid rgba(245, 214, 152, 0.25);
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #f5d698;
  box-shadow: 0 0 0 3px rgba(245, 214, 152, 0.15);
}

.form-textarea {
  resize: vertical;
}

/* ==================== ERROR SPACE ==================== */
.form-group.has-error {
  margin-bottom: 1.8rem;
}

.error-message {
  color: #f87171;
  font-size: 0.9rem;
  margin-top: 6px;
  padding-left: 4px;
  min-height: 20px;
}

/* ==================== PASSWORD INPUT WITH EYE ==================== */
.password-wrapper {
  position: relative;
  width: 100%;
}

.password-input {
  padding-right: 48px !important; /* Space for eye icon */
}

.eye-btn {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #aaa;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 6px;
  border-radius: 50%;
  transition: color 0.2s;
}

.eye-btn:hover {
  color: #f5d698;
}

/* File Upload */
.file-upload-area {
  border: 2px dashed #f5d698;
  border-radius: 16px;
  padding: 2rem 1.5rem;
  text-align: center;
  background: rgba(245, 214, 152, 0.05);
  transition: all 0.3s;
  cursor: pointer;
}

.file-upload-area:hover {
  background: rgba(245, 214, 152, 0.1);
  border-color: #f76706;
}

.upload-icon {
  font-size: 2.8rem;
  color: #f5d698;
  margin-bottom: 1rem;
}

.upload-text {
  color: #ddd;
  margin: 0.5rem 0;
}

.file-hint {
  color: #888;
}

.file-label {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  color: #ddd;
}

/* Checkbox */
.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: #ddd;
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

/* Responsive */
@media (max-width: 640px) {
  .form-container {
    padding: 2rem 1.5rem;
  }
  .title {
    font-size: 1.85rem;
  }
}
</style>
