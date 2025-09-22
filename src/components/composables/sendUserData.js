import { ref } from "vue";
import { useRouter } from "vue-router";
import { handleResponse } from "../utility/response";

export function useSendUserData() {
  const loading = ref(false);
  const router = useRouter();

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
          console.log(form[key]);

          form[key] = "";
        }
      }

      setTimeout(() => {
        router.push("/");
      }, 5000);

      return data;
    } catch (err) {
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
        `${import.meta.env.VITE_API_URL}/api/updateuser`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profileData),
          credentials: "include",
        }
      );

      const data = await handleResponse(res);
      return data;
    } catch (err) {
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
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(passwordData),
          credentials: "include",
        }
      );

      const data = await handleResponse(res);
      return data;
    } catch (err) {
      console.error(err.stack);
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
  };
}
