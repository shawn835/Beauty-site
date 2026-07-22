<template>
  <DataTable
    title="technicians"
    :columns="columns"
    :data="technicians"
    @navigate="navigate"
  />
</template>

<script setup>
import DataTable from "@/components/DataTable.vue";
import { useRouter } from "vue-router";

const router = useRouter();

defineProps({
  technicians: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
});

const navigate = (row) => {
  router.push(`/admin/technicians/${row.technicianId}`);
};
</script>
