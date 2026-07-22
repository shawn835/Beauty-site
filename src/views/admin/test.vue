<template>
  <div class="technician-details">
    <!-- HEADER -->
    <div class="detail-header">
      <div class="container">
        <button class="back-btn" @click="$emit('back')">
          ← Back to Technicians
        </button>

        <div class="profile-header">
          <div class="profile-photo">
            <img :src="technician.photo" :alt="technician.name" />
            <label class="photo-edit">
              ✎
              <input
                type="file"
                accept="image/*"
                @change="updatePhoto"
                hidden
              />
            </label>
          </div>

          <div class="profile-info">
            <h1>{{ technician.name }}</h1>
            <p class="role">Senior Nail Technician</p>

            <div class="status-toggle">
              <span class="status-label">Status:</span>
              <label class="switch">
                <input
                  type="checkbox"
                  v-model="technician.active"
                  @change="updateStatus"
                />
                <span class="slider"></span>
              </label>
              <span class="status-text" :class="{ active: technician.active }">
                {{ technician.active ? "Active" : "Inactive" }}
              </span>
            </div>
          </div>

          <div class="quick-stats">
            <div class="stat">
              <span class="number">{{ technician.experience }}</span>
              <span class="label">Years Exp.</span>
            </div>
            <div class="stat">
              <span class="number">4.9</span>
              <span class="label">Rating</span>
            </div>
            <div class="stat">
              <span class="number">187</span>
              <span class="label">Bookings</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container content-grid">
      <!-- LEFT COLUMN -->
      <div class="left-column">
        <!-- CONTACT INFO -->
        <div class="card">
          <h2>Contact Information</h2>
          <div class="info-grid">
            <div class="info-row">
              <span class="info-key">Email</span>
              <input
                v-model="technician.email"
                class="editable-input"
                type="email"
              />
            </div>
            <div class="info-row">
              <span class="info-key">Phone</span>
              <input
                v-model="technician.phone"
                class="editable-input"
                type="tel"
              />
            </div>
          </div>
        </div>

        <!-- EMPLOYMENT -->
        <div class="card">
          <h2>Employment Information</h2>
          <div class="info-grid">
            <div class="info-row">
              <span class="info-key">Experience</span>
              <input
                v-model.number="technician.experience"
                class="editable-input"
                type="number"
              />
              years
            </div>
            <div class="info-row">
              <span class="info-key">Joined</span>
              <span>{{ technician.joinedDate }}</span>
            </div>
            <div class="info-row">
              <span class="info-key">Specialties</span>
              <div class="tags">
                <span
                  v-for="tag in technician.specialties"
                  :key="tag"
                  class="tag"
                  >{{ tag }}</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- WORKING SCHEDULE -->
        <div class="card">
          <h2>Weekly Schedule</h2>
          <div class="schedule-grid">
            <div v-for="day in schedule" :key="day.day" class="schedule-day">
              <strong>{{ day.day }}</strong>
              <span>{{ day.hours }}</span>
            </div>
          </div>
        </div>

        <!-- AVAILABILITY -->
        <div class="card">
          <h2>Availability Controls</h2>
          <div class="toggle-list">
            <div class="toggle-item">
              <span>On Leave</span>
              <label class="switch">
                <input type="checkbox" v-model="technician.onLeave" />
                <span class="slider"></span>
              </label>
            </div>
            <div class="toggle-item">
              <span>Suspended</span>
              <label class="switch">
                <input type="checkbox" v-model="technician.suspended" />
                <span class="slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT COLUMN -->
      <div class="right-column">
        <!-- UPCOMING BOOKINGS -->
        <div class="card">
          <h2>Upcoming Bookings</h2>
          <div
            v-for="booking in upcomingBookings"
            :key="booking.id"
            class="booking-item"
          >
            <div>
              <strong>{{ booking.service }}</strong
              ><br />
              <small
                >{{ booking.client }} • {{ booking.date }}
                {{ booking.time }}</small
              >
            </div>
            <span class="status-badge upcoming">Confirmed</span>
          </div>
        </div>

        <!-- PERFORMANCE -->
        <div class="card">
          <h2>Performance Metrics</h2>
          <div class="metrics-grid">
            <div class="metric">
              <span class="metric-value">98%</span>
              <span class="metric-label">Completion Rate</span>
            </div>
            <div class="metric">
              <span class="metric-value">4.92</span>
              <span class="metric-label">Avg. Rating</span>
            </div>
            <div class="metric">
              <span class="metric-value">KES 428k</span>
              <span class="metric-label">Revenue (30d)</span>
            </div>
          </div>
        </div>

        <!-- REVIEWS -->
        <div class="card">
          <h2>Recent Customer Reviews</h2>
          <div v-for="review in reviews" :key="review.id" class="review-item">
            <div class="review-header">
              <strong>{{ review.client }}</strong>
              <span class="stars">★★★★☆</span>
            </div>
            <p class="review-text">"{{ review.comment }}"</p>
          </div>
        </div>

        <!-- ACTIVITY LOG -->
        <div class="card">
          <h2>Activity Log</h2>
          <div class="activity-log">
            <div v-for="log in activityLog" :key="log.id" class="log-entry">
              <small>{{ log.time }}</small>
              <span>{{ log.action }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const technician = ref({
  id: 1,
  name: "Aisha Mwangi",
  photo: "https://picsum.photos/id/64/300",
  email: "aisha@salon.com",
  phone: "+254 712 345 678",
  experience: 8,
  joinedDate: "March 2024",
  active: true,
  onLeave: false,
  suspended: false,
  specialties: ["Gel X", "Russian Manicure", "Nail Art", "Acrylic"],
});

const upcomingBookings = ref([
  {
    id: 1,
    service: "Full Set Gel X",
    client: "Grace Kimani",
    date: "Jun 29",
    time: "10:00 AM",
  },
  {
    id: 2,
    service: "Nail Art Design",
    client: "Fatima Ali",
    date: "Jun 30",
    time: "02:30 PM",
  },
]);

const reviews = ref([
  {
    id: 1,
    client: "Sophie Wanjiku",
    comment: "Best technician I've ever had!",
    rating: 5,
  },
  {
    id: 2,
    client: "Mary Njeri",
    comment: "Very professional and gentle.",
    rating: 5,
  },
]);

const activityLog = ref([
  { id: 1, time: "2 hours ago", action: "Completed 3 bookings today" },
  { id: 2, time: "Yesterday", action: "Updated availability" },
]);

const schedule = ref([
  { day: "Monday", hours: "9:00 AM - 6:00 PM" },
  { day: "Tuesday", hours: "9:00 AM - 6:00 PM" },
  { day: "Wednesday", hours: "Off" },
  { day: "Thursday", hours: "9:00 AM - 6:00 PM" },
  { day: "Friday", hours: "9:00 AM - 7:00 PM" },
]);

const updatePhoto = (e) => {
  const file = e.target.files[0];
  if (file) {
    technician.value.photo = URL.createObjectURL(file);
  }
};

const updateStatus = () => {
  // API call would go here
  console.log("Status updated");
};
</script>

<style scoped>
.technician-details {
  background: #2e3538;
  color: #e5e7eb;
  min-height: 100vh;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
}

.detail-header {
  background: #252b2e;
  padding: 2.5rem 0;
  border-bottom: 1px solid rgba(245, 214, 152, 0.15);
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.profile-photo {
  position: relative;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid #f5d698;
}

.profile-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-edit {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: #f5d698;
  color: #2e3538;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.1rem;
}

.profile-info h1 {
  margin: 0;
  font-size: 2.4rem;
  color: #f5d698;
}

.role {
  color: #9ca3af;
  font-size: 1.2rem;
  margin: 0.4rem 0 1rem;
}

.status-toggle {
  display: flex;
  align-items: center;
  gap: 12px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 62px;
  height: 32px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #475569;
  transition: 0.4s;
  border-radius: 9999px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 24px;
  width: 24px;
  left: 4px;
  bottom: 4px;
  background: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background: #4ade80;
}

input:checked + .slider:before {
  transform: translateX(30px);
}

.quick-stats {
  display: flex;
  gap: 2rem;
  margin-left: auto;
}

.stat {
  text-align: center;
}

.stat .number {
  font-size: 1.8rem;
  font-weight: 700;
  color: #f5d698;
  display: block;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2.5rem 0;
}

@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

.card {
  background: rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 1.8rem;
  margin-bottom: 2rem;
}

.card h2 {
  margin-top: 0;
  color: #f5d698;
  font-size: 1.45rem;
  border-bottom: 1px solid rgba(245, 214, 152, 0.2);
  padding-bottom: 0.8rem;
}

.info-grid,
.schedule-grid {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.editable-input {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(245, 214, 152, 0.3);
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  width: 260px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background: rgba(245, 214, 152, 0.15);
  color: #f5d698;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 0.9rem;
}

/* Booking Item */
.booking-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.status-badge.upcoming {
  background: #4ade80;
  color: #1f2937;
  padding: 6px 14px;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 600;
}

/* Other styles */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  text-align: center;
}

.metric-value {
  font-size: 2rem;
  font-weight: 700;
  color: #f5d698;
}

.review-item {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.stars {
  color: #fbbf24;
}

.log-entry {
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  font-size: 0.95rem;
}

.back-btn {
  background: transparent;
  color: #aaa;
  border: none;
  padding: 8px 16px;
  margin-bottom: 1rem;
  cursor: pointer;
}
</style>
