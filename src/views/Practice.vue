<script setup>
import { computed, ref } from 'vue'
import { useHead } from '@vueuse/head'
import {
  Archive,
  ArrowRight,
  CalendarDays,
  Camera,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Film,
  FolderOpen,
  Landmark,
  MapPin,
  Megaphone,
  MonitorUp,
  Play,
  ShieldCheck,
  Sparkles,
} from 'lucide-vue-next'
import PageHero from '../components/PageHero.vue'
import PracticeGallery from '../components/PracticeGallery.vue'
import SectionTitle from '../components/SectionTitle.vue'
import {
  practiceGallery,
  practiceNotices,
  practiceOverview,
  practicePhases,
  practiceVideos,
  videoPublishChecklist,
} from '../data/practice'
import { useReveal } from '../composables/useReveal'

useHead({
  title: '实践风采｜青声传薪·数扬侨魂',
  meta: [
    {
      name: 'description',
      content: '记录三期凤林美社区青少年主题宣讲、华侨博物院与厦门侨批相关场馆寻访、资料整理和华侨革命史科普网页建设的真实实践过程。',
    },
    { property: 'og:title', content: '实践风采｜青声传薪·数扬侨魂' },
    {
      property: 'og:description',
      content: '从社区传薪、寻访侨迹，到资料整理与数字科普网页建设，完整记录团队实践。',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: '/images/museum/museum-18.webp' },
  ],
})

useReveal()

const phaseIcons = {
  lecture: Megaphone,
  visit: Landmark,
  archive: Archive,
  website: MonitorUp,
}

const journey = [
  { number: '01', label: '社区传薪', caption: '连续开展三期青少年主题宣讲' },
  { number: '02', label: '寻访侨迹', caption: '带着课堂问题走进历史现场' },
  { number: '03', label: '数字留存', caption: '分类整理课件、照片与资料来源' },
  { number: '04', label: '长效传播', caption: '持续建设华侨革命史科普网页' },
]

const activeCategory = ref('全部')
const galleryCategories = ['全部', ...new Set(practiceGallery.map((item) => item.category))]
const filteredGallery = computed(() => (
  activeCategory.value === '全部'
    ? practiceGallery
    : practiceGallery.filter((item) => item.category === activeCategory.value)
))
</script>

