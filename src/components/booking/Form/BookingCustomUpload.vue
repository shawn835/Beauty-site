<!-- BookingCustomUpload.vue -->
<template>
  <div class="upload-section">
    <div class="form-group">
      <label>Upload Sample Design (Optional)</label>
      <div
        class="file-upload-area"
        @click="triggerFileInput"
        @dragover.prevent
        @drop="handleDrop"
      >
        <input
          ref="customInputRef"
          type="file"
          accept="image/*"
          multiple
          @change="handleFileUpload"
          hidden
        />
        <div class="upload-content">
          <span class="upload-icon">📸</span>
          <p>Click or drag & drop your images here</p>
          <small>PNG, JPG • Max 5MB each</small>
        </div>
      </div>
    </div>

    <!-- Preview -->
    <div v-if="previews.length" class="preview-section">
      <h4>Selected Designs</h4>
      <div class="preview-images">
        <div v-for="(img, idx) in previews" :key="idx" class="preview-wrapper">
          <img :src="img" class="preview-img" alt="Preview" />
          <button type="button" class="remove-btn" @click="removeFile(idx)">
            ✕
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  form: Object,
  previews: Array,
  handleFileUpload: Function,
  removeFile: Function,
  customInputRef: Object,
});
</script>

<style scoped>
.file-upload-area {
  border: 2px dashed #9b59b6;
  border-radius: 14px;
  padding: 2.2rem 1rem;
  text-align: center;
  cursor: pointer;
  background: #fdf7ff;
  transition: all 0.3s;
}

.file-upload-area:hover {
  background: #f8efff;
  border-color: #8e44ad;
}

.upload-icon {
  font-size: 3rem;
  margin-bottom: 12px;
  display: block;
}

.preview-images {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.preview-wrapper {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.12);
}

.preview-img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.remove-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #e74c3c;
  color: white;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
