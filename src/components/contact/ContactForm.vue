<template>
  <div class="form-header">
    <Headings heading="lets talk" />
  </div>
  <div class="form-content">
    <div>
      <location
        :style="{ fontSize: '20px', fontWeight: '600' }"
        :icon-style="{ color: 'var(--seconday-icon-color)' }" />
    </div>
    <form @submit.prevent="submitForm">
      <label
        >name:
        <input
          type="text"
          placeholder="enter your name"
          v-model="formData.name" />
      </label>
      <label
        >email:
        <input
          type="email"
          placeholder="enter your email"
          v-model="formData.email" />
      </label>

      <label>
        message:
        <textarea
          placeholder="your message"
          cols="50"
          rows="5"
          v-model="formData.message"></textarea>
      </label>

      <buttons class-name="primary-button" button-text="submit" />
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import buttons from "../utility/buttons.vue";
import Headings from "../utility/Headings.vue";
import location from "../utility/location.vue";
import { useToast } from "vue-toastification";
const apiUrl = import.meta.env.VITE_API_URL;
const toast = useToast();

const formData = ref({
  name: "",
  email: "",
  message: "",
});

const validateFields = () => {
  const errors = {};
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!formData.value.name.trim()) {
    errors.name = "Please enter your name";
  }

  if (!formData.value.email.trim()) {
    errors.email = "Please enter your email address";
  } else if (!emailPattern.test(formData.value.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!formData.value.message.trim()) {
    errors.message = "Please enter your message";
  }

  return errors;
};

const submitForm = async () => {
  const errors = validateFields();

  if (Object.keys(errors).length > 0) {
    Object.values(errors).forEach((err) => toast.error(err));
    return;
  }

  try {
    const response = await fetch(`${apiUrl}/contact-us`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData.value),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success(data.success);
      formData.value = { name: "", email: "", message: "" };
    } else {
      toast.error(data.error);
    }
  } catch (err) {
    toast.error("Failed to submit the form. Please try again");
  }
};
</script>

<style scoped>
.form-content {
  display: flex;
  justify-content: space-around;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

label {
  font-size: 20px;
}

.form-header {
  margin-top: 2rem;
}
</style>
