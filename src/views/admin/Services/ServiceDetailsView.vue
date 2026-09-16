<template>
  <Spinner v-if="adminServiceStore.isLoadingDetails" size="large" />
  <div class="admin-page" v-else>
    <!-- HEADER -->
    <header class="page-header">
      <div class="header-content">
        <div class="title-area">
          <div class="parent-service">
            {{ details.serviceName || "Parent Service" }}
          </div>
          <h1 class="sub-service-title">
            {{ details.name || "Sub-Service Name" }}
          </h1>

          <div class="badges">
            <span
              class="badge status-badge"
              :class="{
                active: details.isActive,
                inactive: !details.isActive,
              }"
            >
              {{ details.isActive ? "ACTIVE" : "INACTIVE" }}
            </span>
            <span v-if="details.isFeatured" class="badge featured-badge">
              {{ details.isFeatured ? "featured" : "not featured" }}
            </span>
          </div>
        </div>

        <div class="header-actions">
          <BaseButton
            icon-left="pen"
            @click="saveChanges"
            label="Save Changes"
            :disabled="adminServiceStore.isSaving || isUnchanged"
            variant="success"
          />

          <BaseButton
            icon-left="trash"
            @click="showDeleteModal = true"
            label="Delete"
            variant="danger"
          />
        </div>
      </div>
    </header>

    <div class="main-content">
      <!-- LEFT COLUMN - FORM -->
      <div class="form-column">
        <!-- BASIC INFORMATION -->
        <section class="card">
          <h2 class="section-title">Basic Information</h2>

          <div class="form-grid">
            <div class="form-group">
              <label>Sub-service Name</label>
              <input
                v-model="form.name"
                type="text"
                class="input"
                placeholder="Enter sub-service name"
              />
            </div>

            <div class="form-group">
              <label>Price (ksh)</label>
              <input
                v-model.number="form.price"
                type="number"
                min="0"
                class="input"
              />
            </div>

            <div class="form-group">
              <label>Duration (minutes)</label>
              <input
                v-model.number="form.duration"
                type="number"
                min="0"
                class="input"
              />
            </div>
          </div>

          <div class="form-group">
            <label>Description</label>
            <textarea
              v-model="form.description"
              rows="5"
              class="textarea"
              placeholder="Describe this sub-service..."
            ></textarea>
          </div>
        </section>

        <!-- VISIBILITY & STATUS -->
        <section class="card">
          <h2 class="section-title">Visibility & Status</h2>

          <div class="toggle-group">
            <div class="toggle-row">
              <div>
                <strong>{{ details.isActive ? "Active" : "Inactive" }}</strong>
                <p class="helper-text">
                  {{
                    details.isActive
                      ? "Visible to customers"
                      : "Not visible to customers"
                  }}
                </p>
              </div>
              <label class="switch">
                <input
                  type="checkbox"
                  :checked="details.isActive"
                  @change="toggleStatus"
                  :disabled="adminServiceStore.isSaving"
                />
                <span class="slider"></span>
              </label>
            </div>

            <div class="toggle-row">
              <div>
                <strong>{{
                  details.isFeatured ? "Featured" : "Not Featured"
                }}</strong>
                <p class="helper-text">Highlight in marketing sections</p>
              </div>
              <label class="switch">
                <input
                  type="checkbox"
                  v-model="details.isFeatured"
                  :disabled="adminServiceStore.isSaving"
                  @change="toggleFeatured"
                />
                <span class="slider"></span>
              </label>
            </div>
          </div>
        </section>

        <!-- MARKETING -->
        <section class="card">
          <h2 class="section-title">Marketing & Promotions</h2>

          <div class="form-group">
            <label>Discount Type</label>
            <select v-model="form.discountType" class="input">
              <option value="none">No Discount</option>
              <option value="percentage">Percentage Off</option>
              <option value="fixed">Fixed Amount Off</option>
            </select>
          </div>

          <div v-if="form.discountType !== 'none'" class="form-group">
            <label>Discount Value</label>
            <div class="discount-input">
              <input
                v-model.number="form.discountValue"
                type="number"
                min="0"
                class="input"
              />
              <span class="suffix">
                {{ details.discountType === "percentage" ? "%" : "ksh" }}
              </span>
            </div>
          </div>
        </section>

        <!-- STATISTICS -->
        <section class="card">
          <h2 class="section-title">Statistics (Read-only)</h2>
          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-label">Total Bookings</span>
              <span class="stat-value">{{ details.bookingCount }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Created</span>
              <span class="stat-value">{{
                formatDate(details.createdAt)
              }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Last Updated</span>
              <span class="stat-value">{{
                formatDate(details.updatedAt)
              }}</span>
            </div>
          </div>
        </section>

        <section class="previews" v-if="upload.previews.value.length > 0">
          <h3 class="section-title">new images to upload</h3>
          <div class="custom-image-grid">
            <div
              v-for="(img, i) in upload.previews.value"
              :key="i"
              class="image-item"
            >
              <img :src="img" alt="Service image" class="preview-img" />
              <button class="delete-img-btn" @click="upload.removeFile(i)">
                ×
              </button>
            </div>
          </div>
        </section>
      </div>

      <!-- RIGHT COLUMN - PREVIEW + IMAGES -->
      <div class="preview-column">
        <!-- IMAGES MANAGEMENT -->
        <section class="card images-card">
          <h2 class="section-title">Images</h2>
          <p class="helper-text">
            First image is used as thumbnail. Drag to reorder (demo).
          </p>

          <div class="image-grid">
            <div v-for="img in details.images" :key="img.id" class="image-item">
              <img
                :src="img.image_url"
                alt="Service image"
                class="preview-img"
              />
            </div>
          </div>
        </section>

        <!-- LIVE PREVIEW -->
        <section class="card preview-card">
          <h3 class="preview-title">Customer Preview</h3>
          <div class="service-preview">
            <img
              :src="details.images[0].image_url"
              class="preview-thumbnail"
              alt="Thumbnail"
            />

            <div class="preview-content">
              <div class="preview-badges">
                <span
                  v-if="details.isFeatured"
                  class="badge featured-badge small"
                  >{{ details.isFeatured ? "FEATURED" : "not featured" }}</span
                >
              </div>

              <h4 class="preview-name">
                {{ details.name || "Service Name" }}
              </h4>
              <p class="preview-desc">
                {{
                  details.description?.substring(0, 120) ||
                  "No description yet..."
                }}
              </p>

              <div class="preview-price">
                <span class="price">
                  ksh {{ details.price }}
                  <span v-if="details.discountType !== 'none'" class="discount">
                    {{
                      details.discountType === "percentage"
                        ? `${details.discountValue}%`
                        : `${details.discountValue}`
                    }}
                  </span>
                </span>
                <span class="duration"
                  >{{ formatDuration(details.duration) }}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section class="upload-actions">
          <label class="upload-btn">
            <input
              type="file"
              accept="image/*"
              multiple
              @change="upload.handleFileUpload"
              style="display: none"
            />
            <span>📸 Upload New Images</span>
          </label>
          <BaseButton
            label="upload custom images"
            variant="success"
            size="medium"
            fullWidth
            :disabled="
              upload.files.value.length === 0 || adminServiceStore.isUploading
            "
            @click="uploadImages"
          />
        </section>
      </div>
    </div>
  </div>

  <ConfirmModal
    :is-open="showDeleteModal"
    title="Confirm Deletion"
    message="Are you sure you want to delete this sub-service? This action cannot be undone."
    type="danger"
    warningText="This action cannot be undone."
    @confirm="deleteSubService"
    @cancel="showDeleteModal = false"
  />
</template>

<script setup>
import { computed, watch, ref, reactive } from "vue";
import Spinner from "@/components/Spinner.vue";
import BaseButton from "@/components/BaseButton.vue";
import { formatDate, formatDuration } from "@/Utility/utils";
import { useAdminServiceStore } from "@/components/store/adminServiceStore.js";
import { useToast } from "@/components/composables/useToast";
import ConfirmModal from "@/components/ConfirmModal.vue";
import { useFileUpload } from "@/components/composables/useFileUpload";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const { show } = useToast();
const upload = useFileUpload();
const showDeleteModal = ref(false);
const adminServiceStore = useAdminServiceStore();

const details = computed(() => adminServiceStore.selectedSubService);
const originalSnapshot = ref(null);
const existingImages = ref([]);

const form = reactive({
  name: "",
  price: 0,
  duration: 0,
  description: "",
  discountType: "",
  discountValue: 0,
});

const fetchDetails = async () => {
  const subServiceId = route.params.subServiceId;

  if (typeof subServiceId !== "string" && typeof subServiceId !== "number") {
    return;
  }

  await adminServiceStore.fetchSubServiceDetails(String(subServiceId));
};

watch(
  () => route.params.subServiceId,
  () => {
    fetchDetails();
  },
  { immediate: true },
);

watch(
  details,
  (value) => {
    if (!value) return;

    Object.assign(form, {
      name: value.name ?? "",
      price: value.price ?? 0,
      duration: value.duration ?? 0,
      description: value.description ?? "",
      discountType: value.discountType ?? "",
      discountValue: value.discountValue ?? "",
    });

    existingImages.value = value.images ?? [];
    originalSnapshot.value = JSON.stringify(form);
  },
  { immediate: true },
);

const isUnchanged = computed(() => {
  return originalSnapshot.value === JSON.stringify(form);
});
//status toggler
const toggleStatus = async (e) => {
  const newValue = e.target.checked;

  const data = await adminServiceStore.toggleSubServiceStatus(
    details.value.subServiceId,
    newValue,
  );
  if (data) {
    show({
      type: "success",
      message: data.message || "Sub-service status updated successfully",
    });
  } else {
    show({ type: "error", message: "Failed to update sub-service status" });
  }
};

//toogle featured
const toggleFeatured = async (e) => {
  const newValue = e.target.checked;

  const data = await adminServiceStore.toggleSubServiceFeatured(
    details.value.subServiceId,
    newValue,
  );
  if (data) {
    show({
      type: "success",
      message:
        data.message || "Sub-service featured status updated successfully",
    });
  } else {
    show({
      type: "error",
      message: "Failed to update sub-service featured status",
    });
  }
};

//delete
const deleteSubService = async () => {
  const data = await adminServiceStore.deleteSubService(
    details.value.subServiceId,
  );
  if (data) {
    show({
      type: "success",
      message: data.message || "Sub-service deleted successfully",
    });
    router.push("/admin/services");
  } else {
    show({
      type: "error",
      message: "Failed to delete sub-service",
    });
  }
};

//update
const saveChanges = async () => {
  if (!details.value) return;

  const { message, updated } = await adminServiceStore.updateSubService(
    details.value.subServiceId,
    {
      name: form.name,
      price: form.price,
      duration: form.duration,
      description: form.description,
      discountType: form.discountType,
      discountValue: form.discountValue,
    },
  );

  if (updated) {
    show({ message: message, type: "success" });
  } else {
    show({ message: "error updating sub service", type: "error" });
  }
};

const uploadImages = async () => {
  const payload = {
    images: upload.files.value,
    subServiceId: details.value.subServiceId,
  };

  const data = await adminServiceStore.subServiceImagesUpload(payload);

  if (data) {
    upload.clearAll();
    show({ message: data.message, type: "success" });
  } else {
    show({ message: "error uploading images", type: "error" });
  }
};
</script>

<style scoped>
/* === LAYOUT === */
.admin-page {
  min-height: 100vh;
  background: #f8f6f3;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  color: var(--text-dark);
}

.page-header {
  background: var(--bg-dark);
  color: var(--text-light);
  padding: 2rem 2.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1400px;
  margin: 0 auto;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.title-area h1 {
  font-size: 2.4rem;
  margin: 0.2rem 0 0.5rem;
  color: var(--text-secondary);
}

.parent-service {
  color: var(--nav-links);
  font-weight: 500;
  letter-spacing: 0.5px;
}

.badges {
  display: flex;
  gap: 0.75rem;
}

.badge {
  padding: 0.35rem 1rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-badge.active {
  background: #10b981;
  color: white;
}

.status-badge.inactive {
  background: #ef4444;
  color: white;
}

.featured-badge {
  background: #f5d698;
  color: var(--text-dark);
}

.header-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* MAIN CONTENT */
.main-content {
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 2rem;
  max-width: 1400px;
  margin: 2rem auto;
  padding: 0 2.5rem;
}

@media (max-width: 1024px) {
  .main-content {
    grid-template-columns: 1fr;
  }
}

.card {
  background: white;
  border-radius: 12px;
  padding: 1.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
}

.section-title {
  margin-top: 0;
  color: var(--text-heading);
  border-bottom: 2px solid #f5d698;
  padding-bottom: 0.75rem;
}

/* Form styles */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--dark-gray);
}

.input,
.textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border 0.2s;
}

.input:focus,
.textarea:focus {
  outline: none;
  border-color: var(--hover-color);
}

/* Toggles */
.toggle-group {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.toggle-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.switch {
  position: relative;
  display: inline-block;
  width: 56px;
  height: 30px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ccc;
  transition: 0.4s;
  border-radius: 9999px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 22px;
  width: 22px;
  left: 4px;
  bottom: 4px;
  background: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background: #10b981;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

/* Images */
.image-grid,
.custom-image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.image-item {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.preview-img {
  width: 100%;
  height: 120px;
  object-fit: cover;
}

.delete-img-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(239, 68, 68, 0.9);
  color: white;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.1rem;
}

.upload-btn {
  display: block;
  text-align: center;
  padding: 1rem;
  border: 3px dashed #ccc;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  background: #fafafa;
}

.upload-btn:hover {
  border-color: var(--hover-color);
  background: #fff;
}

/* Preview Card */
.service-preview {
  border: 1px solid #eee;
  border-radius: 12px;
  overflow: hidden;
  background: white;
}

.preview-thumbnail {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.preview-content {
  padding: 1.25rem;
}

.preview-name {
  margin: 0.5rem 0 0.75rem;
  font-size: 1.35rem;
}

.preview-desc {
  color: var(--dark-gray);
  line-height: 1.5;
  margin-bottom: 1rem;
}

.preview-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.3rem;
  font-weight: 700;
}

.discount {
  color: #ef4444;
  font-size: 0.95rem;
  margin-left: 0.5rem;
}
/* upload actions */

.upload-actions {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1.5rem;
}

/* Stats */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1.5rem;
}

.stat-item {
  background: #f8f6f3;
  padding: 1rem;
  border-radius: 8px;
}

.stat-label {
  display: block;
  color: var(--dark-gray);
  font-size: 0.9rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-dark);
}

/* Helper text */
.helper-text {
  font-size: 0.9rem;
  color: var(--dark-gray);
  margin-top: 0.25rem;
}

/* Discount input */
.discount-input {
  position: relative;
}

.suffix {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--dark-gray);
  font-weight: 600;
}
</style>
