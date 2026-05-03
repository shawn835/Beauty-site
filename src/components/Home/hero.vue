<template>
  <section class="hero">
    <!-- Video Background -->
    <video class="hero-video" autoplay muted loop playsinline>
      <source src="/Videos/home-bg-video.mp4" type="video/mp4" />
      <!-- Fallback image -->
      <!-- <img
        src="/images/nails-hero.jpg"
        alt="Luxury Nail Care"
        class="fallback-image" -->
      />
    </video>

    <!-- Overlay -->
    <div class="hero-overlay"></div>

    <!-- Content -->
    <div class="hero-content">
      <div class="badge">
        <span>✅ Certified Technicians</span>
        <span>✅ Sterilized Tools</span>
        <span>✅ Home Service Available</span>
      </div>

      <h1 class="hero-title">
        Luxury Nail Care &amp;<br />
        Spa Experience
        <span class="location">in Nairobi</span>
      </h1>

      <p class="hero-subtitle">
        Manicure • Pedicure • Gel Polish • Nail Art • Luxury Treatments
      </p>

      <div class="hero-buttons">
        <button class="btn-primary" @click="goToBooking">
          Book Appointment Now
        </button>
        <button class="btn-secondary" @click="goToServices">
          View Our Services
        </button>
      </div>

      <div class="trust-badges">
        <div class="trust-item">
          <span class="icon">✨</span>
          <span>Premium Experience</span>
        </div>
        <div class="trust-item">
          <span class="icon">🧴</span>
          <span>Hygienic &amp; Safe</span>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="scroll-indicator">
      <span>Scroll to explore</span>
      <div class="scroll-line"></div>
    </div>
  </section>
</template>

<script setup>
const goToBooking = () => {
  // Navigate to booking page
  window.location.href = "/book-appointment"; // or use router
};

const goToServices = () => {
  window.location.href = "/services";
};
</script>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  min-height: 650px;
  display: flex;
  align-items: center;
  color: white;
  overflow: hidden;
}

.hero-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.fallback-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(46, 53, 56, 0.4),
    rgba(46, 53, 56, 0.75) 70%,
    var(--bg-dark) 95%
  );
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 3;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
  text-align: center;
}

.badge {
  display: flex;
  gap: 18px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 24px;
  font-size: 0.95rem;
}

.badge span {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  padding: 6px 16px;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.hero-title {
  font-size: clamp(2.8rem, 6vw, 4.8rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 16px;
}

.location {
  color: var(--bg-pink);
  display: block;
  font-size: 0.85em;
  margin-top: 8px;
  font-weight: 500;
}

.hero-subtitle {
  font-size: 1.25rem;
  max-width: 620px;
  margin: 0 auto 40px;
  opacity: 0.95;
  line-height: 1.5;
}

.hero-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.btn-primary {
  background: var(--bg-pink);
  color: white;
  padding: 16px 36px;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(216, 27, 96, 0.3);
}

.btn-primary:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(216, 27, 96, 0.4);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
  padding: 16px 32px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-4px);
}

.trust-badges {
  display: flex;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  text-align: center;
  opacity: 0.8;
}

.scroll-line {
  width: 1px;
  height: 60px;
  background: linear-gradient(transparent, white, transparent);
  margin: 8px auto;
  animation: scrollAnim 2s infinite;
}

@keyframes scrollAnim {
  0% {
    transform: scaleY(0.6);
  }
  50% {
    transform: scaleY(1);
  }
  100% {
    transform: scaleY(0.6);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .hero {
    min-height: 620px;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }

  .btn-primary,
  .btn-secondary {
    width: 280px;
  }

  .badge {
    gap: 10px;
    font-size: 0.85rem;
  }
}
</style>
