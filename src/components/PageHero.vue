<script setup>
defineProps({ title: String, subtitle: String, eyebrow: String, backgroundImage: String })
</script>
<template><section class="page-hero" :style="backgroundImage ? { backgroundImage: `linear-gradient(90deg,rgba(33,22,20,.86),rgba(62,31,28,.52)),url(${backgroundImage})` } : null"><div class="container"><span class="eyebrow">{{ eyebrow || '青声传薪 · 数扬侨魂' }}</span><h1 class="serif">{{ title }}</h1><p>{{ subtitle }}</p></div></section></template>
<style scoped>.page-hero{display:flex;align-items:flex-end;min-height:440px;padding:140px 0 72px;color:white;background-color:#6f302f;background-size:cover;background-position:center}.eyebrow{color:#f1c6bc}.page-hero h1{margin:16px 0 12px;font-size:clamp(42px,6vw,64px)}.page-hero p{max-width:700px;margin:0;color:rgba(255,255,255,.8);font-size:18px;line-height:1.8}</style>
