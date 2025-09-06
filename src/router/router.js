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
      path: "/services/:category/:id/serviceslist",
      name: "servicesList",
      component: () => import("@/components/services/servicesList.vue"),
    },
    {
      path: "/blogposts",
      name: "blogs",
      component: () => import("@/views/BlogView.vue"),
    },
    {
      path: "/blogposts/:slug",
      name: "blog-post",
      component: () => import("@/components/Blogs/BlogPost.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/components/register.vue"),
    },

    {
      path: "/login",
      name: "login",
      component: () => import("@/components/loginPage.vue"),
    },
    {
      path: "/verify/token",
      name: "verify",
      component: () => import("@/components/verify.vue"),
    },
    {
      path: "/admin/dashboard",
      component: () => import("@/components/Admin/AdminDashboard.vue"),
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
