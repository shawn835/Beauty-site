import { useApi } from "../composables/useFetch";
import { defineStore } from "pinia";
import { computed } from "vue";

export const useAppStore = defineStore("app", () => {
  const servicesUrl = `${import.meta.env.VITE_API_URL}/api/services/names`;

  const { data: servicesData } = useApi(servicesUrl);

  const services = computed(() => servicesData.value?.services || []);

  return {
    services,
  };
});
