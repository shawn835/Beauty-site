<template>
  <section class="services-hero">
    <!-- Video / Image Background -->
    <div class="hero-bg">
      <img
        src="/images/heroS.jpg"
        alt="Luxury Nail Care"
        class="fallback-image"
      />
      <div class="hero-overlay"></div>
    </div>

    <!-- Content -->
    <div class="hero-content">
      <div class="badge-container">
        <span class="badge">Walk-ins Welcome</span>
        <span class="badge">Home Service</span>
        <span class="badge">Certified Team</span>
      </div>

      <h1 class="main-title">Our Services</h1>

      <p class="subtitle">
        Luxury nail care tailored to your style — from classic manicures to bold
        nail art and relaxing spa treatments.
      </p>

      <div class="hero-buttons">
        <button class="btn-primary" @click="scrollToServices">
          Explore All Services
        </button>
        <button class="btn-secondary" @click="goToBooking">
          Book Appointment
        </button>
      </div>
    </div>

    <!-- Trust Bar -->
    <div class="trust-bar">
      <div class="trust-item">
        <span
          ><FontAwesomeIcon icon="bottle-droplet" class="bottle-droplet"
        /></span>
        <span>Premium Products</span>
      </div>
      <div class="trust-item">
        <span><FontAwesomeIcon icon="soap" class="soap" /></span>
        <span>Fully Sterilized Tools</span>
      </div>
      <div class="trust-item">
        <span><FontAwesomeIcon icon="car-side" class="car-side" /></span>
        <span>Home Service Available</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const scrollToServices = () => {
  document.getElementById("all-services")?.scrollIntoView({
    behavior: "smooth",
  });
};

const goToBooking = () => {
  window.location.href = "/book-appointment";
};
</script>

<style scoped>
.services-hero {
  position: relative;
  height: 85vh;
  min-height: 620px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.hero-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(46, 53, 56, 0.45),
    rgba(46, 53, 56, 0.75) 60%,
    var(--bg-dark) 90%
  );
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 3;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
  text-align: center;
}

.badge-container {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.badge {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  padding: 8px 20px;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.main-title {
  font-size: clamp(3rem, 7vw, 4.8rem);
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.1;
}

.subtitle {
  font-size: 1.35rem;
  max-width: 680px;
  margin: 0 auto 40px;
  line-height: 1.6;
  opacity: 0.95;
}

.hero-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  padding: 16px 36px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.4s ease;
}

.btn-primary {
  background: var(--bg-pink);
  color: white;
  border: none;
  box-shadow: 0 8px 25px rgba(216, 27, 96, 0.35);
}

.btn-primary:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(216, 27, 96, 0.5);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-4px);
}

/* Trust Bar */
.trust-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(30, 35, 38, 0.95);
  backdrop-filter: blur(10px);
  padding: 18px 24px;
  display: flex;
  justify-content: center;
  gap: 50px;
  flex-wrap: wrap;
  z-index: 4;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.05rem;
  color: var(--text-light);
}

/* Responsive */
@media (max-width: 768px) {
  .services-hero {
    min-height: 580px;
  }

  .hero-content {
    padding: 0 20px;
  }

  .trust-bar {
    gap: 30px;
    padding: 16px 20px;
    font-size: 0.95rem;
  }
}
</style>
