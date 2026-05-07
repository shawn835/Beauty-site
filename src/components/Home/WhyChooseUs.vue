<template>
  <DisplayCard
    heading="Why Choose Symos Spa?"
    subHeading="We don't just do nails - we deliver a luxury experience you'll love"
    :features="features"
  />
</template>

<script setup>
import DisplayCard from "../DisplayCard.vue";
const features = [
  {
    icon: "star",
    title: "Premium Products",
    description:
      "We use only high-quality, long-lasting products from leading international brands.",
  },
  {
    icon: "soap",
    title: "Sterile Equipment",
    description:
      "All tools are professionally sterilized after every client for your safety.",
  },
  {
    icon: "user-doctor",
    title: "Skilled Technicians",
    description:
      "Certified and experienced technicians with years of expertise.",
  },
  {
    icon: "car-side",
    title: "Home Appointments",
    description:
      "Premium salon experience delivered conveniently to your doorstep in Nairobi.",
  },
];
</script>
