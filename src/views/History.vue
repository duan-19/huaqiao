<script setup>
import { computed, ref } from 'vue'
import { useHead } from '@vueuse/head'
import { ArrowRight, Archive, BookOpen, Clock3, Compass, ExternalLink } from 'lucide-vue-next'
import PageHero from '../components/PageHero.vue'
import SectionTitle from '../components/SectionTitle.vue'
import SourceBadge from '../components/SourceBadge.vue'
import { historyCards, historyThemes, historyTimeline } from '../data/history'

useHead({
  title: '数字侨史｜青声传薪·数扬侨魂',
  meta: [
    { name: 'description', content: '从三堂侨课出发，以权威来源为依据，轻量了解华侨革命史、南侨机工、归侨青年李林与侨批记忆。' },
    { property: 'og:title', content: '数字侨史｜青声传薪·数扬侨魂' },
    { property: 'og:description', content: '沿着时间与史料，读懂跨越山海的华侨家国故事。' },
  ],
})

const activeIndex = ref(0)
const activeEvent = computed(() => historyTimeline[activeIndex.value])
</script>

<template>
  <div class="history-page">
    <PageHero
      eyebrow="DIGITAL OVERSEAS CHINESE HISTORY"
      title="数字侨史"
      subtitle="从我们的三堂侨课出发，读懂跨越山海的华侨家国故事。"
      background-image="/images/museum/museum-03.webp"
    />

    <section class="scope-note">
      <div class="container scope-inner">
        <BookOpen :size="28" stroke-width="1.5" />
        <div>
          <strong>一页轻量科普，不是一座学术数据库</strong>
          <p>本页只选取与三堂侨课直接相关、且已核对权威来源的基础知识。史料仍需回到来源机构继续阅读，未核实的馆藏编号与数据不会在这里补写。</p>
        </div>
      </div>
    </section>

    <section class="section themes-section paper-texture">
      <div class="container">
        <SectionTitle
          eyebrow="THREE STORIES"
          title="从三堂侨课进入历史"
          subtitle="从抗战中的侨力、青年人物到跨海家书，用三个问题入口连接课堂与史料。"
        />
        <div class="theme-grid">
          <article v-for="theme in historyThemes" :key="theme.id" class="theme-card">
            <div class="theme-image">
              <img :src="theme.image" :alt="`${theme.title}课程封面`" loading="lazy" />
              <span>{{ theme.number }}</span>
            </div>
            <div class="theme-content">
              <p class="theme-kicker">{{ theme.subtitle }}</p>
              <h2 class="serif">{{ theme.title }}</h2>
              <p>{{ theme.description }}</p>
              <SourceBadge :source="theme.source" />
              <RouterLink :to="theme.courseUrl">走进对应侨课 <ArrowRight :size="17" /></RouterLink>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section timeline-section">
      <div class="container">
        <SectionTitle
          eyebrow="HISTORY TIMELINE"
          title="沿着时间，寻找侨史线索"
          subtitle="点击年份查看简要说明。桌面端横向展开，移动端转为纵向阅读。"
        />

        <div class="timeline-panel">
          <div class="timeline-tabs" role="tablist" aria-label="华侨革命史时间轴">
            <button
              v-for="(event, index) in historyTimeline"
              :id="`timeline-tab-${index}`"
              :key="`${event.year}-${event.title}`"
              class="timeline-tab"
              :class="{ active: activeIndex === index }"
              type="button"
              role="tab"
              :aria-selected="activeIndex === index"
              :aria-controls="`timeline-panel-${index}`"
              :tabindex="activeIndex === index ? 0 : -1"
              @click="activeIndex = index"
            >
              <span>{{ event.year }}</span>
              <strong>{{ event.title }}</strong>
            </button>
          </div>

          <article
            :id="`timeline-panel-${activeIndex}`"
            class="timeline-detail"
            role="tabpanel"
            :aria-labelledby="`timeline-tab-${activeIndex}`"
          >
            <div class="timeline-photo">
              <img :src="activeEvent.image" :alt="activeEvent.imageAlt" loading="lazy" />
              <span>团队寻访影像 · 仅作页面配图</span>
            </div>
            <div class="timeline-copy">
              <p class="detail-year"><Clock3 :size="16" /> {{ activeEvent.year }}</p>
              <h3 class="serif">{{ activeEvent.title }}</h3>
              <p>{{ activeEvent.description }}</p>
              <SourceBadge :source="activeEvent.source" />
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section archive-section paper-texture">
      <div class="container">
        <SectionTitle
          eyebrow="ARCHIVE CARDS"
          title="六张史料知识卡"
          subtitle="每张卡片只回答一个基础问题，并给出可继续查阅的来源入口。团队照片仅用于呈现寻访过程，不替代史料本身。"
        />
        <div class="archive-grid">
          <article v-for="card in historyCards" :key="card.title" class="archive-card">
            <div class="archive-image">
              <img :src="card.image" :alt="card.imageAlt" loading="lazy" />
              <span>团队自有影像</span>
            </div>
            <div class="archive-body">
              <div class="archive-meta"><span>{{ card.type }}</span><time>{{ card.period }}</time></div>
              <h3 class="serif">{{ card.title }}</h3>
              <p>{{ card.description }}</p>
              <div class="archive-related"><Archive :size="14" /> 相关课程｜{{ card.relatedCourse }}</div>
              <SourceBadge :source="card.source" />
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="history-cta">
      <div class="container cta-inner">
        <div>
          <p><Compass :size="17" /> CONTINUE EXPLORING</p>
          <h2 class="serif">读完时间轴，去检验刚刚认识的侨史线索。</h2>
        </div>
        <RouterLink to="/quiz" class="btn btn-light">进入侨史知识挑战 <ArrowRight :size="18" /></RouterLink>
      </div>
    </section>

    <section class="source-directory">
      <div class="container source-directory-inner">
        <span>权威学习入口</span>
        <a
          v-for="source in [...new Map(historyCards.map(card => [card.source.url, card.source])).values()]"
          :key="source.url"
          :href="source.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ source.institution }} <ExternalLink :size="13" />
        </a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.scope-note { color: white; background: var(--color-primary-dark); }
