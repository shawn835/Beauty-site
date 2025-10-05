<template>
  <div class="scroll-container">
    <div class="scroll-content" aria-hidden="true">
      <div class="scroll-icon-text">
        <span class="icon"><i class="fas fa-smile"></i></span>
        <span class="text">1000+ happy clients</span>
      </div>
      <div class="scroll-icon-text">
        <span class="icon"><i class="fa fa-clock"></i></span>
        <span class="text">fast services</span>
      </div>
      <div class="scroll-icon-text">
        <span class="icon"><i class="fas fa-trophy"></i></span>
        <span class="text">award winning nail artistry</span>
      </div>
      <div class="scroll-icon-text">
        <span class="icon"><i class="fas fa-crown"></i></span>
        <span class="text">100% premium products</span>
      </div>
      <div class="scroll-icon-text">
        <span class="icon"><i class="fas fa-gem"></i></span>
        <span class="text">luxurious spa experience</span>
      </div>
    </div>
    <div class="scroll-content">
      <div class="scroll-icon-text">
        <span class="icon"><i class="fas fa-smile"></i></span>
        <span class="text">1000+ happy clients</span>
      </div>
      <div class="scroll-icon-text">
        <span class="icon"><i class="fa fa-clock"></i></span>
        <span class="text">fast services</span>
      </div>
      <div class="scroll-icon-text">
        <span class="icon"><i class="fas fa-trophy"></i></span>
        <span class="text">award winning nail artistry</span>
      </div>
      <div class="scroll-icon-text">
        <span class="icon"><i class="fas fa-crown"></i></span>
        <span class="text">100% premium products</span>
      </div>
      <div class="scroll-icon-text">
        <span class="icon"><i class="fas fa-gem"></i></span>
        <span class="text">luxurious spa experience</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Define custom properties for consistency */
:root {
  --gap: 20px;
  --background-primary: #fff5f7;
  --text-heading: #d81b60;
  --hover-color: #ad1457;
}

/* Container Styling */
.scroll-container {
  font-family: "Lora", serif;
  font-size: 1.5rem;
  padding: 15px 0;
  display: flex;
  overflow: hidden;
  user-select: none;
  gap: var(--gap);
  margin: 2rem auto;
  color: var(--background-primary);
  background: linear-gradient(90deg, #ffe4e1 0%, #fff5f7 100%);
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  width: 100%;
}

/* Content Styling */
.scroll-content {
  display: flex;
  flex-shrink: 0;
  justify-content: space-around;
  min-width: 100%;
  align-items: center;
  animation: scroll 20s linear infinite;
  gap: var(--gap);
  padding: 10px 20px;
}

/* Icon and Text Styling */
.scroll-icon-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 15px;
  transition: transform 0.3s ease;
}

.scroll-icon-text:hover {
  transform: scale(1.05);
}

.icon {
  font-size: 2rem;
  color: var(--text-heading);
  transition: color 0.3s ease;
}

.scroll-icon-text:hover .icon {
  color: var(--hover-color);
}

.text {
  font-size: 1rem;
  color: #333;
  text-align: center;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Animation */
@keyframes scroll {
  to {
    transform: translateX(calc(-100% - var(--gap)));
  }
}

/* Seamless Loop Fix */
.scroll-content:first-child {
  animation: scroll 20s linear infinite;
}

.scroll-content:last-child {
  animation: scroll 20s linear infinite;
}

/* Responsive Design */
@media (max-width: 768px) {
  .scroll-container {
    font-size: 1rem;
    padding: 10px 0;
    margin: 1rem auto;
  }

  .scroll-icon-text {
    padding: 0 10px;
    gap: 5px;
  }

  .icon {
    font-size: 1.5rem;
  }

  .text {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .scroll-container {
    font-size: 0.9rem;
  }

  .scroll-icon-text {
    flex-direction: row;
    gap: 5px;
  }

  .icon {
    font-size: 1.2rem;
  }

  .text {
    font-size: 0.8rem;
  }
}
</style>
