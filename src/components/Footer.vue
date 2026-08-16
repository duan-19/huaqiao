<script setup>
const links = [
  { label: '三期侨课', to: '/classes' }, { label: '寻访侨迹', to: '/visit' }, { label: '实践风采', to: '/practice' },
  { label: '数字侨史', to: '/history' }, { label: '实践成果', to: '/achievements' }, { label: '学习专区', to: '/resources' },
  { label: '500题知识挑战', to: '/quiz' },
]
</script>
<template>
  <footer class="footer">
    <div class="container footer-grid">
      <section class="footer-brand">
        <div class="footer-mark">侨</div>
        <h2 class="serif">青声传薪 · 数扬侨魂</h2>
        <p>华侨革命史数字科普实践平台</p>
        <p class="team">计算机科学与技术学院<br>“青声传薪，数扬侨魂”华侨革命史科普实践团</p>
      </section>
      <section><h3>快速导航</h3><nav class="footer-links"><RouterLink v-for="item in links" :key="item.to" :to="item.to">{{ item.label }}</RouterLink></nav></section>
      <section><h3>资料与版权</h3><p class="source-note">历史科普内容已尽可能附上政府、档案馆、博物馆与联合国教科文组织等来源。暂未核实的信息不会作为确定史实发布。</p><div class="logo-slots"><span>学校 LOGO 预留</span><span>学院 LOGO 预留</span></div></section>
    </div>
    <div class="container copyright">本网站用于高校社会实践与公益科普展示。涉及历史图文资料均尽可能标明资料来源，相关资料版权归原机构或作者所有。<span>© {{ new Date().getFullYear() }} 青声传薪实践团</span></div>
  </footer>
</template>
<style scoped>
.footer { padding-top: 76px; color: rgba(255,255,255,.76); background: #241d1c; }
.footer-grid { display: grid; grid-template-columns: 1.3fr .75fr 1fr; gap: 70px; padding-bottom: 58px; }
.footer-mark { display: grid; place-content: center; width: 48px; height: 48px; margin-bottom: 20px; color: #fff5e9; border: 1px solid #a24b43; border-radius: 50%; font-family: var(--font-serif); font-size: 24px; }
.footer h2 { margin-bottom: 8px; color: white; font-size: 25px; }.footer h3 { margin-bottom: 24px; color: white; font-size: 15px; letter-spacing: .08em; }
.footer p { line-height: 1.75; }.team { margin-top: 22px; font-size: 13px; opacity: .7; }.footer-links { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 22px; font-size: 14px; }.footer-links a:hover { color: white; }.source-note { font-size: 13px; }
.logo-slots { display: flex; gap: 10px; margin-top: 24px; }.logo-slots span { padding: 10px; border: 1px dashed rgba(255,255,255,.2); border-radius: 6px; font-size: 11px; }
.copyright { display: flex; justify-content: space-between; gap: 20px; padding-block: 22px; border-top: 1px solid rgba(255,255,255,.1); font-size: 12px; line-height: 1.6; }
@media(max-width:850px){.footer-grid{grid-template-columns:1fr;gap:40px}.copyright{flex-direction:column}.footer{padding-top:58px}}
</style>