.scope-inner { display: flex; align-items: center; gap: 20px; padding-block: 24px; }
.scope-inner svg { flex: none; color: #efb8aa; }
.scope-inner strong { font-family: var(--font-serif); font-size: 18px; }
.scope-inner p { margin: 5px 0 0; color: rgba(255, 255, 255, .68); font-size: 13px; line-height: 1.7; }
.themes-section { background: var(--color-paper); }
.theme-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.theme-card { overflow: hidden; background: white; border-radius: var(--radius-large); box-shadow: var(--shadow-soft); transition: transform .3s ease, box-shadow .3s ease; }
.theme-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-card); }
.theme-image { position: relative; height: 260px; overflow: hidden; background: #d2ada3; }
.theme-image::after { content: ''; position: absolute; inset: 45% 0 0; background: linear-gradient(transparent, rgba(45, 20, 19, .58)); }
.theme-image img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s ease; }
.theme-card:hover .theme-image img { transform: scale(1.035); }
.theme-image > span { position: absolute; z-index: 1; left: 22px; bottom: 18px; color: white; font-family: var(--font-serif); font-size: 38px; }
.theme-content { padding: 25px; }
.theme-kicker { margin: 0 0 7px; color: var(--color-primary); font-size: 12px; font-weight: 700; letter-spacing: .06em; }
.theme-content h2 { margin: 0 0 12px; font-size: 28px; }
.theme-content > p:not(.theme-kicker) { min-height: 92px; margin-bottom: 17px; color: var(--color-text-secondary); line-height: 1.75; }
.theme-content > a { display: flex; align-items: center; gap: 6px; width: fit-content; margin-top: 18px; color: var(--color-primary); font-size: 13px; font-weight: 700; }
.timeline-section { background: white; }
.timeline-panel { overflow: hidden; background: var(--color-paper-light); border: 1px solid var(--color-border); border-radius: var(--radius-large); box-shadow: var(--shadow-soft); }
.timeline-tabs { position: relative; display: flex; overflow-x: auto; padding: 34px 26px 28px; scrollbar-width: thin; scrollbar-color: var(--color-primary-soft) transparent; }
.timeline-tabs::before { content: ''; position: absolute; top: 53px; right: 62px; left: 62px; height: 1px; background: var(--color-border); }
.timeline-tab { position: relative; z-index: 1; display: flex; flex: 0 0 145px; flex-direction: column; align-items: center; gap: 13px; padding: 0 8px; color: var(--color-text-light); background: none; border: 0; text-align: center; }
.timeline-tab span { display: grid; place-content: center; width: 42px; height: 42px; color: var(--color-primary); background: var(--color-paper-light); border: 1px solid var(--color-border); border-radius: 50%; font-family: var(--font-serif); font-size: 11px; font-weight: 700; transition: .25s ease; }
.timeline-tab strong { font-size: 12px; line-height: 1.45; }
.timeline-tab:hover span,
.timeline-tab:focus-visible span,
.timeline-tab.active span { color: white; background: var(--color-primary); border-color: var(--color-primary); box-shadow: 0 0 0 6px #f2ded8; }
.timeline-tab:focus-visible { outline: none; }
.timeline-tab.active strong { color: var(--color-primary); }
.timeline-detail { display: grid; grid-template-columns: 45% 1fr; min-height: 340px; color: white; background: var(--color-primary-dark); }
.timeline-photo { position: relative; min-height: 330px; overflow: hidden; }
.timeline-photo::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent 65%, var(--color-primary-dark)); }
.timeline-photo img { width: 100%; height: 100%; object-fit: cover; }
.timeline-photo > span { position: absolute; z-index: 1; bottom: 15px; left: 16px; padding: 6px 9px; background: rgba(20, 14, 13, .56); border-radius: 999px; font-size: 10px; }
.timeline-copy { align-self: center; padding: 45px clamp(30px, 5vw, 70px) 45px 40px; }
.detail-year { display: flex; align-items: center; gap: 7px; margin-bottom: 12px; color: #edb9ad; font-size: 12px; font-weight: 700; letter-spacing: .12em; }
.timeline-copy h3 { margin: 0 0 16px; font-size: clamp(29px, 3.5vw, 42px); }
.timeline-copy > p:not(.detail-year) { margin-bottom: 22px; color: rgba(255, 255, 255, .76); line-height: 1.85; }
.timeline-copy :deep(.source-badge summary) { color: #ffe8e1; background: rgba(255, 255, 255, .1); border-color: rgba(255, 255, 255, .2); }
.timeline-copy :deep(.source-detail) { color: var(--color-text-secondary); }
.archive-section { background: var(--color-paper); }
.archive-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 22px; }
.archive-card { display: grid; grid-template-columns: 40% 1fr; overflow: hidden; min-height: 310px; background: white; border: 1px solid rgba(120, 90, 70, .09); border-radius: var(--radius-large); box-shadow: var(--shadow-soft); }
.archive-image { position: relative; min-height: 290px; overflow: hidden; background: #d6bbb2; }
.archive-image::after { content: ''; position: absolute; inset: 0; background: linear-gradient(0deg, rgba(38, 23, 21, .5), transparent 45%); }
.archive-image img { width: 100%; height: 100%; object-fit: cover; }
.archive-image span { position: absolute; z-index: 1; bottom: 15px; left: 15px; color: rgba(255, 255, 255, .78); font-size: 10px; }
.archive-body { display: flex; flex-direction: column; padding: 26px; }
.archive-meta { display: flex; align-items: center; justify-content: space-between; gap: 12px; color: var(--color-text-light); font-size: 11px; }
.archive-meta span { padding: 5px 9px; color: var(--color-primary); background: #f7e8e3; border-radius: 999px; font-weight: 700; }
.archive-body h3 { margin: 17px 0 11px; font-size: 24px; }
.archive-body > p { margin: 0; color: var(--color-text-secondary); font-size: 14px; line-height: 1.72; }
.archive-related { display: flex; align-items: center; gap: 5px; margin: auto 0 14px; padding-top: 18px; color: var(--color-text-light); font-size: 11px; }
.history-cta { padding: 72px 0; color: white; background: linear-gradient(115deg, var(--color-primary-dark), #a64e43); }
.cta-inner { display: flex; align-items: center; justify-content: space-between; gap: 50px; }
.cta-inner p { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; color: #efbdb2; font-size: 11px; font-weight: 700; letter-spacing: .15em; }
.cta-inner h2 { max-width: 760px; margin: 0; font-size: clamp(28px, 4vw, 42px); line-height: 1.4; }
.cta-inner .btn { flex: none; }
.source-directory { padding: 22px 0; background: #2b2220; }
.source-directory-inner { display: flex; align-items: center; flex-wrap: wrap; gap: 10px 24px; color: rgba(255, 255, 255, .62); font-size: 11px; }
.source-directory-inner > span { color: #e8b4a8; font-weight: 700; letter-spacing: .12em; }
.source-directory-inner a { display: inline-flex; align-items: center; gap: 4px; }
.source-directory-inner a:hover { color: white; }

@media (max-width: 1050px) {
  .theme-grid { grid-template-columns: 1fr 1fr; }
  .theme-card:last-child { grid-column: 1 / -1; max-width: calc(50% - 12px); margin-inline: auto; }
  .archive-card { grid-template-columns: 1fr; }
  .archive-image { min-height: 240px; max-height: 300px; }
}

@media (max-width: 768px) {
  .scope-inner { align-items: flex-start; }
  .theme-grid { grid-template-columns: 1fr; }
  .theme-card:last-child { grid-column: auto; max-width: none; }
  .theme-image { height: 240px; }
  .theme-content > p:not(.theme-kicker) { min-height: 0; }
  .timeline-tabs { flex-direction: column; gap: 0; overflow: visible; padding: 24px 24px 10px; }
  .timeline-tabs::before { top: 32px; bottom: 32px; left: 44px; width: 1px; height: auto; }
  .timeline-tab { flex: none; flex-direction: row; align-items: center; width: 100%; min-height: 72px; padding: 8px 0; text-align: left; }
  .timeline-tab span { flex: none; }
  .timeline-tab strong { font-size: 13px; }
  .timeline-detail { grid-template-columns: 1fr; }
  .timeline-photo { min-height: 270px; }
  .timeline-photo::after { background: linear-gradient(0deg, var(--color-primary-dark), transparent 40%); }
  .timeline-copy { padding: 8px 26px 34px; }
  .archive-grid { grid-template-columns: 1fr; }
  .cta-inner { align-items: flex-start; flex-direction: column; gap: 28px; }
}

@media (max-width: 520px) {
  .scope-inner svg { display: none; }
  .archive-image { min-height: 220px; }
  .archive-body { padding: 22px; }
  .archive-meta { align-items: flex-start; flex-direction: column; }
  .source-directory-inner { align-items: flex-start; flex-direction: column; }
}
</style>
