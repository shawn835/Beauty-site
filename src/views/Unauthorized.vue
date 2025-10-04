<template>
  <div class="unauthorized-container">
    <div class="unauthorized-content">
      <h1>403 - Unauthorized</h1>
      <p>Sorry, you don't have permission to access this page.</p>
      <button @click="goBack" class="back-button">Go Back</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const goBack = () => {
  router.push("/");
};
</script>

<style scoped>
.unauthorized-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f9;
}

.unauthorized-content {
  text-align: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 90%;
}

h1 {
  font-size: 2.5rem;
  color: #e63946;
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 2rem;
}

.back-button {
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #457b9d;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #1d3557;
}
</style>
