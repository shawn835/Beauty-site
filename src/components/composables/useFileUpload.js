import { ref } from "vue";

export function useFileUpload() {
  const previews = ref([]); // object URLs
  const files = ref([]);

  const handleFileUpload = (event) => {
    const selectedFiles = Array.from(event.target.files);

    for (let file of selectedFiles) {
      files.value.push(file);

      const url = URL.createObjectURL(file);
      previews.value.push(url);
    }

    event.target.value = "";
  };

  const removeFile = (index) => {
    URL.revokeObjectURL(previews.value[index]); //revoke
    previews.value.splice(index, 1);
    files.value.splice(index, 1);
  };

  const clearAll = () => {
    previews.value.forEach((url) => URL.revokeObjectURL(url));
    previews.value = [];
    files.value = [];
  };

  return {
    previews,
    files,
    handleFileUpload,
    removeFile,
    clearAll,
  };
}
