<script setup>
import { ref } from 'vue'
import { useHead } from '@vueuse/head'
import { AlertTriangle, ArrowRight, Download, FileText, Film, Images, Presentation } from 'lucide-vue-next'
import Gallery from '../components/Gallery.vue'
import PageHero from '../components/PageHero.vue'
import SectionTitle from '../components/SectionTitle.vue'
import VideoCard from '../components/VideoCard.vue'
import { courses } from '../data/courses'
import { museumGallery, videos } from '../data/media'

useHead({
  title: '实践成果｜青声传薪·数扬侨魂',
  meta: [{ name: 'description', content: '集中浏览三期宣讲课件、场馆寻访照片和课程视频素材，支持 PDF 在线预览与 PPT 公益下载。' }],
})

const tabs = [
  { id: 'all', label: '全部成果' },
  { id: 'courseware', label: '宣讲课件' },
  { id: 'photos', label: '照片档案' },
  { id: 'videos', label: '视频资料' },
]
const activeTab = ref('all')
const visible = (section) => activeTab.value === 'all' || activeTab.value === section
</script>

<template>
  <div class="achievements-page">
    <PageHero
      eyebrow="DIGITAL PRACTICE ARCHIVE"
      title="实践成果"
      subtitle="把线下一次次真实的相遇，整理成可以长期被看见、被阅读、被继续使用的数字记忆。"
      background-image="/images/museum/museum-17.webp"
    />

    <section class="archive-nav">
      <div class="container tabs" role="tablist" aria-label="实践成果分类">
        <button v-for="tab in tabs" :key="tab.id" :class="{ active: activeTab === tab.id }" role="tab" :aria-selected="activeTab === tab.id" @click="activeTab = tab.id">{{ tab.label }}</button>
      </div>
    </section>

    <section v-if="visible('courseware')" class="section courseware-section">
      <div class="container">
        <SectionTitle eyebrow="OPEN COURSEWARE" title="三套原创宣讲课件" subtitle="每套课件均保留完整 PPT 下载，并转换为 PDF 方便浏览器和手机阅读。文件体积较大，下载时请保持网络稳定。" />
        <div class="courseware-grid">
          <article v-for="course in courses" :key="course.id" class="courseware-card">
            <RouterLink :to="`/classes/${course.id}`" class="courseware-cover">
              <img :src="course.image" :alt="`${course.title}课件封面`" loading="lazy" />
              <span>{{ course.number }}</span>
            </RouterLink>
            <div class="courseware-body">
              <div class="resource-type"><Presentation :size="15" />原创宣讲课件</div>
              <h3 class="serif">{{ course.title }}</h3>
              <p>{{ course.subtitle }}</p>
              <div class="file-meta"><span>{{ course.pageCount }} 页</span><i></i><span>PPT {{ course.fileSize }}</span></div>
              <div class="tag-row"><span v-for="tag in course.tags" :key="tag">{{ tag }}</span></div>
              <div class="card-actions">
                <a :href="course.pdf" target="_blank" rel="noopener noreferrer" class="btn btn-primary"><FileText :size="17" />在线浏览</a>
                <a :href="course.ppt" :download="course.downloadName" class="btn download-button"><Download :size="17" />下载 PPT</a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section v-if="visible('photos')" class="section photo-section section-soft">
      <div class="container">
        <div class="section-heading-row">
          <SectionTitle eyebrow="PHOTO ARCHIVE" title="场馆寻访照片档案" subtitle="18 张团队真实调研照片已完成网页压缩和方向校正。点击任意图片可查看大图、说明与画面中可确认的信息。" />
          <div class="asset-count"><Images :size="22" /><strong>{{ museumGallery.length }}</strong><span>张精选照片</span></div>
        </div>
        <Gallery :images="museumGallery" />
      </div>
    </section>

    <section v-if="visible('videos')" class="section video-section">
      <div class="container">
        <SectionTitle eyebrow="VIDEO MATERIAL" title="视频素材展示" subtitle="当前从团队最终课件中提取两段视频，用于验证网页播放器、手机横屏和封面展示效果。" light />
        <div class="rights-note"><AlertTriangle :size="20" /><p><strong>公开发布前请再次确认授权：</strong>课件内嵌不等同于拥有网络传播权。确认属于团队原创或已获授权后再部署到公开网站；如无法确认，可替换为团队自摄视频或保留外链。</p></div>
        <div class="video-grid"><VideoCard v-for="video in videos" :key="video.id" :video="video" /></div>
      </div>
    </section>

    <section class="quiz-cta">
      <div class="container quiz-cta-inner">
        <div>
          <span class="eyebrow">FROM READING TO INTERACTION</span>
          <h2 class="serif">看完课件，再用 20 道题检验学习成果。</h2>
          <p>题目从 200 道题库中分主题随机抽取，每一次挑战都可能遇见不同的侨史故事。</p>
        </div>
        <RouterLink to="/quiz" class="btn btn-light">开始答题 <ArrowRight :size="18" /></RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.archive-nav { position: sticky; z-index: 8; top: 76px; background: rgba(255,250,244,.92); border-bottom: 1px solid var(--color-border); backdrop-filter: blur(12px); }
