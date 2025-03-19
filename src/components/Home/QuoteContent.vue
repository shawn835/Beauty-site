<template>
  <div class="quote-content-side"></div>
  <slidingContent :sliding-content="quotes">
    <template #content="{ currentContent }">
      {{ currentContent.quote }}
    </template>
    <template #author="{ currentContent }">
      {{ currentContent.author }}
    </template>
  </slidingContent>
</template>
<script setup>
import Headings from "../utility/Headings.vue";
import slidingContent from "../utility/slidingContent.vue";
import beautyQuotes from "@/assets/BeautyQuotes.json";

const quotes = beautyQuotes;
</script>
