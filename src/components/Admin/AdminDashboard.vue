<template>
  <div class="dashboard-header">
    <h3>Admin Dashboard</h3>
    <buttons button-text="Logout" class-name="primary-button" @click="logout" />
  </div>

  <div class="bookings-container">
    <!-- Table Headers (Hidden on Small Screens) -->
    <div class="bookings-header">
      <span>Name</span>
      <span>Date</span>
      <span>Time</span>
      <span>Phone</span>
      <span>Technician</span>
      <span>Services</span>
      <span>Images</span>
      <span>Booking Code</span>
    </div>

    <!-- Bookings List -->
    <div v-for="(booking, index) in bookings" :key="index" class="booking-item">
      <span data-label="Name">{{ booking.name }}</span>
      <span data-label="Date">{{ booking.date }}</span>
      <span data-label="Time">{{ booking.time }}</span>
      <span data-label="Phone">{{ booking.phone }}</span>
      <span data-label="Technician">{{ booking.technician }}</span>
      <span data-label="Services">{{ booking.services.join(", ") }}</span>

      <!-- Images Column -->
      <div data-label="Images" class="image-preview">
        <img
          v-for="(img, i) in booking.imagePaths"
          :key="i"
          :src="img"
          alt="Uploaded Sample"
          @click="openImage(img)" />
      </div>

      <span data-label="Booking Code" class="code">{{ booking.id }}</span>
    </div>
  </div>

  <!-- Image Modal (For Enlarged View) -->
  <div v-if="selectedImage" class="image-modal" @click="selectedImage = ''">
    <img :src="selectedImage" alt="Full Image" />
    <div class="close">X</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import buttons from "../utility/buttons.vue";

const apiUrl = import.meta.env.VITE_API_URL;
const bookings = ref([]);
const router = useRouter();
const toast = useToast();
const selectedImage = ref("");

const fetchBookings = async () => {
  try {
    const response = await fetch(`${apiUrl}/admin/bookings`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      let data = await response.json();
      data = data.map((booking) => ({
        ...booking,
        imagePaths: booking.imagePaths.map((img) =>
          img.startsWith("/BookingSamplesImages/") ? `${apiUrl}${img}` : img
        ),
      }));

      bookings.value = data;
    } else {
      toast.error("Unable to fetch bookings");
    }
  } catch (error) {
    toast.error(error?.message || "Server error");
  }
};

const logout = () => {
  localStorage.removeItem("admin");
  router.push("/admin/login");
};

const openImage = (img) => {
  selectedImage.value = img;
};

onMounted(() => {
  if (!localStorage.getItem("admin")) {
    router.push("/admin/login");
  } else {
    fetchBookings();
  }
});
</script>
<style scoped>
.dashboard-header {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

.bookings-header {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  font-weight: bold;
  background: #333;
  color: white;
  padding: 10px;
  text-align: center;
}

.booking-item {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  border-bottom: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  align-items: center;
}

.image-preview {
  display: flex;
  gap: 5px;
  justify-content: center;
  flex-wrap: wrap;
}

.image-preview img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  cursor: pointer;
  border-radius: 5px;
  transition: transform 0.2s;
}

.image-preview img:hover {
  transform: scale(1.2);
}

/* Image Modal */
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

/* Responsive Styles */
@media (max-width: 768px) {
  .bookings-header {
    display: none; /* Hide table headers */
  }

  .booking-item {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 15px;
    border-bottom: 1px solid #ddd;
  }

  .booking-item span {
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 14px;
  }

  /* Labels for clarity */
  .booking-item span::before {
    content: attr(data-label);
    font-weight: bold;
    margin-right: 10px;
    color: #555;
  }

  /* Images should be larger on small screens */
  .image-preview img {
    width: 60px;
    height: 60px;
  }
}
</style>
