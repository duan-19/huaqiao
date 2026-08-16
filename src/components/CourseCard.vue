<script setup>
import { ArrowUpRight } from 'lucide-vue-next'
defineProps({ course: { type: Object, required: true } })
</script>

<template>
  <article class="course-card">
    <RouterLink :to="`/classes/${course.id}`" class="course-image" :aria-label="`走进${course.title}`">
      <img :src="course.image" :alt="`${course.title}课程封面`" loading="lazy" />
      <span class="course-number">{{ course.number }}</span>
      <span v-if="course.placeholder" class="media-badge">示意图 · 待替换</span>
    </RouterLink>
    <div class="course-body">
      <div class="tags"><span v-for="tag in course.tags" :key="tag">{{ tag }}</span></div>
      <h3 class="serif">{{ course.title }}</h3>
      <p class="subtitle">{{ course.subtitle }}</p>
      <p class="description">{{ course.description }}</p>
      <RouterLink class="course-link" :to="`/classes/${course.id}`">走进第{{ ['一','二','三'][Number(course.number)-1] }}课 <ArrowUpRight :size="17" /></RouterLink>
    </div>
  </article>
</template>

<style scoped>
.course-card { overflow: hidden; background: var(--color-white); border-radius: var(--radius-large); box-shadow: var(--shadow-soft); transition: transform .3s ease, box-shadow .3s ease; }
.course-card:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(66,37,30,.15); }
.course-image { position: relative; display: block; height: 300px; overflow: hidden; background: #d6b2a7; }
.course-image::after { content: ''; position: absolute; inset: 35% 0 0; background: linear-gradient(transparent, rgba(28,18,15,.48)); }
.course-image img { width: 100%; height: 100%; object-fit: cover; transition: transform .45s ease; }
.course-card:hover .course-image img { transform: scale(1.04); }
.course-number { position: absolute; z-index: 1; left: 24px; bottom: 20px; color: white; font-family: var(--font-serif); font-size: 44px; line-height: 1; }
.media-badge { position: absolute; z-index: 2; top: 16px; right: 16px; padding: 6px 10px; color: white; background: rgba(30,24,22,.62); border-radius: 999px; backdrop-filter: blur(8px); font-size: 11px; }
.course-body { padding: 28px; }
.tags { display: flex; gap: 7px; }
.tags span { padding: 5px 9px; color: var(--color-primary); background: #f6e9e5; border-radius: 999px; font-size: 12px; }
h3 { margin: 20px 0 6px; font-size: 30px; }
.subtitle { color: var(--color-primary); font-weight: 700; }
.description { min-height: 88px; color: var(--color-text-secondary); line-height: 1.75; }
.course-link { display: inline-flex; align-items: center; gap: 6px; color: var(--color-primary); font-weight: 700; }
@media (max-width: 992px) { .course-image { height: 250px; } }
</style>
