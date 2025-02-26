<template>
  <div class="range-container">
    <div class="container">
      <hero :style="{ height: '50vh' }">
        <template #hero-header>
          <Headings
            heading="Discover Our Range of Rejuvenating Spa Services"
            :style="{ color: 'var(--text-secondary)' }" />
        </template>
        <template #heading-text>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur,
          fugiat distinctio ipsam deleniti impedit natus.
        </template>
      </hero>

      <!-- upper service items -->
      <div class="service-item" :style="{ display: 'flex', gap: '20px' }">
        <div class="image-text">
          <div class="image">
            <img src="/gallery/art-image-2.jpg" alt="image" />
          </div>

          <div class="text">
            <h2>Glamorous Nail Retreat</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
              accusamus architecto, at officiis dolores quidem voluptates ipsa
              consequuntur.
            </p>
          </div>
        </div>
        <div class="image-text">
          <div class="image">
            <img src="/gallery/art-image-4.jpg" alt="image" />
          </div>

          <div class="text">
            <h2>Aqua-Therapy Haven</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
              accusamus architecto, at officiis dolores quidem voluptates ipsa
              consequuntur.
            </p>
          </div>
        </div>
      </div>

      <!-- service-item lower -->
      <div
        class="service-item"
        :style="{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px',
        }">
        <div class="image-text" :style="{ flexDirection: 'row', gap: '20px' }">
          <div class="image" :style="{ width: '300px', height: '200px' }">
            <img src="/gallery/art-image-2.jpg" alt="image" />
          </div>

          <div class="text">
            <h2>Glamorous Nail Retreat</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
              accusamus architecto, at officiis dolores quidem voluptates ipsa
              consequuntur.
            </p>
          </div>
        </div>

        <div class="image-text" :style="{ flexDirection: 'row', gap: '20px' }">
          <div class="image" :style="{ width: '300px', height: '200px' }">
            <img src="/gallery/art-image-4.jpg" alt="image" />
          </div>

          <div class="text">
            <h2>Aqua-Therapy Haven</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
              accusamus architecto, at officiis dolores quidem voluptates ipsa
              consequuntur.
            </p>
          </div>
        </div>

        <div class="image-text" :style="{ flexDirection: 'row', gap: '20px' }">
          <div class="image" :style="{ width: '300px', height: '200px' }">
            <img src="/gallery/art-image-4.jpg" alt="image" />
          </div>

          <div class="text">
            <h2>Aqua-Therapy Haven</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
              accusamus architecto, at officiis dolores quidem voluptates ipsa
              consequuntur.
            </p>
          </div>
        </div>

        <div class="image-text" :style="{ flexDirection: 'row', gap: '20px' }">
          <div class="image" :style="{ width: '300px', height: '200px' }">
            <img src="/gallery/art-image-4.jpg" alt="image" />
          </div>

          <div class="text">
            <h2>Aqua-Therapy Haven</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
              accusamus architecto, at officiis dolores quidem voluptates ipsa
              consequuntur.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Headings from "../utility/Headings.vue";
import hero from "../utility/hero.vue";
</script>

<style scoped>
.range-container {
  margin-top: 2rem;
  background-color: var(--primary-button-background);
}

/* .service-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
} */

h2 {
  color: var(--text-secondary);
  margin: 10px 0;
}

p {
  color: #dbdbdb;
  line-height: 30px;
  font-size: 18px;
  margin-bottom: 10px;
}

.image-text {
  display: flex;
  flex-direction: column;
}

.image {
  height: 250px;
}

.container .service-item:nth-child(2).image {
  height: 100px;
}

img {
  border-radius: 8px;
}
</style>
