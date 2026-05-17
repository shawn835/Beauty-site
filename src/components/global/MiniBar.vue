<template>
  <div
    class="mini-bar"
    :style="{
      transform: `translateY(-${progress * 100}%)`,
      opacity: 1 - progress,
    }"
  >
    <div class="mini-container">
      <div class="mini-left">
        <span>
          <font-awesome-icon icon="location-pin" />
          Nairobi, Kenya
        </span>

        <span class="mini-divider">•</span>

        <span>
          <font-awesome-icon icon="clock" class="clock" />
          Mon - Sat: 6AM - 9PM
        </span>
      </div>

      <div class="mini-right">
        <BaseButton
          label="+254724300399"
          variant="outline"
          icon-left="phone"
          size="small"
          @click="callCustomer('0724300399')"
        />

        <span class="mini-divider">•</span>

        <a href="mailto:hello@symosnailspa.com" class="mini-contact">
          <font-awesome-icon icon="envelope" />
          hello@symosnailspa.com
        </a>
      </div>
    </div>
  </div>
</template>
<script setup>
import BaseButton from "../BaseButton.vue";
import { callCustomer } from "@/Utility/utils";

defineProps({
  progress: {
    type: Number,
    default: 0,
  },
});
</script>

<style scoped>
/* ====================== MINI BAR ====================== */

.mini-bar {
  height: 42px;
  display: flex;
  align-items: center;

  background: #1f2528;
  color: #ddd;
  font-size: 0.92rem;

  border-bottom: 1px solid #333;

  will-change: transform, opacity;
  transition:
    transform 0.35s ease,
    opacity 0.35s ease;
}

.mini-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
  padding: 0 24px;
}

.mini-divider {
  opacity: 0.4;
  margin: 0 8px;
}

.mini-contact {
  color: #ddd;
  text-decoration: none;
  transition: color 0.25s ease;
}

.mini-contact:hover {
  color: var(--bg-pink);
}

@media (max-width: 768px) {
  .mini-bar {
    display: none;
  }
}
</style>
