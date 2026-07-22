import { handleResponse } from "@/Utility/response";

import { ref, unref, watch } from "vue";

export function useApi(baseUrl, options = {}) {
  const data = ref(null);
  const loading = ref(false);

  const fetchData = async () => {
    loading.value = true;

    try {
      const url = unref(baseUrl);
      const res = await fetch(url, options);
      data.value = await handleResponse(res);
    } catch (err) {
      data.value = null;
    } finally {
      loading.value = false;
    }
  };

  watch(() => unref(baseUrl), fetchData, {
    immediate: true,
  });

  return {
    data,
    loading,
    fetchData,
  };
}
