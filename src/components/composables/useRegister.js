// src/composables/useRegister.js
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export function useRegister() {
  const loading = ref(false);
  const error = ref(null);
  const router = useRouter();
  const toast = useToast();

  const handleRegister = async (form) => {
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phoneNumber: form.phone,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      toast.success(data.message || "Registered successfully!");

      // For email verification later:
      // localStorage.setItem("pendingEmail", form.email)
      // router.push("/verify/token")

      router.push("/login");
    } catch (err) {
      error.value = err.message;
      toast.error(err.message);
    } finally {
      loading.value = false;
    }
  };

  return { handleRegister, loading, error };
}
