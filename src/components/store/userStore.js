import { defineStore } from "pinia";
import CryptoJS from "crypto-js";

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
