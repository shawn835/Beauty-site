import { useApi } from "./useFetch";
import { computed } from "vue";

export function useTechnicians() {
  const { data, fetchData, loading } = useApi(
    `${import.meta.env.VITE_API_URL}/api/technicians`
  );
  const technicians = computed(() => data.value?.technicians || []);
  return { technicians, fetchData, loading };
}
