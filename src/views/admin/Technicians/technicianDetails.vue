<template>
  <Spinner size="large" v-if="technicianStore.isGettingDetails" />
  <div class="technician-details" v-else>
    <!-- HEADER -->
    <div class="detail-header">
      <div class="container">
        <div class="actions">
          <BaseButton
            label="Back to Technicians"
            variant="warning"
            size="medium"
            @click="$router.push('/admin/technicians')"
            icon-left="arrow-left"
          />

          <BaseButton
            label="save changes"
            variant="success"
            size="medium"
            @click="technicianUpdate"
            :disabled="technicianStore.isUpdating"
          />
        </div>

        <div class="profile-header">
          <!-- Photo Upload Section -->
          <div class="photo-section">
            <div class="profile-photo">
              <img
                :src="previewImage || profile?.profilePhoto"
                :alt="profile?.name"
              />
              <div class="photo-overlay">
                <label class="upload-trigger">
                  📸 Change Photo
                  <input
                    type="file"
                    accept="image/*"
                    @change="upload.handleFileUpload"
                    style="display: none"
                  />
                </label>
              </div>
            </div>

            <!-- Upload Button (only shows when a new file is selected) -->
            <BaseButton
              v-if="upload.files.value.length"
              label="Upload New Photo"
              size="small"
              variant="success"
              @click="uploadPhoto"
              :disabled="technicianStore.isUploadingProfile"
              class="upload-confirm-btn"
            />
          </div>

          <!-- Profile Info -->
          <div class="profile-info">
            <h1>{{ profile?.name }}</h1>
            <p class="role">Senior Nail Technician</p>

            <div class="status-toggle">
              <BaseButton
                :label="profile?.isActive ? 'deactivate' : 'activate'"
                :variant="profile?.isActive ? 'success' : 'danger'"
                size="small"
                @click="openStatusModal"
              />
            </div>
          </div>

          <!-- Quick Stats -->
          <div class="quick-stats">
            <div class="stat">
              <span class="number">{{ profile.yearsOfExperience }}</span>
              <span class="label">Years Exp.</span>
            </div>
            <div class="stat">
              <span class="number">{{ profile?.rating || "—" }}</span>
              <span class="label">Rating</span>
            </div>
            <div class="stat">
              <span class="number">{{ bookingMetrics.totalBookings }}</span>
              <span class="label">Bookings</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container content-grid">
      <!-- LEFT COLUMN -->
      <div class="left-column">
        <!-- CONTACT INFO -->
        <div class="card">
          <h2>Contact Information</h2>
          <div class="info-grid">
            <div class="info-row">
              <span class="info-key">Email</span>
              <input
                v-model="profile.email"
                class="editable-input"
                type="email"
                disabled
              />
            </div>
            <div class="info-row">
              <span class="info-key">Phone</span>
              <input
                v-model="profile.phone"
                class="editable-input"
                type="tel"
                disabled
              />
            </div>

            <div class="info-row">
              <span class="info-key"> bio </span>
              <textarea
                v-model="profile.bio"
                placeholder="Enter bio"
                rows="4"
                columns="50"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- EMPLOYMENT -->
        <div class="card">
          <h2>Employment Information</h2>
          <div class="info-grid">
            <div class="info-row">
              <span class="info-key">Experience</span>
              <input
                v-model.number="profile.yearsOfExperience"
                class="editable-input"
                type="number"
              />
              years
            </div>
            <div class="info-row">
              <span class="info-key">Joined</span>
              <span>{{ formatDate(profile.createdAt) }}</span>
            </div>
          </div>
        </div>

        <!-- WORKING SCHEDULE -->
        <div class="card">
          <h2>Weekly Schedule</h2>
          <div class="schedule-grid">
            <div v-for="day in schedule" :key="day.day" class="schedule-day">
              <strong>{{ day.day }}</strong>
              <span>{{ day.hours }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT COLUMN -->
      <div class="right-column">
        <!-- UPCOMING BOOKINGS -->
        <div class="card">
          <h2>Upcoming Bookings</h2>
          <div
            v-for="booking in upcomingBookings"
            :key="booking.bookingId"
            class="booking-item"
          >
            <div>
              <strong>{{ booking.serviceName }}</strong
              ><br />
              <small
                >{{ booking.customerName }} •
                {{ formatDate(booking.startTime) }}
                {{ formatTime(booking.startTime) }}</small
              >
            </div>
            <span :class="['status-badge', booking.status]">{{
              booking.status
            }}</span>
          </div>
        </div>

        <!-- PERFORMANCE -->
        <div class="card">
          <h2>Performance Metrics</h2>
          <div class="metrics-grid">
            <div class="metric">
              <span class="metric-value"
                >{{ bookingMetrics.completionRate }}%</span
              >
              <span class="metric-label">Completion Rate</span>
            </div>
            <div class="metric">
              <span class="metric-value">4.92</span>
              <span class="metric-label">Avg. Rating</span>
            </div>
            <div class="metric">
              <span class="metric-value"
                >KES {{ revenueMetrics.totalRevenue }}</span
              >
              <span class="metric-label">Total Revenue</span>
            </div>
          </div>
        </div>

        <!-- REVIEWS -->
        <div class="card">
          <h2>Recent Customer Reviews</h2>
          <div v-for="review in reviews" :key="review.id" class="review-item">
            <div class="review-header">
              <strong>{{ review.client }}</strong>
              <span class="stars">★★★★☆</span>
            </div>
            <p class="review-text">"{{ review.comment }}"</p>
          </div>
        </div>

        <!-- ACTIVITY LOG -->
        <div class="card">
          <h2>Activity Log</h2>
          <div class="activity-log">
            <div v-for="log in activityLog" :key="log.id" class="log-entry">
              <small>{{ log.time }}</small>
              <span>{{ log.action }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ConfirmModal
    :isOpen="showModal"
    v-bind="modalConfig"
    @cancel="handleModalCancel"
    @confirm="handleModalConfirm"
  />
</template>

<script setup>
import { computed, ref, watch } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import { useFileUpload } from "@/components/composables/useFileUpload";
import { useTechnicianStore } from "@/components/store/TechnicianStore";
import { useRoute, useRouter } from "vue-router";
import { formatTime, formatDate } from "@/Utility/utils";
import ConfirmModal from "@/components/ConfirmModal.vue";
import Spinner from "@/components/Spinner.vue";
import { useToast } from "@/components/composables/useToast";

const technicianStore = useTechnicianStore();
const route = useRoute();
const { show } = useToast();
const upload = useFileUpload();
const router = useRouter();

const showModal = ref(false);

const modalState = ref("confirm"); // confirm | blocked

const affectedBookings = ref([]);
const bookingCount = ref(0);

const technician = computed(() => technicianStore.selectedTechnician);
const profile = computed(() => technician.value?.profile);
const bookingSummary = computed(() => technician.value?.bookingSummary);
const upcomingBookings = computed(
  () => technician.value?.upcomingBookings ?? [],
);
const recentReviews = computed(() => technician.value?.recentReviews ?? []);
const bookingMetrics = computed(() => technician.value?.bookingMetrics ?? {});
const revenueMetrics = computed(() => technician.value?.revenueMetrics);

const previewImage = computed(() => {
  return upload.previews.value[0] ?? null;
});

// fetch technician details
const fetchTechnicianDetails = async () => {
  const technicianId = route.params.technicianId;

  if (typeof technicianId !== "string" && typeof technicianId !== "number") {
    return;
  }
  await technicianStore.technicianDetails(technicianId);
};

watch(
  () => route.params.technicianId,
  () => {
    fetchTechnicianDetails();
  },
  { immediate: true },
);

const uploadPhoto = async () => {
  const payload = {
    images: upload.files.value,
    technicianId: route.params.technicianId,
  };

  const data = await technicianStore.uploadProfilePhoto(payload);

  if (data) {
    upload.clearAll();
    show({ message: data.message, type: "success" });
  } else {
    show({ message: "error uploading images", type: "error" });
  }
};

const technicianUpdate = async () => {
  const payload = {
    bio: profile.value.bio,
    yearsOfExperience: profile.value.yearsOfExperience,
  };

  try {
    await technicianStore.updateTechnician(route.params.technicianId, payload);
    show({ message: "Technician updated successfully", type: "success" });
  } catch (error) {
    show({
      message: error.message || "Failed to update technician",
      type: "error",
    });
  }
};

const toggleStatus = async () => {
  try {
    const newStatus = !profile.value.isActive;

    const data = await technicianStore.toggleTechnicianStatus(
      route.params.technicianId,
      newStatus,
    );

    profile.value.isActive = newStatus;

    show({
      message: data.message,
      type: "success",
    });

    showModal.value = false;
  } catch (error) {
    if (error.code === "TECHNICIAN_HAS_UPCOMING_BOOKINGS") {
      bookingCount.value = error.bookingCount;
      affectedBookings.value = error.bookings;

      modalState.value = "blocked";

      return;
    }

    showModal.value = false;

    show({
      message: error.message || "Failed to update technician status.",
      type: "error",
    });
  }
};

const modalConfig = computed(() => {
  const activating = !profile.value?.isActive;

  if (modalState.value === "confirm") {
    return {
      title: activating ? "Activate Technician" : "Deactivate Technician",

      message: activating
        ? "Are you sure you want to activate this technician?"
        : "Are you sure you want to deactivate this technician?",

      warningText: activating
        ? "The technician will be available for new bookings."
        : "The technician will no longer receive new bookings.",

      confirmText: activating ? "Activate" : "Deactivate",

      cancelText: "Cancel",

      type: activating ? "success" : "danger",
    };
  }

  return {
    title: "Cannot Deactivate Technician",

    message: `This technician has ${bookingCount.value} upcoming booking${
      bookingCount.value === 1 ? "" : "s"
    }.`,

    warningText:
      "These bookings must be reassigned before the technician can be deactivated.",

    confirmText: "View Bookings",

    cancelText: "Close",

    type: "warning",
  };
});

const handleModalCancel = () => {
  showModal.value = false;

  // Reset for the next time the modal is opened
  modalState.value = "confirm";
  bookingCount.value = 0;
  affectedBookings.value = [];
};

const handleModalConfirm = async () => {
  switch (modalState.value) {
    case "confirm":
      await toggleStatus();
      break;

    case "blocked":
      showModal.value = false;

      router.push("/admin/bookings");

      break;
  }
};

const openStatusModal = () => {
  modalState.value = "confirm";
  showModal.value = true;
};
</script>

<style scoped>
.technician-details {
  background: #2e3538;
  color: #e5e7eb;
  min-height: 100vh;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.detail-header {
  background: #252b2e;
  padding: 2.5rem 0 2rem;
  border-bottom: 1px solid rgba(245, 214, 152, 0.15);
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  flex-wrap: wrap;
}

.photo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.profile-photo {
  position: relative;
  width: 168px;
  height: 168px;
  border-radius: 50%;
  overflow: hidden;
  border: 6px solid #f5d698;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
}

.profile-photo:hover {
  transform: scale(1.05);
}

.profile-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
  border-radius: 50%;
}

.profile-photo:hover .photo-overlay {
  opacity: 1;
}

.upload-trigger {
  color: white;
  background: rgba(245, 214, 152, 0.25);
  padding: 8px 16px;
  border-radius: 9999px;
  font-size: 0.95rem;
  cursor: pointer;
  text-align: center;
  font-weight: 600;
  transition: all 0.2s;
}

.upload-trigger:hover {
  background: #f5d698;
  color: #2e3538;
}

.upload-confirm-btn {
  margin-top: 8px;
}

.profile-info h1 {
  margin: 0;
  font-size: 2.4rem;
  color: #f5d698;
}

.role {
  color: #9ca3af;
  font-size: 1.2rem;
  margin: 0.4rem 0 1rem;
}

.status-toggle {
  display: flex;
  align-items: center;
  gap: 12px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 62px;
  height: 32px;
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
  background: #475569;
  transition: 0.4s;
  border-radius: 9999px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 24px;
  width: 24px;
  left: 4px;
  bottom: 4px;
  background: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background: #4ade80;
}

input:checked + .slider:before {
  transform: translateX(30px);
}

.quick-stats {
  display: flex;
  gap: 2rem;
  margin-left: auto;
}

.stat {
  text-align: center;
}

.stat .number {
  font-size: 1.8rem;
  font-weight: 700;
  color: #f5d698;
  display: block;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2.5rem 0;
}

@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

.card {
  background: rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 1.8rem;
  margin-bottom: 2rem;
}

.card h2 {
  margin-top: 0;
  color: #f5d698;
  font-size: 1.45rem;
  border-bottom: 1px solid rgba(245, 214, 152, 0.2);
  padding-bottom: 0.8rem;
}

.info-grid,
.schedule-grid {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.editable-input {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(245, 214, 152, 0.3);
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  width: 260px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background: rgba(245, 214, 152, 0.15);
  color: #f5d698;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 0.9rem;
}

/* Booking Item */
.booking-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.status-badge.upcoming {
  background: #4ade80;
  color: #1f2937;
  padding: 6px 14px;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 600;
}

/* Other styles */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  text-align: center;
}

.metric-value {
  font-size: 2rem;
  font-weight: 700;
  color: #f5d698;
}

.review-item {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.stars {
  color: #fbbf24;
}

.log-entry {
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  font-size: 0.95rem;
}

.back-btn {
  background: transparent;
  color: #aaa;
  border: none;
  padding: 8px 16px;
  margin-bottom: 1rem;
  cursor: pointer;
}
</style>

<!-- const reviews = ref([
  {
    id: 1,
    client: "Sophie Wanjiku",
    comment: "Best technician I've ever had!",
    rating: 5,
  },
  {
    id: 2,
    client: "Mary Njeri",
    comment: "Very professional and gentle.",
    rating: 5,
  },
]);

const activityLog = ref([
  { id: 1, time: "2 hours ago", action: "Completed 3 bookings today" },
  { id: 2, time: "Yesterday", action: "Updated availability" },
]);

const schedule = ref([
  { day: "Monday", hours: "9:00 AM - 6:00 PM" },
  { day: "Tuesday", hours: "9:00 AM - 6:00 PM" },
  { day: "Wednesday", hours: "Off" },
  { day: "Thursday", hours: "9:00 AM - 6:00 PM" },
  { day: "Friday", hours: "9:00 AM - 7:00 PM" },
]); -->
