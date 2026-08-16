<script setup>
import { ArrowUpRight } from 'lucide-vue-next'
defineProps({ article: { type: Object, required: true } })
</script>
<template>
  <article class="article-card">
    <div class="article-cover"><img :src="article.cover" :alt="`${article.title}封面`" loading="lazy"><span v-if="article.placeholder">待替换真实封面</span></div>
    <div class="article-content">
      <p class="meta">{{ article.date }} · {{ article.source }}</p>
      <h3>{{ article.title }}</h3>
      <p class="summary">{{ article.summary }}</p>
      <a v-if="article.url !== '#'" :href="article.url" target="_blank" rel="noopener noreferrer">阅读全文 <ArrowUpRight :size="17" /></a>
      <span v-else class="disabled-link">发布链接待补充</span>
    </div>
  </article>
</template>
<style scoped>
.article-card { display: grid; grid-template-columns: 42% 1fr; overflow: hidden; min-height: 250px; background: white; border-radius: var(--radius-large); box-shadow: var(--shadow-soft); }
.article-cover { position: relative; overflow: hidden; background: #dbc2ba; }
.article-cover img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s ease; }
.article-card:hover img { transform: scale(1.04); }
.article-cover span { position: absolute; left: 14px; bottom: 14px; padding: 5px 9px; color: white; background: rgba(0,0,0,.48); border-radius: 999px; font-size: 11px; }
.article-content { padding: 30px; }
.meta { margin-bottom: 12px; color: var(--color-text-light); font-size: 13px; }
h3 { margin-bottom: 14px; font-size: 21px; }
.summary { color: var(--color-text-secondary); line-height: 1.7; }
a, .disabled-link { display: inline-flex; align-items: center; gap: 5px; color: var(--color-primary); font-size: 14px; font-weight: 700; }
.disabled-link { color: var(--color-text-light); }
@media (max-width: 650px) { .article-card { grid-template-columns: 1fr; } .article-cover { height: 210px; } }
</style>
