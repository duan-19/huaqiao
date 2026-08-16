<script setup>
defineProps({ eyebrow: String, title: String, subtitle: String, light: Boolean, align: { type: String, default: 'left' } })
</script>

<template>
  <header class="section-title" :class="[`align-${align}`, { light }]">
    <span v-if="eyebrow" class="eyebrow">{{ eyebrow }}</span>
    <h2 class="serif">{{ title }}</h2>
    <p v-if="subtitle">{{ subtitle }}</p>
  </header>
</template>

<style scoped>
.section-title { max-width: 760px; margin-bottom: 46px; }
.section-title.align-center { margin-inline: auto; text-align: center; }
.align-center .eyebrow { justify-content: center; }
.section-title h2 { margin: 14px 0 16px; font-size: clamp(32px, 4vw, 46px); line-height: 1.22; letter-spacing: -.035em; }
.section-title p { margin: 0; color: var(--color-text-secondary); font-size: 17px; line-height: 1.85; }
.section-title.light h2, .section-title.light p { color: white; }
.section-title.light .eyebrow { color: #e6b9ae; }
</style>
