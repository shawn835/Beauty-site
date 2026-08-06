<template>
  <div class="star-rating" :class="size">
    <span
      v-for="star in 5"
      :key="star"
      class="star"
      :class="{ filled: star <= Math.round(rating) }"
    >
      ★
    </span>
  </div>
</template>

<script setup>
defineProps({
  rating: {
    type: Number,
    default: 0,
    validator: (v) => v >= 0 && v <= 5,
  },
  size: {
    type: String,
    default: "md", // sm | md | lg
    validator: (v) => ["sm", "md", "lg"].includes(v),
  },
});
</script>

<style scoped>
.star-rating {
  display: inline-flex;
  gap: 3px;
}

.star {
  color: #555; /* unfilled */
  transition: color 0.2s ease;
}

.star.filled {
  color: #fbbf24; /* filled */
}

/* Sizes */
.sm .star {
  font-size: 1rem;
}
.md .star {
  font-size: 1.35rem;
}
.lg .star {
  font-size: 1.8rem;
}
</style>

<!-- Examples -->
<!-- <StarRating :rating="4.8" />
<StarRating :rating="5" size="lg" />
<StarRating :rating="3" size="sm" /> -->
