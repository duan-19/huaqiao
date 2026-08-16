<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useHead } from '@vueuse/head'
import { ArrowRight, ChevronDown, Presentation, Images, Newspaper, Landmark, BookOpen, CircleHelp, Milestone, ExternalLink, Compass, Waves } from 'lucide-vue-next'
import SectionTitle from '../components/SectionTitle.vue'
import CourseCard from '../components/CourseCard.vue'
import ArticleCard from '../components/ArticleCard.vue'
import { courses } from '../data/courses'
import { statistics } from '../data/statistics'
import { practiceTimeline } from '../data/practiceTimeline'
import { articles } from '../data/articles'
import { useReveal } from '../composables/useReveal'

useHead({
  title: '青声传薪·数扬侨魂｜华侨革命史数字科普实践平台',
  meta: [
    { name: 'description', content: '计算机科学与技术学院“青声传薪，数扬侨魂”华侨革命史科普实践团数字成果平台，展示三期社区宣讲、场馆寻访、数字课件与公益科普资源。' },
    { property: 'og:title', content: '青声传薪·数扬侨魂' },
    { property: 'og:description', content: '以青年之声讲述侨史，以数字之力传承侨魂。' },
    { property: 'og:type', content: 'website' },
  ],
})

useReveal()
const activeStep = ref(0)
const countValues = ref(statistics.map((item) => item.value === null ? item.display : 0))
let counterObserver
onMounted(() => {
  const target = document.querySelector('.stats-grid')
  counterObserver = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return
    statistics.forEach((item, index) => {
      if (item.value === null) return
      const start = performance.now()
      const tick = (now) => {
        const progress = Math.min((now - start) / 900, 1)
        countValues.value[index] = Math.round(item.value * (1 - Math.pow(1 - progress, 3)))
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    })
    counterObserver.disconnect()
  }, { threshold: .4 })
  if (target) counterObserver.observe(target)
})
onUnmounted(() => counterObserver?.disconnect())

const activeTimeline = computed(() => practiceTimeline[activeStep.value])
const bentoItems = [
  { icon: Presentation, title: '三期原创课件', text: '在线预览与公益下载', class: 'wide red', to: '/achievements' },
  { icon: Images, title: '实践影像', text: '完整流程、照片墙与视频', class: 'photo', to: '/practice' },
  { icon: Newspaper, title: '实践推文', text: '阅读真实实践报道', class: 'paper', to: '/achievements' },
  { icon: Landmark, title: '博物馆影像', text: '从课堂走进历史现场', class: 'blue', to: '/visit' },
  { icon: BookOpen, title: '数字科普', text: '轻量阅读华侨史故事', class: 'tall', to: '/history' },
  { icon: CircleHelp, title: '侨史知识挑战', text: '500道题库 · 每轮随机20题', class: 'quiz', to: '/quiz' },
  { icon: Milestone, title: '互动时间轴', text: '沿年份寻找历史线索', class: 'wide line', to: '/history' },
  { icon: ExternalLink, title: '权威学习资源', text: '文章、视频与官方入口', class: 'link', to: '/resources' },
]
</script>

