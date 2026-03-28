import { defineStore } from "pinia";
import { useToast } from "../composables/useToast";
import { handleResponse } from "@/components/utility/response";
import router from "@/router/router";
const { show } = useToast();

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    loading: false,
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },

    clearUser() {
      this.user = null;
    },

    async fetchUser() {
      this.loading = true;
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/me`, {
          credentials: "include",
        });

        const data = await handleResponse(res);
        const { userData: user } = data;

        this.user = user;
        return user;
      } catch (err) {
        this.user = null;
        return null;
      } finally {
        this.loading = false;
      }
    },

    async logOutUser() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/logout`, {
          method: "DELETE",
          credentials: "include",
        });

        const data = await handleResponse(res);

        router.push("/login");

        show({
          message: data.message || "Logout successful",
          type: "success",
        });

        this.user = null;
      } catch (error) {
        console.error(error.message || "Error occurred when logging out!");
        show({ message: error.message || "Logout failed", type: "error" });
      }
    },
  },
});
