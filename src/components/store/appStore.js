import { useApi } from "../composables/useFetch";
import { defineStore } from "pinia";
import { computed } from "vue";
import { ref } from "vue";

export const useAppStore = defineStore("app", () => {
  const loading = ref(false);
  const error = ref(null);

  const technicianUrl = computed(
    () => `${import.meta.env.VITE_API_URL}/api/technicians`,
  );
  const { data: servicesList } = useApi(technicianUrl, {
    withCredentials: false,
  });

  const technicians = computed(() => servicesList.value?.technicians || []);

  const servicesUrl = computed(
    () => `${import.meta.env.VITE_API_URL}/api/services/names`,
  );
  const { data: servicesData } = useApi(servicesUrl, {
    withCredentials: false,
  });
  const services = computed(() => servicesData.value?.services || []);

  return {
    technicians,
    services,
  };
});
