<template>
  <div class="verify-page">
    <div class="verify-card">
      <!-- Success State -->
      <div v-if="success" class="state-content">
        <div class="icon-circle success">
          <font-awesome-icon icon="check-circle" />
        </div>
        <h1 class="title">Email Updated Successfully</h1>
        <p class="message">
          {{ message }}
        </p>
        <p class="subtext">Redirecting to login...</p>
      </div>

      <!-- Default / Confirm State -->
      <div v-else class="state-content">
        <div class="icon-circle primary">
          <font-awesome-icon icon="envelope" />
        </div>

        <h1 class="title">Confirm Your New Email Address</h1>

        <p class="message">
          You're about to verify your new email address.<br />
          Once confirmed, this will become your primary email.
        </p>

        <div class="actions">
          <BaseButton
            :label="loading ? 'confirming' : 'confirm email address'"
            @click="confirmEmail"
            :disabled="loading"
            full-width
          />

          <BaseButton
            label="go to login"
            @click="goToLogin"
            full-width
            variant="warning"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { handleResponse } from "@/Utility/response";
import { ref, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import BaseButton from "../BaseButton.vue";
import { useToast } from "../composables/useToast.js";
const { show } = useToast();

const router = useRouter();
const route = useRoute();

const loading = ref(false);
const success = ref(false);
const message = ref(null);

let redirectTimer = null;

const confirmEmail = async () => {
  const token = route.query.token;

  if (!token) {
    message.value = "Invalid or expired email verification link.";

    show({
      message: message.value,
      type: "error",
    });

    return;
  }

  loading.value = true;

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/verify-email-change`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      },
    );

    const data = await handleResponse(res);

    success.value = true;
    message.value = data.message;

    redirectTimer = setTimeout(() => {
      router.push("/login");
    }, 2500);
  } catch (err) {
    message.value = err.message;

    show({
      message: err.message,
      type: "error",
    });
  } finally {
    loading.value = false;
  }
};

const goToLogin = () => {
  router.push("/login");
};

onBeforeUnmount(() => {
  if (redirectTimer) {
    clearTimeout(redirectTimer);
  }
});
</script>

<style scoped>
.verify-page {
  min-height: 100vh;
  background: #1a1f22;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.verify-card {
  background: #252b2e;
  max-width: 460px;
  width: 100%;
  border-radius: 24px;
  padding: 3rem 2.5rem;
  text-align: center;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
}

.icon-circle {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.8rem;
  font-size: 2.8rem;
}

.icon-circle.primary {
  background: rgba(245, 214, 152, 0.15);
  color: #f5d698;
}

.icon-circle.success {
  background: rgba(74, 222, 128, 0.15);
  color: #4ade80;
}

.icon-circle.error {
  background: rgba(248, 113, 113, 0.15);
  color: #f87171;
}

.title {
  font-size: 1.85rem;
  color: #f5d698;
  margin-bottom: 1rem;
}

.message {
  color: #ddd;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.subtext {
  color: #888;
  font-size: 0.95rem;
}

/* Buttons */
.actions {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
</style>
