<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  MapPin,
  ShieldCheck,
  X,
  ZoomIn,
} from 'lucide-vue-next'

const props = defineProps({
  images: {
    type: Array,
    default: () => [],
  },
})

const activeIndex = ref(-1)
const closeButton = ref(null)
let opener = null
let previousBodyOverflow = ''

const activeImage = computed(() => props.images[activeIndex.value] || null)
const hasMultipleImages = computed(() => props.images.length > 1)

function openLightbox(index, event) {
  opener = event?.currentTarget || null
  activeIndex.value = index
  previousBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  nextTick(() => closeButton.value?.focus())
}

function closeLightbox() {
  if (activeIndex.value < 0) return
  activeIndex.value = -1
  document.body.style.overflow = previousBodyOverflow
  nextTick(() => opener?.focus())
}

function showPrevious() {
  if (!props.images.length) return
  activeIndex.value = (activeIndex.value - 1 + props.images.length) % props.images.length
}

function showNext() {
  if (!props.images.length) return
  activeIndex.value = (activeIndex.value + 1) % props.images.length
}

function handleKeydown(event) {
  if (!activeImage.value) return
  if (event.key === 'Escape') closeLightbox()
  if (event.key === 'ArrowLeft') showPrevious()
  if (event.key === 'ArrowRight') showNext()
}

watch(
  () => props.images,
  (images) => {
    if (activeIndex.value >= images.length) closeLightbox()
  },
)

onMounted(() => window.addEventListener('keydown', handleKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (activeIndex.value >= 0) document.body.style.overflow = previousBodyOverflow
})
</script>

<template>
  <div v-if="images.length" class="practice-gallery">
    <button
      v-for="(image, index) in images"
      :key="image.id"
      type="button"
      class="gallery-card"
      :class="`gallery-card-${index % 5}`"
      :aria-label="`查看大图：${image.title}`"
      @click="openLightbox(index, $event)"
    >
      <span class="gallery-image">
        <img
          :src="image.thumb || image.src"
          :alt="image.alt"
          loading="lazy"
          decoding="async"
        />
        <span class="gallery-overlay" aria-hidden="true">
          <ZoomIn :size="23" />
        </span>
        <span class="media-label">{{ image.mediaType }}</span>
      </span>

      <span class="gallery-caption">
        <strong>{{ image.title }}</strong>
        <span v-if="image.location"><MapPin :size="13" />{{ image.location }}</span>
      </span>
    </button>
  </div>

  <div v-else class="gallery-empty" role="status">
    <ImageIcon :size="31" stroke-width="1.4" />
    <strong>该分类的影像正在整理中</strong>
    <span>核验完成后将在这里补充。</span>
  </div>

  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="activeImage"
        class="lightbox"
        role="dialog"
        aria-modal="true"
        :aria-label="`${activeImage.title} 图片预览`"
        @click.self="closeLightbox"
      >
        <button
          ref="closeButton"
          type="button"
          class="lightbox-close"
          aria-label="关闭图片预览"
          @click="closeLightbox"
        >
          <X :size="25" />
        </button>

        <button
          v-if="hasMultipleImages"
          type="button"
          class="lightbox-nav lightbox-prev"
          aria-label="上一张"
          @click="showPrevious"
        >
          <ChevronLeft :size="30" />
        </button>

        <div class="lightbox-panel" @click.stop>
          <div class="lightbox-media">
            <img :src="activeImage.src" :alt="activeImage.alt" />
          </div>

          <div class="lightbox-copy">
            <div class="lightbox-meta-top">
              <span>{{ activeImage.mediaType }}</span>
              <span>{{ activeIndex + 1 }} / {{ images.length }}</span>
            </div>
            <h3>{{ activeImage.title }}</h3>

            <div v-if="activeImage.date || activeImage.location" class="lightbox-facts">
              <span v-if="activeImage.date"><CalendarDays :size="15" />{{ activeImage.date }}</span>
              <span v-if="activeImage.location"><MapPin :size="15" />{{ activeImage.location }}</span>
            </div>

            <p>{{ activeImage.description }}</p>

            <div class="rights-note">
              <ShieldCheck :size="17" />
              <span>{{ activeImage.rightsNote }}</span>
            </div>
          </div>
        </div>

        <button
          v-if="hasMultipleImages"
          type="button"
          class="lightbox-nav lightbox-next"
          aria-label="下一张"
          @click="showNext"
        >
          <ChevronRight :size="30" />
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.practice-gallery {
  columns: 3 280px;
  column-gap: 22px;
}

