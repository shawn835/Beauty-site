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

    <div>
      <BaseForm
        title="contact us form"
        subtitle="contact us"
        :fields="contactFormFields"
        button-text="submit"
        :loading="loading"
        @submit="submitContactForm" />
    </div>
  </div>
</template>

<script setup>
import BaseForm from "../utility/BaseForm.vue";
import Headings from "../utility/Headings.vue";
import location from "../utility/location.vue";
import { useToast } from "../composables/useToast";
import { useContactForm } from "../composables/useContactForm";
import { useUserStore } from "../store/userStore";

const { show } = useToast();
const { loading, handleContactForm } = useContactForm();
const userStore = useUserStore();

const submitContactForm = async (formdata) => {
  try {
    const { message } = await handleContactForm(formdata);
    show({
      message: message || "message submitted successfully",
      type: "success",
    });
  } catch (error) {
    show({
      message: error.message || "something went wrong",
    });
  }
};

const contactFormFields = [
  {
    id: "name",
    label: "enter your name",
    type: "text",
    required: true,
    placeholder: "Enter your name ",
    value: userStore.user ? userStore.user.name : "",
  },
  {
    id: "email",
    label: "enter your email",
    type: "text",
    required: false,
    placeholder: "Enter your email",
    value: userStore.user ? userStore.user.email : "",
  },

  {
    id: "phone",
    label: "phone (optional, whatsapp if possible)",
    type: "tel",
    required: false,
    placeholder: "Enter phone number ",
    value: userStore.user ? userStore.user.phone : "",
  },
  {
    id: "message",
    label: "message",
    type: "textarea",
    required: true,
    placeholder: "type your message...",
    value: "",
  },
];
</script>

<style scoped>
.form-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  justify-items: center;
  padding: 1rem;
}

@media (max-width: 992px) {
  .form-content {
    flex-direction: column;
    justify-content: center;
    background-color: var(--background-secondary);
  }
}
</style>