<template>
  <main class="practice-page">
    <PageHero
      eyebrow="YOUTH PRACTICE ARCHIVE"
      title="实践风采"
      subtitle="从三期社区侨课出发，走进华侨文化场馆，再把真实实践整理成长期开放的数字科普内容。"
      background-image="/images/museum/museum-18.webp"
    />

    <section class="journey-band" aria-label="实践主线">
      <div class="container">
        <ol class="journey-list">
          <li v-for="(step, index) in journey" :key="step.number">
            <span class="journey-number">{{ step.number }}</span>
            <div>
              <strong>{{ step.label }}</strong>
              <p>{{ step.caption }}</p>
            </div>
            <ArrowRight v-if="index < journey.length - 1" :size="18" class="journey-arrow" aria-hidden="true" />
          </li>
        </ol>
      </div>
    </section>

    <section class="section overview-section paper-texture">
      <div class="container overview-grid reveal">
        <div>
          <SectionTitle
            eyebrow="WHAT WE DID"
            title="一次实践，沿着真实问题不断向前"
            subtitle="团队先在凤林美社区完成三期主题宣讲，再前往华侨博物院和厦门侨批相关场馆寻访；随后汇总课件、照片、报道和学习笔记，着手建设数字科普网页。"
          />
          <p class="overview-copy">
            这不是一条预先包装好的“展示路线”，而是从课堂问题自然走向历史现场、再走向数字整理的实践过程。本页只使用团队材料能够确认的时间、地点与内容；尚未核实的信息会直接标注，不用推测补全。
          </p>
        </div>

        <aside class="accuracy-card" aria-label="内容核验说明">
          <span class="accuracy-icon"><FileCheck2 :size="27" /></span>
          <p>CONTENT NOTE</p>
          <h2 class="serif">每一份展示，都应当有真实材料支撑</h2>
          <ul>
            <li><CheckCircle2 :size="16" />不虚构活动人数、评价和参与者发言</li>
            <li><CheckCircle2 :size="16" />不补写未确认的馆藏编号与拍摄日期</li>
            <li><CheckCircle2 :size="16" />课件画面和现场照片分开标注</li>
          </ul>
        </aside>
      </div>

      <div class="container overview-stats" aria-label="实践内容概览">
        <article v-for="item in practiceOverview" :key="item.label" class="overview-stat reveal">
          <strong class="serif">{{ item.value }}</strong>
          <div>
            <h3>{{ item.label }}</h3>
            <p>{{ item.note }}</p>
          </div>
        </article>
      </div>
    </section>

    <section class="section phases-section">
      <div class="container">
        <SectionTitle
          eyebrow="PRACTICE JOURNEY"
          title="我们的实践，是这样一步一步发生的"
          subtitle="三期宣讲在前，场馆寻访在后；完成线下实践以后，再进入资料整理和网页建设阶段。"
          light
        />

        <div class="phase-list">
          <article
            v-for="(phase, index) in practicePhases"
            :key="phase.id"
            class="phase-card reveal"
            :class="{ reverse: index % 2 === 1 }"
          >
            <div v-if="phase.image" class="phase-visual">
              <img :src="phase.image" :alt="phase.imageAlt" loading="lazy" decoding="async" />
              <span>{{ phase.visualLabel }}</span>
            </div>

            <div v-else class="phase-visual phase-placeholder" aria-hidden="true">
              <component :is="phaseIcons[phase.icon]" :size="48" stroke-width="1.25" />
              <div v-if="phase.icon === 'archive'" class="archive-files">
                <span>PPT</span><span>PHOTO</span><span>SOURCE</span>
              </div>
              <div v-else class="website-lines">
                <i></i><i></i><i></i>
              </div>
              <span>{{ phase.visualLabel }}</span>
            </div>

            <div class="phase-copy">
              <div class="phase-topline">
                <span class="phase-sequence">{{ phase.sequence }}</span>
                <span class="phase-group">{{ phase.group }}</span>
              </div>

              <div class="phase-icon"><component :is="phaseIcons[phase.icon]" :size="21" /></div>
              <h3 class="serif">{{ phase.title }}</h3>

              <div class="phase-meta">
                <span><CalendarDays :size="15" />{{ phase.date }}</span>
                <span><MapPin :size="15" />{{ phase.location }}</span>
              </div>

              <p>{{ phase.description }}</p>
              <ul>
                <li v-for="highlight in phase.highlights" :key="highlight">{{ highlight }}</li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section gallery-section">
      <div class="container">
        <div class="gallery-heading">
          <SectionTitle
            eyebrow="PRACTICE MOMENTS"
            title="真实材料中的实践片段"
            subtitle="这里同时收录三期真实课件画面与场馆实拍。每张图片都标明材料类型，点击可查看说明和公开使用提示。"
          />
          <div class="gallery-count" aria-label="当前显示的图片数量">
            <Camera :size="21" />
            <span><strong>{{ filteredGallery.length }}</strong> / {{ practiceGallery.length }}</span>
          </div>
        </div>

        <div class="gallery-tools">
          <div class="gallery-filters" role="group" aria-label="实践影像分类筛选">
            <button
              v-for="category in galleryCategories"
              :key="category"
              type="button"
              :class="{ active: activeCategory === category }"
              :aria-pressed="activeCategory === category"
              @click="activeCategory = category"
            >
              {{ category }}
            </button>
          </div>

          <div class="privacy-pill">
            <ShieldCheck :size="16" />
            <span>人物正脸与未成年人影像上线前须完成授权核验</span>
          </div>
        </div>

        <PracticeGallery :key="activeCategory" :images="filteredGallery" />

        <aside class="material-notice" aria-label="素材使用说明">
          <div class="material-notice-title">
            <ShieldCheck :size="25" />
            <div>
              <span>素材核验提示</span>
              <h3>不让“展示完整”先于“事实准确”</h3>
            </div>
          </div>
          <ul>
            <li v-for="notice in practiceNotices" :key="notice">{{ notice }}</li>
          </ul>
        </aside>
      </div>
    </section>

    <section class="section video-section">
      <div class="container">
        <div class="video-heading">
          <SectionTitle
            eyebrow="PRACTICE VIDEO"
            title="实践纪实视频"
            subtitle="视频专区已经预留，但完整成片尚在剪辑。完成授权和版权核验之前，页面不会请求或播放预设视频文件。"
            light
          />
          <span class="production-badge"><Clock3 :size="16" />剪辑制作中</span>
        </div>

        <div class="video-grid">
          <article v-for="video in practiceVideos" :key="video.id" class="video-card reveal">
            <div class="video-media">
              <video
                v-if="video.publishable && video.src"
                controls
                preload="metadata"
                :poster="video.poster"
              >
                <source :src="video.src" :type="video.type" />
                你的浏览器暂不支持 HTML5 视频播放。
              </video>

              <div v-else class="video-placeholder">
                <img :src="video.poster" alt="华侨博物院建筑，作为实践纪实视频待定封面" loading="lazy" />
                <div class="video-shade"></div>
                <span class="play-icon"><Play :size="29" fill="currentColor" /></span>
                <span class="video-status"><Film :size="16" />{{ video.status }}</span>
              </div>
            </div>

            <div class="video-copy">
              <p>{{ video.source }}</p>
              <h3 class="serif">{{ video.title }}</h3>
              <p>{{ video.description }}</p>
              <div class="video-rights">
                <ShieldCheck :size="17" />
                <span>{{ video.rightsNote }}</span>
              </div>
            </div>
          </article>

          <aside class="publish-guide reveal">
            <div class="guide-icon"><FolderOpen :size="29" /></div>
            <span>上线替换说明</span>
            <h3 class="serif">成片完成后，按四步开放播放</h3>
            <ol>
              <li v-for="(step, index) in videoPublishChecklist" :key="step">
                <span>{{ String(index + 1).padStart(2, '0') }}</span>
                <p>{{ step }}</p>
              </li>
            </ol>
            <div class="path-note">
              <Film :size="16" />
              <span>预设文件位置</span>
              <code>/videos/practice-documentary.mp4</code>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <section class="closing-section paper-texture">
      <div class="container closing-inner reveal">
        <Sparkles :size="29" />
        <p>三堂侨课，是故事的起点；一次寻访，让历史从文字走进现场；而科普网页的持续建设，让这些真实相遇能够被更久地看见。</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.practice-page {
  overflow: clip;
  background: var(--color-background);
}

