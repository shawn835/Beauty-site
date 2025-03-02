<template>
  <div class="counter-container">
    <div
      class="counter"
      v-for="(counter, index) in counters"
      :data-target="counter"
      :key="index">
      <div class="class-label">{{ counter.label }}</div>
      <div class="counter-number">{{ counterValues[index] }}+</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
const counters = [
  { label: "customers served", target: 1000 },
  { label: "team members", target: 4 },
  { label: "years of experience", target: 9 },
];
const counterValues = ref(Array(counters.length).fill(0));
let startedScrolling = false;

// animating counters
const countUp = () => {
  counters.forEach((counter, index) => {
    const updateCounter = () => {
      const currentValue = counterValues.value[index];
      const increment = Math.ceil(counter.target / 150); //speed of increment

      if (currentValue < counter.target) {
        counterValues.value[index] = Math.min(
          currentValue + increment,
          counter.target
        );
        setTimeout(updateCounter, 100);
      }
    };
    updateCounter();
  });
};

//reseting counters to 0
const resetCounters = () => {
  counterValues.value = Array(counters.length).fill(0);
};

//scroll evvent handler
const pageScroll = () => {
  const position = window.scrollY;
  if (position > 30 && !startedScrolling) {
    countUp();
    startedScrolling = true;
  } else if (position < 25 && startedScrolling) {
    resetCounters();
    startedScrolling = false;
  }
};

onMounted(() => {
  window.addEventListener("scroll", pageScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", pageScroll);
});
</script>

<style scoped>
.counter-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  position: relative;
  margin-top: 1rem;
}

.counter {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.counter::after {
  content: "";
  position: absolute;
  right: -50px;
  top: 10%;
  bottom: 10%;
  width: 2px;
  background-color: var(--background-secondary);
  overflow: hidden;
}

.counter:last-child::after {
  display: none;
}

@media (max-width: 992px) {
  .counter-container {
    flex-direction: column;
    gap: 25px;
  }

  .counter {
    gap: 25px;
  }
}

.counter::after {
  display: none;
}
</style>
