<template>
  <div class="booking-details-page">
    <div class="form-container">
      <h2 class="page-title">Appointment Details</h2>

      <!-- Services Selection -->
      <div class="form-section">
        <h3>Select Services <span class="required">*</span></h3>
        <div class="services-grid">
          <div
            v-for="service in appStore.services"
            :key="service.id"
            class="service-option"
            :class="{
              selected: bookingStore.isServiceSelected(service.id),
            }"
            @click="bookingStore.toggleService(service)"
          >
            <!-- <span class="service-icon">{{ service.icon }}</span> -->
            <div>
              <strong>{{ service.name }}</strong>
              <small> • {{ service?.SubServiceDuration }}</small>
            </div>
          </div>
        </div>
      </div>

      <!-- Technician -->
      <div class="form-section">
        <h3>Preferred Technician</h3>
        <select
          :value="bookingStore.selectedTechnician?.technicianId || ''"
          @change="selectTechnician"
          class="select-input"
        >
          <option value="">No Preference</option>
          <option
            v-for="tech in appStore.technicians"
            :key="tech.technicianId"
            :value="tech.technicianId"
          >
            {{ tech.name }} - technician
          </option>
        </select>
      </div>

      <!-- Date & Time -->
      <div class="form-section grid-2">
        <div>
          <h3>Date <span class="required">*</span></h3>
          <input
            type="date"
            v-model="bookingStore.form.date"
            class="input-field"
            :min="today"
          />
        </div>
        <div>
          <h3>Time <span class="required">*</span></h3>
          <input
            type="time"
            v-model="bookingStore.form.time"
            class="input-field"
            :min="minTime"
          />
        </div>
      </div>

      <!-- Phone Number -->
      <div class="form-section">
        <h3>Phone Number <span class="required">*</span></h3>

        <div class="phone-input">
          <input
            type="tel"
            v-model="bookingStore.form.phoneNumber"
            class="input-field"
            placeholder="+254 712 345 678"
          />
        </div>

        <small class="hint">
          We'll send confirmation and reminders to this number
        </small>
      </div>
      <!-- Image Upload -->
      <div class="form-section">
        <h3>Reference Images (Optional)</h3>
        <div class="upload-area" @drop.prevent="handleDrop" @dragover.prevent>
          <i class="fa-solid fa-camera fa-2xl"></i>
          <p>Drop images here or <span class="upload-link">browse</span></p>
          <input
            type="file"
            multiple
            accept="image/*"
            @change="bookingStore.handleFileUpload"
            hidden
          />
        </div>

        <!-- Preview Thumbnails -->
        <div class="image-preview-grid" v-if="bookingStore.previews">
          <div
            v-for="(img, i) in bookingStore.previews"
            :key="i"
            class="preview-item"
          >
            <img :src="img" alt="preview" />

            <button class="remove-btn" @click="bookingStore?.removeFile(i)">
              ✕
            </button>
          </div>
        </div>
      </div>

      <!-- Notes -->
      <div class="form-section">
        <h3>Special Requests / Notes</h3>
        <textarea
          v-model="bookingStore.form.notes"
          class="textarea"
          placeholder="E.g., I prefer soft pink, extra rhinestones on ring finger, etc."
          rows="4"
        ></textarea>
      </div>

      <!-- Price Summary -->
      <div class="price-summary">
        <div class="summary-row">
          <span>Estimated Duration</span>
          <strong>{{ formatDuration(bookingStore?.totalDuration) }}</strong>
        </div>

        <div class="summary-row total">
          <span>Selected services total:</span>
          <strong> KSh {{ bookingStore?.totalPrice }}</strong>
        </div>

        <div class="summary-row total">
          <span>{{ bookingStore.paymentLabel }}:</span>
          <strong> KSh {{ bookingStore?.depositAmount }}</strong>
        </div>

        <div class="summary-row total">
          <span>Balance on appointment day:</span>
          <strong> KSh {{ bookingStore?.remainingBalance }}</strong>
        </div>
      </div>

      <!-- CTA -->

      <BaseButton
        label="Proceed to Review"
        variant="primary"
        size="large"
        fullWidth
        iconRight="arrow-right"
        :disabled="!bookingStore.isDetailsComplete"
        @click="proceedToReview"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useBookingStore } from "../store/useBookingStore";
import { useAppStore } from "../store/appStore";
import { formatDuration } from "@/Utility/utils";
import BaseButton from "../BaseButton.vue";
const today = new Date().toISOString().split("T")[0];
const isToday = computed(() => bookingStore.form.date === today);
const minTime = computed(() => {
  if (isToday.value) {
    const now = new Date();
    return now.toTimeString().slice(0, 5); // "HH:MM"
  }
  return "00:00";
});

const emit = defineEmits(["next"]);

const bookingStore = useBookingStore();
const appStore = useAppStore();

const handleDrop = (e) => {
  const files = Array.from(e.dataTransfer.files).filter((f) =>
    f.type.startsWith("image/"),
  );
  // same logic as handleFileUpload
};

const proceedToReview = () => {
  if (!bookingStore.isDetailsComplete) return;

  emit("next");
};

//tech select
const selectTechnician = (event) => {
  const technicianId = event.target.value;

  if (!technicianId) {
    bookingStore.clearTechnician();
    return;
  }

  const tech = appStore.technicians.find(
    (t) => String(t.technicianId) === technicianId,
  );

  if (tech) {
    bookingStore.addTechnician(tech);
  }
};
</script>
<style scoped>
.booking-details-page {
  padding: 40px 20px 100px;
  background: var(--bg-dark);
  min-height: 100vh;
  color: var(--text-light);
}

.form-container {
  max-width: 780px;
  margin: 40px auto;
  background: #2e3538;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.page-title {
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.1rem;
  color: var(--bg-pink);
}

.form-section {
  margin-bottom: 36px;
}

.form-section h3 {
  margin-bottom: 12px;
  color: white;
  font-size: 1.15rem;
}

.required {
  color: #ef4444;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 12px;
}

.service-option {
  padding: 16px;
  background: #3a4246;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
  border: 2px solid transparent;
}

.service-option.selected {
  border-color: var(--bg-pink);
  background: rgba(216, 27, 96, 0.15);
}

.input-field,
.select-input,
.textarea {
  width: 100%;
  padding: 14px 16px;
  background: #242a2d;
  border: 1px solid #555;
  border-radius: 10px;
  color: white;
  font-size: 1rem;
}

.upload-area {
  border: 2px dashed #666;
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.upload-area:hover {
  border-color: var(--bg-pink);
  background: rgba(216, 27, 96, 0.05);
}

.image-preview-grid {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 16px;
}

.preview-item {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 12px;
  overflow: hidden;
}

.preview-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-btn {
  position: absolute;
  top: 6px;
  right: 6px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
}

.price-summary {
  background: #242a2d;
  padding: 20px;
  border-radius: 12px;
  margin: 30px 0;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
}

.summary-row.total {
  font-size: 1.3rem;
  border-top: 1px solid #555;
  padding-top: 16px;
  margin-top: 8px;
}
</style>
