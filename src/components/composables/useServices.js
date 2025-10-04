import { useApi } from "./useFetch";
import { computed } from "vue";

export function useServices() {
  const { data, fetchData, loading } = useApi(
    `${import.meta.env.VITE_API_URL}/api/services/names`
  );
  const servicesNames = computed(() => data.value?.names || []);
  return { servicesNames, fetchData, loading };
}
