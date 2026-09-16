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
