<template>
  <footer class="footer-container">
    <div>
      <!-- <div class="footer-section-one">
        <h2>subscribe to our newsletter</h2>
        <div class="footer-section-inner">
          <form @submit="">
            <input type="email" placeholder="enter email address" />
            <buttons button-text="subscribe" class-name="secondary-button" />
          </form>

          <div class="socials">
            <span class="social-text">social media</span>
            <div>
              <i class="fa-brands fa-facebook"></i>
              <i class="fa-brands fa-tiktok"></i>
              <i class="fa-brands fa-instagram"></i>
              <i class="fa-brands fa-twitter"></i>
            </div>
          </div>
        </div>
      </div> -->

      <div class="footer-section-two">
        <working-days :style="{ color: 'var(--primary-button-color)' }" />
      </div>

      <div class="footer-section-three">
        <location :style="{ color: 'var(--primary-button-color)' }" />
      </div>
    </div>
    <div class="copyright">
      <span>&copy; {{ year }} symos nail tech. All rights reserved.</span>
    </div>
  </footer>
</template>

<script setup>
import buttons from "./utility/buttons.vue";
import location from "./utility/location.vue";
import WorkingDays from "./utility/WorkingDays.vue";

const date = new Date();
const year = date.getFullYear();
</script>

<style scoped>
h2 {
  color: var(--hover-color);
}
.footer-container {
  margin-top: 1.5rem;
  background-color: var(--footer-bg);

  color: var(--text-secondary);
}
.footer-container > div {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  gap: 20px;
  padding: 20px;
  border-bottom: 1px solid white;
}
.footer-section-inner {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

input {
  padding: 15px 40px;
  border-radius: 30px;
}

.socials {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.socials > div {
  display: flex;
  gap: 20px;
}

.socials i {
  background-color: var(--background-secondary);
  width: 40px;
  height: 40px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  color: var(--secondary-icon-color);
  transition: all 0.3s ease-in;
}

.socials i:hover {
  transform: rotate(360deg);
}

.social-text {
  flex: none;
}

.copyright {
  display: flex;
  justify-self: center;
  font-size: 14px;
}

@media (max-width: 992px) {
  .footer-container > div {
    grid-template-columns: repeat(1, 1fr);
    align-items: center;
    justify-items: center;
    align-items: center;
    max-width: 500px;
    margin: auto;
  }
  .footer-container > div > div:nth-child(3) {
    display: none;
  }

  .footer-section-two,
  .footer-section-three {
    width: 100%;
  }
}
</style>
