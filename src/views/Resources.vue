<script setup>
import { useHead } from '@vueuse/head'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Download,
  ExternalLink,
  FileText,
  Film,
  Globe2,
  Landmark,
  PlayCircle,
  ShieldCheck,
} from 'lucide-vue-next'
import PageHero from '../components/PageHero.vue'
import SectionTitle from '../components/SectionTitle.vue'
import { courses } from '../data/courses'
import {
  featuredArticles,
  featuredMedia,
  learningLinkGroups,
  learningVerifiedAt,
} from '../data/learning'

useHead({
  title: '学习专区｜青声传薪·数扬侨魂',
  meta: [
    { name: 'description', content: '在线获取三期华侨史原创课件，并访问国务院侨办、国家档案局、中国侨联、官方博物馆与联合国教科文组织的权威学习资源。' },
    { property: 'og:title', content: '学习专区｜青声传薪·数扬侨魂' },
    { property: 'og:description', content: '从团队课件到权威文章、官方视频与虚拟展，继续学习跨越山海的华侨历史。' },
  ],
})
</script>

<template>
  <div class="resources-page">
    <PageHero
      eyebrow="LEARNING HUB"
      title="学习专区"
      subtitle="从团队原创课件出发，继续阅读权威文章、观看官方展览与视频，让每一次学习都能回到可核验的出处。"
      background-image="/images/museum/museum-08.webp"
    />

    <section class="trust-strip">
      <div class="container trust-inner">
        <ShieldCheck :size="27" stroke-width="1.6" />
        <div>
          <strong>只收录权威、公开、可核验的学习入口</strong>
          <p>外部资源来自政府、档案机构、侨联、官方博物馆与联合国教科文组织；链接核验于 {{ learningVerifiedAt }}，内容更新以原网站为准。</p>
        </div>
        <span><Globe2 :size="14" /> 点击资源将访问外部网站</span>
      </div>
    </section>

    <section class="section downloads-section paper-texture">
      <div class="container">
        <SectionTitle
          eyebrow="TEAM COURSEWARE"
          title="团队原创课件 · 公益获取"
          subtitle="网页预览使用 PDF，二次宣讲与课堂教学可下载 PPT 原文件。使用时请保留课程名称与团队署名。"
        />
        <div class="download-grid">
          <article v-for="course in courses" :key="course.id">
            <img :src="course.image" :alt="`${course.title}课件封面`" loading="lazy" />
            <div>
              <span>{{ course.kicker }}</span>
              <h3 class="serif">{{ course.title }}</h3>
              <p>{{ course.pageCount }} 页 · PPT {{ course.fileSize }}</p>
              <div class="resource-actions">
                <a :href="course.pdf" target="_blank" rel="noopener noreferrer"><FileText :size="16" />在线浏览</a>
                <a :href="course.ppt" :download="course.downloadName"><Download :size="16" />下载 PPT</a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section articles-section">
      <div class="container">
        <SectionTitle
          eyebrow="SELECTED READING"
          title="精选知识文章"
          subtitle="先读四篇与三堂侨课直接相关的权威资料：侨批、南侨机工与归侨青年人物。卡片摘要只提取来源页面中的基础事实。"
        />
        <div class="article-grid">
          <a
            v-for="(article, index) in featuredArticles"
            :key="article.id"
            :href="article.url"
            target="_blank"
            rel="noopener noreferrer"
            class="article-card"
          >
            <div class="article-index">{{ String(index + 1).padStart(2, '0') }}</div>
            <div class="article-content">
              <div class="article-tags"><span>{{ article.topic }}</span><small>{{ article.resourceType }}</small></div>
              <h3 class="serif">{{ article.title }}</h3>
              <p>{{ article.summary }}</p>
              <footer>
                <span>来源｜{{ article.source }}</span>
                <strong>访问外部网站 <ArrowUpRight :size="16" /></strong>
              </footer>
            </div>
          </a>
        </div>
      </div>
    </section>

    <section class="section media-section paper-texture">
      <div class="container">
        <SectionTitle
          eyebrow="OFFICIAL MEDIA"
          title="精选视频与虚拟展"
          subtitle="不使用外站视频截图作封面；以下视觉为本站自制的克制占位。点击后前往官方页面选择视频、直播回放或VR展览。"
        />
        <div class="media-grid">
          <a
            v-for="item in featuredMedia"
            :key="item.id"
            :href="item.url"
            target="_blank"
            rel="noopener noreferrer"
            class="media-card"
          >
            <div class="media-poster" :class="`tone-${item.tone}`">
              <span>{{ item.mark }}</span>
              <div class="route-lines" aria-hidden="true"><i></i><i></i><i></i></div>
              <PlayCircle :size="52" stroke-width="1.25" />
              <small>OFFICIAL LEARNING MEDIA</small>
            </div>
            <div class="media-body">
              <p><Film :size="14" /> {{ item.resourceType }}</p>
              <h3 class="serif">{{ item.title }}</h3>
              <div class="media-description">{{ item.description }}</div>
              <footer><span>来源｜{{ item.source }}</span><strong>前往观看 <ExternalLink :size="15" /></strong></footer>
            </div>
          </a>
        </div>
      </div>
    </section>

    <section class="section library-section">
      <div class="container">
        <SectionTitle
          eyebrow="LINK LIBRARY"
          title="权威链接库"
          subtitle="按学习目的整理的延伸入口。资源类型与来源清晰标注，便于学校、社区和青少年按需选择。"
        />
        <div class="link-groups">
          <section v-for="group in learningLinkGroups" :key="group.id" class="link-group">
            <header>
              <div class="group-icon"><Landmark v-if="group.id === 'museums'" :size="23" /><BookOpen v-else :size="23" /></div>
              <h3 class="serif">{{ group.title }}</h3>
              <p>{{ group.description }}</p>
            </header>
            <ul>
              <li v-for="link in group.links" :key="link.url">
                <a :href="link.url" target="_blank" rel="noopener noreferrer">
                  <div><span>{{ link.resourceType }}</span><h4>{{ link.title }}</h4><p>{{ link.description }}</p><small>来源｜{{ link.source }}</small></div>
                  <ArrowUpRight :size="18" />
                </a>
              </li>
            </ul>
          </section>
        </div>
        <p class="external-notice"><Globe2 :size="15" />以上均为外部学习资源。页面内容、开放时间与视频播放方式可能调整，请以来源网站最新信息为准。</p>
      </div>
    </section>

    <section class="quiz-strip">
      <div class="container">
        <div><span>500 道题库</span><h2 class="serif">阅读之后，把知识变成一次有反馈的小挑战。</h2></div>
        <RouterLink to="/quiz" class="btn btn-light">开始20题挑战 <ArrowRight :size="17" /></RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.trust-strip { color: white; background: var(--color-primary-dark); }
