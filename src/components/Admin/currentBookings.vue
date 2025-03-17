<template>
  <div class="clients-info">
    <clientInfoDisplay :array="bookings">
      <template #name="{ item }">{{ item.name }}</template>
      <template #date="{ item }">{{ item.date }}</template>
      <template #time="{ item }">{{ item.time }}</template>
      <template #status="{ item }">{{ item.status }}</template>
      <template #phone="{ item }">{{ item.phone }}</template>
      <template #technician="{ item }">{{ item.technician }}</template>
      <template #services="{ item }">{{ item.services.join(", ") }}</template>
      <template #image="{ item }">
        <img
          v-for="(img, i) in item.imagePaths"
          :key="i"
          :src="img"
          alt="Uploaded Sample"
          @click="openImage(img)"
      /></template>

      <template #code="{ item }">{{ item.id }}</template>
    </clientInfoDisplay>
  </div>

  <!-- Image Modal (For Enlarged View) -->
  <div v-if="selectedImage" class="image-modal" @click="selectedImage = ''">
    <img :src="selectedImage" alt="Full Image" />
    <div class="close">X</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import clientInfoDisplay from "./clientInfoDisplay.vue";
import { fetchBookings } from "./fetchAllBookings";

const bookings = ref([]);
const selectedImage = ref("");

onMounted(async () => {
  if (!localStorage.getItem("admin")) {
    router.push("/admin/login");
  } else {
    const allBookings = await fetchBookings();
    if (allBookings) {
      bookings.value = allBookings;
    }
  }
});

const openImage = (img) => {
  selectedImage.value = img;
};
</script>

<style scoped>
.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-modal img {
  max-width: 90%;
  max-height: 90%;
  border-radius: 10px;
}

.clients-info img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  cursor: pointer;
  border-radius: 5px;
  transition: transform 0.2s;
}

.clients-info img:hover {
  transform: scale(1.2);
}
</style>
