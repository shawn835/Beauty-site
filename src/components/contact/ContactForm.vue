<template>
  <section class="contact-form-section" id="contact-form">
    <div class="contact-form-container">
      <!-- Section Heading -->
      <div class="section-header">
        <h2>Send Us a Message</h2>
        <p>
          We'd love to hear from you. Whether you have a question, special
          request, or just want to say hello — drop us a message!
        </p>
      </div>

      <!-- Form -->
      <BaseForm
        title="Get In Touch"
        subtitle="Our team typically responds within 1-2 hours during business hours"
        buttonText="Send Message"
        :form="form"
        :loading="loading"
        :fields="formFields"
        :meta="fieldsMeta"
        :error="errors"
        @submit="submitContactForm"
      >
        <!-- Extra content below the form -->
        <template #extra>
          <div class="form-note">
            <i class="fa-solid fa-shield-halved"></i>
            Your information is safe with us. We respect your privacy.
          </div>
        </template>
      </BaseForm>
    </div>
  </section>
</template>

<script setup>
import { computed, reactive } from "vue";
import BaseForm from "../BaseForm.vue";
import { useToast } from "../composables/useToast";
import { useContactForm } from "../composables/useContactForm";
import { useUserStore } from "../store/userStore";
import { fieldsMeta } from "@/Utility/meta";
import { useFormErrors } from "@/Utility/useFormErrors.js";
const { errors, setErrors, clearErrors } = useFormErrors();

const { show } = useToast();
const { loading, handleContactForm } = useContactForm();
const userStore = useUserStore();
const form = reactive({});

const formFields = computed(() => {
  return Object.keys(fieldsMeta).filter((key) =>
    ["name", "contactFormEmail", "contactFormPhone", "message"].includes(key),
  );
});

Object.assign(
  form,
  Object.fromEntries(
    formFields.value.map((f) => [f, userStore.user?.[f] || ""]),
  ),
);

const submitContactForm = async (formdata) => {
  try {
    clearErrors();
    const { message } = await handleContactForm(formdata);
    show({
      message: message || "message submitted successfully",
      type: "success",
    });
  } catch (error) {
    if (error.errors) {
      setErrors(err.errors);
      return;
    }
    show({
      message: error.message || "something went wrong",
    });
  }
};
</script>

<style scoped>
.contact-form-section {
  padding: 100px 20px;
  background: #242a2d;
}

.contact-form-container {
  max-width: 680px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 50px;
}

.section-header h2 {
  font-size: 2.4rem;
  margin-bottom: 12px;
  color: white;
}

.section-header p {
  color: var(--text-gray);
  font-size: 1.1rem;
  max-width: 520px;
  margin: 0 auto;
}

/* Extra Note */
.form-note {
  margin-top: 24px;
  padding: 16px 20px;
  background: #2e3538;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text-gray);
  font-size: 0.95rem;
}

.form-note i {
  color: var(--bg-pink);
}

/* Responsive */
@media (max-width: 640px) {
  .contact-form-section {
    padding: 70px 16px;
  }

  .section-header h2 {
    font-size: 2.1rem;
  }
}
</style>
