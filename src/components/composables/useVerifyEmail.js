import { ref } from "vue";
import { useRouter } from "vue-router";
import { handleResponse } from "../utility/response";

export const useVerifyEmail = () => {
  const email = ref(localStorage.getItem("pendingEmail") || "");
  const loading = ref(false);
  let timer = ref(60);
  const router = useRouter();
  let interval = null;

  const startTimer = () => {
    timer.value = 60;
    if (interval) clearInterval(interval);
    interval = setInterval(() => {
      if (timer.value > 0) {
        timer.value--;
      } else {
        clearInterval(interval);
      }
    }, 1000);
  };

  const handleVerifyToken = async (payload) => {
    const token = payload.code;

    if (token.length !== 6 || isNaN(Number(token))) {
      throw new Error("Invalid token code");
    }

    loading.value = true;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/verifyemail`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: token, email: email.value }),
        }
      );

      const data = await handleResponse(res);

      localStorage.removeItem("pendingEmail");
      router.push("/login");
      return data;
    } catch (err) {
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const resendCode = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/resendcode`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email.value }),
        }
      );

      const data = await handleResponse(res);
      console.log(data);

      timer.value = 60;
      startTimer();
      return data;
    } catch (err) {
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return { handleVerifyToken, resendCode, loading, startTimer, timer };
};
