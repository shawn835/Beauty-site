<template>
  <div class="account-details">
    <div class="page-header">
      <h1>Account Details</h1>
      <button v-if="!isEditing" class="edit-btn" @click="enableEditing">
        <i class="fa-solid fa-pen"></i> Edit Profile
      </button>
    </div>

    <BaseForm
      :title="isEditing ? 'Edit Account Details' : 'Your Information'"
      :subtitle="isEditing ? 'Update your personal information' : ''"
      :fields="fields"
      :buttonText="isEditing ? 'Save Changes' : ''"
      :loading="loading"
      @submit="handleSubmit"
    >
      <!-- Extra slot for Cancel button when editing -->
      <template #extra v-if="isEditing">
        <button class="cancel-btn" @click="cancelEditing">Cancel</button>
      </template>
    </BaseForm>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import BaseForm from "../BaseForm.vue";
import { useUserStore } from "../store/userStore";

const userStore = useUserStore();

const isEditing = ref(false);
const loading = ref(false);

const formData = ref({
  name: "",
  email: "",
  phone: "",
});

const fields = computed(() => [
  {
    id: "name",
    label: "Full Name",
    type: "text",
    required: true,
    disabled: !isEditing.value,
  },
  {
    id: "email",
    label: "Email Address",
    type: "email",
    required: true,
    disabled: !isEditing.value,
  },
  {
    id: "phone",
    label: "Phone Number",
    type: "tel",
    required: true,
    disabled: !isEditing.value,
  },
]);

onMounted(() => {
  // Prefill from store
  if (userStore.user) {
    formData.value = {
      name: userStore.user.name || "",
      email: userStore.user.email || "",
      phone: userStore.user.phone || "",
    };
  }
});

const enableEditing = () => {
  isEditing.value = true;
};

const cancelEditing = () => {
  isEditing.value = false;
  // Reset form to original values
  if (userStore.user) {
    formData.value = {
      name: userStore.user.name || "",
      email: userStore.user.email || "",
      phone: userStore.user.phone || "",
    };
  }
};

const handleSubmit = async () => {
  loading.value = true;

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Update user store
    userStore.updateUser(formData.value);

    isEditing.value = false;
    alert("Profile updated successfully!");
  } catch (error) {
    alert("Failed to update profile");
  } finally {
    loading.value = false;
  }
};
</script>
<style scoped>
/* Extra styles for Account Details */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.edit-btn {
  background: transparent;
  border: 2px solid var(--bg-pink);
  color: var(--bg-pink);
  padding: 10px 24px;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.edit-btn:hover {
  background: rgba(216, 27, 96, 0.1);
}

/* Make disabled inputs look better */
.form-input:disabled,
.form-textarea:disabled {
  background: #242a2d;
  color: #aaa;
  cursor: not-allowed;
  border-color: #555;
}
</style>
