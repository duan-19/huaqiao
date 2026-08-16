<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Download, ExternalLink, FileText, Presentation } from 'lucide-vue-next'

const props = defineProps({
  title: { type: String, default: '数字课件' },
  pdfUrl: { type: String, default: '' },
  pptUrl: { type: String, default: '' },
  cover: { type: String, default: '' },
})

const hasPdf = computed(() => Boolean(props.pdfUrl && props.pdfUrl !== '#'))
const hasPpt = computed(() => Boolean(props.pptUrl && props.pptUrl !== '#'))
const isMobile = ref(typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches)
let mediaQuery

const updateViewport = (event) => {
  isMobile.value = event.matches
}

onMounted(() => {
  mediaQuery = window.matchMedia('(max-width: 768px)')
  isMobile.value = mediaQuery.matches
  if (mediaQuery.addEventListener) mediaQuery.addEventListener('change', updateViewport)
  else mediaQuery.addListener?.(updateViewport)
})

onUnmounted(() => {
  if (mediaQuery?.removeEventListener) mediaQuery.removeEventListener('change', updateViewport)
  else mediaQuery?.removeListener?.(updateViewport)
})
</script>

<template>
  <section class="pdf-viewer" :aria-label="`${title}课件预览`">
    <header class="viewer-header">
      <div v-if="cover" class="viewer-cover">
        <img :src="cover" :alt="`${title}课件封面`" loading="lazy" />
      </div>
      <div class="viewer-heading">
        <span class="viewer-eyebrow"><Presentation :size="16" /> DIGITAL COURSEWARE</span>
        <h2 class="serif">{{ title }}</h2>
        <p>网页主要预览 PDF，原始 PPT 课件可供公益教学使用与下载。</p>
        <div class="viewer-actions">
          <a v-if="hasPdf" class="btn btn-primary" :href="pdfUrl" target="_blank" rel="noopener noreferrer">
            打开 PDF 预览 <ExternalLink :size="17" />
          </a>
          <span v-else class="viewer-disabled"><FileText :size="17" /> PDF 资料待上传</span>
          <a v-if="hasPpt" class="btn viewer-download" :href="pptUrl" download>
            下载 PPT 课件 <Download :size="17" />
          </a>
          <span v-else class="viewer-disabled"><Download :size="17" /> PPT 资料待上传</span>
        </div>
      </div>
    </header>

    <div v-if="hasPdf && !isMobile" class="viewer-frame">
      <iframe :src="pdfUrl" :title="`${title} PDF 在线预览`" loading="lazy"></iframe>
    </div>

    <div v-else-if="hasPdf" class="viewer-mobile-note">
      <FileText :size="38" stroke-width="1.4" />
      <div>
        <strong>移动端建议打开 PDF 阅读</strong>
        <p>为保证字体和页面比例清晰，请点击上方“打开 PDF 预览”。</p>
      </div>
    </div>

    <div v-else class="viewer-empty">
      <FileText :size="42" stroke-width="1.3" />
      <p>课件正在整理，PDF 上传后即可在这里在线浏览。</p>
    </div>
  </section>
</template>

<style scoped>
.pdf-viewer {
  overflow: hidden;
  background: white;
  border: 1px solid rgba(120, 90, 70, .1);
  border-radius: var(--radius-large);
  box-shadow: var(--shadow-card);
}
.viewer-header {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 30px;
  padding: 30px;
  background: linear-gradient(120deg, var(--color-paper-light), #f2dfd8);
  border-bottom: 1px solid var(--color-border);
}
.viewer-cover {
  width: 150px;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: #d9c0b7;
  border-radius: var(--radius-small);
  box-shadow: 0 9px 24px rgba(70, 40, 32, .14);
}
.viewer-cover img { width: 100%; height: 100%; object-fit: cover; }
.viewer-heading { align-self: center; }
.viewer-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--color-primary);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .14em;
}
.viewer-heading h2 { margin: 10px 0 7px; font-size: clamp(25px, 3vw, 34px); }
.viewer-heading > p { margin: 0; color: var(--color-text-secondary); line-height: 1.7; }
.viewer-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 11px; margin-top: 21px; }
.viewer-actions .btn { min-height: 44px; padding-inline: 18px; font-size: 13px; }
.viewer-download { color: var(--color-primary); background: white; border-color: rgba(157, 63, 56, .28); }
.viewer-download:hover { background: #fff8f4; box-shadow: 0 8px 18px rgba(101, 32, 32, .1); }
.viewer-disabled {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-height: 44px;
  padding: 0 15px;
  color: var(--color-text-light);
  background: rgba(255, 255, 255, .6);
  border: 1px dashed var(--color-border);
  border-radius: 999px;
  font-size: 12px;
}
.viewer-frame { height: min(76vh, 820px); min-height: 580px; padding: 18px; background: #e8e2db; }
.viewer-frame iframe { width: 100%; height: 100%; background: white; border: 0; border-radius: var(--radius-small); }
.viewer-mobile-note,
.viewer-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  min-height: 180px;
  padding: 30px;
  color: var(--color-primary);
  background: var(--color-paper);
}
.viewer-mobile-note strong { color: var(--color-text); }
.viewer-mobile-note p,
.viewer-empty p { margin: 6px 0 0; color: var(--color-text-secondary); line-height: 1.7; }
.viewer-empty { flex-direction: column; text-align: center; }
.viewer-empty p { max-width: 460px; }

@media (max-width: 768px) {
  .viewer-header { grid-template-columns: 1fr; gap: 20px; padding: 22px; }
  .viewer-cover { width: 100%; max-width: 280px; }
  .viewer-actions { align-items: stretch; flex-direction: column; }
  .viewer-actions .btn,
  .viewer-disabled { width: 100%; justify-content: center; }
  .viewer-mobile-note { justify-content: flex-start; }
}
</style>
