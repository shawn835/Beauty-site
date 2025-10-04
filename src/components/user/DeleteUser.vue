<template>
  <button :disabled="loading" class="primary-button" @click="submitDelete">
    <span v-if="!loading">Delete account</span>
    <span v-else class="spinner"></span>
  </button>
</template>

<script setup>
import { useSendUserData } from "../composables/sendUserData";
import { useToast } from "../composables/useToast";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/userStore";

const { loading, handleDeleteAccount } = useSendUserData();
const { show } = useToast();
const router = useRouter();
const userStore = useUserStore();

const submitDelete = async () => {
  try {
    const { message } = await handleDeleteAccount();
    userStore.clearUser();

    show({
      message: message || "account successfully deleted",
      type: "success",
    });

    router.push("/");
  } catch (error) {
    show({
      message: error.message || "something went wrong",
      type: "error",
    });
  }
};
</script>

<style scoped>
button {
  display: flex;
  align-self: center;
  justify-self: center;
  background-color: red;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid white;
  border-top: 2px solid transparent;
  border-radius: 50%;
  display: inline-block;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
