import { ref } from "vue";
export function usePagination() {
  const page = ref(1);
  const limit = ref(8);

  const totalPages = ref(1);
  const totalCount = ref(0);

  const nextPage = () => {
    if (page.value < totalPages.value) {
      page.value++;
    }
  };

  const prevPage = () => {
    if (page.value > 1) {
      page.value--;
    }
  };

  const setMeta = (response) => {
    totalPages.value = response.totalPages ?? 1;
    totalCount.value = response.total ?? 0;
    page.value = response.currentPage ?? 1;
  };

  return {
    page,
    limit,
    totalPages,
    totalCount,
    nextPage,
    prevPage,
    setMeta,
  };
}
