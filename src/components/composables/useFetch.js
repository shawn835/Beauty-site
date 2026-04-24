import { handleResponse } from "../utility/response";
import { ref, unref, watch } from "vue";

export function useApi(
  baseUrl,
  { perPage = null, options = {}, withCredentials = false } = {},
) {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(false);

  // pagination
  const page = ref(1);
  const totalPages = ref(1);
  const totalCount = ref(0);

  const fetchData = async (overrideUrl = null) => {
    loading.value = true;
    error.value = null;

    try {
      let url = overrideUrl || unref(baseUrl);

      // attach pagination if perPage is set
      if (perPage) {
        const connector = url.includes("?") ? "&" : "?";
        url = `${url}${connector}page=${page.value}&limit=${perPage}`;
      }

      const finalOptions = {
        ...options,
        ...(withCredentials ? { credentials: "include" } : {}),
      };

      const res = await fetch(url, finalOptions);
      const json = await handleResponse(res);

      data.value = json;
      console.log(data.value);

      // update pagination
      // update pagination metadata ONLY
      if (perPage && json) {
        totalPages.value = json.totalPages || 1;
        totalCount.value = json.totalCount || 0;
      }
    } catch (err) {
      console.error("useApi error:", err.stack);
      error.value = err.message;
      data.value = null;
    } finally {
      loading.value = false;
    }
  };

  const nextPage = async () => {
    if (page.value < totalPages.value) {
      page.value++;
      await fetchData();
    }
  };

  const prevPage = async () => {
    if (page.value > 1) {
      page.value--;
      await fetchData();
    }
  };

  // auto-refetch when baseUrl is reactive
  if (typeof baseUrl !== "string") {
    watch(
      baseUrl,
      () => {
        page.value = 1;
        fetchData();
      },
      { immediate: true },
    );
  }

  return {
    data,
    error,
    loading,
    fetchData,
    page,
    totalPages,
    totalCount,
    nextPage,
    prevPage,
  };
}
