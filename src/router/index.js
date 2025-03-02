import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import ServicesView from "@/views/ServicesView.vue";
import GalleryView from "@/views/GalleryView.vue";
import ContactView from "@/views/ContactView.vue";
import BookingView from "@/views/BookingView.vue";
import servicesList from "@/components/services/servicesList.vue";
import AdminView from "@/views/AdminView.vue";
import AdminDashboard from "@/components/Admin/AdminDashboard.vue";
import comingSoon from "@/components/Home/comingSoon.vue";
import NotFound from "@/components/global/NotFound.vue";
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
    {
      path: "/admin/login",
      name: "admin-dashboard",
      component: AdminView,
    },

    {
      path: "/admin/dashboard",
      component: AdminDashboard,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("admin")) {
          next();
        } else {
          next("/admin/login");
        }
      },
      meta: { hideLayout: true },
    },
    {
      path: "/comingsoon",
      name: "coming soon",
      component: comingSoon,
    },
    {
      path: "/:pathMatch(.*)",
      component: NotFound,
      meta: { hideLayout: true },
    },
  ],
});
export default router;
