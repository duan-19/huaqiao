<script setup>
import { computed, ref } from 'vue'
import { useHead } from '@vueuse/head'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Download,
  ExternalLink,
  FileCheck2,
  FileQuestion,
  Printer,
  RefreshCw,
  RotateCcw,
  Shuffle,
  Sparkles,
  Trophy,
  X,
} from 'lucide-vue-next'
import PageHero from '../components/PageHero.vue'
import { quizCategoryPlan, quizQuestions } from '../data/quiz'

useHead({
  title: '侨史知识挑战与题库下载｜青声传薪·数扬侨魂',
  meta: [{ name: 'description', content: '从500道权威来源题库中分层随机抽取20道单选题，并可将题目卷、答案解析卷分别导出为Word或PDF。' }],
})

const letters = ['A', 'B', 'C', 'D']
const screen = ref('intro')
const sessionQuestions = ref([])
const currentIndex = ref(0)
const answers = ref([])
const exportScope = ref('all')
const paperQuestions = ref([])
const paperCode = ref('')
const exportNotice = ref('')
const isExporting = ref(false)

const bankSize = computed(() => quizQuestions.length)
const sessionSize = computed(() => quizCategoryPlan.reduce((total, item) => total + item.pick, 0))
const orderedBank = computed(() => quizCategoryPlan.flatMap(({ category }) => (
  quizQuestions.filter((question) => question.category === category)
)))

const shuffle = (items) => {
  const copy = [...items]
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]]
  }
  return copy
}

const shuffleOptions = (question) => {
  const options = shuffle(question.options.map((label, index) => ({ label, correct: index === question.answer })))
  return {
    ...question,
    options: options.map((option) => option.label),
    answer: options.findIndex((option) => option.correct),
  }
}

const drawQuestionSet = (shuffleChoices = false) => shuffle(quizCategoryPlan.flatMap(({ category, pick }) => (
  shuffle(quizQuestions.filter((question) => question.category === category))
    .slice(0, pick)
    .map((question) => (shuffleChoices ? shuffleOptions(question) : { ...question }))
)))

