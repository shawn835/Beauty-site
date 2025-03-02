<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Oops! The page you're looking for doesn't exist.</p>
    <router-link to="/" class="home-btn">Go Home</router-link>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  background: linear-gradient(135deg, #1e293b, #0f172a);
  color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Arial, sans-serif;
  padding: 20px;
}

h1 {
  font-size: 6rem;
  margin: 0;
}

p {
  font-size: 1.5rem;
  margin: 10px 0;
}

.home-btn {
  margin-top: 15px;
  display: inline-block;
  padding: 10px 20px;
  background: white;
  color: #1e293b;
  text-decoration: none;
  font-size: 1rem;
  border-radius: 5px;
  transition: 0.3s;
}

.home-btn:hover {
  background: #64748b;
  color: white;
}
</style>
