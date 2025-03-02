<template>
  <div class="accordion-content">
    <div class="faq-header">
      <Headings
        heading="Communication & Location FAQs"
        :style="{ color: 'var(--text-heading)' }" />
    </div>
    <div class="query">
      <Accordion>
        <template #accordion-header> What are your business hours? </template>
        <template #content>
          We’re open Monday – Saturday from 7:00 AM to 9:00 PM. We’re closed on
          Sundays.
        </template>
      </Accordion>
    </div>
    <div class="query">
      <Accordion>
        <template #accordion-header
          >Do you respond to messages outside business hours?
        </template>
        <template #content>
          We’ll respond as soon as we’re back! If it’s urgent, you can book
          online anytime.</template
        >
      </Accordion>
    </div>
    <div class="query">
      <Accordion>
        <template #accordion-header>Where are you located? </template>
        <template #content>
          We’re located at Nakuru town, main street.</template
        >
      </Accordion>
    </div>
    <div class="query">
      <Accordion>
        <template #accordion-header>
          How can I contact customer support?
        </template>
        <template #content>
          Phone/whatsapp: 0724300399, Email:chegesimon949@gmail.com
        </template>
      </Accordion>
    </div>
  </div>
</template>

<script setup>
import Headings from "../utility/Headings.vue";
import Accordion from "../utility/Accordion.vue";
</script>

<style scoped>
.faq-header {
  margin: 1rem 0;
}
</style>
