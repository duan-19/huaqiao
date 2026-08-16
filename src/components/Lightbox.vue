<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { ChevronLeft, ChevronRight, X } from 'lucide-vue-next'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  images: { type: Array, default: () => [] },
  startIndex: { type: Number, default: 0 },
})

const emit = defineEmits(['update:modelValue', 'change'])

const activeIndex = ref(0)
const dialog = ref(null)
const closeButton = ref(null)
let previousActiveElement = null
let previousBodyOverflow = ''

const normalizedIndex = (index) => {
  if (!props.images.length) return 0
  return ((index % props.images.length) + props.images.length) % props.images.length
}

const currentImage = computed(() => props.images[activeIndex.value] || {})
const currentSource = computed(() => currentImage.value.src || currentImage.value.thumb || '')
const imageLabel = computed(() => currentImage.value.alt || currentImage.value.title || '实践活动照片')
const hasMultiple = computed(() => props.images.length > 1)

const setIndex = (index) => {
  activeIndex.value = normalizedIndex(index)
  emit('change', activeIndex.value)
}

const previous = () => setIndex(activeIndex.value - 1)
const next = () => setIndex(activeIndex.value + 1)

const close = () => {
  emit('update:modelValue', false)
}

const trapFocus = (event) => {
  const focusable = dialog.value?.querySelectorAll(
    'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
  )
  if (!focusable?.length) return

  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

const onKeydown = (event) => {
  if (!props.modelValue) return
  if (event.key === 'Escape') {
    event.preventDefault()
    close()
  } else if (event.key === 'ArrowLeft' && hasMultiple.value) {
    event.preventDefault()
    previous()
  } else if (event.key === 'ArrowRight' && hasMultiple.value) {
    event.preventDefault()
    next()
  } else if (event.key === 'Tab') {
    trapFocus(event)
  }
}

watch(
  () => props.startIndex,
  (index) => setIndex(index),
  { immediate: true },
)

watch(
  () => props.images.length,
  () => setIndex(activeIndex.value),
)

watch(
  () => props.modelValue,
  async (isOpen) => {
    if (isOpen) {
      previousActiveElement = document.activeElement
      previousBodyOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      setIndex(props.startIndex)
      await nextTick()
      closeButton.value?.focus()
    } else {
      document.body.style.overflow = previousBodyOverflow
      await nextTick()
      previousActiveElement?.focus?.()
    }
  },
)

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = previousBodyOverflow
})
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox-fade">
      <div
        v-if="modelValue && images.length"
        ref="dialog"
        class="lightbox"
        role="dialog"
        aria-modal="true"
        :aria-label="`图片预览：${imageLabel}`"
        @click.self="close"
      >
        <button ref="closeButton" class="lightbox-close" type="button" aria-label="关闭图片预览" @click="close">
          <X :size="24" />
        </button>

        <button v-if="hasMultiple" class="lightbox-nav lightbox-prev" type="button" aria-label="查看上一张图片" @click="previous">
          <ChevronLeft :size="30" />
        </button>

        <figure class="lightbox-content">
          <img :src="currentSource" :alt="imageLabel" />
          <figcaption>
            <div class="caption-heading">
              <div>
                <h2>{{ currentImage.title || imageLabel }}</h2>
                <p v-if="currentImage.date || currentImage.location" class="caption-meta">
                  <span v-if="currentImage.date">{{ currentImage.date }}</span>
                  <span v-if="currentImage.location">{{ currentImage.location }}</span>
                </p>
              </div>
              <span class="caption-count" aria-live="polite">{{ activeIndex + 1 }} / {{ images.length }}</span>
            </div>
            <p v-if="currentImage.description" class="caption-description">{{ currentImage.description }}</p>
          </figcaption>
        </figure>

        <button v-if="hasMultiple" class="lightbox-nav lightbox-next" type="button" aria-label="查看下一张图片" @click="next">
          <ChevronRight :size="30" />
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lightbox {
  position: fixed;
  z-index: 1000;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 70px 88px 32px;
  color: white;
  background: rgba(24, 17, 16, .94);
  backdrop-filter: blur(12px);
}
.lightbox-content {
  display: flex;
  flex-direction: column;
  width: min(1120px, 100%);
  max-height: calc(100vh - 102px);
  margin: 0;
}
.lightbox-content img {
  width: 100%;
  min-height: 0;
  max-height: calc(100vh - 255px);
  object-fit: contain;
  border-radius: var(--radius-small) var(--radius-small) 0 0;
  background: rgba(255, 255, 255, .04);
}
.lightbox-content figcaption {
  padding: 20px 24px;
  color: var(--color-text);
  background: var(--color-paper-light);
  border-radius: 0 0 var(--radius-small) var(--radius-small);
}
.caption-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
}
.caption-heading h2 {
  margin: 0;
  font-family: var(--font-serif);
  font-size: 21px;
}
.caption-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 18px;
  margin: 8px 0 0;
  color: var(--color-text-light);
  font-size: 12px;
}
.caption-count {
  flex: none;
  color: var(--color-primary);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .08em;
}
.caption-description {
  margin: 13px 0 0;
  color: var(--color-text-secondary);
  font-size: 14px;
  line-height: 1.7;
}
.lightbox-close,
.lightbox-nav {
  position: absolute;
  display: grid;
  place-content: center;
  color: white;
  background: rgba(255, 255, 255, .1);
  border: 1px solid rgba(255, 255, 255, .18);
  border-radius: 50%;
  transition: background .2s ease, transform .2s ease;
}
.lightbox-close:hover,
.lightbox-nav:hover,
.lightbox-close:focus-visible,
.lightbox-nav:focus-visible {
  background: var(--color-primary);
  outline: 2px solid white;
  outline-offset: 3px;
}
.lightbox-close {
  top: 20px;
  right: 24px;
  width: 44px;
  height: 44px;
}
.lightbox-nav {
  top: 50%;
  width: 50px;
  height: 50px;
  transform: translateY(-50%);
}
.lightbox-nav:hover { transform: translateY(-50%) scale(1.05); }
.lightbox-prev { left: 22px; }
.lightbox-next { right: 22px; }
.lightbox-fade-enter-active,
.lightbox-fade-leave-active { transition: opacity .25s ease; }
.lightbox-fade-enter-active .lightbox-content,
.lightbox-fade-leave-active .lightbox-content { transition: transform .25s ease; }
.lightbox-fade-enter-from,
.lightbox-fade-leave-to { opacity: 0; }
.lightbox-fade-enter-from .lightbox-content,
.lightbox-fade-leave-to .lightbox-content { transform: translateY(12px) scale(.985); }

@media (max-width: 768px) {
  .lightbox { padding: 68px 18px 20px; }
  .lightbox-content { max-height: calc(100vh - 88px); }
  .lightbox-content img { max-height: calc(100vh - 275px); }
  .lightbox-content figcaption { padding: 17px 18px; }
  .caption-heading h2 { font-size: 18px; }
  .lightbox-nav { top: calc(50% - 50px); width: 42px; height: 42px; background: rgba(30, 20, 18, .62); }
  .lightbox-prev { left: 8px; }
  .lightbox-next { right: 8px; }
  .lightbox-close { top: 14px; right: 14px; }
}

@media (prefers-reduced-motion: reduce) {
  .lightbox-fade-enter-active,
  .lightbox-fade-leave-active,
  .lightbox-fade-enter-active .lightbox-content,
  .lightbox-fade-leave-active .lightbox-content { transition-duration: .01ms; }
}
</style>
