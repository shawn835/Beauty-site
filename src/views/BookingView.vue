<template>
  <section class="booking-page">
    <Hero />

    <div ref="stepperRef">
      <Stepper
        v-model:currentStep="currentStep"
        :completedSteps="completedSteps"
      />
    </div>

    <Details v-if="currentStep === 1" @next="nextStep" />
    <Review v-if="currentStep === 2" @back="prevStep" @next="nextStep" />
    <BookingPayment v-if="currentStep === 3" @back="prevStep" />
  </section>
</template>
<script setup>
import { ref, watch, nextTick } from "vue";
import Hero from "@/components/booking/Hero.vue";
import Stepper from "@/components/Stepper.vue";
import Details from "@/components/booking/Details.vue";
import Review from "@/components/booking/Review.vue";
import BookingPayment from "@/components/booking/BookingPayment.vue";

const currentStep = ref(1);
const completedSteps = ref([]);

const stepperRef = ref(null);

watch(currentStep, async () => {
  await nextTick();

  stepperRef.value?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

const markComplete = (step) => {
  if (!completedSteps.value.includes(step)) {
    completedSteps.value.push(step);
  }
};

const goToStep = (step) => {
  currentStep.value = step;
};

const nextStep = () => {
  markComplete(currentStep.value);
  currentStep.value++;
};

const prevStep = () => {
  currentStep.value--;
};
</script>

<style scoped>
.booking-page {
  background: var(--bg-dark);
}
</style>
