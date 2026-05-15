<template>
  <section class="contact-hero">
    <div class="hero-bg">
      <img
        src="https://picsum.photos/2000/1200?random=70"
        alt="Contact Symos Nail Spa"
        class="hero-image"
      />
      <div class="hero-overlay"></div>
    </div>

    <div class="hero-content">
      <div class="badge">Let's Connect</div>

      <h1 class="hero-title">Get In Touch With Us</h1>

      <p class="hero-subtitle">
        Have questions? Want to book a luxury experience? We're just a message
        away and ready to pamper you.
      </p>

      <div class="contact-highlights">
        <div class="highlight-item">
          <i class="fa-solid fa-phone"></i>
          <div>
            <strong>Call Us</strong>
            <span>+254 712 345 678</span>
          </div>
        </div>

        <div class="highlight-item">
          <i class="fa-solid fa-envelope"></i>
          <div>
            <strong>Email Us</strong>
            <span>hello@symosnailspa.com</span>
          </div>
        </div>

        <div class="highlight-item">
          <i class="fa-solid fa-location-dot"></i>
          <div>
            <strong>Visit Us</strong>
            <span>Nairobi, Kenya</span>
          </div>
        </div>
      </div>

      <button class="cta-btn" @click="scrollToForm">Send Us a Message</button>
    </div>
  </section>
</template>

<script setup>
const scrollToForm = () => {
  document.getElementById("contact-form")?.scrollIntoView({
    behavior: "smooth",
  });
};
</script>

<style scoped>
.contact-hero {
  position: relative;
  height: 85vh;
  min-height: 620px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(46, 53, 56, 0.4),
    rgba(46, 53, 56, 0.85) 70%,
    var(--bg-dark) 95%
  );
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 3;
  max-width: 820px;
  padding: 0 24px;
}

.badge {
  display: inline-block;
  background: rgba(216, 27, 96, 0.9);
  color: white;
  padding: 8px 26px;
  border-radius: 50px;
  font-weight: 600;
  margin-bottom: 20px;
  letter-spacing: 1px;
}

.hero-title {
  font-size: clamp(2.8rem, 6.5vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 20px;
}

.hero-subtitle {
  font-size: 1.3rem;
  max-width: 620px;
  margin: 0 auto 50px;
  line-height: 1.6;
  opacity: 0.95;
}

/* Contact Highlights */
.contact-highlights {
  display: flex;
  justify-content: center;
  gap: 50px;
  flex-wrap: wrap;
  margin-bottom: 50px;
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 180px;
}

.highlight-item i {
  font-size: 1.8rem;
  color: var(--bg-pink);
}

.highlight-item strong {
  display: block;
  font-size: 1.05rem;
}

.highlight-item span {
  color: var(--text-gray);
  font-size: 0.98rem;
}

/* CTA Button */
.cta-btn {
  background: var(--bg-pink);
  color: white;
  border: none;
  padding: 18px 42px;
  font-size: 1.15rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: 0 10px 30px rgba(216, 27, 96, 0.4);
}

.cta-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(216, 27, 96, 0.5);
}

/* Responsive */
@media (max-width: 768px) {
  .contact-highlights {
    gap: 30px;
  }

  .highlight-item {
    min-width: 140px;
  }
}
</style>
