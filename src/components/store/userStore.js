import { defineStore } from "pinia";
import CryptoJS from "crypto-js";
import { useToast } from "../composables/useToast";
const { show } = useToast();

const secret = import.meta.env.VITE_ENCRYPTION_SECRET;
export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },

    clearUser() {
      this.user = null;
      try {
        localStorage.removeItem("user");
      } catch (err) {
        console.warn("Failed to clear localStorage user:", err);
      }
    },
    async fetchUser() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/me`, {
          credentials: "include",
        });
        if (!res.ok) {
          this.clearUser();
          return null;
        }
        const data = await res.json();
        this.setUser(data.user);
        return data.user;
      } catch (err) {
        this.clearUser();
        return null;
      }
    },

    async logOutUser(router) {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/logout`, {
          method: "POST",
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok) {
          this.user = null;
          router.push("/login");
          show({
            message: data.message || "Logout successful",
            type: "success",
          });
          return;
        }

        throw new Error(data.message || "Logout failed");
      } catch (error) {
        console.error(error.message || "Error occurred when logging out!");
        show({ message: error.message || "Logout failed", type: "error" });
      }
    },
  },
  persist: {
    storage: {
      getItem: (key) => {
        const encrypted = localStorage.getItem(key);
        if (!encrypted) return null;
        const bytes = CryptoJS.AES.decrypt(encrypted, secret);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decrypted);
      },
      setItem: (key, value) => {
        const data = JSON.stringify(value);
        const encrypted = CryptoJS.AES.encrypt(data, secret).toString();

        localStorage.setItem(key, encrypted);
      },
    },
  },
});
