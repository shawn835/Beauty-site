<template>
  <ServiceCard
    title="Our Signature Services"
    subtitle="Professional nail care with premium products and experienced technicians"
    :services="services"
    @book-service="bookService"
  />
</template>

<script setup>
import ServiceCard from "../services/ServiceCard.vue";
const services = [
  {
    id: 1,
    icon: "💅",
    title: "Classic Manicure",
    description: "Nail shaping, cuticle care, scrub & luxurious massage",
    price: 1200,
    duration: 120,
    image: "https://picsum.photos/600/400?random=10",
  },
  {
    id: 2,
    icon: "🦶",
    title: "Spa Pedicure",
    description: "Deep exfoliation, callus removal & relaxing foot massage",
    price: 1500,
    duration: 90,
    image: "https://picsum.photos/600/400?random=11",
  },
  {
    id: 3,
    icon: "✨",
    title: "Gel Polish",
    description: "Long-lasting shine with zero chipping for up to 3 weeks",
    price: 2500,
    duration: 90,
    image: "https://picsum.photos/600/400?random=12",
  },
  {
    id: 4,
    icon: "🎨",
    title: "Nail Art",
    description: "Custom designs, rhinestones, chrome & 3D embellishments",
    price: 800,
    duration: 50,
    image: "https://picsum.photos/600/400?random=13",
  },
  {
    id: 5,
    icon: "💎",
    title: "Acrylic Extensions",
    description: "Strong, beautiful extensions with flawless finish",
    price: 3500,
    duration: 50,
    image: "https://picsum.photos/600/400?random=14",
  },
  {
    id: 6,
    icon: "🏠",
    title: "Home Service",
    description: "Premium salon experience delivered to your doorstep",
    price: 2000,
    duration: 50,
    image: "https://picsum.photos/600/400?random=15",
  },
];

const bookService = (service) => {
  alert(`Booking flow for ${service.title} would open here`);
  // router.push(`/book?service=${service.id}`)
};

const viewAllServices = () => {
  alert("Redirecting to full services page...");
};
</script>

<style scoped>
.services-preview {
  padding: 100px 24px;
  background: var(--bg-dark);
  color: var(--text-light);
}

.section-header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 60px;
}

.section-header h2 {
  font-size: 2.8rem;
  margin-bottom: 16px;
  color: white;
}

.section-header p {
  font-size: 1.15rem;
  color: var(--text-gray);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 28px;
  max-width: 1400px;
  margin: 0 auto;
}

.service-card {
  background: #3a4246;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.4s ease;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}

.service-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 20px 40px rgba(216, 27, 96, 0.15);
}

.card-image {
  position: relative;
  height: 240px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.service-card:hover .card-image img {
  transform: scale(1.08);
}

.price-tag {
  position: absolute;
  top: 16px;
  right: 16px;
  background: var(--bg-pink);
  color: white;
  padding: 8px 16px;
  border-radius: 30px;
  font-size: 0.95rem;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.card-body {
  padding: 24px;
  text-align: center;
}

.icon {
  font-size: 2.4rem;
  margin-bottom: 12px;
  display: block;
}

.card-body h3 {
  font-size: 1.35rem;
  margin: 0 0 12px 0;
  color: white;
}

.description {
  color: var(--text-gray);
  line-height: 1.6;
  margin-bottom: 24px;
  min-height: 66px;
}

.book-btn {
  background: transparent;
  color: var(--bg-pink);
  border: 2px solid var(--bg-pink);
  padding: 12px 32px;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.book-btn:hover {
  background: var(--bg-pink);
  color: white;
  transform: translateY(-2px);
}

.view-all {
  text-align: center;
  margin-top: 60px;
}

.btn-view-all {
  background: transparent;
  color: var(--text-light);
  border: 2px solid var(--text-gray);
  padding: 14px 40px;
  border-radius: 50px;
  font-size: 1.05rem;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-view-all:hover {
  border-color: var(--bg-pink);
  color: var(--bg-pink);
}

/* Responsive */
@media (max-width: 768px) {
  .services-preview {
    padding: 70px 20px;
  }

  .section-header h2 {
    font-size: 2.4rem;
  }

  .services-grid {
    gap: 20px;
  }
}
</style>