.journey-band {
  position: relative;
  z-index: 2;
  color: white;
  background: linear-gradient(90deg, #6f2827, var(--color-primary), #7b2d2b);
  box-shadow: 0 18px 42px rgba(87, 31, 29, .18);
}

.journey-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 0;
  padding: 0;
  list-style: none;
}

.journey-list li {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 14px;
  min-height: 128px;
  padding: 23px 29px;
  border-left: 1px solid rgba(255, 255, 255, .14);
}

.journey-list li:last-child { border-right: 1px solid rgba(255, 255, 255, .14); }
.journey-number { color: #ecc0b6; font-family: var(--font-serif); font-size: 28px; }
.journey-list strong { font-family: var(--font-serif); font-size: 17px; }
.journey-list p { margin: 6px 0 0; color: rgba(255, 255, 255, .62); font-size: 11px; line-height: 1.6; }
.journey-arrow { position: absolute; z-index: 2; top: 50%; right: -9px; color: #f0c5bb; transform: translateY(-50%); }

.overview-section { background-color: var(--color-paper-light); }
.overview-grid { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(340px, .85fr); gap: 80px; align-items: center; }
.overview-grid :deep(.section-title) { margin-bottom: 20px; }
.overview-copy { max-width: 760px; margin: 0; color: var(--color-text-secondary); font-size: 16px; line-height: 1.95; }

.accuracy-card {
  position: relative;
  overflow: hidden;
  padding: 40px;
  color: white;
  background: linear-gradient(145deg, #a0473f, #722927 70%);
  border-radius: var(--radius-large);
  box-shadow: 0 23px 55px rgba(100, 38, 34, .22);
}

.accuracy-card::after {
  content: 'TRUE';
  position: absolute;
  right: -6px;
  bottom: -26px;
  color: rgba(255, 255, 255, .045);
  font-family: var(--font-serif);
  font-size: 94px;
  font-weight: 700;
}

.accuracy-icon {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  color: #f2c7bd;
  background: rgba(255, 255, 255, .1);
  border: 1px solid rgba(255, 255, 255, .16);
  border-radius: 50%;
}

.accuracy-card > p { margin: 25px 0 9px; color: #e9afa1; font-size: 11px; font-weight: 700; letter-spacing: .16em; }
.accuracy-card h2 { margin: 0; font-size: 27px; line-height: 1.5; }
.accuracy-card ul { position: relative; z-index: 1; display: grid; gap: 12px; margin: 24px 0 0; padding: 21px 0 0; border-top: 1px solid rgba(255, 255, 255, .14); list-style: none; }
.accuracy-card li { display: flex; align-items: flex-start; gap: 9px; color: rgba(255, 255, 255, .74); font-size: 13px; line-height: 1.65; }
.accuracy-card li svg { flex: none; margin-top: 2px; color: #efb8aa; }

.overview-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 68px; }
.overview-stat { display: grid; grid-template-columns: auto 1fr; align-items: center; gap: 19px; padding: 27px 25px; background: rgba(255, 255, 255, .72); border: 1px solid rgba(125, 87, 70, .11); border-radius: var(--radius-medium); box-shadow: var(--shadow-soft); }
.overview-stat > strong { color: var(--color-primary); font-size: 34px; white-space: nowrap; }
.overview-stat h3 { margin: 0; font-size: 14px; }
.overview-stat p { margin: 6px 0 0; color: var(--color-text-light); font-size: 11px; line-height: 1.6; }

.phases-section { color: white; background: #2c2524; }
.phases-section :deep(.section-title p) { color: rgba(255, 255, 255, .62); }
.phase-list { position: relative; display: grid; gap: 34px; }
.phase-list::before { content: ''; position: absolute; top: 0; bottom: 0; left: 50%; width: 1px; background: linear-gradient(transparent, rgba(218, 139, 121, .4) 8%, rgba(218, 139, 121, .4) 92%, transparent); }

.phase-card {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  overflow: hidden;
  background: #372d2c;
  border: 1px solid rgba(255, 255, 255, .09);
  border-radius: var(--radius-large);
  box-shadow: 0 18px 45px rgba(0, 0, 0, .16);
}

.phase-card.reverse .phase-visual { order: 2; }
.phase-visual { position: relative; min-height: 390px; overflow: hidden; background: #4a3733; }
.phase-visual::after { content: ''; position: absolute; inset: 50% 0 0; background: linear-gradient(transparent, rgba(29, 22, 21, .62)); }
.phase-visual img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s ease; }
.phase-card:hover .phase-visual img { transform: scale(1.03); }
.phase-visual > span:last-child { position: absolute; z-index: 2; right: 18px; bottom: 16px; padding: 7px 11px; color: rgba(255, 255, 255, .82); background: rgba(44, 29, 27, .64); border: 1px solid rgba(255, 255, 255, .15); border-radius: 999px; backdrop-filter: blur(10px); font-size: 10px; letter-spacing: .08em; }

.phase-placeholder {
  display: grid;
  place-items: center;
  color: rgba(244, 198, 187, .72);
  background:
    linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px),
    radial-gradient(circle at 50% 50%, #71433d, #44312e 68%);
  background-size: 32px 32px, 32px 32px, auto;
}
.phase-placeholder::after { display: none; }
.archive-files { position: absolute; display: flex; gap: 9px; margin-top: 115px; }
.archive-files span { padding: 7px 10px; color: rgba(255, 255, 255, .68); background: rgba(255, 255, 255, .07); border: 1px solid rgba(255, 255, 255, .12); border-radius: 6px; font-size: 9px; letter-spacing: .1em; }
.website-lines { position: absolute; display: grid; gap: 8px; width: 120px; margin-top: 116px; }
.website-lines i { display: block; height: 5px; background: rgba(255, 255, 255, .14); border-radius: 999px; }
.website-lines i:nth-child(2) { width: 76%; }
.website-lines i:nth-child(3) { width: 52%; }

.phase-copy { position: relative; display: flex; flex-direction: column; justify-content: center; min-height: 390px; padding: 42px 44px; }
.phase-topline { display: flex; align-items: center; gap: 12px; }
.phase-sequence { color: #e8a99a; font-family: var(--font-serif); font-size: 28px; }
.phase-group { padding: 6px 10px; color: #ecc0b6; background: rgba(157, 63, 56, .18); border: 1px solid rgba(217, 136, 118, .22); border-radius: 999px; font-size: 11px; }
.phase-icon { position: absolute; top: 39px; right: 40px; display: grid; place-items: center; width: 43px; height: 43px; color: #e4a294; background: rgba(255, 255, 255, .055); border: 1px solid rgba(255, 255, 255, .09); border-radius: 50%; }
.phase-copy h3 { max-width: 510px; margin: 20px 0 14px; font-size: clamp(25px, 2.4vw, 34px); line-height: 1.5; }
.phase-meta { display: flex; flex-wrap: wrap; gap: 8px 17px; color: rgba(255, 255, 255, .48); font-size: 11px; }
.phase-meta span { display: flex; align-items: center; gap: 6px; }
.phase-copy > p { margin: 21px 0 0; color: rgba(255, 255, 255, .66); font-size: 14px; line-height: 1.85; }
.phase-copy ul { display: flex; flex-wrap: wrap; gap: 8px; margin: 22px 0 0; padding: 0; list-style: none; }
.phase-copy li { padding: 6px 10px; color: #e9c1b8; background: rgba(157, 63, 56, .14); border: 1px solid rgba(215, 137, 120, .16); border-radius: 999px; font-size: 10px; }

.gallery-section { background: var(--color-paper); }
.gallery-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 30px; }
.gallery-heading :deep(.section-title) { margin-bottom: 0; }
.gallery-count { display: flex; align-items: center; gap: 10px; flex: none; padding: 14px 18px; color: var(--color-primary); background: white; border: 1px solid rgba(123, 86, 67, .12); border-radius: var(--radius-medium); box-shadow: var(--shadow-soft); }
.gallery-count span { color: var(--color-text-light); font-size: 13px; }
.gallery-count strong { color: var(--color-primary); font-family: var(--font-serif); font-size: 24px; }
.gallery-tools { display: flex; align-items: center; justify-content: space-between; gap: 20px; margin: 36px 0 28px; }
.gallery-filters { display: flex; flex-wrap: wrap; gap: 9px; }
.gallery-filters button { min-height: 40px; padding: 0 17px; color: var(--color-text-secondary); background: rgba(255, 255, 255, .72); border: 1px solid var(--color-border); border-radius: 999px; font: inherit; font-size: 13px; cursor: pointer; transition: color .2s ease, background .2s ease, border-color .2s ease, transform .2s ease; }
.gallery-filters button:hover { color: var(--color-primary); border-color: var(--color-primary-light); transform: translateY(-1px); }
.gallery-filters button.active { color: white; background: var(--color-primary); border-color: var(--color-primary); }
.gallery-filters button:focus-visible { outline: 3px solid rgba(157, 63, 56, .22); outline-offset: 3px; }
.privacy-pill { display: flex; align-items: center; gap: 8px; flex: none; max-width: 360px; padding: 10px 13px; color: var(--color-primary-dark); background: #f1ddd5; border-radius: 999px; font-size: 11px; line-height: 1.5; }

.material-notice { display: grid; grid-template-columns: minmax(250px, .62fr) minmax(0, 1.38fr); gap: 42px; margin-top: 58px; padding: 31px 34px; color: var(--color-text-secondary); background: rgba(255, 255, 255, .64); border: 1px solid rgba(123, 86, 67, .13); border-radius: var(--radius-large); }
.material-notice-title { display: flex; align-items: flex-start; gap: 14px; color: var(--color-primary); }
.material-notice-title svg { flex: none; }
.material-notice-title span { font-size: 10px; font-weight: 700; letter-spacing: .12em; }
.material-notice-title h3 { margin: 7px 0 0; color: var(--color-text); font-family: var(--font-serif); font-size: 20px; line-height: 1.45; }
.material-notice ul { display: grid; gap: 10px; margin: 0; padding: 0; list-style: none; counter-reset: notice; }
.material-notice li { position: relative; padding-left: 25px; font-size: 12px; line-height: 1.75; counter-increment: notice; }
.material-notice li::before { content: counter(notice, decimal-leading-zero); position: absolute; left: 0; color: var(--color-primary-light); font-family: var(--font-serif); font-size: 10px; }

.video-section { color: white; background: #251f1e; }
.video-section :deep(.section-title p) { color: rgba(255, 255, 255, .62); }
.video-heading { display: flex; align-items: flex-start; justify-content: space-between; gap: 35px; }
.production-badge { display: inline-flex; align-items: center; gap: 8px; flex: none; padding: 10px 14px; color: #f0c8be; background: rgba(157, 63, 56, .2); border: 1px solid rgba(223, 146, 129, .22); border-radius: 999px; font-size: 12px; }
.video-grid { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(340px, .85fr); gap: 26px; }
.video-card, .publish-guide { overflow: hidden; background: #332928; border: 1px solid rgba(255, 255, 255, .09); border-radius: var(--radius-large); }
.video-media { aspect-ratio: 16 / 9; overflow: hidden; background: #171312; }
.video-media video { display: block; width: 100%; height: 100%; object-fit: contain; }
.video-placeholder { position: relative; width: 100%; height: 100%; overflow: hidden; }
.video-placeholder img { width: 100%; height: 100%; object-fit: cover; filter: saturate(.72); }
.video-shade { position: absolute; inset: 0; background: linear-gradient(rgba(49, 28, 26, .22), rgba(36, 21, 20, .78)); }
.play-icon { position: absolute; top: 50%; left: 50%; display: grid; place-items: center; width: 70px; height: 70px; padding-left: 4px; color: #efb5a8; background: rgba(50, 26, 24, .68); border: 1px solid rgba(255, 255, 255, .22); border-radius: 50%; backdrop-filter: blur(10px); transform: translate(-50%, -50%); }
.video-status { position: absolute; right: 18px; bottom: 17px; display: flex; align-items: center; gap: 7px; padding: 8px 11px; color: white; background: rgba(157, 63, 56, .74); border: 1px solid rgba(255, 255, 255, .15); border-radius: 999px; font-size: 11px; }
.video-copy { padding: 28px 30px 30px; }
.video-copy > p:first-child { margin: 0; color: #d99585; font-size: 10px; font-weight: 700; letter-spacing: .1em; }
.video-copy h3 { margin: 13px 0 10px; font-size: 27px; line-height: 1.5; }
.video-copy > p:nth-of-type(2) { margin: 0; color: rgba(255, 255, 255, .63); font-size: 13px; line-height: 1.8; }
.video-rights { display: flex; align-items: flex-start; gap: 9px; margin-top: 21px; padding: 14px 15px; color: #e9c2b8; background: rgba(157, 63, 56, .13); border: 1px solid rgba(220, 141, 123, .16); border-radius: 12px; font-size: 10px; line-height: 1.7; }
.video-rights svg { flex: none; margin-top: 1px; }

.publish-guide { padding: 32px; }
.guide-icon { display: grid; place-items: center; width: 55px; height: 55px; color: #e5a899; background: rgba(157, 63, 56, .16); border: 1px solid rgba(220, 141, 123, .17); border-radius: 50%; }
.publish-guide > span { display: block; margin-top: 23px; color: #d99585; font-size: 10px; font-weight: 700; letter-spacing: .13em; }
.publish-guide h3 { margin: 9px 0 20px; font-size: 24px; line-height: 1.5; }
.publish-guide ol { display: grid; gap: 11px; margin: 0; padding: 0; list-style: none; }
.publish-guide li { display: grid; grid-template-columns: auto 1fr; gap: 11px; align-items: start; }
.publish-guide li > span { color: #da9687; font-family: var(--font-serif); font-size: 12px; }
.publish-guide li p { margin: 0; color: rgba(255, 255, 255, .62); font-size: 11px; line-height: 1.7; }
.path-note { display: grid; grid-template-columns: auto 1fr; align-items: center; gap: 5px 9px; margin-top: 23px; padding-top: 20px; color: #dca093; border-top: 1px solid rgba(255, 255, 255, .1); }
.path-note svg { grid-row: span 2; }
.path-note span { font-size: 10px; }
.path-note code { min-width: 0; overflow-wrap: anywhere; color: rgba(255, 255, 255, .72); font-family: Consolas, monospace; font-size: 10px; }

.closing-section { padding: 72px 0; background-color: var(--color-paper-light); }
.closing-inner { display: flex; align-items: center; gap: 22px; max-width: 920px; color: var(--color-primary); }
.closing-inner svg { flex: none; }
.closing-inner p { margin: 0; color: var(--color-text); font-family: var(--font-serif); font-size: clamp(21px, 2.6vw, 30px); line-height: 1.75; }

@media (max-width: 1040px) {
  .journey-list { grid-template-columns: repeat(2, 1fr); }
  .journey-list li:nth-child(2) { border-right: 1px solid rgba(255, 255, 255, .14); }
  .journey-list li:nth-child(n + 3) { border-top: 1px solid rgba(255, 255, 255, .14); }
  .journey-arrow { display: none; }
  .overview-grid { grid-template-columns: 1fr; gap: 46px; }
  .accuracy-card { max-width: 720px; }
  .overview-stats { grid-template-columns: 1fr 1fr; }
  .overview-stat:last-child { grid-column: 1 / -1; }
  .video-grid { grid-template-columns: 1fr; }
  .publish-guide { max-width: 720px; }
}

@media (max-width: 800px) {
  .phase-list::before { left: 24px; }
  .phase-card,
  .phase-card.reverse { grid-template-columns: 1fr; margin-left: 18px; }
  .phase-card.reverse .phase-visual { order: 0; }
  .phase-visual { min-height: 310px; }
  .phase-copy { min-height: 0; padding: 33px 31px 36px; }
  .gallery-heading,
  .gallery-tools,
  .video-heading { align-items: flex-start; flex-direction: column; }
  .privacy-pill { max-width: none; }
  .material-notice { grid-template-columns: 1fr; gap: 25px; }
}

@media (max-width: 576px) {
  .journey-list { grid-template-columns: 1fr; }
  .journey-list li { min-height: 104px; padding: 20px 22px; border-right: 1px solid rgba(255, 255, 255, .14); border-bottom: 1px solid rgba(255, 255, 255, .14); }
  .overview-stats { grid-template-columns: 1fr; gap: 12px; margin-top: 45px; }
  .overview-stat:last-child { grid-column: auto; }
  .accuracy-card { padding: 31px 27px; }
  .accuracy-card h2 { font-size: 23px; }
  .phase-card,
  .phase-card.reverse { margin-left: 11px; border-radius: var(--radius-medium); }
  .phase-list::before { left: 12px; }
  .phase-visual { min-height: 230px; }
  .phase-copy { padding: 28px 22px 30px; }
  .phase-icon { top: 26px; right: 21px; }
  .phase-copy h3 { padding-right: 18px; font-size: 24px; }
  .phase-meta { display: grid; }
  .gallery-filters { gap: 7px; }
  .gallery-filters button { min-height: 38px; padding-inline: 14px; font-size: 12px; }
  .privacy-pill { align-items: flex-start; border-radius: 13px; }
  .material-notice { padding: 26px 22px; }
  .video-copy,
  .publish-guide { padding: 25px 22px; }
  .play-icon { width: 58px; height: 58px; }
  .closing-inner { align-items: flex-start; }
}

@media (prefers-reduced-motion: reduce) {
  .phase-visual img,
  .gallery-filters button { transition: none; }
}
</style>