.tabs { display: flex; gap: 8px; overflow-x: auto; padding-block: 14px; scrollbar-width: none; }
.tabs::-webkit-scrollbar { display: none; }
.tabs button { flex: none; padding: 10px 18px; color: var(--color-text-secondary); background: transparent; border: 0; border-radius: 999px; font: inherit; font-size: 14px; font-weight: 700; }
.tabs button:hover, .tabs button.active { color: white; background: var(--color-primary); }
.courseware-section { background: var(--color-paper-light); }
.courseware-grid { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 24px; }
.courseware-card { overflow: hidden; background: white; border: 1px solid rgba(120,90,70,.1); border-radius: var(--radius-large); box-shadow: var(--shadow-soft); transition: .28s; }
.courseware-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-card); }
.courseware-cover { position: relative; display: block; aspect-ratio: 16 / 10; overflow: hidden; background: #ddc6bd; }
.courseware-cover img { width: 100%; height: 100%; object-fit: cover; transition: .4s; }
.courseware-card:hover .courseware-cover img { transform: scale(1.035); }
.courseware-cover > span { position: absolute; right: 18px; bottom: 14px; color: white; font-family: var(--font-serif); font-size: 38px; text-shadow: 0 3px 15px rgba(0,0,0,.35); }
.courseware-body { padding: 26px; }
.resource-type { display: flex; align-items: center; gap: 7px; color: var(--color-primary); font-size: 11px; font-weight: 700; letter-spacing: .08em; }
.courseware-body h3 { margin: 15px 0 4px; font-size: 28px; }
.courseware-body > p { margin: 0; color: var(--color-text-secondary); min-height: 48px; line-height: 1.65; }
.file-meta { display: flex; align-items: center; gap: 9px; margin: 19px 0 14px; color: var(--color-text-light); font-size: 12px; }
.file-meta i { width: 3px; height: 3px; background: currentColor; border-radius: 50%; }
.tag-row { display: flex; flex-wrap: wrap; gap: 7px; }
.tag-row span { padding: 5px 9px; color: var(--color-primary-dark); background: var(--color-primary-soft); border-radius: 999px; font-size: 11px; }
.card-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; margin-top: 24px; }
.card-actions .btn { min-height: 44px; padding-inline: 12px; font-size: 13px; }
.download-button { color: var(--color-primary); background: white; border-color: var(--color-primary-soft); }
.photo-section { background: var(--color-paper); }
.section-heading-row { display: flex; align-items: flex-end; justify-content: space-between; gap: 30px; }
.asset-count { display: grid; grid-template-columns: auto auto; align-items: center; gap: 0 10px; flex: none; padding: 16px 20px; color: var(--color-primary); background: white; border-radius: var(--radius-medium); box-shadow: var(--shadow-soft); }
.asset-count svg { grid-row: span 2; }
.asset-count strong { font-family: var(--font-serif); font-size: 28px; line-height: 1; }
.asset-count span { color: var(--color-text-light); font-size: 11px; }
.video-section { color: white; background: #2b2322; }
.video-section :deep(.section-title p) { color: rgba(255,255,255,.65); }
.rights-note { display: flex; align-items: flex-start; gap: 13px; margin: -14px 0 30px; padding: 17px 20px; color: #f2d7ce; background: rgba(157,63,56,.18); border: 1px solid rgba(227,159,144,.25); border-radius: var(--radius-medium); }
.rights-note svg { flex: none; margin-top: 2px; color: #e4a294; }
.rights-note p { margin: 0; font-size: 13px; line-height: 1.75; }
.video-grid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 24px; }
.quiz-cta { padding: 85px 0; color: white; background: linear-gradient(110deg,var(--color-primary-dark),#a34c42); }
.quiz-cta-inner { display: flex; align-items: center; justify-content: space-between; gap: 50px; }
.quiz-cta .eyebrow { color: #edbcb1; }
.quiz-cta h2 { max-width: 760px; margin: 16px 0 10px; font-size: clamp(30px,4vw,46px); }
.quiz-cta p { margin: 0; color: rgba(255,255,255,.7); line-height: 1.8; }
@media (max-width: 960px) {
  .courseware-grid { grid-template-columns: 1fr 1fr; }
  .courseware-card:last-child { grid-column: 1 / -1; max-width: calc(50% - 12px); }
  .section-heading-row, .quiz-cta-inner { align-items: flex-start; flex-direction: column; }
}
@media (max-width: 700px) {
  .courseware-grid, .video-grid { grid-template-columns: 1fr; }
  .courseware-card:last-child { grid-column: auto; max-width: none; }
}
@media (max-width: 480px) {
  .card-actions { grid-template-columns: 1fr; }
}
</style>
