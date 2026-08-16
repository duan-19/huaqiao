<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import { ArrowLeft, ArrowRight, CalendarDays, Check, MapPin, Users } from 'lucide-vue-next'
import Gallery from '../components/Gallery.vue'
import PdfViewer from '../components/PdfViewer.vue'
import SectionTitle from '../components/SectionTitle.vue'
import VideoCard from '../components/VideoCard.vue'
import { courses, getCourseById } from '../data/courses'
import { videos } from '../data/media'

const route = useRoute()
const course = computed(() => getCourseById(route.params.id) || courses[0])
const openKnowledge = ref(0)

watch(() => route.params.id, () => { openKnowledge.value = 0 })

const courseIndex = computed(() => courses.findIndex((item) => item.id === course.value.id))
const previousCourse = computed(() => courses[courseIndex.value - 1] || null)
const nextCourse = computed(() => courses[courseIndex.value + 1] || null)
const courseVideos = computed(() => videos.filter((video) => video.courseId === course.value.id))

useHead(() => ({
  title: `${course.value.title}｜三堂侨课｜青声传薪·数扬侨魂`,
  meta: [{ name: 'description', content: course.value.description }],
}))
</script>

<template>
  <div class="course-detail">
    <section class="course-hero">
      <img :src="course.image" :alt="`${course.title}课程封面`" />
      <div class="course-hero-overlay"></div>
      <div class="container course-hero-content">
        <span class="eyebrow">{{ course.kicker }}</span>
        <h1 class="serif">{{ course.title }}</h1>
        <p>{{ course.subtitle }}</p>
        <div class="hero-meta">
          <span><CalendarDays :size="17" />{{ course.date }} {{ course.time }}</span>
          <span><MapPin :size="17" />{{ course.location }}</span>
          <span><Users :size="17" />{{ course.audience }}</span>
        </div>
      </div>
    </section>

    <section class="section question-section paper-texture">
      <div class="container narrow">
        <span class="eyebrow">WHY THIS CLASS</span>
        <h2 class="serif">{{ course.question }}</h2>
        <p>{{ course.introduction }}</p>
      </div>
    </section>

    <section class="section knowledge-section">
      <div class="container">
        <SectionTitle eyebrow="KNOWLEDGE MAP" title="这堂课讲了什么" subtitle="把课件内容重新整理为五个知识入口。点击每张卡片，查看这一部分的学习重点。" />
        <div class="knowledge-layout">
          <div class="knowledge-tabs" role="tablist" aria-label="课程知识点">
            <button
              v-for="(item, index) in course.knowledge"
              :key="item.number"
              :class="{ active: openKnowledge === index }"
              role="tab"
              :aria-selected="openKnowledge === index"
              @click="openKnowledge = index"
            >
              <span>{{ item.number }}</span>
              <strong>{{ item.title }}</strong>
              <ArrowRight :size="18" />
            </button>
          </div>
          <div class="knowledge-detail" role="tabpanel">
            <span class="detail-number serif">{{ course.knowledge[openKnowledge].number }}</span>
            <h3 class="serif">{{ course.knowledge[openKnowledge].title }}</h3>
            <p>{{ course.knowledge[openKnowledge].summary }}</p>
            <div class="detail-note"><Check :size="18" />课程页面为概要导读，完整内容可在下方课件中查看。</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section previews-section section-soft">
      <div class="container">
        <SectionTitle eyebrow="SLIDE PREVIEW" title="课件内容先览" subtitle="精选团队原创宣讲课件页面。点击图片可放大查看；真实活动影像正在继续整理，可在“寻访侨迹”和“实践成果”中浏览现有档案。" />
        <Gallery :images="course.slidePreviews" />
      </div>
    </section>

    <section class="section activity-section">
      <div class="container activity-layout">
        <div>
          <span class="eyebrow">LEARNING BY DOING</span>
          <h2 class="serif">我们的互动活动</h2>
          <p>知识讲解之后，实践团用动手体验和同伴协作帮助孩子们完成一次从“听见”到“记住”的转换。以下项目整理自团队新闻稿与最终课件，不额外虚构活动内容。</p>
        </div>
        <div class="activity-cards">
          <article v-for="(activity, index) in course.activities" :key="activity">
            <span>0{{ index + 1 }}</span>
            <h3>{{ activity }}</h3>
          </article>
        </div>
      </div>
    </section>

    <section v-if="courseVideos.length" class="section video-section">
      <div class="container">
        <SectionTitle eyebrow="COURSE VIDEO" title="课堂视频素材" subtitle="视频来自团队提供的最终课件。当前用于本地展示效果，正式公开部署前请再次核验素材的公开传播授权。" />
        <div class="video-grid"><VideoCard v-for="video in courseVideos" :key="video.id" :video="video" /></div>
      </div>
    </section>

    <section class="section resource-section section-soft">
      <div class="container">
        <SectionTitle eyebrow="OPEN COURSEWARE" title="把这堂侨课带回课堂" subtitle="桌面端可直接在页面内阅读 PDF；手机端可打开 PDF。PPT 原文件保留动画和课程结构，可直接下载用于公益科普。" />
        <PdfViewer :title="`${course.title} · ${course.subtitle}`" :pdf-url="course.pdf" :ppt-url="course.ppt" :cover="course.image" />
      </div>
    </section>

    <section class="reflection-section">
      <div class="container">
        <span class="eyebrow">COURSE REFLECTION</span>
        <blockquote class="serif">“{{ course.reflection }}”</blockquote>
        <nav class="course-nav" aria-label="课程前后导航">
          <RouterLink v-if="previousCourse" :to="`/classes/${previousCourse.id}`"><ArrowLeft :size="19" /><span><small>上一课</small>{{ previousCourse.title }}</span></RouterLink>
          <span v-else></span>
          <RouterLink v-if="nextCourse" :to="`/classes/${nextCourse.id}`"><span><small>下一课</small>{{ nextCourse.title }}</span><ArrowRight :size="19" /></RouterLink>
          <RouterLink v-else to="/visit"><span><small>课程之后</small>寻访侨迹</span><ArrowRight :size="19" /></RouterLink>
        </nav>
      </div>
    </section>
  </div>
