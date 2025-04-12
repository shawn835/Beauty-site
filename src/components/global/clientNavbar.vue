<template>
  <navbar
    :navLinks="[
      { text: 'Home', path: '/' },
      { text: 'About', path: '/about-us' },
      { text: 'Services', path: '/services' },
      { text: 'Gallery', path: '/photos' },
      { text: 'Blog', path: '/blogposts' },
      { text: 'Contact', path: '/contact-us' },
      { text: 'View Booking', action: navigateToBookingDetails },
    ]"
    :btns="[
      {
        text: 'Book Appointment',
        path: '/online-bookings',
        className: 'primary-button',
      },
      { text: 'Admin', path: '/admin/login', className: 'primary-button' },
    ]" />
</template>

<script setup>
import navbar from "../utility/navbar.vue";
import { defineEmits } from "vue";
//**toggling confirmation modal */
const emit = defineEmits(["toggle-modal"]);
//booking details route
const navigateToBookingDetails = () => {
  emit("toggle-modal");
};
</script>
