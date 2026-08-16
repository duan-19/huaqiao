<script setup>
import { ref } from 'vue'
import { Expand } from 'lucide-vue-next'
import Lightbox from './Lightbox.vue'

defineProps({
  images: { type: Array, default: () => [] },
  ariaLabel: { type: String, default: '实践照片画廊' },
  emptyText: { type: String, default: '照片资料整理中' },
})

const lightboxOpen = ref(false)
const selectedIndex = ref(0)

const openImage = (index) => {
  selectedIndex.value = index
  lightboxOpen.value = true
}
</script>

<template>
  <section class="gallery" :aria-label="ariaLabel">
    <ul v-if="images.length" class="gallery-grid">
      <li v-for="(image, index) in images" :key="image.id || image.src || index" class="gallery-item">
        <button
          class="gallery-trigger"
          type="button"
          :aria-label="`查看大图：${image.alt || image.title || `第${index + 1}张照片`}`"
          @click="openImage(index)"
        >
          <img
            :src="image.thumb || image.src"
            :alt="image.alt || image.title || '实践活动照片'"
            loading="lazy"
          />
          <span class="gallery-overlay" aria-hidden="true"><Expand :size="20" /></span>
          <span v-if="image.title || image.date || image.location" class="gallery-caption">
            <strong v-if="image.title">{{ image.title }}</strong>
            <small v-if="image.date || image.location">
              {{ [image.date, image.location].filter(Boolean).join(' · ') }}
            </small>
          </span>
        </button>
      </li>
    </ul>

    <div v-else class="gallery-empty" role="status">
      <span>PHOTO ARCHIVE</span>
      <p>{{ emptyText }}</p>
    </div>

    <Lightbox
      v-model="lightboxOpen"
      :images="images"
      :start-index="selectedIndex"
      @change="selectedIndex = $event"
    />
  </section>
</template>

<style scoped>
.gallery-grid {
  columns: 3 280px;
  column-gap: 18px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.gallery-item {
  break-inside: avoid;
  margin-bottom: 18px;
}
.gallery-trigger {
  position: relative;
  display: block;
  width: 100%;
  overflow: hidden;
  padding: 0;
  color: white;
  background: #dbc6bd;
  border: 0;
  border-radius: var(--radius-medium);
  box-shadow: var(--shadow-soft);
  text-align: left;
}
.gallery-trigger::after {
  content: '';
  position: absolute;
  inset: 42% 0 0;
  background: linear-gradient(transparent, rgba(31, 20, 18, .74));
  pointer-events: none;
}
.gallery-trigger img {
  width: 100%;
  min-height: 220px;
  max-height: 430px;
  object-fit: cover;
  transition: transform .4s ease, filter .4s ease;
}
.gallery-trigger:hover img,
.gallery-trigger:focus-visible img { transform: scale(1.035); filter: saturate(1.05); }
.gallery-trigger:focus-visible {
  outline: 3px solid var(--color-primary-light);
  outline-offset: 4px;
}
.gallery-overlay {
  position: absolute;
  z-index: 2;
  top: 16px;
  right: 16px;
  display: grid;
  place-content: center;
  width: 38px;
  height: 38px;
  background: rgba(42, 28, 25, .5);
  border: 1px solid rgba(255, 255, 255, .35);
  border-radius: 50%;
  opacity: 0;
  transform: translateY(-5px);
  backdrop-filter: blur(8px);
  transition: opacity .25s ease, transform .25s ease;
}
.gallery-trigger:hover .gallery-overlay,
.gallery-trigger:focus-visible .gallery-overlay { opacity: 1; transform: translateY(0); }
.gallery-caption {
  position: absolute;
  z-index: 2;
  right: 20px;
  bottom: 18px;
  left: 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.gallery-caption strong { font-size: 16px; line-height: 1.45; }
.gallery-caption small { color: rgba(255, 255, 255, .72); font-size: 11px; }
.gallery-empty {
  display: grid;
  place-content: center;
  min-height: 260px;
  padding: 32px;
  color: var(--color-text-light);
  background: var(--color-paper-light);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-large);
  text-align: center;
}
.gallery-empty span { color: var(--color-primary); font-size: 11px; font-weight: 700; letter-spacing: .2em; }
.gallery-empty p { margin: 13px 0 0; }

@media (max-width: 768px) {
  .gallery-grid { columns: 2 220px; column-gap: 12px; }
  .gallery-item { margin-bottom: 12px; }
  .gallery-trigger { border-radius: var(--radius-small); }
  .gallery-trigger img { min-height: 170px; max-height: 340px; }
  .gallery-caption { right: 14px; bottom: 13px; left: 14px; }
}

@media (max-width: 520px) {
  .gallery-grid { columns: 1; }
  .gallery-trigger img { min-height: 220px; max-height: 420px; }
}
</style>
