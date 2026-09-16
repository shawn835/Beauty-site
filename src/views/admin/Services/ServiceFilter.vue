<template>
  <div class="filter-bar">
    <div class="filter-container">
      <!-- Service Category -->
      <div class="filter-group">
        <label class="filter-label">Service Category</label>
        <select v-model="filters.category" class="filter-select">
          <option value="">All Services</option>
          <option value="manicure">Manicure</option>
          <option value="pedicure">Pedicure</option>
          <option value="nail-art">Nail Art</option>
          <option value="gel">Gel Extension</option>
          <option value="acrylic">Acrylic</option>
          <!-- Add more as needed -->
        </select>
      </div>

      <!-- Status -->
      <div class="filter-group">
        <label class="filter-label">Status</label>
        <select v-model="filters.status" class="filter-select">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <!-- Featured -->
      <div class="filter-group">
        <label class="filter-label">Featured</label>
        <select v-model="filters.featured" class="filter-select">
          <option value="">All</option>
          <option value="true">Featured Only</option>
          <option value="false">Not Featured</option>
        </select>
      </div>

      <!-- Price Range -->
      <div class="filter-group">
        <label class="filter-label">Price Range (KES)</label>
        <div class="price-range">
          <input
            v-model="filters.minPrice"
            type="number"
            placeholder="Min"
            class="filter-input"
          />
          <span class="range-separator">—</span>
          <input
            v-model="filters.maxPrice"
            type="number"
            placeholder="Max"
            class="filter-input"
          />
        </div>
      </div>

      <!-- Duration -->
      <div class="filter-group">
        <label class="filter-label">Duration</label>
        <select v-model="filters.duration" class="filter-select">
          <option value="">Any Duration</option>
          <option value="30">Under 30 mins</option>
          <option value="60">30 - 60 mins</option>
          <option value="90">60 - 90 mins</option>
          <option value="120">90+ mins</option>
        </select>
      </div>

      <!-- Popularity -->
      <div class="filter-group">
        <label class="filter-label">Popularity</label>
        <select v-model="filters.popularity" class="filter-select">
          <option value="">All</option>
          <option value="most">Most Booked</option>
          <option value="least">Least Booked</option>
          <option value="none">Never Booked</option>
        </select>
      </div>

      <!-- Actions -->
      <div class="filter-actions">
        <button class="btn btn-secondary" @click="resetFilters">Reset</button>
        <button class="btn btn-primary" @click="applyFilters">
          Apply Filters
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const filters = ref({
  category: "",
  status: "",
  featured: "",
  minPrice: null,
  maxPrice: null,
  duration: "",
  popularity: "",
});

const resetFilters = () => {
  filters.value = {
    category: "",
    status: "",
    featured: "",
    minPrice: null,
    maxPrice: null,
    duration: "",
    popularity: "",
  };
};

const applyFilters = () => {
  // Emit or call parent method to filter services
  console.log("Filters applied:", filters.value);
};
</script>

<style scoped>
.filter-bar {
  background: #252b2e;
  padding: 1.8rem 2rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.filter-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: end;
}

.filter-group {
  display: flex;
  flex-direction: column;
  min-width: 160px;
}

.filter-label {
  color: #aaa;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.filter-select,
.filter-input {
  background: #2e3538;
  border: 2px solid rgba(245, 214, 152, 0.25);
  color: white;
  padding: 12px 14px;
  border-radius: 12px;
  font-size: 1rem;
}

.filter-input {
  width: 100%;
}

.price-range {
  display: flex;
  align-items: center;
  gap: 8px;
}

.range-separator {
  color: #666;
  font-weight: 600;
}

/* Buttons */
.filter-actions {
  display: flex;
  gap: 1rem;
  margin-left: auto;
}

.btn {
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #f5d698;
  color: #2e3538;
}

.btn-secondary {
  background: transparent;
  border: 2px solid #666;
  color: #ddd;
}

.btn:hover {
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 1024px) {
  .filter-container {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-actions {
    margin-left: 0;
    justify-content: center;
  }
}
</style>
