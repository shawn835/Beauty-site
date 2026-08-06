<template>
  <div v-if="booking.status === 'completed'" class="review-card">
    <!-- Header -->
    <div class="card-header">
      <span class="status-badge completed">Completed</span>
      <span class="date">{{ formatDate(booking.date) }}</span>
    </div>

    <!-- Technician -->
    <h3 class="technician-name">{{ booking?.technicianName }}</h3>

    <!-- BEFORE REVIEW -->
    <div v-if="!booking.review" class="before-review">
      <p class="review-prompt">
        How was your experience? We'd love to hear your feedback.
      </p>

      <StarRating :rating="review?.rating" size="md" />

      <BaseButton label="leave review" @click="$emit('leave-review')" />
    </div>

    <!-- AFTER REVIEW -->
    <div v-else class="after-review">
      <div class="review-meta">
        <StarRating :rating="booking?.review?.rating" size="md" />

        <span class="your-review-label">
          Your review • {{ formatDate(booking?.review?.createdAt) }}
        </span>
      </div>

      <p class="review-text">"{{ booking?.review?.comment }}"</p>
    </div>
  </div>
</template>

<script setup>
import { formatDate } from "@/Utility/utils";
import StarRating from "@/components/StarRating.vue";
import BaseButton from "@/components/BaseButton.vue";

defineProps({
  booking: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.review-card {
  background: #252b2e;
  border-radius: 18px;
  padding: 1.6rem 1.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(245, 214, 152, 0.1);
  max-width: 380px;
  width: 100%;
  transition: all 0.3s ease;
}

.review-card:hover {
  border-color: rgba(245, 214, 152, 0.25);
}

/* Header */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
}

.date {
  color: #aaa;
  font-size: 0.95rem;
}

/* Technician */
.technician-name {
  margin: 0 0 1.2rem;
  font-size: 1.35rem;
  color: #f5d698;
}

/* Before Review */
.before-review {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

/* After Review */
.after-review {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.review-meta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.your-review-label {
  color: #aaa;
  font-size: 0.95rem;
  font-weight: 500;
}

.review-text {
  margin: 0;
  color: #ddd;
  font-size: 1.05rem;
  line-height: 1.5;
  font-style: italic;
}
</style>
