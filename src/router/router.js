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
      path: "/test",
      name: "test",
      component: () => import("@/views/admin/test.vue"),
    },
    {
      path: "/services",
      name: "services",
      component: () => import("@/views/ServicesView.vue"),
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
      path: "/bookings",
      name: "bookings-view",
      component: () => import("@/views/myBookingsView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/bookings/:bookingCode",
      name: "booking-view",
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
      path: "/unauthorized",
      name: "coming soon",
      component: () => import("@/views/Unauthorized.vue"),
    },
    {
      path: "/:pathMatch(.*)",
      component: () => import("@/components/global/NotFound.vue"),
      meta: { hideLayout: true },
    },

    {
      path: "/profile",
      name: "profile",
      component: () => import("@/views/ProfileView.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: "account",
          name: "account-settings",
          component: () => import("@/components/user/Account.vue"),
        },
      ],
    },

    {
      path: "/admin",
      name: "admin",
      component: () => import("@/views/admin/AdminLayout.vue"),
      meta: { requiresAuth: true, requiresAdmin: true, hideLayout: true },
      children: [
        {
          path: "dashboard",
          name: "admin-dashboard",
          component: () => import("@/views/admin/DashboardView.vue"),
        },
        {
          path: "bookings",
          name: "admin-bookings",
          component: () => import("@/views/admin/Bookings/BookingsView.vue"),
        },

        {
          path: "bookings/:bookingCode",
          name: "admin-booking-details",
          component: () =>
            import("@/views/admin/Bookings/AdminBookingDetails.vue"),
          props: true,
        },
        // {
        //   path: "services",
        //   name: "admin-services",
        //   component: () => import("@/views/admin/Services/ServicesView.vue"),
        // },
        {
          path: "users",
          name: "admin-users",
          component: () => import("@/views/admin/UsersView.vue"),
        },
        {
          path: "payments",
          name: "admin-payments",
          component: () => import("@/views/admin/PaymentsView.vue"),
        },
      ],
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: "smooth" };
  },
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  if (!userStore.user) {
    await userStore.fetchUser();
  }

  // Protected routes
  if (to.meta.requiresAuth && !userStore.user) {
    return next("/login");
  }

  // Admin routes
  if (to.meta.requiresAdmin) {
    if (!userStore.user || userStore.user.role !== "admin") {
      return next("/login");
    }
  }

  // Logged-in users should not go to login/register
  const guestPages = ["/login", "/register"]; // adjust as needed
  if (userStore.user && guestPages.includes(to.path)) {
    return next("/");
  }

  next();
});

export default router;
