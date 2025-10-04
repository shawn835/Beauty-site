<template>
  <div class="form-container">
    <!-- Heading -->
    <h1 class="title">{{ title }}</h1>
    <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>

    <!-- Form -->
    <form @submit.prevent="onSubmit" class="base-form">
      <!-- Render inputs dynamically -->
      <div v-for="field in fields" :key="field.id" class="form-group">
        <label :for="field.id">
          {{ field.label }}<span v-if="field.required">*</span>
        </label>

        <!-- Check for textarea -->
        <textarea
          v-if="field.type === 'textarea'"
          :id="field.id"
          v-model="form[field.id]"
          :placeholder="field.placeholder || ''"
          :required="field.required"
          class="form-textarea"></textarea>

        <!-- Default to input -->
        <input
          v-else
          :id="field.id"
          v-model="form[field.id]"
          :type="field.type || 'text'"
          :placeholder="field.placeholder || ''"
          :required="field.required" />
      </div>

      <!-- Submit button -->
      <button type="submit" class="submit-btn" :disabled="loading">
        <span v-if="!loading">{{ buttonText }}</span>
        <span v-else-if="buttonText === 'login'">redirecting...</span>
        <span v-else class="spinner"></span>
      </button>
    </form>

    <!-- Extra slot (for links, info, etc.) -->
    <div class="form-extra">
      <slot name="extra"></slot>
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
  { deep: true, immediate: true }
);

function onSubmit() {
  emit("submit", { ...form });
}
</script>
<style scoped>
.form-container {
  max-width: 500px;
  margin: 50px auto;
  padding: 30px;
  background: linear-gradient(135deg, #fff5f7 0%, #ffe4e1 100%);
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  font-family: "Lora", serif;
  text-align: center;
}

.title {
  font-family: "Playfair Display", serif;
  font-size: 2.5rem;
  color: #d81b60;
  margin-bottom: 10px;
  font-weight: 700;
}

.subtitle {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 30px;
}

.update-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  text-align: left;
}

label {
  font-size: 0.95rem;
  color: #333;
  margin-bottom: 5px;
  font-weight: 500;
  display: block;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  font-family: "Lora", serif;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #d81b60;
  box-shadow: 0 0 5px rgba(216, 27, 96, 0.3);
}

.submit-btn {
  padding: 12px;
  background-color: #d81b60;
  color: #fff;
  border: none;
  border-radius: 20px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 0.5rem;
}

.submit-btn:hover:not(:disabled) {
  background-color: #ad1457;
  transform: translateY(-2px);
}

.submit-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #fff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 600px) {
  .form-container {
    margin: 30px 10px;
    padding: 20px;
  }
}
</style>
