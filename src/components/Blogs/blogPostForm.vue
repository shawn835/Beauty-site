<template>
  <div class="admin-panel">
    <h2>New Blog Post</h2>
    <form @submit.prevent="submitBlog" enctype="multipart/form-data">
      <!-- Title & Slug -->
      <div class="form-group">
        <label>Title</label>
        <input v-model="blog.title" placeholder="Blog Title" />
      </div>
      <div class="form-group">
        <label>Slug (URL-friendly)</label>
        <input
          v-model="blog.slug"
          placeholder="e.g., how-to-paint-nails"
          required />
      </div>

      <!-- Author, Category, SubCategory -->
      <div class="form-row">
        <div class="form-group">
          <label>Author</label>
          <input v-model="blog.author" placeholder="Author Name" required />
        </div>
        <div class="form-group">
          <label>Category</label>
          <input v-model="blog.category" placeholder="Category" required />
        </div>
        <div class="form-group">
          <label>SubCategory</label>
          <input
            v-model="blog.subCategory"
            placeholder="Subcategory"
            required />
        </div>
      </div>

      <!-- Excerpt -->
      <div class="form-group">
        <label>Excerpt (Short Summary)</label>
        <textarea
          v-model="blog.excerpt"
          placeholder="Short description..."
          rows="2"
          required></textarea>
      </div>

      <!-- Blog Content -->
      <div class="form-group">
        <label>Content</label>
        <textarea
          v-model="blog.content"
          placeholder="Write your blog content..."
          rows="6"
          required></textarea>
      </div>

      <!-- Tags -->
      <div class="form-group">
        <label>Tags (Comma Separated)</label>
        <input
          v-model="tagsInput"
          @blur="formatTags"
          placeholder="e.g., beauty, nails, manicure" />
      </div>

      <!-- Meta Fields -->
      <div class="form-group">
        <label>Meta Title</label>
        <input v-model="blog.meta.title" placeholder="SEO Title" />
      </div>
      <div class="form-group">
        <label>Meta Description</label>
        <textarea
          v-model="blog.meta.description"
          placeholder="SEO Description"
          rows="2"></textarea>
      </div>
      <div class="form-group">
        <label>Meta Keywords (Comma Separated)</label>
        <input
          v-model="metaKeywordsInput"
          @blur="formatMetaKeywords"
          placeholder="e.g., nail care, beauty tips" />
      </div>

      <!-- Upload Image -->
      <div class="form-group">
        <label>Upload Display Image</label>
        <input
          type="file"
          @change="handleDisplayImageUpload"
          accept="image/*" />

        <label>Upload Post Images</label>
        <input
          type="file"
          multiple
          @change="handlePostImagesUpload"
          accept="image/*" />
      </div>

      <!-- Submit Button -->
      <button type="submit">Post Blog</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { handleSubmitBlog, generateID } from "./blogsUtils.js";

const apiUrl = import.meta.env.VITE_API_URL;
import { useToast } from "vue-toastification";
const toast = useToast();
const blog = ref({
  id: generateID(),
  title: "",
  slug: "",
  author: "",
  category: "",
  subCategory: "",
  excerpt: "",
  content: "",
  tags: [],
  image: null,
  postImages: [],
  meta: {
    title: "",
    description: "",
    keywords: [],
    ogImage: "",
  },
});

const tagsInput = ref("");
const metaKeywordsInput = ref("");

// Format Tags
const formatTags = () => {
  blog.value.tags = tagsInput.value.split(",").map((tag) => tag.trim());
};

// Format Meta Keywords
const formatMetaKeywords = () => {
  blog.value.meta.keywords = metaKeywordsInput.value
    .split(",")
    .map((kw) => kw.trim());
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];

const handleDisplayImageUpload = (e) => {
  const file = e.target.files[0];

  if (!validateFile(file)) {
    e.target.value = "";
    return;
  }

  blog.value.image = file;
};

const handlePostImagesUpload = (e) => {
  const files = Array.from(e.target.files);
  const validFiles = files.filter(validateFile);

  if (validFiles.length === 0) {
    e.target.value = "";
    return;
  }

  blog.value.postImages = validFiles;
};

const validateFile = (file) => {
  if (file.size > MAX_FILE_SIZE) {
    toast("File size must be less than 5MB");
    return false;
  }
  if (!allowedMimeTypes.includes(file.type)) {
    toast("Only JPEG, PNG, or GIF files are allowed");
    return false;
  }
  return true;
};

const submitBlog = async () => {
  await handleSubmitBlog(blog, apiUrl, toast);
};
</script>

<style scoped>
.admin-panel {
  max-width: 700px;
  margin: 30px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: #fff;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

textarea {
  resize: vertical;
}

.form-row {
  display: flex;
  gap: 10px;
}

.form-row .form-group {
  flex: 1;
}

button {
  width: 100%;
  background: #007bff;
  color: white;
  border: none;
  padding: 12px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: #0056b3;
}
</style>
