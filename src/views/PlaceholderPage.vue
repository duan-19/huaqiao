<script setup>
import PageHero from '../components/PageHero.vue'
defineProps({ title: String, subtitle: String })
</script>
<template><PageHero :title="title" :subtitle="subtitle" /><section class="section"><div class="container placeholder"><span class="eyebrow">项目骨架已就位</span><h2 class="serif">该页面将在下一阶段完善</h2><p>当前首版聚焦首页视觉评审。路由与页面入口已经建立，后续会沿用同一套设计系统继续开发。</p><RouterLink to="/" class="btn btn-primary">返回首页</RouterLink></div></section></template>
<style scoped>.placeholder{max-width:760px;text-align:center}.placeholder .eyebrow{justify-content:center}.placeholder h2{margin:20px 0 14px;font-size:36px}.placeholder p{margin-bottom:28px;color:var(--color-text-secondary);line-height:1.8}</style>
