<script setup>
import { computed, ref } from 'vue'
import { useHead } from '@vueuse/head'
import {
  Archive,
  ArrowRight,
  BookOpen,
  CalendarClock,
  Camera,
  Compass,
  Landmark,
  MapPin,
} from 'lucide-vue-next'
import Gallery from '../components/Gallery.vue'
import PageHero from '../components/PageHero.vue'
import SectionTitle from '../components/SectionTitle.vue'
import { museumGallery, venues, visitHighlights, visitJourney } from '../data/media'
import { useReveal } from '../composables/useReveal'

useHead({
  title: '寻访侨迹｜青声传薪·数扬侨魂',
  meta: [
    {
      name: 'description',
      content: '三期社区宣讲之后，实践团走进华侨博物院和厦门侨批馆，在公开展陈与历史文献中继续寻找华侨革命史的线索。',
    },
    { property: 'og:title', content: '寻访侨迹｜青声传薪·数扬侨魂' },
    {
      property: 'og:description',
      content: '从社区课堂走进历史现场，记录场馆寻访、侨批文献与青年实践。',
    },
    { property: 'og:type', content: 'website' },
  ],
})

useReveal()

const activeCategory = ref('全部')
const categories = ['全部', ...new Set(museumGallery.map((image) => image.category))]
const filteredGallery = computed(() => (
  activeCategory.value === '全部'
    ? museumGallery
    : museumGallery.filter((image) => image.category === activeCategory.value)
))

const galleryById = new Map(museumGallery.map((image) => [image.id, image]))
const highlights = visitHighlights.map((item) => ({
  ...item,
  image: galleryById.get(item.imageId),
}))
</script>

