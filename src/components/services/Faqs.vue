<template>
  <section class="faq-section">
    <div class="section-header">
      <h2>Frequently Asked Questions</h2>
      <p>Everything you need to know about our services</p>
    </div>

    <div class="faq-container">
      <div
        v-for="(faq, index) in faqs"
        :key="index"
        class="faq-item"
        :class="{ active: openIndex === index }"
        @click="toggleFAQ(index)"
      >
        <div class="faq-question">
          <h3>{{ faq.question }}</h3>
          <span class="faq-icon">{{ openIndex === index ? "−" : "+" }}</span>
        </div>

        <div class="faq-answer" :class="{ open: openIndex === index }">
          <p>{{ faq.answer }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const openIndex = ref(null);

const faqs = [
  {
    question: "How long does a gel manicure last?",
    answer:
      "Our gel manicures typically last 2 to 3 weeks with proper care. We use high-quality products that ensure long-lasting shine and minimal chipping.",
  },
  {
    question: "Do you offer home service in all areas of Nakuru?",
    answer:
      "Yes! We currently serve Njoro, Kiamunyi, Free Area, Nakuru town, and the sorrounding areas. Please confirm your location when booking.",
  },
  {
    question: "How far in advance should I book an appointment?",
    answer:
      "We recommend booking at least 24-48 hours in advance. However, we do accept same-day bookings subject to availability.",
  },
  {
    question: "Are your tools properly sterilized?",
    answer:
      "Absolutely. All tools are professionally sterilized using hospital-grade equipment after every client to ensure maximum hygiene and safety.",
  },
  {
    question: "Can I choose my technician?",
    answer:
      "Yes! You can request a specific technician when booking. We’ll do our best to accommodate your preference based on availability.",
  },
  {
    question: "What should I do to prepare for my appointment?",
    answer:
      "Please come with clean, dry nails. Remove any old polish beforehand. For pedicures, it helps if your feet are clean and free of heavy lotion.",
  },
  {
    question: "Do you offer refunds or cancellations?",
    answer:
      "Cancellations made at least 4 hours before your appointment are free. Late cancellations or no-shows may incur a 50% charge.",
  },
];

const toggleFAQ = (index) => {
  openIndex.value = openIndex.value === index ? null : index;
};
</script>
<style scoped>
.faq-section {
  padding: 100px 24px;
  background: #242a2d;
  color: var(--text-light);
}

.section-header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 60px;
}

.section-header h2 {
  font-size: 2.8rem;
  margin-bottom: 12px;
}

.section-header p {
  color: var(--text-gray);
  font-size: 1.2rem;
}

.faq-container {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  background: #2e3538;
  border-radius: 16px;
  margin-bottom: 16px;
  overflow: hidden;
  transition: all 0.4s ease;
  cursor: pointer;
  border: 1px solid transparent;
}

.faq-item:hover {
  border-color: rgba(216, 27, 96, 0.2);
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 28px;
  font-size: 1.1rem;
}

.faq-question h3 {
  margin: 0;
  font-weight: 500;
  flex: 1;
  padding-right: 20px;
}

.faq-icon {
  font-size: 1.8rem;
  font-weight: 300;
  color: var(--bg-pink);
  transition: transform 0.3s ease;
  width: 30px;
  text-align: center;
}

.faq-item.active .faq-icon {
  transform: rotate(180deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0 28px;
  background: #282f33;
}

.faq-answer.open {
  max-height: 200px;
  padding-bottom: 28px;
}

.faq-answer p {
  margin: 0;
  line-height: 1.75;
  color: var(--text-gray);
}

/* Responsive */
@media (max-width: 768px) {
  .faq-section {
    padding: 70px 20px;
  }

  .faq-question {
    padding: 20px 24px;
    font-size: 1.05rem;
  }

  .faq-answer.open {
    padding-bottom: 24px;
  }
}
</style>
