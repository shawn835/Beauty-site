<template>
  <div class="team-container">
    <Headings
      heading="our professionals"
      :style="{ color: 'var(--text-heading)', textDecoration: 'underline' }" />
    <TeamGallery :array="ourTeam">
      <template #images="{ content }">
        <img v-lazy="content.image" :alt="content.name" />
      </template>
      <template #custom-content="{ content }">
        <span v-if="content.facebook">
          <a href=""
            ><i
              :class="content.facebook"
              target="_blank"
              rel="noopener noreferrer"></i
          ></a>
        </span>
        <span v-if="content.instagram">
          <a href="">
            <i
              :class="content.instagram"
              target="_blank"
              rel="noopener noreferrer"></i
          ></a>
        </span>
        <span v-if="content.whatsapp">
          <a href=""
            ><i
              :class="content.whatsapp"
              target="_blank"
              rel="noopener noreferrer"></i
          ></a>
        </span>
      </template>

      <template #extra-custom-content="{ content }">
        <div class="team-details">
          <span>{{ content.name }}</span>
          <span>{{ content.position }}</span>
        </div>
      </template>
    </TeamGallery>
  </div>
</template>

<script setup>
import TeamGallery from "../utility/TeamGallery.vue";
import ourTeam from "@/assets/team.json";
import Headings from "../utility/Headings.vue";
</script>

<style scoped>
.team-container {
  margin-top: 2rem;
  max-width: 100%;
}

.team-details {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.team-details span:nth-child(1) {
  color: var(--hover-color);
  font-size: larger;
}
.team-details span:nth-child(2) {
  font-weight: bold;
}

img:hover {
  transform: scale(1.2);
}

img {
  border-radius: 12px;
  transition: transform 0.5s ease-in-out;
}

.team-socials {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translateX(-50%);
  font-size: larger;
  z-index: 10;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
}

.image:hover .team-socials {
  visibility: visible;
  opacity: 1;
}
</style>
