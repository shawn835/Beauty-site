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
.scroll-container {
  font-size: 2rem;
  padding-block: 8px;
  display: flex;
  overflow: hidden;
  user-select: none;
  gap: var(--gap);
  margin-top: 1rem;
  color: var(--background-primary);
  background-color: var(--text-heading);
  font-style: oblique;
  width: 100%;
}
.scroll-content {
  display: flex;
  flex-shrink: 0;
  justify-content: space-around;
  min-width: 100%;
  align-items: center;
  animation: scroll 20s linear infinite;
  gap: var(--gap);
  padding: 10px;
}

.scroll-icon-text {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
}

@keyframes scroll {
  to {
    transform: translateX(calc(-100% - var(--gap)));
  }
}

@media (max-width: 992px) {
  .scroll-container {
    font-size: 1rem;
    max-width: 100%;
  }
}
</style>
