import { ref } from "vue";
import router from "@/router/router";
import { handleResponse } from "@/Utility/response";

import { delay } from "@/Utility/utils.js";

export function useUserApi() {
  const loading = ref(false);

  const handleRegister = async (form) => {
    loading.value = true;
    try {
      await delay(800);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await handleResponse(res);
      // For email verification
      localStorage.setItem("pendingEmail", form.email);
      setTimeout(() => router.push("/token/confirmation"), 1500);
      return data;
    } finally {
      loading.value = false;
    }
  };

  const handleLogin = async (form) => {
    loading.value = true;
    try {
      await delay(800); // Simulate network delay

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });

      const data = await handleResponse(res);

      for (const key in form) {
        if (Object.hasOwn(form, key)) {
          form[key] = "";
        }
      }

      router.push("/");

      return data;
    } finally {
      loading.value = false;
    }
  };

  const updateProfile = async (profileData) => {
    loading.value = true;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/update/account`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profileData),
          credentials: "include",
        },
      );

      const data = await handleResponse(res);

      return data;
    } finally {
      loading.value = false;
    }
  };

  const updatePassword = async (passwordData) => {
    loading.value = true;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/updatepassword`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(passwordData),
          credentials: "include",
        },
      );

      const data = await handleResponse(res);
      return data;
    } finally {
      loading.value = false;
    }
  };

  const handleDeleteAccount = async () => {
    loading.value = true;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/deleteaccount`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const data = await handleResponse(res);
      return data;
    } finally {
      loading.value = false;
    }
  };

  //logout
  const logOutUser = async () => {
    loading.value = true;
    try {
      await delay(500);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/logout`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await handleResponse(res);
      router.push("/login");
      return data;
    } finally {
      loading.value = false;
    }
  };

  return {
    handleRegister,
    handleLogin,
    loading,
    updateProfile,
    updatePassword,
    handleDeleteAccount,
    logOutUser,
  };
}
