<template>
  <div class="accordion-content">
    <div class="faq-header">
      <Headings
        heading="Service-Specific FAQs"
        :style="{ color: 'var(--text-heading)' }" />
    </div>
    <div class="query">
      <Accordion>
        <template #accordion-header> How long does a manicure take? </template>
        <template #content>
          A basic manicure takes about 30–45 minutes, while a gel manicure can
          take 45–60 minutes.
        </template>
      </Accordion>
    </div>
    <div class="query">
      <Accordion>
        <template #accordion-header>What products do you use? </template>
        <template #content>
          We use high-quality, salon-grade products that are safe for your skin
          and nails. If you have allergies, please let us know in
          advance!</template
        >
      </Accordion>
    </div>
    <div class="query">
      <Accordion>
        <template #accordion-header
          >Can I request a specific technician?
        </template>
        <template #content>
          Yes! You can select your preferred technician when booking, as long as
          they are available at your chosen time.</template
        >
      </Accordion>
    </div>
    <div class="query">
      <Accordion>
        <template #accordion-header> Do you offer group bookings? </template>
        <template #content>
          Yes! We accommodate group bookings for friends, bridal parties, or
          special occasions. Contact us in advance for arrangements.
        </template>
      </Accordion>
    </div>

    <div class="more-info">
      <router-link to="/contact-us">
        <buttons
          button-text="have any other question?"
          class-name="primary-button" />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import Headings from "../utility/Headings.vue";
import Accordion from "../utility/Accordion.vue";
import buttons from "../utility/buttons.vue";
</script>

<style scoped>
.faq-header {
  margin: 1rem 0;
}
</style>