const startQuiz = () => {
  sessionQuestions.value = drawQuestionSet(true)
  answers.value = Array(sessionQuestions.value.length).fill(null)
  currentIndex.value = 0
  screen.value = 'question'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const createPaper = () => {
  paperQuestions.value = drawQuestionSet(false)
  const now = new Date()
  paperCode.value = `QS-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`
  exportScope.value = 'paper'
  exportNotice.value = `已生成练习卷 ${paperCode.value}，题目卷与答案卷将保持完全对应。`
}

const selectExportScope = (scope) => {
  exportScope.value = scope
  if (scope === 'paper' && paperQuestions.value.length === 0) createPaper()
}

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')

const isExternalUrl = (url = '') => /^https?:\/\//i.test(url)

const buildExportHtml = (questions, type, code) => {
  const isAnswerBook = type === 'answers'
  const generatedAt = new Intl.DateTimeFormat('zh-CN', { dateStyle: 'long' }).format(new Date())
  const content = questions.map((question, index) => {
    if (isAnswerBook) {
      return `<article class="answer-item">
        <div class="answer-line"><b>${index + 1}.</b><strong>${letters[question.answer]}．${escapeHtml(question.options[question.answer])}</strong><span>${escapeHtml(question.category)}</span></div>
        <p>${escapeHtml(question.explanation)}</p>
        <small>资料来源｜${escapeHtml(question.source?.institution || '来源待核实')} · ${escapeHtml(question.source?.title || '')}</small>
      </article>`
    }
    const options = question.options.map((option, optionIndex) => (
      `<li><span>${letters[optionIndex]}．</span>${escapeHtml(option)}</li>`
    )).join('')
    return `<article class="question-item">
      <div class="question-line"><b>${index + 1}.</b><span>${escapeHtml(question.question)}</span></div>
      <ol>${options}</ol>
    </article>`
  }).join('')

  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><title>侨史知识挑战${isAnswerBook ? '答案解析卷' : '题目卷'}</title>
  <style>
    @page{size:A4;margin:18mm 16mm}*{box-sizing:border-box}body{margin:0;color:#272522;font-family:"Microsoft YaHei","PingFang SC",sans-serif;font-size:11pt;line-height:1.7}.cover{padding:20mm 0 13mm;border-bottom:3px solid #8b2e2e}.eyebrow{color:#8b2e2e;font-size:9pt;letter-spacing:.12em}.cover h1{margin:6mm 0 3mm;font-family:"Noto Serif SC","SimSun",serif;font-size:25pt}.meta{display:flex;gap:10mm;color:#69645d;font-size:9pt}.notice{margin:8mm 0;padding:4mm 5mm;background:#f7f2e8;border-left:3px solid #8b2e2e;color:#69645d}.question-item,.answer-item{break-inside:avoid;page-break-inside:avoid;padding:4mm 0;border-bottom:1px solid #ddd6c9}.question-line{display:flex;gap:2mm;font-weight:700}.question-line b{flex:none;color:#8b2e2e}.question-item ol{display:grid;grid-template-columns:1fr 1fr;gap:1mm 8mm;margin:2mm 0 0;padding:0;list-style:none}.question-item li span{color:#8b2e2e;font-weight:700}.answer-line{display:flex;align-items:baseline;gap:2mm}.answer-line>b{color:#8b2e2e}.answer-line strong{color:#652020}.answer-line span{margin-left:auto;color:#918a80;font-size:8pt}.answer-item p{margin:1.5mm 0;color:#4f4b46}.answer-item small{color:#918a80}.footer-note{margin-top:10mm;color:#918a80;font-size:8pt;text-align:center}@media print{.question-item,.answer-item{break-inside:avoid}}
  </style></head><body><header class="cover"><div class="eyebrow">青声传薪 · 数扬侨魂｜公益学习资料</div><h1>侨史知识挑战${isAnswerBook ? '答案解析卷' : '题目卷'}</h1><div class="meta"><span>卷号：${escapeHtml(code)}</span><span>共 ${questions.length} 道单选题</span><span>生成日期：${generatedAt}</span></div></header>
  <div class="notice">${isAnswerBook ? '本文件仅包含答案、解析与资料来源，请与同卷号题目卷配套使用。' : '本文件仅包含题目与选项，不含答案。请下载同卷号答案解析卷进行核对。'} 历史内容请以所列权威资料原文为准。</div>
  <main>${content}</main><footer class="footer-note">本资料用于高校社会实践与公益科普学习，不作商业用途。</footer></body></html>`
}

const getExportSet = () => {
  if (exportScope.value === 'paper') {
    if (paperQuestions.value.length === 0) createPaper()
    return { questions: paperQuestions.value, code: paperCode.value }
  }
  return { questions: orderedBank.value, code: `QS-FULL-${bankSize.value}` }
}

const saveBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1200)
}

const downloadWord = async (questions, type, code, filename) => {
  const {
    AlignmentType,
    Document,
    HeadingLevel,
    Packer,
    Paragraph,
    TextRun,
  } = await import('docx')
  const isAnswerBook = type === 'answers'
  const children = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 900, after: 240 },
      children: [new TextRun({ text: '青声传薪 · 数扬侨魂', color: '8B2E2E', bold: true, size: 24, font: 'Microsoft YaHei' })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      heading: HeadingLevel.TITLE,
      spacing: { after: 260 },
      children: [new TextRun({ text: `侨史知识挑战${isAnswerBook ? '答案解析卷' : '题目卷'}`, bold: true, size: 42, font: 'Microsoft YaHei' })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 520 },
      children: [new TextRun({ text: `卷号：${code}　｜　共 ${questions.length} 道单选题`, color: '69645D', size: 20, font: 'Microsoft YaHei' })],
    }),
    new Paragraph({
      shading: { fill: 'F7F2E8' },
      spacing: { before: 160, after: 380 },
      indent: { left: 240, right: 240 },
      children: [new TextRun({
        text: isAnswerBook
          ? '本文件只包含答案、解析与资料来源，请与同卷号题目卷配套使用。'
          : '本文件只包含题目与选项，不含答案，请下载同卷号答案解析卷进行核对。',
        color: '652020',
        size: 20,
        font: 'Microsoft YaHei',
      })],
    }),
  ]

  let currentCategory = ''
  questions.forEach((question, index) => {
    if (question.category !== currentCategory) {
      currentCategory = question.category
      children.push(new Paragraph({
        heading: HeadingLevel.HEADING_1,
        pageBreakBefore: index > 0,
        spacing: { before: 260, after: 220 },
        children: [new TextRun({ text: currentCategory, color: '8B2E2E', bold: true, size: 30, font: 'Microsoft YaHei' })],
      }))
    }

    if (isAnswerBook) {
      children.push(
        new Paragraph({
          keepNext: true,
          spacing: { before: 180, after: 80 },
          children: [
            new TextRun({ text: `${index + 1}. `, color: '8B2E2E', bold: true, size: 22, font: 'Microsoft YaHei' }),
            new TextRun({ text: `${letters[question.answer]}．${question.options[question.answer]}`, bold: true, size: 22, font: 'Microsoft YaHei' }),
          ],
        }),
        new Paragraph({
          keepNext: true,
          spacing: { after: 70, line: 330 },
          children: [new TextRun({ text: question.explanation, color: '4F4B46', size: 20, font: 'Microsoft YaHei' })],
        }),
        new Paragraph({
          spacing: { after: 180 },
          border: { bottom: { color: 'DDD6C9', size: 4, style: 'single' } },
          children: [new TextRun({ text: `资料来源｜${question.source?.institution || '来源待核实'} · ${question.source?.title || ''}`, color: '918A80', size: 16, font: 'Microsoft YaHei' })],
        }),
      )
    } else {
      children.push(new Paragraph({
        keepNext: true,
        spacing: { before: 180, after: 100, line: 340 },
        children: [
          new TextRun({ text: `${index + 1}. `, color: '8B2E2E', bold: true, size: 22, font: 'Microsoft YaHei' }),
          new TextRun({ text: question.question, bold: true, size: 22, font: 'Microsoft YaHei' }),
        ],
      }))
      question.options.forEach((option, optionIndex) => {
        children.push(new Paragraph({
          keepNext: optionIndex < question.options.length - 1,
          spacing: { after: optionIndex === question.options.length - 1 ? 180 : 50 },
          indent: { left: 360 },
          children: [
            new TextRun({ text: `${letters[optionIndex]}．`, color: '8B2E2E', bold: true, size: 20, font: 'Microsoft YaHei' }),
            new TextRun({ text: option, size: 20, font: 'Microsoft YaHei' }),
          ],
        }))
      })
    }
  })

  const documentFile = new Document({
    creator: '“青声传薪，数扬侨魂”华侨革命史科普实践团',
    title: `侨史知识挑战${isAnswerBook ? '答案解析卷' : '题目卷'}`,
    description: '华侨革命史公益科普学习资料',
    styles: {
      default: {
        document: {
          run: { font: 'Microsoft YaHei', size: 20, color: '272522' },
          paragraph: { spacing: { line: 320 } },
        },
      },
    },
    sections: [{
      properties: { page: { margin: { top: 900, right: 900, bottom: 900, left: 900 } } },
      children,
    }],
  })
  const blob = await Packer.toBlob(documentFile)
  saveBlob(blob, `${filename}.docx`)
}

const openPdfPrint = (html) => {
  const printWindow = window.open('', '_blank')
  if (!printWindow) throw new Error('浏览器阻止了打印窗口，请允许本站打开新窗口后重试。')
  printWindow.opener = null
  printWindow.document.open()
  printWindow.document.write(html)
  printWindow.document.close()
  printWindow.focus()
  window.setTimeout(() => printWindow.print(), 500)
}

const exportDocument = async (type, format) => {
  try {
    isExporting.value = true
    exportNotice.value = '正在整理文档，请稍候……'
    await new Promise((resolve) => window.setTimeout(resolve, 30))
    const { questions, code } = getExportSet()
    const label = type === 'questions' ? '题目卷' : '答案解析卷'
    const scopeLabel = exportScope.value === 'all' ? `完整题库${questions.length}题` : `随机练习卷${code}`
    const filename = `青声传薪-侨史知识挑战-${scopeLabel}-${label}`
    if (format === 'word') await downloadWord(questions, type, code, filename)
    else openPdfPrint(buildExportHtml(questions, type, code))
    exportNotice.value = format === 'word'
      ? `${label}已下载；请继续下载对应的另一份文档。`
      : `已打开${label}打印页，请在打印窗口选择“另存为 PDF”。`
  } catch (error) {
    exportNotice.value = error.message || '导出失败，请稍后重试。'
  } finally {
    isExporting.value = false
  }
}

const currentQuestion = computed(() => sessionQuestions.value[currentIndex.value])
const currentAnswer = computed(() => answers.value[currentIndex.value])
const answeredCount = computed(() => answers.value.filter((answer) => answer !== null).length)
const score = computed(() => answers.value.reduce((total, answer, index) => (
  total + (answer === sessionQuestions.value[index]?.answer ? 1 : 0)
), 0))
const percent = computed(() => Math.round((score.value / sessionQuestions.value.length) * 100) || 0)
const progress = computed(() => ((currentIndex.value + 1) / sessionQuestions.value.length) * 100)

const resultLevel = computed(() => {
  if (percent.value >= 90) return { title: '侨史小达人', note: '你已经能够把不少史实、人物与时代线索准确地连接起来。', tone: 'master' }
  if (percent.value >= 70) return { title: '侨史探索者', note: '你已经建立了清晰的知识框架，再读几段史料会更扎实。', tone: 'explorer' }
  if (percent.value >= 60) return { title: '继续寻访', note: '基础线索已经出现，建议带着错题回到数字侨史页继续寻找答案。', tone: 'continue' }
  return { title: '再读一次侨史故事吧', note: '别着急，历史学习从来不是一次记住。看看解析，再开始新的20题。', tone: 'again' }
})

const selectOption = (optionIndex) => {
  if (currentAnswer.value !== null) return
  answers.value[currentIndex.value] = optionIndex
}

const goPrevious = () => {
  if (currentIndex.value > 0) currentIndex.value -= 1
}

const goNext = () => {
  if (currentAnswer.value === null) return
  if (currentIndex.value < sessionQuestions.value.length - 1) currentIndex.value += 1
  else screen.value = 'result'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const optionState = (optionIndex) => {
  if (currentAnswer.value === null) return ''
  if (optionIndex === currentQuestion.value.answer) return 'correct'
  if (optionIndex === currentAnswer.value) return 'wrong'
  return 'muted'
}

const reviewFirstWrong = () => {
  const wrongIndex = answers.value.findIndex((answer, index) => answer !== sessionQuestions.value[index].answer)
  if (wrongIndex === -1) return
  currentIndex.value = wrongIndex
  screen.value = 'question'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="quiz-page">
    <template v-if="screen === 'intro'">
      <PageHero
        eyebrow="500-QUESTION KNOWLEDGE BANK"
        title="侨史知识挑战"
        :subtitle="`看看三堂侨课之后，你认识了多少华侨历史。每轮按主题从${bankSize}道题库中随机抽取${sessionSize}道，全部为单项选择题。`"
        background-image="/images/museum/museum-03.webp"
      />
      <section class="section intro-section paper-texture">
        <div class="container intro-layout">
          <div>
            <span class="eyebrow">HOW IT WORKS</span>
            <h2 class="serif">不是死记数字，而是沿着线索理解历史。</h2>
            <p>题库内容覆盖基本概念、辛亥革命时期华侨、抗战华侨力量、南侨机工、青年华侨与英烈、侨批、文博方法和团队实践。每道史实题均附资料来源，答题后立即查看解释。</p>
            <button class="btn btn-primary start-button" type="button" @click="startQuiz">随机生成本轮{{ sessionSize }}题 <Sparkles :size="18" /></button>
          </div>
          <aside class="quiz-card">
            <div class="quiz-number serif">{{ bankSize }}</div>
            <p>题来源可核验的单选题库</p>
            <div class="quiz-stats">
              <span><strong>{{ sessionSize }}</strong>每轮题数</span>
              <span><strong>{{ quizCategoryPlan.length }}</strong>知识主题</span>
              <span><strong>1</strong>正确选项</span>
            </div>
            <small>刷新页面不会保存成绩，也不收集个人信息。</small>
          </aside>
        </div>
      </section>
      <section class="section export-section">
        <div class="container export-layout">
          <div class="export-heading">
            <span class="eyebrow">OPEN QUESTION LIBRARY</span>
            <h2 class="serif">把题库真正带回课堂</h2>
            <p>可导出完整题库，也可以先生成一套与答案严格对应的随机练习卷。题目卷不显示答案，答案解析卷不重复排列题目，两份文件使用同一个卷号。</p>
          </div>

          <div class="export-panel">
            <div class="scope-switch" role="group" aria-label="选择导出范围">
              <button type="button" :class="{ active: exportScope === 'all' }" @click="selectExportScope('all')">
                <BookOpen :size="18" /><span><strong>完整题库</strong><small>{{ bankSize }}题 · 按主题编排</small></span>
              </button>
              <button type="button" :class="{ active: exportScope === 'paper' }" @click="selectExportScope('paper')">
                <Shuffle :size="18" /><span><strong>随机练习卷</strong><small>{{ sessionSize }}题 · 分层抽取</small></span>
              </button>
              <button v-if="exportScope === 'paper'" class="regenerate" type="button" @click="createPaper"><RefreshCw :size="16" />换一套</button>
            </div>

            <div v-if="exportScope === 'paper' && paperCode" class="paper-code">
              <span>当前卷号</span><strong>{{ paperCode }}</strong><small>请连续下载同卷号的题目卷与答案卷</small>
            </div>

            <div class="document-grid">
              <article class="document-card question-document">
                <span class="document-icon"><FileQuestion :size="28" /></span>
                <div><small>STUDENT COPY</small><h3>题目卷</h3><p>只包含题干和四个选项，不出现答案与解析，适合课堂测验和自主练习。</p></div>
                <div class="document-actions">
                  <button type="button" :disabled="isExporting" @click="exportDocument('questions', 'word')"><Download :size="16" />Word</button>
                  <button type="button" :disabled="isExporting" @click="exportDocument('questions', 'pdf')"><Printer :size="16" />PDF</button>
                </div>
              </article>
              <article class="document-card answer-document">
                <span class="document-icon"><FileCheck2 :size="28" /></span>
                <div><small>TEACHER COPY</small><h3>答案解析卷</h3><p>按题号集中列出正确选项、知识解释和资料来源，与题目卷完全分开。</p></div>
                <div class="document-actions">
                  <button type="button" :disabled="isExporting" @click="exportDocument('answers', 'word')"><Download :size="16" />Word</button>
                  <button type="button" :disabled="isExporting" @click="exportDocument('answers', 'pdf')"><Printer :size="16" />PDF</button>
                </div>
              </article>
            </div>

            <p class="pdf-tip">PDF按钮会打开打印预览，请选择“另存为 PDF”；Word文件可直接用 Microsoft Word 或 WPS 打开。</p>
            <p v-if="exportNotice" class="export-notice" aria-live="polite">{{ exportNotice }}</p>
          </div>
        </div>
      </section>
      <section class="section category-section">
        <div class="container">
          <header class="category-heading"><span class="eyebrow">QUESTION MAP</span><h2 class="serif">一轮{{ sessionSize }}题如何组成</h2></header>
          <div class="category-grid">
            <article v-for="item in quizCategoryPlan" :key="item.category">
              <span>{{ item.pick }}题</span><h3>{{ item.category }}</h3><p>题库 {{ item.total }} 题</p>
            </article>
          </div>
        </div>
      </section>
    </template>

    <section v-else-if="screen === 'question'" class="question-screen">
      <div class="quiz-topbar">
        <RouterLink to="/quiz" class="quiz-brand" @click.prevent="screen = 'intro'"><BookOpen :size="20" /><span>侨史知识挑战</span></RouterLink>
        <div class="top-progress"><span>已答 {{ answeredCount }} / {{ sessionQuestions.length }}</span><i><b :style="{ width: `${progress}%` }"></b></i></div>
        <button type="button" @click="startQuiz"><RefreshCw :size="17" />重新抽题</button>
      </div>

      <div class="question-shell container" aria-live="polite">
        <div class="question-index"><span>QUESTION</span><strong class="serif">{{ String(currentIndex + 1).padStart(2, '0') }}</strong><i>/ {{ sessionQuestions.length }}</i></div>
        <article class="question-card">
          <div class="question-meta"><span>{{ currentQuestion.category }}</span><span>{{ { easy: '基础', medium: '进阶', hard: '挑战' }[currentQuestion.difficulty] }}</span></div>
          <h1>{{ currentQuestion.question }}</h1>
          <div class="options" role="radiogroup" :aria-label="currentQuestion.question">
            <button
              v-for="(option, index) in currentQuestion.options"
              :key="option"
              type="button"
              role="radio"
              :aria-checked="currentAnswer === index"
              :class="optionState(index)"
              :disabled="currentAnswer !== null"
              @click="selectOption(index)"
            >
              <span>{{ ['A', 'B', 'C', 'D'][index] }}</span><strong>{{ option }}</strong>
              <Check v-if="optionState(index) === 'correct'" :size="19" />
              <X v-else-if="optionState(index) === 'wrong'" :size="19" />
            </button>
          </div>

          <Transition name="feedback">
            <div v-if="currentAnswer !== null" class="answer-feedback" :class="{ success: currentAnswer === currentQuestion.answer }">
              <div class="feedback-title">
                <span><component :is="currentAnswer === currentQuestion.answer ? Check : X" :size="20" /></span>
                <strong>{{ currentAnswer === currentQuestion.answer ? '回答正确' : '再认识一下这条线索' }}</strong>
              </div>
              <p>{{ currentQuestion.explanation }}</p>
              <a v-if="isExternalUrl(currentQuestion.source.url)" :href="currentQuestion.source.url" target="_blank" rel="noopener noreferrer">资料来源｜{{ currentQuestion.source.institution }} <ExternalLink :size="14" /></a>
              <RouterLink v-else-if="currentQuestion.source.url" :to="currentQuestion.source.url">资料来源｜{{ currentQuestion.source.institution }} <ArrowRight :size="14" /></RouterLink>
              <span v-else>资料来源｜{{ currentQuestion.source.institution }} · 团队内部资料</span>
            </div>
          </Transition>
        </article>

        <nav class="question-nav" aria-label="题目导航">
          <button type="button" :disabled="currentIndex === 0" @click="goPrevious"><ArrowLeft :size="18" />上一题</button>
          <button class="next-button" type="button" :disabled="currentAnswer === null" @click="goNext">{{ currentIndex === sessionQuestions.length - 1 ? '查看成绩' : '下一题' }} <ArrowRight :size="18" /></button>
        </nav>
      </div>
    </section>

    <section v-else class="result-screen">
      <div class="result-card" :class="resultLevel.tone">
        <span class="result-icon"><Trophy :size="42" stroke-width="1.4" /></span>
        <p>本轮挑战完成</p>
        <div class="score serif"><strong>{{ percent }}</strong><span>分</span></div>
        <h1 class="serif">{{ resultLevel.title }}</h1>
        <p class="result-note">答对 {{ score }} / {{ sessionQuestions.length }} 题。{{ resultLevel.note }}</p>
        <div class="result-actions">
          <button class="btn btn-primary" type="button" @click="startQuiz"><RotateCcw :size="18" />重新挑战{{ sessionSize }}题</button>
          <button v-if="score < sessionQuestions.length" class="btn review-button" type="button" @click="reviewFirstWrong">回看错题 <ArrowRight :size="18" /></button>
          <RouterLink to="/history" class="history-link">回到数字侨史</RouterLink>
        </div>
        <small>每次重新挑战都会按主题重新随机抽题并打乱选项。</small>
      </div>
    </section>
  </div>
</template>

<style scoped>
.intro-section { background: var(--color-paper); }
.intro-layout { display: grid; grid-template-columns: 1.15fr .85fr; gap: clamp(50px,8vw,100px); align-items: center; }
.intro-layout h2 { max-width: 740px; margin: 18px 0; font-size: clamp(38px,5vw,59px); line-height: 1.35; }
.intro-layout > div > p { max-width: 730px; color: var(--color-text-secondary); font-size: 17px; line-height: 1.95; }
.start-button { margin-top: 22px; }
.quiz-card { position: relative; overflow: hidden; padding: 45px; color: white; background: linear-gradient(145deg,var(--color-primary-dark),#ae5549); border-radius: var(--radius-large); box-shadow: 0 25px 60px rgba(99,35,31,.25); }
.quiz-card::after { content: '?'; position: absolute; right: -14px; bottom: -94px; color: rgba(255,255,255,.06); font-family: var(--font-serif); font-size: 290px; }
.quiz-number { font-size: 86px; line-height: .9; }
.quiz-card > p { margin: 14px 0 30px; color: #f1c8bd; }
.quiz-stats { position: relative; z-index: 1; display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; padding: 20px 0; border-block: 1px solid rgba(255,255,255,.17); }
.quiz-stats span { display: flex; flex-direction: column; gap: 4px; color: rgba(255,255,255,.62); font-size: 10px; }
.quiz-stats strong { color: white; font-family: var(--font-serif); font-size: 24px; }
.quiz-card small { position: relative; z-index: 1; display: block; margin-top: 22px; color: rgba(255,255,255,.52); line-height: 1.6; }
.export-section { color: white; background: linear-gradient(145deg, #602321 0%, #8b3631 56%, #a95046 100%); }
.export-layout { display: grid; grid-template-columns: .72fr 1.28fr; gap: clamp(40px,7vw,90px); align-items: start; }
.export-heading { position: sticky; top: 110px; }
.export-heading .eyebrow { color: #efbdb1; }
.export-heading h2 { max-width: 420px; margin: 18px 0 24px; font-size: clamp(38px,4.6vw,58px); line-height: 1.28; }
.export-heading p { max-width: 470px; color: rgba(255,255,255,.7); font-size: 16px; line-height: 1.9; }
.export-panel { padding: clamp(25px,4vw,42px); color: var(--color-text); background: var(--color-paper-light); border: 1px solid rgba(255,255,255,.32); border-radius: var(--radius-large); box-shadow: 0 28px 70px rgba(45,17,15,.24); }
.scope-switch { display: grid; grid-template-columns: 1fr 1fr auto; gap: 10px; }
.scope-switch > button { display: flex; align-items: center; gap: 12px; min-height: 62px; padding: 10px 15px; color: var(--color-text-secondary); background: white; border: 1px solid var(--color-border); border-radius: 13px; text-align: left; transition: .2s ease; }
.scope-switch > button span { display: flex; flex-direction: column; gap: 2px; }
.scope-switch > button strong { color: var(--color-text); font-size: 13px; }
.scope-switch > button small { color: var(--color-text-light); font-size: 10px; }
.scope-switch > button.active { color: var(--color-primary); background: #f8e8e3; border-color: #d99d92; box-shadow: inset 0 0 0 1px #d99d92; }
.scope-switch > button.active strong { color: var(--color-primary-dark); }
.scope-switch > button.regenerate { justify-content: center; min-width: 86px; color: var(--color-primary); font-size: 12px; font-weight: 700; }
.paper-code { display: grid; grid-template-columns: auto 1fr; gap: 2px 12px; align-items: baseline; margin-top: 14px; padding: 13px 16px; background: #efe6d9; border-radius: 12px; }
.paper-code span { color: var(--color-text-light); font-size: 10px; }
.paper-code strong { color: var(--color-primary-dark); font-family: ui-monospace, SFMono-Regular, Consolas, monospace; font-size: 13px; }
.paper-code small { grid-column: 2; color: var(--color-text-light); font-size: 10px; }
.document-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 18px; }
.document-card { position: relative; display: flex; flex-direction: column; min-height: 305px; padding: 25px; overflow: hidden; background: white; border: 1px solid var(--color-border); border-radius: 16px; }
.document-card::after { content: ''; position: absolute; right: -38px; bottom: -52px; width: 150px; height: 150px; border: 25px solid rgba(139,46,46,.04); border-radius: 50%; }
.document-icon { display: grid; place-content: center; width: 50px; height: 50px; margin-bottom: 30px; color: var(--color-primary); background: var(--color-primary-soft); border-radius: 14px; }
.answer-document .document-icon { color: var(--color-navy); background: #e2e9e8; }
.document-card small { color: var(--color-text-light); font-size: 9px; letter-spacing: .13em; }
.document-card h3 { margin: 5px 0 10px; font-family: var(--font-serif); font-size: 24px; }
.document-card p { margin: 0; color: var(--color-text-secondary); font-size: 12px; line-height: 1.75; }
.document-actions { position: relative; z-index: 1; display: flex; gap: 8px; margin-top: auto; padding-top: 22px; }
.document-actions button { display: inline-flex; align-items: center; justify-content: center; gap: 6px; flex: 1; min-height: 39px; color: var(--color-primary); background: white; border: 1px solid #d9a49a; border-radius: 999px; font: inherit; font-size: 11px; font-weight: 700; }
.document-actions button:first-child { color: white; background: var(--color-primary); border-color: var(--color-primary); }
.document-actions button:disabled { opacity: .55; cursor: wait; }
.pdf-tip { margin: 15px 3px 0; color: var(--color-text-light); font-size: 10px; line-height: 1.6; }
.export-notice { margin: 12px 0 0; padding: 11px 14px; color: #21583a; background: #e9f4ec; border-radius: 10px; font-size: 11px; }
.category-section { background: white; }
.category-heading h2 { margin: 15px 0 40px; font-size: 40px; }
.category-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 13px; }
.category-grid article { padding: 24px; background: var(--color-paper-light); border: 1px solid var(--color-border); border-radius: var(--radius-medium); }
.category-grid span { color: var(--color-primary); font-size: 12px; font-weight: 700; }
.category-grid h3 { margin: 25px 0 6px; font-size: 16px; }
.category-grid p { margin: 0; color: var(--color-text-light); font-size: 11px; }
.question-screen { min-height: 100vh; padding-bottom: 70px; background: radial-gradient(circle at 20% 0,#f0d7d0,transparent 38%),var(--color-paper); }
.quiz-topbar { position: sticky; z-index: 15; top: 0; display: grid; grid-template-columns: 1fr minmax(260px,480px) 1fr; align-items: center; gap: 24px; height: 76px; padding: 0 38px; background: rgba(255,250,244,.94); border-bottom: 1px solid var(--color-border); backdrop-filter: blur(14px); }
.quiz-brand { display: flex; align-items: center; gap: 9px; color: var(--color-primary); font-weight: 700; }
.top-progress { display: flex; align-items: center; gap: 12px; color: var(--color-text-light); font-size: 11px; }
.top-progress i { flex: 1; height: 4px; overflow: hidden; background: #eadfd7; border-radius: 10px; }
.top-progress b { display: block; height: 100%; background: var(--color-primary); transition: width .35s ease; }
.quiz-topbar > button { display: inline-flex; align-items: center; justify-self: end; gap: 7px; color: var(--color-text-secondary); background: transparent; border: 0; font: inherit; font-size: 12px; }
.question-shell { max-width: 930px; padding-top: 65px; }
.question-index { display: flex; align-items: baseline; justify-content: center; gap: 9px; margin-bottom: 20px; color: var(--color-text-light); }
.question-index span { font-size: 10px; letter-spacing: .18em; }
.question-index strong { color: var(--color-primary); font-size: 36px; }
.question-index i { font-size: 12px; font-style: normal; }
.question-card { padding: clamp(28px,5vw,56px); background: white; border: 1px solid rgba(120,90,70,.1); border-radius: var(--radius-large); box-shadow: 0 24px 65px rgba(66,39,31,.11); }
.question-meta { display: flex; gap: 8px; }
.question-meta span { padding: 5px 10px; color: var(--color-primary); background: var(--color-primary-soft); border-radius: 999px; font-size: 11px; }
.question-card h1 { margin: 25px 0 30px; font-size: clamp(23px,3vw,32px); line-height: 1.6; }
.options { display: grid; gap: 12px; }
.options button { display: grid; grid-template-columns: 42px 1fr auto; align-items: center; gap: 14px; min-height: 62px; padding: 10px 20px; color: var(--color-text); background: var(--color-paper-light); border: 1px solid var(--color-border); border-radius: 14px; text-align: left; transition: .2s; }
.options button > span { display: grid; place-content: center; width: 34px; height: 34px; color: var(--color-primary); background: white; border: 1px solid var(--color-primary-soft); border-radius: 50%; font-family: var(--font-serif); }
.options button:hover:not(:disabled) { border-color: var(--color-primary-light); transform: translateX(4px); }
.options button:disabled { cursor: default; opacity: 1; }
.options button.correct { color: #1f5a3b; background: #e6f4eb; border-color: #9ac9aa; }
.options button.correct > span { color: white; background: #2f7a50; border-color: #2f7a50; }
.options button.wrong { color: var(--color-primary-dark); background: #f8e5e2; border-color: #dc9e95; }
.options button.wrong > span { color: white; background: var(--color-primary); border-color: var(--color-primary); }
.options button.muted { opacity: .5; }
.answer-feedback { margin-top: 24px; padding: 22px 24px; color: var(--color-primary-dark); background: #f9e9e5; border-left: 4px solid var(--color-primary); border-radius: 0 13px 13px 0; }
.answer-feedback.success { color: #21583a; background: #e9f4ec; border-color: #3d8259; }
.feedback-title { display: flex; align-items: center; gap: 10px; }
.feedback-title > span { display: grid; place-content: center; width: 30px; height: 30px; color: white; background: currentColor; border-radius: 50%; }
.feedback-title svg { color: white; }
.answer-feedback > p { margin: 12px 0; color: var(--color-text-secondary); line-height: 1.8; }
.answer-feedback > a, .answer-feedback > span { display: inline-flex; align-items: center; gap: 6px; color: currentColor; font-size: 11px; }
.feedback-enter-active { transition: .3s ease; }.feedback-enter-from { opacity: 0; transform: translateY(-8px); }
.question-nav { display: flex; justify-content: space-between; margin-top: 22px; }
.question-nav button { display: inline-flex; align-items: center; gap: 8px; min-height: 46px; padding: 0 20px; color: var(--color-text-secondary); background: white; border: 1px solid var(--color-border); border-radius: 999px; font: inherit; font-weight: 700; }
.question-nav button:disabled { opacity: .35; }
.question-nav .next-button { color: white; background: var(--color-primary); border-color: var(--color-primary); }
.result-screen { display: grid; place-content: center; min-height: 100vh; padding: 110px 20px 60px; background: radial-gradient(circle at 50% 0,#dc978a,transparent 38%),var(--color-primary-dark); }
.result-card { width: min(680px,calc(100vw - 40px)); padding: clamp(36px,6vw,70px); background: var(--color-paper-light); border-radius: var(--radius-large); box-shadow: 0 30px 90px rgba(30,15,13,.28); text-align: center; }
.result-icon { display: grid; place-content: center; width: 76px; height: 76px; margin: auto; color: white; background: var(--color-primary); border-radius: 50%; box-shadow: 0 0 0 9px var(--color-primary-soft); }
.result-card > p:first-of-type { margin: 27px 0 0; color: var(--color-text-light); font-size: 12px; letter-spacing: .15em; }
.score { display: flex; align-items: baseline; justify-content: center; color: var(--color-primary); }
.score strong { font-size: 96px; line-height: 1.1; }.score span { font-size: 22px; }
.result-card h1 { margin: 5px 0 10px; font-size: 42px; }
.result-note { color: var(--color-text-secondary); line-height: 1.8; }
.result-actions { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 10px; margin: 30px 0 22px; }
.review-button { color: var(--color-primary); background: white; border-color: var(--color-primary-soft); }
.history-link { color: var(--color-text-secondary); font-size: 13px; font-weight: 700; }
.result-card > small { color: var(--color-text-light); }
@media (max-width: 850px) {
  .intro-layout { grid-template-columns: 1fr; }
  .quiz-card { max-width: 620px; }
  .export-layout { grid-template-columns: 1fr; }
  .export-heading { position: static; }
  .export-heading p { max-width: 700px; }
  .category-grid { grid-template-columns: repeat(2,1fr); }
  .quiz-topbar { grid-template-columns: 1fr auto; padding-inline: 20px; }
  .top-progress { grid-column: 1 / -1; grid-row: 2; padding-bottom: 9px; }
  .quiz-topbar { height: auto; min-height: 76px; padding-block: 13px; }
}
@media (max-width: 560px) {
  .category-grid { grid-template-columns: 1fr; }
  .quiz-card { padding: 32px 26px; }
  .export-panel { padding: 20px 16px; }
  .scope-switch { grid-template-columns: 1fr; }
  .scope-switch > button.regenerate { min-height: 42px; }
  .document-grid { grid-template-columns: 1fr; }
  .document-card { min-height: 270px; }
  .paper-code { grid-template-columns: 1fr; }
  .paper-code small { grid-column: 1; }
  .question-shell { padding-top: 40px; }
  .question-card { border-radius: var(--radius-medium); }
  .options button { grid-template-columns: 34px 1fr auto; padding-inline: 13px; }
  .options button > span { width: 30px; height: 30px; }
  .quiz-brand span, .quiz-topbar > button { font-size: 0; }
  .quiz-topbar > button svg { margin: 0; }
  .question-nav button { padding-inline: 15px; }
}
</style>
