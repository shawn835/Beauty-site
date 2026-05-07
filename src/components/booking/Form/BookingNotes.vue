<template>
  <div class="form-group">
    <label>additional notes</label>
    <textarea
      v-model="notes"
      cols="50"
      rows="4"
      placeholder="Please use soft pink and add extra rhinestones on ring finger. Thank you!..."
    ></textarea>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  notes: String,
});

const emit = defineEmits(["update:notes"]);
const notes = computed({
  get: () => props.notes,
  set: (val) => emit("update:notes", val),
});
</script>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  color: #34495e;
  margin-bottom: 8px;
}

textarea {
  border: 2px solid #e0e0e0;
}

textarea:focus {
  border-color: #9b59b6;
  box-shadow: 0 0 0 3px rgba(155, 89, 182, 0.12);
}
</style>
