<script setup>
import { computed } from 'vue'
import { ExternalLink, Film, MapPin } from 'lucide-vue-next'

const props = defineProps({
  video: { type: Object, required: true },
})

const hasLocalVideo = computed(() => Boolean(props.video.src && props.video.src !== '#'))
const externalUrl = computed(() => props.video.externalUrl || props.video.url || '')
const hasExternalVideo = computed(() => Boolean(externalUrl.value && externalUrl.value !== '#'))
</script>

<template>
  <article class="video-card">
    <div class="video-media">
      <video
        v-if="hasLocalVideo"
        controls
        playsinline
        preload="metadata"
        :poster="video.poster || undefined"
        :aria-label="video.title || '实践视频'"
      >
        <source :src="video.src" :type="video.type || 'video/mp4'" />
        <track
          v-if="video.captionUrl"
          kind="captions"
          :src="video.captionUrl"
          :srclang="video.captionLanguage || 'zh-CN'"
          :label="video.captionLabel || '中文字幕'"
          default
        />
        当前浏览器不支持 HTML5 视频播放。
      </video>

      <div v-else class="video-placeholder" :style="video.poster ? { backgroundImage: `url(${video.poster})` } : null">
        <span class="video-placeholder-shade"></span>
        <Film :size="46" stroke-width="1.25" />
        <p>{{ hasExternalVideo ? '该视频将在外部平台播放' : '视频资料整理中' }}</p>
      </div>
    </div>

    <div class="video-content">
      <p v-if="video.date || video.location" class="video-meta">
        <span v-if="video.date">{{ video.date }}</span>
        <span v-if="video.location"><MapPin :size="13" />{{ video.location }}</span>
      </p>
      <h3>{{ video.title || '实践视频' }}</h3>
      <p v-if="video.caption || video.description" class="video-caption">
        {{ video.caption || video.description }}
      </p>
      <div class="video-footer">
        <span v-if="video.source" class="video-source">来源：{{ video.source }}</span>
        <a v-if="hasExternalVideo" :href="externalUrl" target="_blank" rel="noopener noreferrer">
          前往观看 <ExternalLink :size="16" />
        </a>
      </div>
    </div>
  </article>
</template>

<style scoped>
.video-card {
  overflow: hidden;
  background: white;
  border: 1px solid rgba(120, 90, 70, .1);
  border-radius: var(--radius-large);
  box-shadow: var(--shadow-soft);
  transition: transform .28s ease, box-shadow .28s ease;
}
.video-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-card); }
.video-media { position: relative; aspect-ratio: 16 / 9; overflow: hidden; color: white; background: #2d2321; }
.video-media video { width: 100%; height: 100%; object-fit: cover; background: #181312; }
.video-placeholder {
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  gap: 10px;
  background-color: #64302e;
  background-size: cover;
  background-position: center;
  text-align: center;
}
.video-placeholder-shade { position: absolute; inset: 0; background: linear-gradient(rgba(70, 28, 27, .45), rgba(25, 18, 17, .72)); }
.video-placeholder svg,
.video-placeholder p { position: relative; z-index: 1; margin-inline: auto; }
.video-placeholder p { margin-block: 0; color: rgba(255, 255, 255, .76); font-size: 13px; }
.video-content { padding: 24px 25px 25px; }
.video-meta { display: flex; flex-wrap: wrap; gap: 8px 16px; margin: 0 0 12px; color: var(--color-text-light); font-size: 12px; }
.video-meta span { display: inline-flex; align-items: center; gap: 4px; }
.video-content h3 { margin: 0; font-family: var(--font-serif); font-size: 22px; line-height: 1.45; }
.video-caption { margin: 12px 0 0; color: var(--color-text-secondary); line-height: 1.75; }
.video-footer { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-top: 19px; padding-top: 17px; border-top: 1px solid var(--color-border); }
.video-source { color: var(--color-text-light); font-size: 11px; }
.video-footer a { display: inline-flex; align-items: center; gap: 6px; color: var(--color-primary); font-size: 13px; font-weight: 700; }
.video-footer a:hover { color: var(--color-primary-dark); }

@media (max-width: 576px) {
  .video-content { padding: 20px; }
  .video-footer { align-items: flex-start; flex-direction: column; }
}
</style>
