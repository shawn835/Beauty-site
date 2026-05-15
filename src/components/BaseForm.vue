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
            :disabled="field.disabled"
            class="form-input"
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
import BaseButton from "./BaseButton.vue";

const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
  fields: { type: Array, required: true },
  buttonText: { type: String, default: "Submit" },
  loading: { type: Boolean, default: false },
  showButton: { type: Boolean, default: true },
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

/* Extra Content */
.form-extra {
  margin-top: 28px;
  text-align: center;
  font-size: 0.95rem;
}
.form-actions {
  display: flex;
  gap: 1rem;
}

.form-actions > * {
  flex: 1;
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