</template>

<style scoped>
.course-hero { position: relative; display: flex; align-items: flex-end; min-height: 560px; overflow: hidden; color: white; background: var(--color-primary-dark); }
.course-hero > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.course-hero-overlay { position: absolute; inset: 0; background: linear-gradient(90deg,rgba(45,18,18,.9),rgba(74,31,28,.58) 50%,rgba(42,24,21,.22)),linear-gradient(0deg,rgba(35,18,16,.66),transparent 55%); }
.course-hero-content { position: relative; z-index: 1; padding-bottom: 66px; }
.course-hero .eyebrow { color: #f0bdb3; }
.course-hero h1 { margin: 15px 0 4px; font-size: clamp(52px,7vw,82px); }
.course-hero-content > p { margin: 0; color: #f3d4cb; font-size: 23px; }
.hero-meta { display: flex; flex-wrap: wrap; gap: 24px; margin-top: 27px; color: rgba(255,255,255,.75); font-size: 14px; }
.hero-meta span { display: flex; align-items: center; gap: 8px; }
.narrow { max-width: 840px; }
.question-section { text-align: center; background: var(--color-paper); }
.question-section .eyebrow { justify-content: center; }
.question-section h2 { margin: 22px 0; color: var(--color-primary-dark); font-size: clamp(34px,5vw,55px); line-height: 1.45; }
.question-section p { color: var(--color-text-secondary); font-size: 17px; line-height: 2; }
.knowledge-section { background: white; }
.knowledge-layout { display: grid; grid-template-columns: .9fr 1.1fr; gap: 28px; }
.knowledge-tabs { display: grid; gap: 9px; }
.knowledge-tabs button { display: grid; grid-template-columns: 48px 1fr auto; align-items: center; gap: 14px; min-height: 66px; padding: 0 22px; color: var(--color-text-secondary); background: var(--color-paper-light); border: 1px solid var(--color-border); border-radius: 14px; text-align: left; transition: .25s; }
.knowledge-tabs button span { color: var(--color-primary); font-family: var(--font-serif); font-size: 18px; }
.knowledge-tabs button svg { opacity: .35; }
.knowledge-tabs button:hover, .knowledge-tabs button.active { color: white; background: var(--color-primary); border-color: var(--color-primary); transform: translateX(5px); }
.knowledge-tabs button.active span, .knowledge-tabs button:hover span { color: #f9d8d0; }
.knowledge-detail { position: relative; min-height: 360px; overflow: hidden; padding: clamp(36px,6vw,74px); color: white; background: linear-gradient(135deg,var(--color-primary-dark),#a54d43); border-radius: var(--radius-large); box-shadow: var(--shadow-card); }
.detail-number { position: absolute; top: -15px; right: 25px; color: rgba(255,255,255,.08); font-size: 150px; }
.knowledge-detail h3 { position: relative; margin: 0 0 20px; font-size: 38px; }
.knowledge-detail p { position: relative; max-width: 520px; color: rgba(255,255,255,.78); font-size: 18px; line-height: 1.9; }
.detail-note { position: relative; display: flex; align-items: center; gap: 9px; margin-top: 42px; padding-top: 20px; color: rgba(255,255,255,.55); border-top: 1px solid rgba(255,255,255,.17); font-size: 12px; }
.activity-section { background: white; }
.activity-layout { display: grid; grid-template-columns: .8fr 1.2fr; gap: 70px; align-items: center; }
.activity-layout h2 { margin: 17px 0; font-size: clamp(34px,4vw,48px); }
.activity-layout p { color: var(--color-text-secondary); line-height: 1.9; }
.activity-cards { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; }
.activity-cards article { min-height: 190px; padding: 24px; background: var(--color-paper); border-radius: var(--radius-medium); border-bottom: 4px solid var(--color-primary); }
.activity-cards span { color: var(--color-primary-light); font-family: var(--font-serif); font-size: 28px; }
.activity-cards h3 { margin-top: 46px; font-size: 17px; line-height: 1.55; }
.video-section { background: #271e1d; color: white; }
.video-section :deep(.section-title p) { color: rgba(255,255,255,.65); }
.video-grid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 22px; }
.resource-section { background: var(--color-paper); }
.reflection-section { padding: 100px 0 78px; color: white; background: linear-gradient(125deg,#6f2928,#9e463e); text-align: center; }
.reflection-section .eyebrow { justify-content: center; color: #efc0b5; }
.reflection-section blockquote { max-width: 900px; margin: 26px auto 62px; font-size: clamp(28px,4vw,45px); line-height: 1.65; }
.course-nav { display: flex; justify-content: space-between; border-top: 1px solid rgba(255,255,255,.18); padding-top: 28px; }
.course-nav a { display: flex; align-items: center; gap: 12px; color: white; text-align: left; }
.course-nav a:last-child { text-align: right; }
.course-nav span { display: flex; flex-direction: column; font-weight: 700; }
.course-nav small { margin-bottom: 5px; color: rgba(255,255,255,.55); font-weight: 400; }
@media (max-width: 900px) {
  .knowledge-layout, .activity-layout { grid-template-columns: 1fr; }
  .knowledge-detail { min-height: 300px; }
  .activity-cards { grid-template-columns: repeat(3,1fr); }
}
@media (max-width: 650px) {
  .course-hero { min-height: 500px; }
  .hero-meta { align-items: flex-start; flex-direction: column; gap: 10px; }
  .knowledge-tabs button { grid-template-columns: 40px 1fr auto; }
  .activity-cards, .video-grid { grid-template-columns: 1fr; }
  .activity-cards article { min-height: 130px; }
  .activity-cards h3 { margin-top: 25px; }
  .course-nav { gap: 20px; }
}
</style>
