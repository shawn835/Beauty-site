<template>
  <footer class="footer-container">
    <div>
      <div class="working-days">
        <working-days :style="{ color: 'var(--primary-button-color)' }" />
      </div>

      <div class="location">
        <location :style="{ color: 'var(--primary-button-color)' }" />
      </div>
    </div>
    <div class="copyright">
      <span>&copy; {{ year }} symos nail tech. All rights reserved.</span>
    </div>
  </footer>
</template>

<script setup>
import location from "../utility/location.vue";
import WorkingDays from "../utility/WorkingDays.vue";

const date = new Date();
const year = date.getFullYear();
</script>

<style scoped>
h2 {
  color: var(--hover-color);
}
.footer-container {
  margin-top: 1.5rem;
  background-color: var(--footer-bg);
  color: var(--text-secondary);
}
.footer-container > div {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  gap: 20px;
  padding: 20px;
  border-bottom: 1px solid white;
}

.copyright {
  display: flex;
  justify-self: center;
  font-size: 14px;
}

@media (max-width: 992px) {
  .footer-container > div {
    grid-template-columns: repeat(1, 1fr);
    align-items: center;
    justify-items: center;
    align-items: center;
    max-width: 500px;
    margin: auto;
  }
  .footer-container > div > div:nth-child(3) {
    display: none;
  }

  .working-days,
  .location {
    width: 100%;
  }
}
</style>
