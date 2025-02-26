<template>
  <div class="quote-container">
    <transition @after-leave="onTransitionEnd">
      <div
        class="slidingContent-section"
        v-if="quoteVisible"
        :key="currentContent.id">
        <div class="quote">
          <slot name="content" :currentContent="currentContent" />
        </div>
        <div class="custom-content">
          <slot name="custom-content" />
        </div>
        <div class="author">
          <slot name="author" :currentContent="currentContent" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  slidingContent: Array,
});

const currentContent = ref({});
const quoteVisible = ref(true);

const showRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * props.slidingContent.length);
  currentContent.value = props.slidingContent[randomIndex];
  quoteVisible.value = true;
  setTimeout(hideQuote, 7000); // Hide the quote after 3 seconds
};

const hideQuote = () => {
  quoteVisible.value = false;
};

const onTransitionEnd = () => {
  if (!quoteVisible.value) {
    showRandomQuote(); // Display a new quote after the old one fades out
  }
};

onMounted(() => {
  showRandomQuote(); // Start with a random quote
});
</script>

<style scoped>
.quote-container {
  background-color: var(--background-secondary);
  overflow: hidden;
  height: auto;
  overflow: hidden;
}

.slidingContent-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: var(--gap);
  max-width: 650px;
  margin: auto;
  font-style: oblique;
  margin-top: 1rem;
  transition: opacity 1s ease-out, transform 1s ease-out;
  opacity: 1;
  transform: translateX(0);
}

.quote-container .slidingContent-section {
  opacity: 1;
}

.quote-container .slidingContent-section.v-leave-active {
  opacity: 0;
  transform: translateX(-100%);
}

.quote {
  font-size: 3rem;
}

.author {
  align-self: flex-start;
}

@media (max-width: 992px) {
  .quote {
    font-size: 1rem;
  }

  .quote-container {
    height: auto;
  }

  .slidingContent-section {
    max-width: 300px;
  }
}
</style>
