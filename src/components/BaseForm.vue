<template>
  <div class="form-wrapper">
    <div class="form-container">
      <!-- Heading -->
      <div class="form-header">
        <h1 class="title">{{ title }}</h1>
        <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="onSubmit" class="base-form">
        <div v-for="field in fields" :key="field.id" class="form-group">
          <label :for="field.id">
            {{ field.label }}
            <span v-if="field.required" class="required">*</span>
          </label>

          <!-- Textarea -->
          <textarea
            v-if="field.type === 'textarea'"
            :id="field.id"
            v-model="form[field.id]"
            :placeholder="field.placeholder || ''"
            :required="field.required"
            class="form-textarea"
          ></textarea>

          <!-- Regular Input -->
          <input
            v-else
            :id="field.id"
            v-model="form[field.id]"
            :type="field.type || 'text'"
            :placeholder="field.placeholder || ''"
            :required="field.required"
            class="form-input"
          />
        </div>

        <!-- Submit Button -->
        <button type="submit" class="submit-btn" :disabled="loading">
          <span v-if="loading" class="spinner"></span>
          <span v-else>{{ buttonText }}</span>
        </button>
      </form>

      <!-- Extra Content Slot -->
      <div class="form-extra">
        <slot name="extra"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from "vue";

const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
  fields: { type: Array, required: true },
  buttonText: { type: String, default: "Submit" },
  loading: { type: Boolean, default: false },
});

const emit = defineEmits(["submit"]);

// reactive form object
const form = reactive({});

// initialize fields
function initForm() {
  for (const f of props.fields) {
    form[f.id] = f.value ?? "";
  }
}
initForm();

//watch field change
watch(
  () => props.fields,
  (newFields) => {
    for (const f of newFields) {
      form[f.id] = f.value ?? "";
    }
  },
  { deep: true, immediate: true },
);

function onSubmit() {
  emit("submit", { ...form });
}
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

/* Submit Button */
.submit-btn {
  width: 100%;
  padding: 16px;
  margin-top: 12px;
  background: var(--bg-pink);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(216, 27, 96, 0.4);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Spinner */
.spinner {
  width: 22px;
  height: 22px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Extra Content */
.form-extra {
  margin-top: 28px;
  text-align: center;
  font-size: 0.95rem;
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