.gallery-card {
  display: inline-block;
  width: 100%;
  margin: 0 0 22px;
  padding: 0;
  overflow: hidden;
  color: inherit;
  text-align: left;
  background: var(--color-white);
  border: 1px solid rgba(124, 84, 67, .12);
  border-radius: var(--radius-medium);
  box-shadow: 0 9px 30px rgba(45, 35, 25, .07);
  break-inside: avoid;
  cursor: zoom-in;
  transition: transform .28s ease, box-shadow .28s ease, border-color .28s ease;
}

.gallery-card:hover {
  transform: translateY(-5px);
  border-color: rgba(157, 63, 56, .24);
  box-shadow: 0 17px 38px rgba(70, 42, 34, .13);
}

.gallery-card:focus-visible {
  outline: 3px solid rgba(157, 63, 56, .28);
  outline-offset: 4px;
}

.gallery-image {
  position: relative;
  display: block;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background: #e6d9cd;
}

.gallery-card-1 .gallery-image,
.gallery-card-4 .gallery-image { aspect-ratio: 4 / 5; }
.gallery-card-2 .gallery-image { aspect-ratio: 16 / 10; }

.gallery-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .5s ease;
}

.gallery-card:hover img { transform: scale(1.035); }

.gallery-overlay {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: white;
  background: rgba(91, 39, 35, .28);
  opacity: 0;
  transition: opacity .28s ease;
}

.gallery-card:hover .gallery-overlay,
.gallery-card:focus-visible .gallery-overlay { opacity: 1; }

.media-label {
  position: absolute;
  top: 14px;
  left: 14px;
  padding: 6px 10px;
  color: white;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .04em;
  background: rgba(76, 35, 32, .72);
  border: 1px solid rgba(255, 255, 255, .22);
  border-radius: 999px;
  backdrop-filter: blur(9px);
}

.gallery-caption {
  display: grid;
  gap: 9px;
  padding: 17px 18px 18px;
}

.gallery-caption strong {
  font-family: var(--font-serif);
  font-size: 17px;
  line-height: 1.45;
}

.gallery-caption > span {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--color-text-light);
  font-size: 12px;
}

.gallery-empty {
  display: grid;
  justify-items: center;
  gap: 9px;
  padding: 72px 24px;
  color: var(--color-text-light);
  text-align: center;
  background: rgba(255, 255, 255, .64);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-large);
}

.gallery-empty strong { color: var(--color-text-secondary); }
.gallery-empty span { font-size: 13px; }

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 38px 84px;
  background: rgba(22, 17, 16, .94);
  backdrop-filter: blur(14px);
}

.lightbox-panel {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(300px, .65fr);
  width: min(1180px, 100%);
  max-height: calc(100vh - 76px);
  overflow: hidden;
  background: #211b1a;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 20px;
  box-shadow: 0 28px 90px rgba(0, 0, 0, .48);
}

.lightbox-media {
  display: grid;
  place-items: center;
  min-height: 420px;
  overflow: hidden;
  background: #100d0c;
}

.lightbox-media img {
  display: block;
  width: 100%;
  height: 100%;
  max-height: calc(100vh - 76px);
  object-fit: contain;
}

.lightbox-copy {
  overflow-y: auto;
  padding: 34px 32px;
  color: white;
  border-left: 1px solid rgba(255, 255, 255, .1);
}

.lightbox-meta-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  color: #e2a89b;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .09em;
}

