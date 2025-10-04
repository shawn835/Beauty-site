<template>
  <div class="profile-forms">
    <div><UpdateProfile /></div>
    <div><UpdatePassword /></div>
  </div>
  <DeleteUser />
</template>

<script setup>
import UpdatePassword from "@/components/UpdatePassword.vue";
import UpdateProfile from "@/components/UpdateProfile.vue";
import DeleteUser from "@/components/user/DeleteUser.vue";
</script>

<style scoped>
.profile-forms {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 1.5rem;
}

@media (max-width: 792px) {
  .profile-forms {
    grid-template-columns: 1fr;
  }
}
</style>
