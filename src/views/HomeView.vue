<template>
  <HeroSection />
  <scroll />
  <QuoteContent />
  <counters />
  <ServicesBrief />
  <GalleryBrief />
  <SampleProduct />
</template>

<script setup>
import HeroSection from "@/components/Home/home-hero.vue";
import counters from "@/components/Home/counters.vue";
import scroll from "@/components/Home/scroll.vue";
import QuoteContent from "@/components/Home/QuoteContent.vue";
import ServicesBrief from "@/components/Home/ServicesBrief.vue";
import GalleryBrief from "@/components/Home/portfolio.vue";
import SampleProduct from "@/components/Home/SampleProduct.vue";
</script>
