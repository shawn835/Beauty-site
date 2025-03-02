<template>
  <div class="accordion-content">
    <div class="faq-header">
      <Headings
        heading="Business & Policy FAQs"
        :style="{ color: 'var(--text-heading)' }" />
    </div>
    <div class="query">
      <Accordion>
        <template #accordion-header>
          How long have you been in business?</template
        >
        <template #content>
          We’ve been providing professional beauty services for 9years, helping
          clients look and feel their best.
        </template>
      </Accordion>
    </div>
    <div class="query">
      <Accordion>
        <template #accordion-header
          >What safety measures do you follow?</template
        >
        <template #content>
          We strictly follow hygiene protocols, including sanitizing tools after
          each use and maintaining a clean environment</template
        >
      </Accordion>
    </div>
    <div class="query">
      <Accordion>
        <template #accordion-header>Do you use eco-friendly products?</template>
        <template #content>
          Yes! We carefully select eco-friendly, cruelty-free, and non-toxic
          beauty products whenever possible.</template
        >
      </Accordion>
    </div>
    <div class="query">
      <Accordion>
        <template #accordion-header
          >What makes your nail and beauty salon unique?</template
        >
        <template #content>
          We provide personalized services, expert technicians, and a relaxing
          atmosphere to give you the best beauty experience.
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
