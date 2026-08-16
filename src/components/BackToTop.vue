<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { ArrowUp } from 'lucide-vue-next'
const visible = ref(false)
const onScroll = () => { visible.value = window.scrollY > 500 }
const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>
<template><Transition name="back"><button v-if="visible" class="back-top" title="返回顶部" aria-label="返回顶部" @click="scrollTop"><ArrowUp :size="20" /></button></Transition></template>
<style scoped>.back-top{position:fixed;z-index:40;right:24px;bottom:24px;display:grid;place-content:center;width:46px;height:46px;color:white;background:var(--color-primary);border:0;border-radius:50%;box-shadow:0 10px 24px rgba(101,32,32,.3)}.back-enter-active,.back-leave-active{transition:.25s}.back-enter-from,.back-leave-to{opacity:0;transform:translateY(10px)}</style>
