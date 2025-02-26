import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import ServicesView from "@/views/ServicesView.vue";
import GalleryView from "@/views/GalleryView.vue";
import ContactView from "@/views/ContactView.vue";
import BookingView from "@/views/BookingView.vue";
import servicesList from "@/components/services/servicesList.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: HomeView },
    {
      path: "/services",
      name: "services",
      component: ServicesView,
    },
    {
      path: "/photos",
      name: "gallery",
      component: GalleryView,
    },
    {
      path: "/about-us",
      name: "about us",
      component: AboutView,
    },
    {
      path: "/contact-us",
      name: "contact us",
      component: ContactView,
    },

    {
      path: "/online-bookings",
      name: "booking",
      component: BookingView,
    },
    {
      path: "/services/:category/:id/serviceslist",
      name: "servicesList",
      component: servicesList,
    },
  ],
});
export default router;