.lightbox-copy h3 {
  margin: 18px 0 16px;
  font-family: var(--font-serif);
  font-size: clamp(24px, 3vw, 34px);
  line-height: 1.4;
}

.lightbox-facts {
  display: grid;
  gap: 8px;
  padding: 16px 0;
  color: rgba(255, 255, 255, .62);
  border-block: 1px solid rgba(255, 255, 255, .1);
  font-size: 12px;
}

.lightbox-facts span,
.rights-note {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.lightbox-facts svg,
.rights-note svg { flex: none; }

.lightbox-copy > p {
  margin: 20px 0;
  color: rgba(255, 255, 255, .72);
  font-size: 14px;
  line-height: 1.85;
}

.rights-note {
  padding: 14px 15px;
  color: #efd0c8;
  background: rgba(157, 63, 56, .16);
  border: 1px solid rgba(226, 153, 137, .2);
  border-radius: 12px;
  font-size: 11px;
  line-height: 1.7;
}

.lightbox-close,
.lightbox-nav {
  position: fixed;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  padding: 0;
  color: white;
  background: rgba(255, 255, 255, .09);
  border: 1px solid rgba(255, 255, 255, .16);
  border-radius: 50%;
  cursor: pointer;
  transition: background .2s ease, transform .2s ease;
}

.lightbox-close:hover,
.lightbox-nav:hover { background: rgba(157, 63, 56, .68); }
.lightbox-close:focus-visible,
.lightbox-nav:focus-visible { outline: 3px solid #e3a396; outline-offset: 3px; }
.lightbox-close { top: 20px; right: 22px; }
.lightbox-prev { top: 50%; left: 20px; transform: translateY(-50%); }
.lightbox-next { top: 50%; right: 20px; transform: translateY(-50%); }
.lightbox-prev:hover,
.lightbox-next:hover { transform: translateY(-50%) scale(1.04); }

.lightbox-enter-active,
.lightbox-leave-active { transition: opacity .22s ease; }
.lightbox-enter-active .lightbox-panel,
.lightbox-leave-active .lightbox-panel { transition: transform .22s ease, opacity .22s ease; }
.lightbox-enter-from,
.lightbox-leave-to { opacity: 0; }
.lightbox-enter-from .lightbox-panel,
.lightbox-leave-to .lightbox-panel { opacity: 0; transform: translateY(12px) scale(.985); }

@media (max-width: 900px) {
  .lightbox { padding: 64px 24px 24px; }
  .lightbox-panel {
    grid-template-columns: 1fr;
    max-height: calc(100vh - 88px);
    overflow-y: auto;
  }
  .lightbox-media { min-height: 0; max-height: 58vh; }
  .lightbox-media img { max-height: 58vh; }
  .lightbox-copy { overflow: visible; border-top: 1px solid rgba(255, 255, 255, .1); border-left: 0; }
  .lightbox-nav { top: calc(29vh + 32px); }
  .lightbox-prev { left: 12px; }
  .lightbox-next { right: 12px; }
}

@media (max-width: 576px) {
  .practice-gallery { columns: 1; }
  .gallery-card { margin-bottom: 16px; }
  .gallery-card-1 .gallery-image,
  .gallery-card-4 .gallery-image { aspect-ratio: 4 / 3; }
  .lightbox { padding: 58px 10px 10px; }
  .lightbox-panel { max-height: calc(100vh - 68px); border-radius: 14px; }
  .lightbox-copy { padding: 24px 20px 28px; }
  .lightbox-close { top: 9px; right: 10px; width: 42px; height: 42px; }
  .lightbox-nav { width: 42px; height: 42px; }
  .lightbox-prev { left: 5px; }
  .lightbox-next { right: 5px; }
}

@media (prefers-reduced-motion: reduce) {
  .gallery-card,
  .gallery-image img,
  .lightbox-enter-active,
  .lightbox-leave-active,
  .lightbox-enter-active .lightbox-panel,
  .lightbox-leave-active .lightbox-panel { transition: none; }
}
</style>