<template>
  <div class="home">
    <section class="hero">
      <img class="hero-bg" src="/images/museum/museum-18.webp" alt="实践团寻访的华侨博物院建筑" fetchpriority="high" />
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <div class="hero-copy">
          <div class="hero-kicker"><span></span>计算机科学与技术学院 · 暑期社会实践数字成果</div>
          <h1 class="serif"><span>青声传薪</span><small>数扬侨魂</small></h1>
          <p class="hero-subtitle">华侨革命史数字科普实践平台</p>
          <p class="hero-lead">以青年之声讲述侨史，以数字之力传承侨魂。</p>
          <p class="hero-description">从社区课堂出发，走进真实历史现场，让跨越山海的家国记忆被更多青年看见。</p>
          <div class="hero-actions">
            <RouterLink to="/classes" class="btn btn-primary">开启侨史之旅 <ArrowRight :size="18" /></RouterLink>
            <a href="#story" class="btn btn-outline-light">了解我们的实践</a>
          </div>
        </div>
      </div>
      <a href="#intro" class="scroll-hint"><span>向下探索</span><ChevronDown :size="20" /></a>
      <div class="hero-index"><span>社区传薪</span><i></i><span>01 / 05</span></div>
    </section>

    <section id="intro" class="section intro paper-texture">
      <div class="container reveal">
        <div class="intro-mark"><Waves :size="24" /><span>FROM CLASSROOM TO HISTORY</span></div>
        <blockquote class="serif">从社区课堂出发，<br><em>带着少年的问题</em>走进历史现场。</blockquote>
        <p>三期社区宣讲之后，实践团进一步走进华侨博物院和侨批相关场馆，在真实史料与历史空间中继续寻找答案，并将所学整理为长期开放的数字科普资源。</p>
      </div>
    </section>

    <section class="section stats-section">
      <div class="container">
        <SectionTitle eyebrow="OUR FOOTPRINTS" title="我们的实践足迹" subtitle="把一步一步走过的实践路，沉淀为可以持续生长的数字记录。" />
        <div class="stats-grid reveal">
          <article v-for="(item, index) in statistics" :key="item.label" class="stat-card">
            <div class="stat-top"><span class="stat-number serif">{{ countValues[index] }}</span><span class="stat-suffix">{{ item.suffix }}</span></div>
            <h3>{{ item.label }}</h3><p>{{ item.note }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section courses-section section-soft">
      <div class="container">
        <div class="courses-heading reveal">
          <SectionTitle eyebrow="THREE CLASSES" title="三堂侨课 · 青声传薪" subtitle="从烽火岁月、青年榜样到山海家书，我们尝试用青少年能够理解的方式讲述华侨革命史。" />
          <RouterLink to="/classes" class="all-link">查看全部侨课 <ArrowRight :size="18" /></RouterLink>
        </div>
        <div class="courses-grid reveal"><CourseCard v-for="course in courses" :key="course.id" :course="course" /></div>
      </div>
    </section>

    <section id="story" class="section story-section">
      <div class="container">
        <SectionTitle class="reveal" eyebrow="THE REAL JOURNEY" title="我们的实践，是这样一步一步发生的" subtitle="先在社区播下问题，再走进场馆寻找答案。这里严格按照团队真实实践顺序呈现。" />
        <div class="timeline-shell reveal">
          <div class="timeline-track">
            <button v-for="(step, index) in practiceTimeline" :key="step.number" class="timeline-node" :class="{ active: activeStep === index, passed: activeStep > index }" @click="activeStep = index">
              <span>{{ step.number }}</span><strong>{{ step.title }}</strong>
            </button>
          </div>
          <div class="timeline-detail">
            <div><span class="detail-index">STEP {{ activeTimeline.number }}</span><h3 class="serif">{{ activeTimeline.title }}</h3><p>{{ activeTimeline.text }}</p></div>
            <div class="detail-art"><img :src="activeTimeline.image" :alt="activeTimeline.alt" loading="lazy" /></div>
          </div>
        </div>
      </div>
    </section>

    <section class="museum-section">
      <div class="museum-image reveal"><img src="/images/museum/museum-10.webp" alt="团队成员在展厅记录公开展陈" loading="lazy"><span>团队场馆寻访实拍</span></div>
      <div class="museum-copy reveal">
        <span class="eyebrow">FROM CLASSROOM TO MUSEUM</span>
        <h2 class="serif">带着课堂中的问题，<br>走进真正的<em>历史现场</em></h2>
        <p>三期社区宣讲完成后，实践团进一步走进华侨博物院和侨批相关场馆，通过展品、文献、实物和现场讲解，对宣讲中的历史内容进行进一步学习和印证。</p>
        <div class="route-line"><span>社区课堂</span><i></i><span>场馆寻访</span><i></i><span>数字留存</span></div>
        <RouterLink to="/visit" class="btn btn-light">查看场馆寻访 <ArrowRight :size="18" /></RouterLink>
      </div>
    </section>

    <section class="section outcomes-section paper-texture">
      <div class="container">
        <SectionTitle class="reveal" align="center" eyebrow="DIGITAL ARCHIVE" title="让一次实践，成为长期开放的数字资源" subtitle="不是一次性的成果照片墙，而是一座可以继续阅读、学习与使用的青年数字展厅。" />
        <div class="bento-grid reveal">
          <RouterLink v-for="item in bentoItems" :key="item.title" :to="item.to" class="bento-card" :class="item.class">
            <component :is="item.icon" :size="27" stroke-width="1.6" /><div><h3>{{ item.title }}</h3><p>{{ item.text }}</p></div><ArrowRight class="bento-arrow" :size="18" />
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="section articles-section">
      <div class="container">
        <div class="articles-heading reveal"><SectionTitle eyebrow="PRACTICE STORIES" title="实践报道" subtitle="用真实文字记录每一次相遇。正式链接接入后，将在新窗口阅读原文。" /><RouterLink to="/practice" class="all-link">查看完整实践风采 <ArrowRight :size="18" /></RouterLink></div>
        <div class="articles-grid reveal"><ArticleCard v-for="article in articles" :key="article.title" :article="article" /></div>
      </div>
    </section>

    <section class="closing-cta">
      <div class="closing-route"><Compass :size="30" /><span>三堂侨课</span><i></i><span>一次寻访</span><i></i><span>一场跨越山海的历史对话</span></div>
      <h2 class="serif">旧侨批与新青年，<br>在数字世界里再次相遇。</h2>
      <RouterLink to="/classes" class="btn btn-light">开启侨史之旅 <ArrowRight :size="18" /></RouterLink>
    </section>
  </div>
</template>

<style scoped>
.hero { position: relative; display: flex; align-items: center; min-height: max(720px, 100vh); overflow: hidden; color: white; background: #3d1d1d; }
.hero-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.hero-overlay { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(45,19,19,.88) 0%, rgba(91,35,32,.64) 42%, rgba(107,42,36,.14) 78%), linear-gradient(0deg, rgba(45,20,19,.46), transparent 38%); }
.hero-content { position: relative; z-index: 2; padding-top: 76px; }
.hero-copy { max-width: 720px; }
.hero-kicker { display: flex; align-items: center; gap: 12px; margin-bottom: 25px; color: #e7c9bd; font-size: 13px; letter-spacing: .08em; opacity: 0; animation: heroReveal .55s ease .08s forwards; }
.hero-kicker span { width: 28px; height: 1px; background: var(--color-primary-light); }
.hero h1 { margin: 0; font-size: clamp(64px, 7.2vw, 104px); font-weight: 600; line-height: .98; letter-spacing: -.055em; opacity: 0; animation: heroReveal .6s ease .18s forwards; }
.hero h1 span, .hero h1 small { display: block; }.hero h1 small { margin-top: 16px; color: #e7b4a6; font-size: .66em; letter-spacing: .06em; }
.hero-subtitle { margin: 28px 0 12px; font-size: clamp(19px,2vw,27px); letter-spacing: .09em; opacity: 0; animation: heroReveal .6s ease .3s forwards; }
.hero-lead { margin-bottom: 8px; color: #f8e8dd; font-size: 18px; font-weight: 700; opacity: 0; animation: heroReveal .6s ease .38s forwards; }
.hero-description { max-width: 590px; color: rgba(255,255,255,.67); font-size: 16px; line-height: 1.8; opacity: 0; animation: heroReveal .6s ease .44s forwards; }
.hero-actions { display: flex; gap: 14px; margin-top: 30px; opacity: 0; animation: heroReveal .6s ease .52s forwards; }
.scroll-hint { position: absolute; z-index: 3; bottom: 32px; left: 50%; display: flex; flex-direction: column; align-items: center; gap: 3px; color: rgba(255,255,255,.62); font-size: 11px; letter-spacing: .14em; transform: translateX(-50%); }.scroll-hint svg{animation:arrowDown 1.7s infinite}
.hero-index { position: absolute; z-index: 3; right: 48px; bottom: 38px; display: flex; align-items: center; gap: 12px; color: rgba(255,255,255,.55); font-size: 11px; letter-spacing: .12em; }.hero-index i{width:70px;height:1px;background:rgba(255,255,255,.25)}
.intro { text-align: center; }.intro .container{max-width:920px}.intro-mark{display:flex;align-items:center;justify-content:center;gap:10px;color:var(--color-primary);font-size:11px;letter-spacing:.18em}.intro blockquote{margin:28px 0;font-size:clamp(35px,5vw,58px);font-weight:600;line-height:1.42;letter-spacing:-.035em}.intro blockquote em{color:var(--color-primary);font-style:normal}.intro p{max-width:760px;margin:auto;color:var(--color-text-secondary);font-size:17px;line-height:1.9}
.stats-section{background:white}.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--color-border);border-bottom:1px solid var(--color-border)}.stat-card{position:relative;padding:38px 30px}.stat-card:not(:last-child)::after{content:'';position:absolute;top:26px;right:0;width:1px;height:calc(100% - 52px);background:var(--color-border)}.stat-top{display:flex;align-items:flex-start;color:var(--color-primary)}.stat-number{font-size:58px;line-height:1}.stat-suffix{margin:7px 0 0 4px;font-weight:700}.stat-card h3{margin:16px 0 7px;font-size:16px}.stat-card p{margin:0;color:var(--color-text-light);font-size:12px}
.courses-heading,.articles-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:30px}.courses-heading :deep(.section-title),.articles-heading :deep(.section-title){margin-bottom:46px}.all-link{display:inline-flex;align-items:center;gap:7px;flex:none;margin-bottom:49px;color:var(--color-primary);font-size:14px;font-weight:700}.courses-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:25px}
.story-section{background:white}.timeline-shell{overflow:hidden;border:1px solid var(--color-border);border-radius:var(--radius-large);background:var(--color-paper-light);box-shadow:var(--shadow-soft)}.timeline-track{position:relative;display:grid;grid-template-columns:repeat(8,1fr);padding:36px 24px 30px}.timeline-track::before{content:'';position:absolute;top:55px;left:7%;right:7%;height:1px;background:var(--color-border)}.timeline-node{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:15px;padding:0 5px;color:var(--color-text-light);background:none;border:0;text-align:center}.timeline-node span{display:grid;place-content:center;width:39px;height:39px;background:var(--color-paper-light);border:1px solid var(--color-border);border-radius:50%;font-size:11px;transition:.25s}.timeline-node strong{font-size:12px;line-height:1.5}.timeline-node:hover span,.timeline-node.active span{color:white;background:var(--color-primary);border-color:var(--color-primary);box-shadow:0 0 0 6px #f2ded8}.timeline-node.active strong{color:var(--color-primary)}.timeline-detail{display:grid;grid-template-columns:1fr 260px;gap:30px;min-height:230px;padding:40px 46px;color:white;background:var(--color-primary-dark)}.detail-index{color:#dfaaa0;font-size:11px;letter-spacing:.2em}.timeline-detail h3{margin:13px 0 12px;font-size:30px}.timeline-detail p{max-width:620px;margin:0;color:rgba(255,255,255,.72);line-height:1.8}.detail-art{min-height:150px;overflow:hidden;border:1px solid rgba(255,255,255,.18);border-radius:12px;background:#4b2b29}.detail-art img{width:100%;height:100%;min-height:150px;object-fit:cover}
.museum-section{display:grid;grid-template-columns:52% 48%;min-height:650px;color:white;background:var(--color-navy)}.museum-image{position:relative;min-height:580px;overflow:hidden}.museum-image::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent 72%,var(--color-navy))}.museum-image img{width:100%;height:100%;object-fit:cover}.museum-image span{position:absolute;z-index:2;left:28px;bottom:25px;padding:7px 11px;background:rgba(0,0,0,.35);border-radius:999px;font-size:11px}.museum-copy{align-self:center;max-width:620px;padding:80px clamp(40px,6vw,100px)}.museum-copy h2{margin:18px 0 24px;font-size:clamp(37px,4.3vw,56px);line-height:1.28;letter-spacing:-.04em}.museum-copy h2 em{color:#e5aa9b;font-style:normal}.museum-copy>p{color:rgba(255,255,255,.72);line-height:1.9}.route-line{display:flex;align-items:center;gap:9px;margin:30px 0;color:#d9c4b1;font-size:12px}.route-line i{width:28px;border-top:1px dashed rgba(255,255,255,.35)}
.outcomes-section{background:var(--color-paper)}.bento-grid{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:160px;gap:15px}.bento-card{position:relative;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;padding:24px;background:white;border:1px solid rgba(120,90,70,.08);border-radius:var(--radius-medium);box-shadow:0 6px 22px rgba(45,35,25,.05);transition:.28s}.bento-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-card)}.bento-card h3{margin:16px 0 5px;font-size:18px}.bento-card p{margin:0;color:var(--color-text-secondary);font-size:13px}.bento-arrow{position:absolute;right:20px;top:20px;opacity:.4}.bento-card.wide{grid-column:span 2}.bento-card.tall{grid-row:span 2}.bento-card.red{color:white;background:var(--color-primary)}.bento-card.red p,.bento-card.blue p{color:rgba(255,255,255,.68)}.bento-card.blue{color:white;background:var(--color-navy)}.bento-card.paper{background:#eadbc2}.bento-card.quiz{background:#e8d0c9}.bento-card.line{color:white;background:linear-gradient(120deg,#75302e,#b35e4f)}.bento-card.line p{color:rgba(255,255,255,.7)}.bento-card.photo{background:linear-gradient(145deg,#f3e9dc,#d5b0a2)}.bento-card.link{background:#dbe3df}
.articles-section{background:white}.articles-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}.closing-cta{display:flex;flex-direction:column;align-items:center;padding:100px 24px;text-align:center;color:white;background:radial-gradient(circle at 50% -20%,#ca7163,transparent 42%),#7a302e}.closing-route{display:flex;align-items:center;gap:12px;color:#ebc2b7;font-size:12px;letter-spacing:.1em}.closing-route i{width:34px;border-top:1px dashed rgba(255,255,255,.4)}.closing-cta h2{margin:28px 0 32px;font-size:clamp(37px,5vw,58px);line-height:1.35}
.timeline-track{scrollbar-width:none}.timeline-track::-webkit-scrollbar{display:none}
@media(max-width:992px){.courses-grid{grid-template-columns:1fr 1fr}.courses-grid :deep(article:last-child){grid-column:1/-1;max-width:50%;margin:auto}.stats-grid{grid-template-columns:1fr 1fr}.stat-card:nth-child(2)::after{display:none}.stat-card:nth-child(-n+2){border-bottom:1px solid var(--color-border)}.timeline-track{grid-template-columns:repeat(4,1fr);gap:28px 0}.timeline-track::before{display:none}.museum-section{grid-template-columns:1fr}.museum-image{min-height:470px}.museum-image::after{background:linear-gradient(0deg,var(--color-navy),transparent 45%)}.museum-copy{max-width:none;padding:25px 48px 80px}.bento-grid{grid-template-columns:repeat(2,1fr)}.articles-grid{grid-template-columns:1fr}}
@media(max-width:768px){.hero{min-height:760px}.hero-content{padding-top:95px}.hero h1{font-size:58px}.hero-overlay{background:linear-gradient(90deg,rgba(54,21,21,.86),rgba(112,45,39,.48))}.hero-index{display:none}.scroll-hint{left:auto;right:18px;transform:none}.stats-grid{grid-template-columns:1fr}.stat-card{padding:25px 10px}.stat-card::after{display:none}.stat-card:not(:last-child){border-bottom:1px solid var(--color-border)}.courses-heading,.articles-heading{display:block}.all-link{margin-top:-28px}.courses-grid{grid-template-columns:1fr}.courses-grid :deep(article:last-child){grid-column:auto;max-width:none}.timeline-track{display:flex;overflow-x:auto;justify-content:flex-start}.timeline-node{min-width:115px}.timeline-detail{grid-template-columns:1fr;padding:32px}.detail-art{display:none}.museum-copy{padding:20px 24px 64px}.bento-grid{grid-auto-rows:145px}.bento-card{grid-column:span 1!important}.bento-card.tall{grid-row:span 1}.closing-route{flex-wrap:wrap;justify-content:center}.closing-route i{width:16px}}
@media(max-width:576px){.hero-actions{flex-direction:column;align-items:stretch;max-width:280px}.hero h1{font-size:50px}.hero-kicker{font-size:10px}.hero-description{font-size:14px}.intro blockquote br{display:none}.museum-image{min-height:350px}.bento-grid{grid-template-columns:1fr;grid-auto-rows:140px}.closing-route i{display:none}.closing-route{line-height:1.8}}
</style>
