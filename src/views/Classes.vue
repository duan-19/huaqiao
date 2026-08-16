<script setup>
import { useHead } from '@vueuse/head'
import { ArrowRight, CalendarDays, Download, MapPin, Presentation, Users } from 'lucide-vue-next'
import PageHero from '../components/PageHero.vue'
import SectionTitle from '../components/SectionTitle.vue'
import { courses } from '../data/courses'

useHead({
  title: '三堂侨课｜青声传薪·数扬侨魂',
  meta: [{ name: 'description', content: '浏览烽火侨心、少年榜样、山海侨批三期社区青少年主题课程，在线查看并下载公益宣讲课件。' }],
})
</script>

<template>
  <div class="classes-page">
    <PageHero
      eyebrow="THREE YOUTH CLASSES"
      title="三堂侨课"
      subtitle="让华侨革命史从历史文本走近今天的少年。三次相遇，从烽火岁月、青年榜样讲到一纸山海家书。"
      background-image="/images/classes/covers/qiaopi-cover.webp"
    />

    <section class="section class-intro paper-texture">
      <div class="container">
        <SectionTitle
          eyebrow="COMMUNITY CLASSROOM"
          title="三次课堂，一条渐次深入的学习路径"
          subtitle="课程以提问开场，以故事建立理解，再用拼图、竹编画和五星灯等互动把抽象历史转化为少年可感、可记、可分享的体验。以下日期、地点与活动内容均整理自团队社区新闻稿和最终课件。"
        />
        <div class="route" aria-label="三堂侨课顺序">
          <template v-for="(course, index) in courses" :key="course.id">
            <RouterLink :to="`/classes/${course.id}`">
              <span>{{ course.number }}</span>
              <strong>{{ course.title }}</strong>
              <small>{{ course.date }}</small>
            </RouterLink>
            <i v-if="index < courses.length - 1" aria-hidden="true"></i>
          </template>
        </div>
      </div>
    </section>

    <section class="section course-list">
      <div class="container">
        <article v-for="(course, index) in courses" :key="course.id" class="course-showcase" :class="{ reverse: index % 2 }">
          <RouterLink :to="`/classes/${course.id}`" class="course-visual">
            <img :src="course.image" :alt="`${course.title}课程封面`" loading="lazy" />
            <span class="course-index serif">{{ course.number }}</span>
            <span class="slide-count">{{ course.pageCount }} 页原创课件</span>
          </RouterLink>
          <div class="course-copy">
            <span class="eyebrow">{{ course.kicker }}</span>
            <h2 class="serif">{{ course.title }}</h2>
            <p class="course-subtitle">{{ course.subtitle }}</p>
            <p class="course-question">“{{ course.question }}”</p>
            <p class="course-description">{{ course.description }}</p>
            <div class="course-meta">
              <span><CalendarDays :size="17" />{{ course.date }} {{ course.time }}</span>
              <span><MapPin :size="17" />{{ course.location }}</span>
              <span><Users :size="17" />{{ course.audience }}</span>
            </div>
            <div class="activity-tags">
              <span v-for="activity in course.activities" :key="activity">{{ activity }}</span>
            </div>
            <div class="course-actions">
              <RouterLink :to="`/classes/${course.id}`" class="btn btn-primary">走进这堂课 <ArrowRight :size="18" /></RouterLink>
              <a class="btn resource-button" :href="course.pdf" target="_blank" rel="noopener noreferrer"><Presentation :size="18" />在线预览</a>
              <a class="download-link" :href="course.ppt" :download="course.downloadName"><Download :size="17" />下载 PPT</a>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="next-step">
      <div class="container next-step-inner">
        <div>
          <span class="eyebrow">AFTER THE CLASSES</span>
          <h2 class="serif">三期宣讲之后，我们带着课堂中的问题走进场馆。</h2>
        </div>
        <RouterLink to="/visit" class="btn btn-light">继续寻访侨迹 <ArrowRight :size="18" /></RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.class-intro { background: var(--color-paper); }
