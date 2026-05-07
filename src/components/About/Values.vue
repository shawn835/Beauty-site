<template>
  <DisplayCard
    heading="Our Core Values"
    sub-heading="What drives us at Symos"
    :features="values"
  />
</template>

<script setup>
import DisplayCard from "../DisplayCard.vue";
const values = [
  {
    id: 1,
    icon: "star",
    title: "Quality",
    description:
      "Premium products and beautiful finishes that exceed expectations every time.",
  },
  {
    id: 2,
    icon: "soap",
    title: "Hygiene",
    description:
      "Strict sterilized tools and safe care practices for every client’s peace of mind.",
  },
  {
    id: 3,
    icon: "palette",
    title: "Creativity",
    description:
      "Unique styles and designs tailored to each client’s personality and preference.",
  },
  {
    id: 4,
    icon: "chair",
    title: "Comfort",
    description:
      "A relaxing, warm, and welcoming experience from the moment you arrive.",
  },
];
</script>
