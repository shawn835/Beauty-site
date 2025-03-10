<template>
  <div class="location-section">
    <h2 :style="style">get in touch</h2>
    <div class="footer-section-inner">
      <div class="location-info">
        <i class="fa-solid fa-location-dot" :style="iconStyle"></i>
        <div class="info">
          <span :style="style">address</span>
          <span>Nakuru town, main street.</span>
        </div>
      </div>

      <div class="phone-info">
        <i class="fa-solid fa-phone" :style="iconStyle"></i>
        <div class="info">
          <span :style="style">phone</span>
          <span>+254724300399</span>
        </div>
      </div>

      <div class="email-info">
        <i class="fa-solid fa-envelope" :style="iconStyle"></i>
        <div class="info">
          <span :style="style">email</span>
          <span>chegesimon949@gmail.com</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  style: Object,
  iconStyle: Object,
});
</script>

<style scoped>
.location-info,
.email-info,
.phone-info {
  display: flex;
  gap: 15px;
}

.footer-section-inner {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
h2 {
  text-align: center;
}

@media (max-width: 992px) {
}
</style>
