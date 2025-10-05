<template>
  <div class="counter-container">
    <div
      class="counter"
      v-for="(counter, index) in counters"
      :data-target="counter.target"
      :key="index">
      <div class="class-label">{{ counter.label }}</div>
      <div class="counter-number">{{ counterValues[index] }}+</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useTechnicians } from "../composables/useTechnician";

const { technicians, fetchData } = useTechnicians();

// reactive counters
const techs = ref(0);
const counters = computed(() => [
  { label: "customers served", target: 1000 },
  { label: "team members", target: techs.value },
  { label: "years of experience", target: 9 },
]);

const counterValues = ref(Array(3).fill(0));
let observer;

// animation settings
const duration = 2000; // 2s
let startTime = null;
let animating = false;

const animateCounters = (timestamp) => {
  if (!startTime) startTime = timestamp;
  const progress = Math.min((timestamp - startTime) / duration, 1);

  counters.value.forEach((counter, index) => {
    counterValues.value[index] = Math.floor(counter.target * progress);
  });

  if (progress < 1) {
    requestAnimationFrame(animateCounters);
  } else {
    animating = false; // finished
  }
};

const resetCounters = () => {
  counterValues.value = Array(counters.value.length).fill(0);
  startTime = null;
  animating = false;
};

onMounted(async () => {
  await fetchData();
  techs.value = technicians.value.length;

  const section = document.querySelector(".counter-container");
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animating) {
          animating = true;
          requestAnimationFrame(animateCounters);
        } else if (!entry.isIntersecting) {
          resetCounters();
        }
      });
    },
    { threshold: 0.3 } // trigger when 30% is visible
  );

  if (section) observer.observe(section);
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<style scoped>
.counter-container {
  display: flex;
  justify-content: center;
  gap: 30px;
  padding: 40px 20px;
  background: linear-gradient(135deg, #fff5f7 0%, #ffe4e1 100%);
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  margin: 40px auto;
  max-width: 1200px;
}

.counter {
  text-align: center;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 250px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.counter:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.class-label {
  font-family: "Playfair Display", serif;
  font-size: 1.2rem;
  color: #d81b60;
  margin-bottom: 10px;
  text-transform: capitalize;
}

.counter-number {
  font-family: "Lora", serif;
  font-size: 2rem;
  color: #333;
  font-weight: 600;
  transition: color 0.3s ease;
}

.counter:hover .counter-number {
  color: #ad1457;
}

/* Responsive Design */
@media (max-width: 768px) {
  .counter-container {
    flex-direction: column;
    padding: 20px 10px;
    margin: 20px;
  }

  .counter {
    width: 100%;
    margin-bottom: 20px;
  }

  .class-label {
    font-size: 1rem;
  }

  .counter-number {
    font-size: 1.5rem;
  }
}
</style>
