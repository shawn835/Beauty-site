<template>
  <section class="about-hero">
    <div class="hero-bg">
      <img
        src="https://picsum.photos/2000/1200?random=60"
        alt="Symos Spa Experience"
        class="hero-image"
      />
      <div class="hero-overlay"></div>
    </div>

    <div class="hero-content">
      <div class="badge">Since 2023</div>

      <h1 class="main-title">
        About Symos<br />
        <span class="highlight">Nail Tech</span>
      </h1>

      <p class="subtitle">
        At Symos, we believe beauty is care, confidence, and self-expression. We
        provide premium nail and spa services designed to leave every client
        feeling polished, relaxed, and valued.
      </p>

      <div class="hero-stats">
        <div class="stat">
          <strong>5000+</strong>
          <span>Happy Clients</span>
        </div>
        <div class="stat">
          <strong>25+</strong>
          <span>Signature Treatments</span>
        </div>
        <div class="stat">
          <strong>4.9</strong>
          <span>Average Rating</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-hero {
  position: relative;
  height: 90vh;
  min-height: 680px;
  display: flex;
  align-items: center;
  color: white;
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
  filter: brightness(0.75);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(46, 53, 56, 0.3),
    rgba(46, 53, 56, 0.75) 65%,
    var(--bg-dark) 90%
  );
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 3;
  max-width: 820px;
  margin: 0 auto;
  padding: 0 24px;
  text-align: center;
}

.badge {
  display: inline-block;
  background: rgba(216, 27, 96, 0.9);
  color: white;
  padding: 8px 24px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 20px;
  letter-spacing: 1px;
}

.main-title {
  font-size: clamp(3.2rem, 6.5vw, 5rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 24px;
}

.highlight {
  color: var(--bg-pink);
}

.subtitle {
  font-size: 1.35rem;
  line-height: 1.65;
  max-width: 680px;
  margin: 0 auto 50px;
  opacity: 0.95;
  font-weight: 400;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 60px;
  flex-wrap: wrap;
}

.stat {
  text-align: center;
}

.stat strong {
  display: block;
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--bg-pink);
  margin-bottom: 6px;
}

.stat span {
  color: var(--text-gray);
  font-size: 1.05rem;
}

/* Responsive */
@media (max-width: 768px) {
  .about-hero {
    min-height: 620px;
  }

  .hero-stats {
    gap: 40px;
  }

  .stat strong {
    font-size: 2rem;
  }
}
</style>
