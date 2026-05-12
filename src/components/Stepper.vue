<template>
  <div class="stepper-container">
    <div class="stepper">
      <div
        v-for="(step, index) in steps"
        :key="step.id"
        class="step-item"
        :class="{
          active: currentStep === step.id,
          completed: isCompleted(step.id),
          clickable: isClickable(step.id),
        }"
        @click="handleStepClick(step.id)"
      >
        <!-- Circle -->
        <div class="step-circle">
          <span v-if="isCompleted(step.id)" class="check-icon">✓</span>
          <span v-else>{{ index + 1 }}</span>
        </div>

        <!-- Label -->
        <div class="step-label">{{ step.title }}</div>
      </div>

      <!-- Progress Line -->
      <div class="progress-line">
        <div
          class="progress-fill"
          :style="{ width: progressWidth + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  currentStep: {
    type: Number,
    required: true,
  },
  completedSteps: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:currentStep"]);

const steps = [
  { id: 1, title: "Details" },
  { id: 2, title: "Review" },
  { id: 3, title: "Payment" },
];

const isCompleted = (stepId) => props.completedSteps.includes(stepId);

const isClickable = (stepId) => {
  if (stepId === props.currentStep) return false;

  // previous only
  return stepId < props.currentStep;
};

const handleStepClick = (stepId) => {
  if (isClickable(stepId)) {
    emit("update:currentStep", stepId);
  }
};

const progressWidth = computed(() => {
  const completedCount = props.completedSteps.length;
  return (
    ((props.currentStep - 1) / (steps.length - 1)) * 100 +
    (completedCount > 0 ? 8 : 0)
  );
});
</script>

<style scoped>
.stepper-container {
  max-width: 720px;
  margin: 40px auto;
  padding: 0 20px;
  background: var(--bg-dark);
}

.stepper {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.progress-line {
  position: absolute;
  top: 28px;
  left: 15%;
  right: 15%;
  height: 4px;
  background: #444;
  z-index: 1;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(to right, var(--bg-pink), #f472b6);
  transition: width 0.4s ease;
}

/* Step Item */
.step-item {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease;
}

.step-item:not(.clickable) {
  cursor: default;
}

/* Circle */
.step-circle {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 600;
  border: 3px solid #555;
  background: #2e3538;
  color: #ccc;
  transition: all 0.3s ease;
  z-index: 2;
}

/* States */
.step-item.completed .step-circle {
  background: #10b981;
  border-color: #10b981;
  color: white;
}

.step-item.active .step-circle {
  background: var(--bg-pink);
  border-color: var(--bg-pink);
  color: white;
  box-shadow: 0 0 0 8px rgba(216, 27, 96, 0.2);
}

.step-item.clickable:hover .step-circle {
  transform: scale(1.08);
}

/* Label */
.step-label {
  margin-top: 12px;
  font-size: 1.02rem;
  font-weight: 500;
  color: #aaa;
  text-align: center;
}

.step-item.active .step-label {
  color: var(--bg-pink);
  font-weight: 600;
}

.step-item.completed .step-label {
  color: #10b981;
}

/* Responsive */
@media (max-width: 640px) {
  .step-circle {
    width: 48px;
    height: 48px;
    font-size: 1.2rem;
  }

  .step-label {
    font-size: 0.95rem;
  }
}
</style>
