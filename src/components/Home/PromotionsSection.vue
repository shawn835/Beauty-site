<template>
  <section class="promotions-section">
    <div class="promo-container">
      <!-- Main Promo Banner -->
      <div class="main-promo">
        <div class="promo-content">
          <div class="badge">Limited Time Offer</div>

          <h2>20% OFF Your First Visit</h2>

          <p class="promo-subtitle">
            Experience luxury nail care at a special price. Valid for new
            clients only.
          </p>

          <div class="urgency">
            <span>⏰ This week only • Ends Sunday</span>
          </div>

          <button class="btn-claim" @click="claimOffer">
            Claim 20% Discount Now
          </button>

          <small class="terms">*Terms &amp; conditions apply</small>
        </div>

        <div class="promo-visual">
          <img
            src="https://picsum.photos/800/600?random=30"
            alt="Special Offer"
          />
          <div class="discount-circle">
            <span class="percent">20</span>
            <span class="off">OFF</span>
          </div>
        </div>
      </div>

      <!-- Secondary Promo -->
      <div class="secondary-promo">
        <div class="promo-card">
          <div class="card-visual">
            <span class="emoji">💅🦶✨</span>
          </div>
          <div class="card-content">
            <h3>Manicure + Pedicure Combo</h3>
            <p class="offer-text">
              Book together and get <strong>Free Nail Art Accent</strong>
            </p>
            <button class="btn-secondary" @click="claimCombo">
              Book Combo Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const claimOffer = () => {
  alert("Redirecting to booking with 20% first visit discount applied...");
};

const claimCombo = () => {
  alert("Opening combo booking page...");
};
</script>

<style scoped>
.promotions-section {
  padding: 90px 24px;
  background: linear-gradient(135deg, #2e3538 0%, #242a2d 100%);
}

.promo-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 28px;
}

.main-promo {
  background: #3a4246;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  align-items: center;
  position: relative;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.promo-content {
  padding: 60px 50px;
  flex: 1;
  z-index: 2;
}

.badge {
  display: inline-block;
  background: var(--bg-pink);
  color: white;
  padding: 6px 18px;
  border-radius: 30px;
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 20px;
}

.main-promo h2 {
  font-size: 2.8rem;
  line-height: 1.1;
  margin-bottom: 16px;
  color: white;
}

.promo-subtitle {
  font-size: 1.25rem;
  color: var(--text-gray);
  max-width: 420px;
  line-height: 1.5;
  margin-bottom: 24px;
}

.urgency {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
  padding: 10px 20px;
  border-radius: 30px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  margin-bottom: 32px;
}

.btn-claim {
  background: var(--bg-pink);
  color: white;
  border: none;
  padding: 16px 40px;
  font-size: 1.15rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: 0 8px 25px rgba(216, 27, 96, 0.35);
}

.btn-claim:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 35px rgba(216, 27, 96, 0.5);
}

.terms {
  display: block;
  margin-top: 16px;
  color: #888;
  font-size: 0.9rem;
}

/* Visual Side */
.promo-visual {
  position: relative;
  width: 45%;
  height: 100%;
  min-height: 420px;
}

.promo-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.discount-circle {
  position: absolute;
  top: 30px;
  right: 30px;
  width: 130px;
  height: 130px;
  background: white;
  color: var(--bg-pink);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  z-index: 3;
}

.percent {
  font-size: 2.4rem;
  line-height: 1;
}

.off {
  font-size: 1.1rem;
  margin-top: -4px;
}

/* Secondary Promo */
.secondary-promo {
  background: #3a4246;
  border-radius: 20px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.promo-card {
  text-align: center;
}

.card-visual {
  font-size: 4.5rem;
  margin-bottom: 24px;
}

.secondary-promo h3 {
  font-size: 1.65rem;
  margin-bottom: 12px;
}

.offer-text {
  font-size: 1.15rem;
  color: var(--text-gray);
  margin-bottom: 28px;
  line-height: 1.5;
}

.btn-secondary {
  background: transparent;
  border: 2px solid var(--bg-pink);
  color: var(--bg-pink);
  padding: 14px 36px;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-secondary:hover {
  background: var(--bg-pink);
  color: white;
}

/* Responsive */
@media (max-width: 992px) {
  .promo-container {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .main-promo {
    flex-direction: column;
  }

  .promo-visual {
    width: 100%;
    min-height: 300px;
  }

  .promo-content {
    padding: 50px 40px;
  }
}
</style>
