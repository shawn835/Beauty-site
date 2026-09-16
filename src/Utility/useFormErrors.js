import { ref } from "vue";

export const useFormErrors = () => {
  const errors = ref({});

  const setErrors = (fieldErrors = {}) => {
    errors.value = fieldErrors;
  };

  const clearErrors = () => {
    errors.value = {};
  };

  return {
    errors,
    setErrors,
    clearErrors,
  };
};
