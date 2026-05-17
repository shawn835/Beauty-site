<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Main Footer Content -->
      <div class="footer-grid">
        <!-- Column 1: About -->
        <div class="footer-col">
          <div class="logo">symos<span class="logo-pink">spa</span></div>
          <p class="about-text">
            Premium nail care and spa experience in Nairobi. Bringing luxury and
            beauty directly to you.
          </p>
          <div class="social-links">
            <a href="#" aria-label="Instagram">📸</a>
            <a href="#" aria-label="WhatsApp">💬</a>
            <a href="#" aria-label="TikTok">🎵</a>
          </div>
        </div>

        <!-- Column 2: Quick Links -->
        <div class="footer-col quick-links">
          <h4>Quick Links</h4>
          <ul>
            <li><router-link to="/services">Our Services</router-link></li>
            <li>
              <router-link to="/book/appointment">Book Appointment</router-link>
            </li>
            <!-- <li><router-link to="/gallery">Gallery</router-link></li> -->
            <li>
              <router-link to="/profile/user/bookings">My Bookings</router-link>
            </li>
            <li><router-link to="/about">About Us</router-link></li>
          </ul>
        </div>

        <!-- Column 3: Working Hours -->
        <div class="footer-col">
          <h4>Opening Hours</h4>
          <div class="hours-list">
            <div class="day-row" v-for="day in schedule" :key="day.day">
              <span class="day">{{ day.day }}</span>
              <span class="time">{{ day.hours }}</span>
            </div>
          </div>
        </div>

        <!-- Column 4: Contact -->
        <div class="footer-col">
          <h4>Contact Us</h4>
          <div class="contact-info">
            <p>
              <Font-awesome-icon icon="location-pin" class="location" />nakuru,
              Kenya
            </p>
            <p>
              <Font-awesome-icon icon="phone" class="phone" />
              <a href="tel:+254724300399">+254 724 300 399</a>
            </p>
            <p>
              <Font-awesome-icon icon="envelope" class="envelope" />
              nahashonm851@gmail.com
            </p>
          </div>

          <BaseButton
            class="footer-cta"
            @click="goToBooking"
            label="Book Now"
          />
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="footer-bottom">
        <p>&copy; 2026 Symos Spa. All Rights Reserved.</p>
        <p>
          Made with <Font-awesome-icon icon="heart" class="heart" /> for
          beautiful nails
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import BaseButton from "../BaseButton.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
const schedule = [
  { day: "Monday", hours: "6:00 AM - 9:00 PM" },
  { day: "Tuesday", hours: "6:00 AM - 9:00 PM" },
  { day: "Wednesday", hours: "6:00 AM - 9:00 PM" },
  { day: "Thursday", hours: "6:00 AM - 9:00 PM" },
  { day: "Friday", hours: "6:00 AM - 9:00 PM" },
  { day: "Saturday", hours: "6:00 AM - 9:00 PM" },
  { day: "Sunday", hours: "10:00 AM - 8:00 PM" },
];

const goToBooking = () => {
  window.location.href = "/book-appointment";
};
</script>

<style scoped>
.footer {
  background: #1f2528;
  color: var(--text-light);
  padding-top: 80px;
}

.footer-container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 24px;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 50px;
  margin-bottom: 60px;
}

.footer-col h4 {
  color: var(--bg-pink);
  margin-bottom: 20px;
  font-size: 1.1rem;
}

.logo {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 16px;
}

.logo-pink {
  color: var(--bg-pink);
}

.about-text {
  color: var(--text-gray);
  line-height: 1.7;
  margin-bottom: 24px;
}

.social-links {
  display: flex;
  gap: 16px;
  font-size: 1.6rem;
}

.social-links a:hover {
  color: var(--bg-pink);
  transform: scale(1.2);
}

.hours-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.day-row {
  display: flex;
  justify-content: space-between;
  padding-bottom: 8px;
  border-bottom: 1px solid #333;
}

.day {
  font-weight: 500;
}

.time {
  color: var(--text-gray);
}

.contact-info p {
  margin-bottom: 12px;
  color: var(--text-gray);
}

.contact-info a {
  color: var(--text-light);
  text-decoration: none;
}

.contact-info a:hover {
  color: var(--bg-pink);
}

.footer-cta {
  margin-top: 20px;
  background: var(--bg-pink);
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.footer-cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(216, 27, 96, 0.4);
}

.footer-bottom {
  border-top: 1px solid #333;
  padding: 30px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  color: var(--text-gray);
  font-size: 0.95rem;
}

/* Responsive */
@media (max-width: 768px) {
  .footer-grid {
    gap: 40px;
  }

  .quick-links {
    display: none;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
}
</style>
