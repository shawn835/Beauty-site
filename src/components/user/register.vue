<template>
  <div class="register-container">
    <h2 class="title">Join Our Nail Spa</h2>
    <p class="subtitle">Register to book your pampering session</p>
    <form @submit.prevent="submitRegister" class="register-form">
      <div class="form-group">
        <label for="name">Full Name</label>
        <input
          type="text"
          id="name"
          v-model="form.name"
          placeholder="Enter your full name"
          required />
      </div>
      <div class="form-group">
        <label for="email">Email Address</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          placeholder="Enter your email"
          required />
      </div>
      <div class="form-group">
        <label for="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          v-model="form.phone"
          placeholder="Enter your phone number"
          required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="form.password"
          placeholder="Create a password"
          required />
      </div>
      <button type="submit" class="submit-button">Register</button>
    </form>
    <p class="login-link">
      Already have an account?
      <router-link to="/login">Log in</router-link> here
    </p>
  </div>
</template>
<script setup>
import { useRegister } from "@/components/composables/useRegister";
import { reactive } from "vue";

const { handleRegister } = useRegister();
const form = reactive({
  name: "",
  email: "",
  phone: "",
  password: "",
});

const submitRegister = () => {
  handleRegister(form);
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  background: linear-gradient(135deg, #fff5f7 0%, #ffe4e1 100%);
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  font-family: "Playfair Display", serif;
  text-align: center;
}

.title {
  font-size: 2.2rem;
  color: #d81b60;
  margin-bottom: 10px;
  font-weight: 700;
}

.subtitle {
  font-size: 1rem;
  color: #555;
  margin-bottom: 30px;
  font-family: "Lora", serif;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  text-align: left;
}

label {
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 8px;
  font-weight: 500;
}

input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  font-family: "Lora", serif;
  background-color: #fff;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #d81b60;
  box-shadow: 0 0 8px rgba(216, 27, 96, 0.2);
}

input.error {
  border-color: #e91e63;
}

.error-message {
  color: #e91e63;
  font-size: 0.85rem;
  margin-top: 5px;
}

.submit-button {
  padding: 12px;
  background-color: #d81b60;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-family: "Lora", serif;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.submit-button:hover {
  background-color: #ad1457;
  transform: translateY(-2px);
}

.login-link {
  margin-top: 20px;
  font-size: 0.9rem;
  color: #555;
}

.login-link a {
  color: #d81b60;
  text-decoration: none;
  font-weight: 500;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
