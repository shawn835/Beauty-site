// composables/useFileUpload.js
import { ref } from "vue";

export function useFileUpload() {
  const previews = ref([]); // DataURLs for preview
  const files = ref([]); // Actual File objects

  const handleFileUpload = (event) => {
    const selectedFiles = Array.from(event.target.files);

    for (let file of selectedFiles) {
      files.value.push(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        previews.value.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }

    // allow reselecting same file later
    event.target.value = "";
  };

  const removeFile = (index) => {
    previews.value.splice(index, 1);
    files.value.splice(index, 1);
  };

  const clearAll = () => {
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
