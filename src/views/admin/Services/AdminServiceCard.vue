<template>
  <Spinner v-if="loading" size="large" />

  <div class="service-card" v-else>
    <!-- Image -->
    <div class="card-image">
      <img
        :src="service?.images?.[0]?.image_url"
        :alt="service.subServiceName"
      />
      <div class="image-count" v-if="service.imageCount">
        📸 {{ service.imageCount || "5" }}
      </div>
    </div>

    <!-- Content -->
    <div class="card-content">
      <h3 class="service-name">{{ service.subServiceName }}</h3>
      <p class="parent-service">{{ service.serviceName }}</p>

      <div class="details">
        <div class="price">KSh {{ service.price.toLocaleString() }}</div>
        <div class="duration">{{ service.duration }} mins</div>
      </div>

      <!-- Badges -->
      <div class="badges">
        <span v-if="service.isFeatured" class="badge featured">
          <FontAwesomeIcon icon="star" class="star" />
        </span>

        <span :class="['badge', service.isActive ? 'active' : 'inactive']">
          <FontAwesomeIcon
            :icon="service.isActive ? 'check' : 'ban'"
            :class="service.isActive ? 'check' : 'ban'"
          />
          {{ service.isActive ? "Active" : "Inactive" }}
        </span>
      </div>

      <!-- Stats -->
      <div class="stats">
        <span
          ><FontAwesomeIcon icon="calendar" class="calendar" />
          {{ service.bookingCount }} bookings</span
        >
      </div>
    </div>

    <!-- Actions -->
    <div class="card-actions">
      <BaseButton
        icon-left="pen"
        @click="$emit('edit', service)"
        label="edit"
        variant="outline"
      />
      <BaseButton
        icon-left="power-off"
        @click="$emit('toggle-status', service)"
        :label="service.isActive ? 'Deactivate' : 'Activate'"
        :variant="service.isActive ? 'danger' : 'success'"
        size="small"
      />
    </div>
  </div>
</template>
<script setup>
import Spinner from "@/components/Spinner.vue";
import BaseButton from "@/components/BaseButton.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
const props = defineProps({
  service: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["edit", "toggle-status"]);

</script>

<style scoped>
.service-card {
  background: #2e3538;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  transition: all 0.4s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(216, 27, 96, 0.2);
}

/* Image */
.card-image {
  position: relative;
  height: 180px;
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

.image-count {
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
}

/* Content */
.card-content {
  padding: 20px;
  flex: 1;
}

.service-name {
  font-size: 1.25rem;
  margin: 0 0 4px 0;
  color: white;
}

.parent-service {
  color: var(--text-gray);
  margin-bottom: 16px;
  font-size: 0.95rem;
}

.details {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.price {
  font-weight: 700;
  color: var(--bg-pink);
  font-size: 1.1rem;
}

.duration {
  color: var(--text-gray);
}

.badges {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.badge.featured {
  background: #fbbf24;
  color: black;
}

.badge.active {
  background: #5281ce;
  color: white;
}

.badge.inactive {
  background: #ef4444;
  color: white;
}

/* Actions */
.card-actions {
  border-top: 1px solid #444;
  padding: 14px 20px;
  display: flex;
  gap: 10px;
}

/* Responsive */
@media (max-width: 768px) {
  .service-card {
    margin-bottom: 20px;
  }
}
</style>
