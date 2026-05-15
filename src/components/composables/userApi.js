import { ref } from "vue";
import router from "@/router/router";
import { handleResponse } from "@/Utility/response";

export function useUserApi() {
  const loading = ref(false);

  const handleRegister = async (form) => {
    loading.value = true;
    try {
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
    } catch (err) {
      console.error(err.message);
      loading.value = false;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const handleLogin = async (form) => {
    loading.value = true;
    try {
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

      setTimeout(() => {
        router.push("/");
      }, 1000);

      return data;
    } catch (err) {
      console.error(err.message);
      loading.value = false;
      throw err;
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
    } catch (err) {
      console.error(err.message);
      loading.value = false;
      throw err;
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
    } catch (err) {
      console.error(err.message);
      loading.value = false;
      throw err;
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
    } catch (err) {
      console.error(err.message);
      loading.value = false;
      throw err;
    }
  };

  //logout
  const logOutUser = async () => {
    loading.value = true;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/logout`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await handleResponse(res);

      router.push("/login");
    } catch (err) {
      console.error(error.message || "Error occurred when logging out!");
      throw err;
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
