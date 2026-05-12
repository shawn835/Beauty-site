<template>
  <section class="services-preview">
    <div class="section-header" v-if="showHeader">
      <h2>{{ title }}</h2>
      <p>{{ subtitle }}</p>
    </div>

    <!-- Filters -->
    <div class="service-filters">
      <div class="filters-container">
        <BaseButton
          label="All Services"
          :variant="activeFilter === null ? 'primary' : 'ghost'"
          size="small"
          @click="emit('change-filter', null)"
        />

        <BaseButton
          v-for="s in filters"
          :key="s.id"
          :label="s.name"
          :variant="activeFilter === Number(s.id) ? 'primary' : 'ghost'"
          size="small"
          @click="emit('change-filter', Number(s.id))"
        />
      </div>
    </div>

    <div class="services-grid">
      <div
        v-for="service in services"
        :key="service.subServiceId"
        class="service-card"
      >
        <div class="card-image">
          <img :src="service.image" :alt="service.subServiceName" />
          <div class="price-tag">
            From <strong>KSh {{ service.price }}</strong>
          </div>
        </div>

        <div class="card-body">
          <h3>{{ service.subServiceName }}</h3>

          <p class="description">
            {{
              service.description ||
              "Long-lasting shine with zero chipping for up to 3 weeks"
            }}
          </p>

          <div class="duration" v-if="service.duration">
            ⏱ <strong>{{ formatDuration(service.duration) }}</strong>
          </div>
          <BaseButton
            :label="
              bookingStore.isSubServiceSelected(service.subServiceId)
                ? 'Remove'
                : 'Book this'
            "
            @click="handleBookService(service)"
          />
        </div>
      </div>
    </div>

    <div class="view-all" v-if="showViewAll">
      <BaseButton
        :label="viewAllText"
        variant="primary"
        @click="handleViewAll"
      />
    </div>
  </section>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";
import { useBookingStore } from "../store/useBookingStore";
import { formatDuration } from "@/Utility/utils";
import BaseButton from "../BaseButton.vue";
const bookingStore = useBookingStore();
import { useToast } from "../composables/useToast";

const { show } = useToast();
const handleBookService = (service) => {
  const wasSelected = bookingStore.isSubServiceSelected(service.subServiceId);

  bookingStore.toggleService(service);

  show({
    message: wasSelected
      ? `${service.subServiceName} removed from your preview`
      : `${service.subServiceName} added to your preview`,
    type: wasSelected ? "info" : "success",
  });
};

const props = defineProps({
  title: {
    type: String,
    default: "Our Signature Services",
  },
  subtitle: {
    type: String,
    default:
      "Professional nail care with premium products and experienced technicians",
  },
  services: {
    type: Array,
    required: true,
  },
  filters: {
    type: Array,
    required: true,
  },
  showHeader: {
    type: Boolean,
    default: true,
  },
  showViewAll: {
    type: Boolean,
    default: true,
  },
  viewAllText: {
    type: String,
    default: "View All Services →",
  },
  activeFilter: {
    type: [Number, null],
    default: null,
  },
});

const emit = defineEmits(["view-all", "change-filter"]);

const handleViewAll = () => {
  emit("view-all");
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
  margin-bottom: 16px;
  min-height: 60px;
}

.duration {
  color: var(--bg-pink);
  font-size: 0.98rem;
  margin-bottom: 20px;
  font-weight: 500;
}

service-filters {
  max-width: 1400px;
  margin: 0 auto 50px;
}

.filters-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  padding: 20px 0;
  border-bottom: 1px solid #444;
}

.filter-btn {
  background: #2e3538;
  color: var(--text-light);
  border: 2px solid transparent;
  padding: 12px 28px;
  border-radius: 50px;
  font-weight: 500;
  font-size: 1.02rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.filter-btn:hover {
  background: #3a4246;
  transform: translateY(-2px);
}

.filter-btn.active {
  background: var(--bg-pink);
  color: white;
  border-color: var(--bg-pink);
  box-shadow: 0 8px 20px rgba(216, 27, 96, 0.25);
}

/* Pagination Wrapper */
.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 60px;
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

  .filters-container {
    gap: 10px;
    padding: 15px 0;
  }

  .filter-btn {
    padding: 10px 20px;
    font-size: 0.98rem;
  }
}
</style>
