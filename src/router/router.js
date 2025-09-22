import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/components/store/userStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/services",
      name: "services",
      component: () => import("@/views/ServicesView.vue"),
    },
    {
      path: "/photos",
      name: "gallery",
      component: () => import("@/views/GalleryView.vue"),
    },
    {
      path: "/about-us",
      name: "about us",
      component: () => import("@/views/AboutView.vue"),
    },
    {
      path: "/contact-us",
      name: "contact us",
      component: () => import("@/views/ContactView.vue"),
    },
    {
      path: "/book-appointment",
      name: "booking",
      component: () => import("@/views/BookingView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("@/views/ProfileView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/my/bookings",
      name: "mybookingslist",
      component: () => import("@/views/myBookingsView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/mybookings/:bookingId",
      name: "mybookings",
      component: () => import("@/views/BookingDetailsView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/blogposts",
      name: "blogs",
      component: () => import("@/views/BlogView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/components/user/register.vue"),
    },

    {
      path: "/login",
      name: "login",
      component: () => import("@/components/user/loginPage.vue"),
    },
    {
      path: "/token/confirmation",
      name: "verify",
      component: () => import("@/components/user/verify.vue"),
    },
    {
      path: "/comingsoon",
      name: "coming soon",
      component: () => import("@/components/Home/comingSoon.vue"),
    },
    {
      path: "/:pathMatch(.*)",
      component: () => import("@/components/global/NotFound.vue"),
      meta: { hideLayout: true },
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: "smooth" };
  },
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  if (to.meta.requiresAuth) {
    if (!userStore.user) {
      const currentUser = await userStore.fetchUser();
      if (!currentUser) return next("/login");
    }
  }

  next();
});
export default router;
