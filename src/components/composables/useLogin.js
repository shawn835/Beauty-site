import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useUserStore } from "../store/userStore";

export function useLogin() {
  const loading = ref(false);
  const error = ref(null);
  const router = useRouter();
  const toast = useToast();
  const userStore = useUserStore();

  const handleLogin = async (form) => {
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "login failed");
      }

      const { owner } = data;
      userStore.setUser(owner);
      toast.success(data.message || "logged in successfully!");
      password.value = "";
      email.value = "";

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err) {
      error.value = err.message;
      toast.error(err.message || "Something went wrong");
      loading.value = false;
    }
  };

  return { handleLogin };
}