<template>
  <div class="visit-page">
    <PageHero
      eyebrow="三期侨课之后 · 场馆寻访"
      title="寻访侨迹"
      subtitle="在社区课堂之后，我们走进展馆，在公开展陈与历史文献中继续寻找答案。"
      background-image="/images/museum/museum-18.webp"
    />

    <section class="journey-band" aria-label="实践过程">
      <div class="container">
        <ol class="journey-list">
          <li v-for="(step, index) in visitJourney" :key="step.number" class="journey-item">
            <div class="journey-heading">
              <span>{{ step.number }}</span>
              <strong>{{ step.label }}</strong>
            </div>
            <h2>{{ step.title }}</h2>
            <p>{{ step.description }}</p>
            <ArrowRight v-if="index < visitJourney.length - 1" class="journey-arrow" :size="19" aria-hidden="true" />
          </li>
        </ol>
      </div>
    </section>

    <section class="section visit-intro paper-texture">
      <div class="container intro-grid reveal">
        <div>
          <SectionTitle
            eyebrow="WHY WE VISIT"
            title="为什么走进场馆"
            subtitle="三期社区宣讲完成以后，我们希望进一步核对、丰富和深化宣讲内容，因此走进相关场馆，通过实地参观、展览学习、史料记录和现场观察，重新认识华侨革命历史。"
          />
          <p class="intro-copy">
            课堂帮助我们提出问题，历史现场则让问题变得更具体。团队围绕抗战华侨力量、华侨青年与侨批记忆，阅读公开展陈说明、记录文献形态，并把仍需查证的信息带回后续整理工作。
          </p>
        </div>

        <aside class="archive-note" aria-label="资料说明">
          <span class="archive-icon"><Archive :size="26" /></span>
          <p class="archive-kicker">ARCHIVE NOTE</p>
          <h2 class="serif">现场记录，也要经得起核验</h2>
          <p>页面只呈现能够由团队材料确认的参访内容，不补写馆藏编号，不替展品判断年代，也不把其他地点的照片混作本次场馆记录。</p>
          <div class="date-note">
            <CalendarClock :size="17" />
            <span>照片拍摄日期正在核实，暂不展示具体日期。</span>
          </div>
        </aside>
      </div>
    </section>

    <section class="section venues-section">
      <div class="container">
        <SectionTitle
          eyebrow="FIELD VISITS"
          title="走进两处侨史文化场馆"
          subtitle="从综合性的华侨历史展陈，到聚焦侨批的专题空间，我们沿着三堂侨课中的问题继续学习。"
        />

        <div class="venue-grid">
          <article v-for="(venue, index) in venues" :key="venue.id" class="venue-card reveal">
            <div class="venue-media">
              <img :src="venue.cover" :alt="venue.alt" loading="lazy" />
              <span class="venue-index">0{{ index + 1 }}</span>
              <span class="venue-type"><Landmark :size="14" />{{ venue.type }}</span>
            </div>

            <div class="venue-content">
              <div class="venue-title-row">
                <div>
                  <p><MapPin :size="14" />厦门</p>
                  <h3 class="serif">{{ venue.name }}</h3>
                </div>
                <Compass :size="28" stroke-width="1.35" aria-hidden="true" />
              </div>

              <p class="venue-summary">{{ venue.summary }}</p>

              <div class="venue-focus">
                <h4><BookOpen :size="16" />我们重点关注</h4>
                <ul>
                  <li v-for="item in venue.focus" :key="item">{{ item }}</li>
                </ul>
              </div>

              <div class="venue-takeaway">
                <span>我们带回的思考</span>
                <p>{{ venue.takeaway }}</p>
              </div>

              <p class="venue-note"><CalendarClock :size="14" />{{ venue.note }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section story-section">
      <div class="container">
        <SectionTitle
          eyebrow="PHOTO STORIES"
          title="从课堂走向历史现场"
          subtitle="四个片段，记录一次寻访如何转化为可以长期使用的数字内容。"
          light
        />

        <div class="story-list">
          <article v-for="(story, index) in highlights" :key="story.id" class="story-item reveal">
            <div class="story-image" :class="{ 'order-last': index % 2 === 1 }">
              <img :src="story.image.src" :alt="story.image.alt" loading="lazy" />
              <span>{{ story.number }}</span>
            </div>
            <div class="story-copy">
              <p>{{ story.number }} / 04</p>
              <h3 class="serif">{{ story.title }}</h3>
              <div class="story-rule"></div>
              <p>{{ story.description }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section gallery-section section-soft">
      <div class="container">
        <div class="gallery-heading">
          <SectionTitle
            eyebrow="VISIT ARCHIVE"
            title="场馆寻访照片档案"
            subtitle="点击照片可查看大图。图片标题仅描述画面中可确认的信息，具体拍摄日期与更详细的史料说明将在核验后补充。"
          />
          <div class="gallery-count" aria-label="照片数量">
            <Camera :size="22" />
            <span><strong>{{ filteredGallery.length }}</strong> / {{ museumGallery.length }}</span>
          </div>
        </div>

        <div class="gallery-filters" role="group" aria-label="照片分类筛选">
          <button
            v-for="category in categories"
            :key="category"
            type="button"
            :class="{ active: activeCategory === category }"
            :aria-pressed="activeCategory === category"
            @click="activeCategory = category"
          >
            {{ category }}
          </button>
        </div>

        <Gallery
          :key="activeCategory"
          :images="filteredGallery"
          aria-label="场馆寻访照片画廊"
          empty-text="该分类的照片资料正在整理中"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.visit-page { overflow: clip; background: var(--color-background); }

.journey-band {
  position: relative;
  z-index: 2;
  color: white;
  background: var(--color-primary-dark);
  border-top: 1px solid rgba(255, 255, 255, .12);
}
.journey-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 0;
  padding: 0;
  list-style: none;
}
.journey-item {
  position: relative;
  min-height: 210px;
  padding: 30px 30px 28px;
  border-left: 1px solid rgba(255, 255, 255, .13);
}
.journey-item:last-child { border-right: 1px solid rgba(255, 255, 255, .13); }
.journey-heading { display: flex; align-items: center; gap: 12px; }
.journey-heading span { color: #e9afa1; font-family: var(--font-serif); font-size: 13px; }
.journey-heading strong { font-size: 13px; letter-spacing: .12em; }
.journey-item h2 { margin: 24px 0 10px; font-family: var(--font-serif); font-size: 20px; line-height: 1.45; }
.journey-item p { margin: 0; color: rgba(255, 255, 255, .66); font-size: 13px; line-height: 1.75; }
.journey-arrow { position: absolute; top: 36px; right: -10px; z-index: 2; color: #e9afa1; }

.visit-intro { background-color: var(--color-paper-light); }
.intro-grid { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(340px, .8fr); gap: 80px; align-items: center; }
.intro-grid :deep(.section-title) { margin-bottom: 22px; }
.intro-copy { max-width: 760px; margin: 0; color: var(--color-text-secondary); font-size: 16px; line-height: 1.9; }
.archive-note {
  position: relative;
  overflow: hidden;
  padding: 42px;
  color: white;
  background: linear-gradient(145deg, #8d3432, #632422);
  border-radius: var(--radius-large);
  box-shadow: 0 22px 52px rgba(94, 33, 31, .22);
}
.archive-note::after {
  content: 'ARCHIVE';
  position: absolute;
  right: -10px;
  bottom: -18px;
  color: rgba(255, 255, 255, .045);
  font-family: var(--font-serif);
  font-size: 76px;
  letter-spacing: .04em;
}
.archive-icon { display: grid; place-content: center; width: 54px; height: 54px; color: #f0c3b7; background: rgba(255, 255, 255, .1); border: 1px solid rgba(255, 255, 255, .16); border-radius: 50%; }
.archive-kicker { margin: 28px 0 10px; color: #e9afa1; font-size: 11px; font-weight: 700; letter-spacing: .18em; }
.archive-note h2 { margin: 0; font-size: 28px; line-height: 1.45; }
.archive-note > p:not(.archive-kicker) { margin: 18px 0 0; color: rgba(255, 255, 255, .72); line-height: 1.85; }
.date-note { position: relative; z-index: 1; display: flex; align-items: flex-start; gap: 9px; margin-top: 25px; padding-top: 20px; color: #f3d5ce; border-top: 1px solid rgba(255, 255, 255, .14); font-size: 12px; line-height: 1.6; }
.date-note svg { flex: none; margin-top: 1px; }

.venues-section { background: var(--color-background); }
.venue-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px; }
.venue-card { overflow: hidden; background: white; border: 1px solid rgba(123, 86, 67, .12); border-radius: var(--radius-large); box-shadow: var(--shadow-soft); }
.venue-media { position: relative; aspect-ratio: 16 / 9; overflow: hidden; background: #d8c0b5; }
.venue-media::after { content: ''; position: absolute; inset: 35% 0 0; background: linear-gradient(transparent, rgba(39, 23, 21, .68)); }
.venue-media img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s ease; }
.venue-card:hover .venue-media img { transform: scale(1.035); }
.venue-index { position: absolute; z-index: 2; top: 20px; left: 22px; color: white; font-family: var(--font-serif); font-size: 32px; text-shadow: 0 2px 12px rgba(0, 0, 0, .25); }
.venue-type { position: absolute; z-index: 2; right: 20px; bottom: 18px; display: inline-flex; align-items: center; gap: 7px; padding: 7px 11px; color: white; background: rgba(58, 30, 27, .55); border: 1px solid rgba(255, 255, 255, .2); border-radius: 999px; backdrop-filter: blur(9px); font-size: 11px; }
.venue-content { padding: 30px 32px 32px; }
.venue-title-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; }
.venue-title-row > svg { color: var(--color-primary-light); }
.venue-title-row p { display: flex; align-items: center; gap: 5px; margin: 0 0 7px; color: var(--color-text-light); font-size: 12px; }
.venue-title-row h3 { margin: 0; font-size: 28px; }
.venue-summary { margin: 18px 0 0; color: var(--color-text-secondary); line-height: 1.85; }
.venue-focus { margin-top: 25px; padding: 20px 22px; background: var(--color-paper-light); border-radius: var(--radius-medium); }
.venue-focus h4 { display: flex; align-items: center; gap: 8px; margin: 0 0 13px; color: var(--color-primary); font-size: 14px; }
.venue-focus ul { display: grid; gap: 9px; margin: 0; padding: 0; list-style: none; }
.venue-focus li { position: relative; padding-left: 15px; color: var(--color-text-secondary); font-size: 13px; line-height: 1.6; }
.venue-focus li::before { content: ''; position: absolute; top: .7em; left: 0; width: 5px; height: 5px; background: var(--color-primary-light); border-radius: 50%; }
.venue-takeaway { margin-top: 22px; }
.venue-takeaway span { color: var(--color-text-light); font-size: 11px; font-weight: 700; letter-spacing: .1em; }
.venue-takeaway p { margin: 8px 0 0; line-height: 1.75; }
.venue-note { display: flex; align-items: center; gap: 7px; margin: 22px 0 0; padding-top: 18px; color: var(--color-text-light); border-top: 1px solid var(--color-border); font-size: 11px; }

.story-section { color: white; background: #2b343d; }
.story-section :deep(.section-title p) { color: rgba(255, 255, 255, .65); }
.story-list { display: grid; gap: 72px; }
.story-item { display: grid; grid-template-columns: minmax(0, 1.12fr) minmax(300px, .88fr); gap: 72px; align-items: center; }
.story-image { position: relative; overflow: hidden; aspect-ratio: 16 / 10; background: #553b38; border-radius: var(--radius-large); }
.story-image.order-last { order: 2; }
.story-image::after { content: ''; position: absolute; inset: 55% 0 0; background: linear-gradient(transparent, rgba(20, 24, 28, .55)); }
.story-image img { width: 100%; height: 100%; object-fit: cover; }
.story-image > span { position: absolute; z-index: 2; right: 24px; bottom: 18px; color: rgba(255, 255, 255, .85); font-family: var(--font-serif); font-size: 42px; }
.story-copy > p:first-child { margin: 0; color: #db9b8d; font-size: 11px; font-weight: 700; letter-spacing: .18em; }
.story-copy h3 { margin: 15px 0 0; font-size: clamp(28px, 3vw, 42px); line-height: 1.38; }
.story-rule { width: 54px; height: 2px; margin: 24px 0; background: var(--color-primary-light); }
.story-copy > p:last-child { margin: 0; color: rgba(255, 255, 255, .68); font-size: 16px; line-height: 1.9; }

.gallery-section { background: var(--color-paper); }
.gallery-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 30px; }
.gallery-heading :deep(.section-title) { margin-bottom: 0; }
.gallery-count { display: flex; align-items: center; gap: 10px; flex: none; padding: 14px 17px; color: var(--color-primary); background: white; border: 1px solid rgba(123, 86, 67, .12); border-radius: var(--radius-medium); box-shadow: var(--shadow-soft); }
.gallery-count span { color: var(--color-text-light); font-size: 13px; }
.gallery-count strong { color: var(--color-primary); font-family: var(--font-serif); font-size: 24px; }
.gallery-filters { display: flex; flex-wrap: wrap; gap: 10px; margin: 36px 0 28px; }
.gallery-filters button { min-height: 40px; padding: 0 17px; color: var(--color-text-secondary); background: rgba(255, 255, 255, .72); border: 1px solid var(--color-border); border-radius: 999px; font: inherit; font-size: 13px; cursor: pointer; transition: color .2s ease, background .2s ease, border-color .2s ease, transform .2s ease; }
.gallery-filters button:hover { color: var(--color-primary); border-color: var(--color-primary-light); transform: translateY(-1px); }
.gallery-filters button.active { color: white; background: var(--color-primary); border-color: var(--color-primary); }
.gallery-filters button:focus-visible { outline: 3px solid var(--color-primary-soft); outline-offset: 3px; }

@media (max-width: 992px) {
  .journey-list { grid-template-columns: repeat(2, 1fr); }
  .journey-item:nth-child(2) { border-right: 1px solid rgba(255, 255, 255, .13); }
  .journey-item:nth-child(n + 3) { border-top: 1px solid rgba(255, 255, 255, .13); }
  .journey-arrow { display: none; }
  .intro-grid { grid-template-columns: 1fr; gap: 46px; }
  .archive-note { max-width: 680px; }
  .venue-grid { gap: 22px; }
  .venue-content { padding: 25px; }
  .story-item { gap: 44px; }
}

@media (max-width: 768px) {
  .journey-list { grid-template-columns: 1fr; }
  .journey-item { min-height: auto; padding: 25px 23px; border-right: 1px solid rgba(255, 255, 255, .13); border-bottom: 1px solid rgba(255, 255, 255, .13); }
  .journey-item h2 { margin-top: 16px; }
  .venue-grid { grid-template-columns: 1fr; }
  .story-list { gap: 54px; }
  .story-item { grid-template-columns: 1fr; gap: 26px; }
  .story-image.order-last { order: 0; }
  .gallery-heading { align-items: flex-start; flex-direction: column; }
}

@media (max-width: 576px) {
  .archive-note { padding: 30px 26px; }
  .archive-note::after { font-size: 54px; }
  .archive-note h2 { font-size: 24px; }
  .venue-media { aspect-ratio: 4 / 3; }
  .venue-content { padding: 23px 21px 25px; }
  .venue-title-row h3 { font-size: 25px; }
  .story-image { aspect-ratio: 4 / 3; border-radius: var(--radius-medium); }
  .story-image > span { right: 17px; bottom: 13px; font-size: 34px; }
  .story-copy > p:last-child { font-size: 15px; }
  .gallery-filters { gap: 8px; }
  .gallery-filters button { min-height: 38px; padding-inline: 14px; font-size: 12px; }
}
</style>
