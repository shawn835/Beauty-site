<template>
  <div class="technicians-page">
    <div class="container">
      <!-- table -->
      <dataTable />

      <!-- EMPTY STATE -->
      <div v-if="filteredTechnicians.length === 0" class="empty-state">
        <p>No technicians found matching your criteria.</p>
      </div>
    </div>

    <!-- ADD / EDIT MODAL -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h2>{{ editingTech ? "Edit Technician" : "Add New Technician" }}</h2>

        <div class="modal-content">
          <!-- Photo Upload -->
          <div class="photo-upload">
            <div class="preview-photo">
              <img :src="form.photoPreview" alt="Preview" />
            </div>
            <label class="upload-label">
              Upload Photo
              <input
                type="file"
                accept="image/*"
                @change="handlePhotoUpload"
                hidden
              />
            </label>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label>Full Name</label>
              <input
                v-model="form.name"
                type="text"
                placeholder="John Doe"
                required
              />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input
                v-model="form.email"
                type="email"
                placeholder="john@example.com"
                required
              />
            </div>
            <div class="form-group">
              <label>Experience (years)</label>
              <input
                v-model.number="form.experience"
                type="number"
                min="0"
                required
              />
            </div>
            <div class="form-group">
              <label>Status</label>
              <select v-model="form.status">
                <option value="active">Active</option>
                <option value="onleave">On Leave</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div class="modal-actions">
          <button class="cancel-btn" @click="closeModal">Cancel</button>
          <button class="save-btn" @click="saveTechnician">
            {{ editingTech ? "Update" : "Create Technician" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import dataTable from "@/components/dataTable.vue";

const technicians = ref([
  {
    id: 1,
    name: "Aisha Mwangi",
    email: "aisha@salon.com",
    experience: 8,
    status: "active",
    photo: "https://picsum.photos/id/64/128",
  },
  {
    id: 2,
    name: "Kevin Omondi",
    email: "kevin@salon.com",
    experience: 5,
    status: "active",
    photo: "https://picsum.photos/id/91/128",
  },
  {
    id: 3,
    name: "Fatima Hassan",
    email: "fatima@salon.com",
    experience: 12,
    status: "onleave",
    photo: "https://picsum.photos/id/1027/128",
  },
  {
    id: 4,
    name: "James Kipchoge",
    email: "james@salon.com",
    experience: 3,
    status: "active",
    photo: "https://picsum.photos/id/201/128",
  },
]);

const searchQuery = ref("");
const statusFilter = ref("");
const showModal = ref(false);
const editingTech = ref(null);

const form = ref({
  name: "",
  email: "",
  experience: 0,
  status: "active",
  photoPreview: "https://picsum.photos/id/64/300",
});

const activeCount = computed(
  () => technicians.value.filter((t) => t.status === "active").length,
);

const filteredTechnicians = computed(() => {
  return technicians.value.filter((tech) => {
    const matchesSearch =
      tech.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      tech.email.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesStatus =
      !statusFilter.value || tech.status === statusFilter.value;
    return matchesSearch && matchesStatus;
  });
});

const openAddModal = () => {
  editingTech.value = null;
  form.value = {
    name: "",
    email: "",
    experience: 0,
    status: "active",
    photoPreview: "https://picsum.photos/id/64/300",
  };
  showModal.value = true;
};

const editTechnician = (tech) => {
  editingTech.value = tech;
  form.value = { ...tech, photoPreview: tech.photo };
  showModal.value = true;
};

const handlePhotoUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    form.value.photoPreview = URL.createObjectURL(file);
  }
};

const saveTechnician = () => {
  if (!form.value.name || !form.value.email) {
    alert("Name and Email are required!");
    return;
  }

  if (editingTech.value) {
    const index = technicians.value.findIndex(
      (t) => t.id === editingTech.value.id,
    );
    technicians.value[index] = { ...technicians.value[index], ...form.value };
  } else {
    technicians.value.push({
      id: Date.now(),
      ...form.value,
      photo: form.value.photoPreview,
    });
  }

  closeModal();
  alert("✅ Technician saved successfully!");
};

const deleteTechnician = (id) => {
  if (confirm("Delete this technician?")) {
    technicians.value = technicians.value.filter((t) => t.id !== id);
  }
};

const closeModal = () => {
  showModal.value = false;
};
</script>

<style scoped>
:root {
  --bg-dark: #2e3538;
  --text-light: #fff;
  --nav-links: #f5d698;
  --hover-color: #f76706;
}

/* Table */
.table-container {
  background: rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  overflow: hidden;
}

.tech-table {
  width: 100%;
  border-collapse: collapse;
}

.tech-table th {
  text-align: left;
  padding: 1.2rem 1rem;
  background: rgba(0, 0, 0, 0.2);
  font-weight: 600;
}

.tech-table td {
  padding: 1.1rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.tech-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.tech-photo {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.status-badge {
  padding: 6px 14px;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-badge.active {
  background: #4ade80;
  color: #1f2937;
}

.status-badge.onleave {
  background: #fbbf24;
  color: #1f2937;
}

.status-badge.inactive {
  background: #9ca3af;
  color: white;
}

.action-btn {
  margin-right: 8px;
  padding: 6px 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.edit {
  background: #3b82f6;
  color: white;
}
.delete {
  background: #ef4444;
  color: white;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: #2e3538;
  border-radius: 20px;
  width: 90%;
  max-width: 520px;
  padding: 2rem;
}

.photo-upload {
  text-align: center;
  margin-bottom: 2rem;
}

.preview-photo img {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #f5d698;
}

.upload-label {
  margin-top: 1rem;
  display: inline-block;
  background: rgba(245, 214, 152, 0.15);
  color: var(--nav-links);
  padding: 10px 24px;
  border-radius: 9999px;
  cursor: pointer;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 6px;
  color: #ddd;
}

.form-group input,
.form-group select {
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  color: white;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.cancel-btn,
.save-btn {
  flex: 1;
  padding: 14px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
}

.cancel-btn {
  background: transparent;
  border: 2px solid #666;
  color: #ccc;
}

.save-btn {
  background: var(--nav-links);
  color: #2e3538;
}
</style>
