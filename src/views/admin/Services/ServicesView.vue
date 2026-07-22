<template>
  <ServiceFilter />
  <div class="services-grid">
    <AdminServiceCard
      v-for="service in subServices"
      :key="service.id"
      :service="service"
      :loading="adminServiceStore.isLoadingList"
      @edit="editService"
      @toggle-status="toggleStatus"
    />
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import AdminServiceCard from "./AdminServiceCard.vue";
import { useAdminServiceStore } from "@/components/store/adminServiceStore.js";
import { useToast } from "@/components/composables/useToast.js";
import ServiceFilter from "./ServiceFilter.vue";

const adminServiceStore = useAdminServiceStore();
const { show } = useToast();

onMounted(() => {
  adminServiceStore.fetchSubServices();
});

const subServices = computed(() => adminServiceStore.subServices);
const router = useRouter();

//listen for emit from serviceCard.vue
const editService = (service) => {
  router.push(`/admin/services/${service.serviceName}/${service.subServiceId}`);
};

const toggleStatus = async (service) => {
  const newValue = !service.isActive;

  const data = await adminServiceStore.toggleSubServiceStatus(
    service.subServiceId,

    newValue,
  );

  if (data) {
    show({
      type: "success",
      message: data.message || "Sub-service status updated successfully",
    });
  } else {
    show({
      type: "error",
      message: "Failed to update sub-service status",
    });
  }
};
</script>

<style scoped>
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}
</style>