.trust-inner { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 18px; padding-block: 22px; }
.trust-inner > svg { color: #efb6aa; }
.trust-inner strong { font-family: var(--font-serif); font-size: 17px; }
.trust-inner p { margin: 4px 0 0; color: rgba(255,255,255,.66); font-size: 12px; line-height: 1.65; }
.trust-inner > span { display: inline-flex; align-items: center; gap: 6px; padding: 8px 11px; color: #f1c8be; border: 1px solid rgba(255,255,255,.18); border-radius: 999px; font-size: 11px; }
.downloads-section { background: var(--color-paper); }
.download-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 22px; }
.download-grid article { overflow: hidden; background: white; border-radius: var(--radius-large); box-shadow: var(--shadow-soft); }
.download-grid img { width: 100%; aspect-ratio: 16/10; object-fit: cover; }
.download-grid article > div { padding: 24px; }
.download-grid span { color: var(--color-primary); font-size: 11px; font-weight: 700; letter-spacing: .1em; }
.download-grid h3 { margin: 11px 0 4px; font-size: 27px; }
.download-grid p { margin: 0; color: var(--color-text-light); font-size: 12px; }
.resource-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 21px; }
.resource-actions a { display: flex; align-items: center; justify-content: center; gap: 7px; min-height: 42px; color: var(--color-primary); border: 1px solid var(--color-primary-soft); border-radius: 999px; font-size: 12px; font-weight: 700; }
.resource-actions a:first-child { color: white; background: var(--color-primary); border-color: var(--color-primary); }
.articles-section { background: white; }
.article-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 18px; }
.article-card { display: grid; grid-template-columns: 76px 1fr; min-height: 285px; overflow: hidden; background: var(--color-paper-light); border: 1px solid var(--color-border); border-radius: var(--radius-large); transition: .28s ease; }
.article-card:hover { transform: translateY(-4px); background: white; box-shadow: var(--shadow-card); }
.article-card:focus-visible { outline: 3px solid var(--color-primary-light); outline-offset: 4px; }
.article-index { display: flex; align-items: flex-end; justify-content: center; padding-bottom: 27px; color: rgba(255,255,255,.62); background: var(--color-primary); font-family: var(--font-serif); font-size: 24px; writing-mode: vertical-rl; }
.article-content { display: flex; flex-direction: column; padding: 27px; }
.article-tags { display: flex; align-items: center; justify-content: space-between; gap: 15px; }
.article-tags span { color: var(--color-primary); font-size: 11px; font-weight: 700; letter-spacing: .1em; }
.article-tags small { color: var(--color-text-light); }
.article-content h3 { margin: 15px 0 11px; font-size: 23px; line-height: 1.45; }
.article-content > p { margin: 0; color: var(--color-text-secondary); font-size: 13px; line-height: 1.8; }
.article-content footer { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; margin-top: auto; padding-top: 19px; border-top: 1px solid var(--color-border); }
.article-content footer span { max-width: 62%; color: var(--color-text-light); font-size: 11px; line-height: 1.5; }
.article-content footer strong { display: inline-flex; align-items: center; gap: 5px; color: var(--color-primary); font-size: 12px; }
.media-section { background: var(--color-paper); }
.media-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
.media-card { overflow: hidden; background: white; border-radius: var(--radius-large); box-shadow: var(--shadow-soft); transition: transform .28s ease, box-shadow .28s ease; }
.media-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-card); }
.media-card:focus-visible { outline: 3px solid var(--color-primary-light); outline-offset: 4px; }
.media-poster { position: relative; display: grid; place-content: center; aspect-ratio: 16/9; overflow: hidden; color: white; background: var(--color-primary); text-align: center; }
.media-poster.tone-navy { background: var(--color-navy); }
.media-poster.tone-paper { color: var(--color-primary-dark); background: #e5cfc3; }
.media-poster > span { position: absolute; top: 18px; left: 20px; font-family: var(--font-serif); font-size: 31px; opacity: .65; }
.media-poster > svg { position: relative; z-index: 2; margin: auto; transition: transform .25s ease; }
.media-card:hover .media-poster > svg { transform: scale(1.08); }
.media-poster > small { position: relative; z-index: 2; margin-top: 9px; font-size: 9px; letter-spacing: .18em; opacity: .68; }
.route-lines { position: absolute; inset: 0; opacity: .22; }
.route-lines i { position: absolute; width: 65%; border-top: 1px dashed currentColor; transform: rotate(-13deg); }
.route-lines i:nth-child(1) { top: 30%; left: -7%; }
.route-lines i:nth-child(2) { top: 56%; right: -10%; transform: rotate(11deg); }
.route-lines i:nth-child(3) { bottom: 16%; left: 8%; transform: rotate(-4deg); }
.media-body { padding: 24px; }
.media-body > p { display: flex; align-items: center; gap: 6px; margin: 0; color: var(--color-primary); font-size: 11px; font-weight: 700; }
.media-body h3 { margin: 12px 0 10px; font-size: 23px; line-height: 1.45; }
.media-description { min-height: 92px; color: var(--color-text-secondary); font-size: 13px; line-height: 1.75; }
.media-body footer { display: flex; align-items: flex-end; justify-content: space-between; gap: 14px; margin-top: 19px; padding-top: 17px; border-top: 1px solid var(--color-border); }
.media-body footer span { max-width: 60%; color: var(--color-text-light); font-size: 10px; line-height: 1.5; }
.media-body footer strong { display: inline-flex; align-items: center; gap: 5px; color: var(--color-primary); font-size: 12px; }
.library-section { background: white; }
.link-groups { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
.link-group { overflow: hidden; background: var(--color-paper-light); border: 1px solid var(--color-border); border-radius: var(--radius-large); }
.link-group > header { padding: 27px; background: linear-gradient(135deg,#f5e8e1,var(--color-paper-light)); border-bottom: 1px solid var(--color-border); }
.group-icon { display: grid; place-content: center; width: 45px; height: 45px; color: white; background: var(--color-primary); border-radius: 13px; }
.link-group h3 { margin: 18px 0 8px; font-size: 24px; }
.link-group header p { margin: 0; color: var(--color-text-secondary); font-size: 12px; line-height: 1.7; }
.link-group ul { margin: 0; padding: 9px 22px 17px; list-style: none; }
.link-group li:not(:last-child) { border-bottom: 1px solid var(--color-border); }
.link-group li a { display: grid; grid-template-columns: 1fr auto; gap: 15px; padding: 19px 5px; }
.link-group li a > svg { margin-top: 4px; color: var(--color-primary); }
.link-group li a:hover h4 { color: var(--color-primary); }
.link-group li span { color: var(--color-primary); font-size: 10px; font-weight: 700; }
.link-group li h4 { margin: 6px 0; font-size: 15px; line-height: 1.45; transition: color .2s ease; }
.link-group li p { margin: 0; color: var(--color-text-secondary); font-size: 11px; line-height: 1.6; }
.link-group li small { display: block; margin-top: 7px; color: var(--color-text-light); font-size: 10px; }
.external-notice { display: flex; align-items: center; justify-content: center; gap: 7px; margin: 27px 0 0; color: var(--color-text-light); font-size: 11px; text-align: center; }
.quiz-strip { padding: 70px 0; color: white; background: linear-gradient(115deg,var(--color-primary-dark),#a04a41); }
.quiz-strip .container { display: flex; align-items: center; justify-content: space-between; gap: 40px; }
.quiz-strip span { color: #eebcb1; font-size: 12px; letter-spacing: .14em; }
.quiz-strip h2 { max-width: 760px; margin: 12px 0 0; font-size: clamp(29px,4vw,42px); }

@media (max-width: 1050px) {
  .download-grid, .media-grid, .link-groups { grid-template-columns: 1fr 1fr; }
  .download-grid article:last-child, .media-card:last-child, .link-group:last-child { grid-column: 1 / -1; max-width: calc(50% - 10px); margin-inline: auto; }
  .article-card { grid-template-columns: 58px 1fr; }
}
@media (max-width: 760px) {
  .trust-inner { grid-template-columns: auto 1fr; }
  .trust-inner > span { grid-column: 1 / -1; width: fit-content; }
  .download-grid, .article-grid, .media-grid, .link-groups { grid-template-columns: 1fr; }
  .download-grid article:last-child, .media-card:last-child, .link-group:last-child { grid-column: auto; max-width: none; }
  .article-card { min-height: 0; }
  .article-content footer, .media-body footer { align-items: flex-start; flex-direction: column; }
  .article-content footer span, .media-body footer span { max-width: none; }
  .media-description { min-height: 0; }
  .quiz-strip .container { align-items: flex-start; flex-direction: column; }
}
@media (max-width: 520px) {
  .trust-inner > svg { display: none; }
  .trust-inner { grid-template-columns: 1fr; }
  .trust-inner > span { grid-column: auto; }
  .resource-actions { grid-template-columns: 1fr; }
  .article-card { grid-template-columns: 1fr; }
  .article-index { align-items: center; justify-content: flex-start; padding: 10px 20px; writing-mode: horizontal-tb; }
  .article-content { padding: 22px; }
  .external-notice { align-items: flex-start; text-align: left; }
}
</style>
