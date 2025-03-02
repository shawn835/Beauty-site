<template>
  <div class="admin-login">
    <h2>Admin Login</h2>
    <form @submit.prevent="handleLogin">
      <input
        v-model="password"
        type="password"
        placeholder="Enter Admin Password" />
      <buttons class-name="primary-button" button-text="login" />
    </form>
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";
import buttons from "../utility/buttons.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
const toast = useToast();
const password = ref();
const router = useRouter();
const apiUrl = import.meta.env.VITE_API_URL;

const handleLogin = async () => {
  if (!password.value) {
    toast.error("input is empty");
    return;
  }
  try {
    const response = await fetch(`${apiUrl}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: password.value }),
    });

    if (response.ok) {
      localStorage.setItem("admin", "true");
      router.push("/admin/dashboard");
      toast.success("logged in successfully");
    } else {
      toast.error("Incorrect password");
    }
  } catch (error) {
    toast.error("Server error");
  }
};
</script>

<style scoped>
.admin-login {
  max-width: 400px;
  margin: auto;
  text-align: center;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
}
button {
  padding: 10px;
  cursor: pointer;
}
.error {
  color: red;
}

form {
  width: 100%;
}
</style>
