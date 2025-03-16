import { createRouter, createWebHistory } from "vue-router";

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
      path: "/online-bookings",
      name: "booking",
      component: () => import("@/views/BookingView.vue"),
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
      path: "/admin/login",
      name: "admin-dashboard",
      component: () => import("@/components/Admin/AdminLogin.vue"),
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

export default router;
