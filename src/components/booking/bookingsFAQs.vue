<template>
  <div class="accordion-content">
    <div class="faq-header">
      <Headings
        heading="Appointment & Policy FAQs"
        :style="{ color: 'var(--text-heading)' }" />
    </div>
    <div class="query">
      <Accordion>
        <template #accordion-header>
          How do I cancel or reschedule my booking?</template
        >
        <template #content>
          You can enter your booking code on our “View Booking” page to cancel
          or reschedule, following our 4-hour notice rule.
        </template>
      </Accordion>
    </div>
    <div class="query">
      <Accordion>
        <template #accordion-header>Do I need to pay in advance? </template>
        <template #content>
          No, you can pay after your appointment. However, we appreciate early
          payments for smoother service.</template
        >
      </Accordion>
    </div>
    <div class="query">
      <Accordion>
        <template #accordion-header
          >What happens if I’m late for my appointment?</template
        >
        <template #content>
          We allow a 10-minute grace period. If you’re later than that, we may
          need to adjust your service time or reschedule.</template
        >
      </Accordion>
    </div>
    <div class="query">
      <Accordion>
        <template #accordion-header> Do you allow walk-ins? </template>
        <template #content>
          Yes, but we recommend booking in advance to guarantee availability,
          especially during busy hours.
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
