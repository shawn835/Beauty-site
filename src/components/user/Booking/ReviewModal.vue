<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="closeModal">
      <div class="review-modal">
        <h2 class="modal-title">How was your appointment?</h2>

        <!-- Stars -->
        <div class="stars-rating">
          <button
            v-for="star in 5"
            :key="star"
            type="button"
            class="star-btn"
            @click="setRating(star)"
            @mouseenter="hoverRating = star"
            @mouseleave="hoverRating = 0"
          >
            <span
              class="star"
              :class="{ active: star <= (hoverRating || rating) }"
            >
              ★
            </span>
          </button>
        </div>

        <!-- Review Text -->
        <div class="form-group">
          <label class="form-label"
            >Tell others about your experience (optional)</label
          >
          <textarea
            v-model="comment"
            class="review-textarea"
            rows="4"
            placeholder="Share your experience..."
          ></textarea>
        </div>

        <!-- Actions -->
        <div class="modal-actions">
          <BaseButton
            variant="warning"
            @click="closeModal"
            label="cancel"
            full-width
          />
          <BaseButton
            variant="success"
            @click="submitReview"
            full-width
            :disabled="rating === 0 || loading"
            :label="loading ? 'Submitting...' : 'Submit'"
          />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import { handleResponse } from "@/Utility/response";
import { useToast } from "@/components/composables/useToast";

const emit = defineEmits(["close", "submit"]);
const props = defineProps({
  id: {
    required: true,
    type: [String, Number],
  },
});
const { show } = useToast();

const rating = ref(0);
const hoverRating = ref(0);
const comment = ref("");
const loading = ref(false);

const setRating = (value) => {
  rating.value = value;
};

const closeModal = () => {
  emit("close");
};

const submitReview = async () => {
  if (rating.value === 0 && !props.id) return;

  loading.value = true;
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/rate/booking/${props.id}`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating: rating.value,
          comment: comment.value.trim(),
        }),
      },
    );

    const data = await handleResponse(response);
    show({
      type: "success",
      message: data.message,
    });
  } catch (error) {
  } finally {
    loading.value = false;
    closeModal();
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1.5rem;
}

.review-modal {
  background: #252b2e;
  width: 100%;
  max-width: 440px;
  border-radius: 20px;
  padding: 2.4rem 2rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  animation: popIn 0.3s ease;
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-title {
  text-align: center;
  font-size: 1.6rem;
  color: #f5d698;
  margin: 0 0 1.8rem;
}

/* Stars */
.stars-rating {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 2rem;
}

.star-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.star {
  font-size: 2.4rem;
  color: #555;
  transition: all 0.2s ease;
}

.star.active {
  color: #fbbf24;
  transform: scale(1.15);
}

/* Textarea */
.form-group {
  margin-bottom: 2rem;
}

.form-label {
  display: block;
  color: #aaa;
  font-size: 0.95rem;
  margin-bottom: 0.7rem;
}

.review-textarea {
  width: 100%;
  background: #2e3538;
  border: 2px solid rgba(245, 214, 152, 0.2);
  border-radius: 14px;
  padding: 1rem 1.2rem;
  color: white;
  font-size: 1rem;
  resize: vertical;
  min-height: 110px;
  transition: border-color 0.2s;
}

.review-textarea:focus {
  outline: none;
  border-color: #f5d698;
}

/* Actions */
.modal-actions {
  display: flex;
  gap: 1rem;
}

.btn {
  flex: 1;
  padding: 14px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn {
  background: transparent;
  border: 2px solid #555;
  color: #ddd;
}

.cancel-btn:hover {
  border-color: #888;
}

.submit-btn {
  background: #f5d698;
  border: none;
  color: #2e3538;
}

.submit-btn:hover:not(:disabled) {
  background: #f7dfa3;
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
</style>
