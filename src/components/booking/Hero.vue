<template>
  <section class="booking-hero">
    <div class="hero-content">
      <div class="badge">
        <span>✨ Easy Booking</span>
      </div>

      <h1 class="main-title">Book Your Appointment</h1>

      <p class="subtitle">
        Choose your service, preferred date &amp; time, and let us handle the
        rest.
      </p>

      <!-- Trust Signals -->
      <div class="trust-row">
        <div class="trust-item">
          <i class="fa-solid fa-clock"></i>
          <span>Average confirmation in under 5 minutes</span>
        </div>
        <div class="trust-item">
          <i class="fa-solid fa-check-circle"></i>
          <span>Instant availability updates</span>
        </div>
      </div>

      <div class="scroll-hint">Scroll to begin booking ↓</div>
    </div>
  </section>
</template>

<style scoped>
.booking-hero {
  position: relative;
  min-height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #2e3538 0%, #1f2528 100%);
  color: white;
  text-align: center;
  overflow: hidden;
}

.booking-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: url("https://picsum.photos/2000/1200?random=65") center/cover
    no-repeat;
  opacity: 0.15;
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 780px;
  padding: 0 24px;
}

.badge {
  display: inline-block;
  background: rgba(216, 27, 96, 0.15);
  color: var(--bg-pink);
  padding: 8px 22px;
  border-radius: 50px;
  font-size: 1.05rem;
  font-weight: 600;
  margin-bottom: 20px;
  border: 1px solid rgba(216, 27, 96, 0.3);
}

.main-title {
  font-size: clamp(2.8rem, 6vw, 4.2rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 20px;
}

.subtitle {
  font-size: 1.35rem;
  max-width: 560px;
  margin: 0 auto 40px;
  line-height: 1.55;
  color: #ddd;
}

.trust-row {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  margin-bottom: 50px;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.05rem;
  color: var(--text-gray);
}

.trust-item i {
  color: var(--bg-pink);
  font-size: 1.4rem;
}

.scroll-hint {
  color: var(--text-gray);
  font-size: 0.98rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  opacity: 0.7;
}

/* Responsive */
@media (max-width: 768px) {
  .booking-hero {
    min-height: 65vh;
  }

  .trust-row {
    gap: 25px;
    font-size: 0.98rem;
  }
}
</style>
