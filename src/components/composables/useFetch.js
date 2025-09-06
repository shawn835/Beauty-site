import { ref } from "vue";
const perPage = 8;
export const images = ref([]);
export const currentPage = ref(1);
export const totalPages = ref(1);
export const loading = ref(false);
export const totalCount = ref(0);

export const fetchServicesNames = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/services/names`
    );
    const data = await res.json();
    if (!res.ok)
      throw new Error(data.message || "Failed to fetch services names");
    return data.names;
  } catch (error) {
    console.error("Error fetching service names:", error);
    return [];
  }
};

export const fetchTechnicians = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/technicians`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch technicians");
    return data.technicians;
  } catch (error) {
    console.error("Error fetching technicians:", error);
    return [];
  }
};
export const fetchGalleryItems = async (page = 1) => {
  loading.value = true;
  try {
    const res = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/api/gallery/images?page=${page}&limit=${perPage}`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const data = await res.json();
    images.value = data.images;
    totalPages.value = data.pagination.totalPages;
    currentPage.value = data.pagination.page;
    totalCount.value = data.pagination.totalCount;
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    images.value = [];
  } finally {
    loading.value = false;
  }
};
