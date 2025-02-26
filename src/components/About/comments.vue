<template>
  <div class="comments">
    <Headings
      heading="clients testimonials"
      :style="{ color: 'var(--text-heading)' }" />
    <slidingContent :sliding-content="comments">
      <template #content="{ currentContent }">
        {{ currentContent.comment }}
      </template>
      <template #author="{ currentContent }">
        {{ currentContent.name }}
      </template>
    </slidingContent>
  </div>
</template>

<script setup>
import slidingContent from "../utility/slidingContent.vue";
import clientSays from "@/assets/comments.json";
import Headings from "../utility/Headings.vue";

const comments = clientSays;
</script>

<style scoped>
.comments {
  margin-top: 2rem;
}
</style>