.class-intro :deep(.section-title) { max-width: 820px; }
.route { display: flex; align-items: center; margin-top: 54px; }
.route a { display: grid; grid-template-columns: 48px 1fr; flex: 1; gap: 3px 14px; padding: 22px; background: rgba(255,255,255,.72); border: 1px solid var(--color-border); border-radius: var(--radius-medium); transition: .25s; }
.route a:hover { transform: translateY(-4px); background: white; box-shadow: var(--shadow-soft); }
.route a span { grid-row: span 2; align-self: center; color: var(--color-primary); font-family: var(--font-serif); font-size: 32px; }
.route a strong { font-size: 17px; }
.route a small { color: var(--color-text-light); }
.route i { flex: 0 0 55px; border-top: 1px dashed var(--color-primary-light); }
.course-list { background: var(--color-paper-light); }
.course-showcase { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, .95fr); align-items: center; gap: clamp(42px, 7vw, 96px); padding: 58px 0; border-bottom: 1px solid var(--color-border); }
.course-showcase:first-child { padding-top: 0; }
.course-showcase:last-child { padding-bottom: 0; border-bottom: 0; }
.course-showcase.reverse .course-visual { order: 2; }
.course-showcase.reverse .course-copy { order: 1; }
.course-visual { position: relative; overflow: hidden; aspect-ratio: 16 / 10; background: #dbc0b6; border-radius: var(--radius-large); box-shadow: var(--shadow-card); }
.course-visual::after { content: ''; position: absolute; inset: 48% 0 0; background: linear-gradient(transparent,rgba(56,22,20,.58)); }
.course-visual img { width: 100%; height: 100%; object-fit: cover; transition: transform .45s ease; }
.course-visual:hover img { transform: scale(1.035); }
.course-index { position: absolute; z-index: 1; left: 28px; bottom: 24px; color: white; font-size: 58px; line-height: 1; }
.slide-count { position: absolute; z-index: 1; top: 20px; right: 20px; padding: 7px 12px; color: white; background: rgba(49,22,21,.68); border-radius: 999px; font-size: 12px; backdrop-filter: blur(8px); }
.course-copy h2 { margin: 14px 0 3px; font-size: clamp(38px,5vw,58px); }
.course-subtitle { margin: 0 0 20px; color: var(--color-primary); font-size: 18px; font-weight: 700; }
.course-question { padding-left: 18px; color: var(--color-text); border-left: 3px solid var(--color-primary-light); font-family: var(--font-serif); font-size: 20px; line-height: 1.65; }
.course-description { color: var(--color-text-secondary); line-height: 1.85; }
.course-meta { display: grid; gap: 9px; margin: 24px 0; color: var(--color-text-secondary); font-size: 14px; }
.course-meta span { display: flex; align-items: center; gap: 9px; }
.course-meta svg { flex: none; color: var(--color-primary); }
.activity-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.activity-tags span { padding: 6px 11px; color: var(--color-primary-dark); background: var(--color-primary-soft); border-radius: 999px; font-size: 12px; }
.course-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
.resource-button { color: var(--color-primary); background: white; border-color: var(--color-primary-soft); }
.download-link { display: inline-flex; align-items: center; gap: 6px; color: var(--color-text-secondary); font-size: 13px; font-weight: 700; }
.download-link:hover { color: var(--color-primary); }
.next-step { padding: 78px 0; color: white; background: linear-gradient(110deg,var(--color-primary-dark),#9c473e); }
.next-step-inner { display: flex; align-items: center; justify-content: space-between; gap: 40px; }
.next-step .eyebrow { color: #efc2b7; }
.next-step h2 { max-width: 760px; margin: 16px 0 0; font-size: clamp(30px,4vw,44px); line-height: 1.4; }
@media (max-width: 900px) {
  .route { align-items: stretch; flex-direction: column; gap: 10px; }
  .route i { display: none; }
  .course-showcase { grid-template-columns: 1fr; gap: 36px; }
  .course-showcase.reverse .course-visual, .course-showcase.reverse .course-copy { order: initial; }
  .next-step-inner { align-items: flex-start; flex-direction: column; }
}
@media (max-width: 576px) {
  .course-showcase { padding: 46px 0; }
  .course-actions { align-items: stretch; flex-direction: column; }
  .course-actions .btn, .download-link { justify-content: center; }
  .course-index { font-size: 44px; }
}
</style>
