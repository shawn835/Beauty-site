<template>
  <div class="coming-soon">
    <h1>coming Soon!</h1>
    <p>Stay tuned for amazing products.</p>

    <div class="countdown">
      <div class="time-box">
        <span>{{ timeLeft.days }}</span>
        <small>Days</small>
      </div>
      <div class="time-box">
        <span>{{ timeLeft.hours }}</span>
        <small>Hours</small>
      </div>
      <div class="time-box">
        <span>{{ timeLeft.minutes }}</span>
        <small>Minutes</small>
      </div>
      <div class="time-box">
        <span>{{ timeLeft.seconds }}</span>
        <small>Seconds</small>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const timeLeft = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 });

const countdown = () => {
  const targetDate = new Date("2025-04-01T00:00:00").getTime();
  setInterval(() => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      timeLeft.value = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    } else {
      timeLeft.value = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  }, 1000);
};

onMounted(countdown);
</script>

<style scoped>
.coming-soon {
  text-align: center;
  background: linear-gradient(135deg, #1e293b, #0f172a);
  color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Arial, sans-serif;
  padding: 20px;
}

h1 {
  font-size: 2.5rem;
}

p {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.countdown {
  display: flex;
  gap: 20px;
}

.time-box {
  background: rgba(255, 255, 255, 0.2);
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  width: 80px;
}

.time-box span {
  font-size: 2rem;
  font-weight: bold;
}

.time-box small {
  display: block;
  font-size: 0.8rem;
}
</style>
