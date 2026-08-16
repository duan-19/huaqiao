<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { Menu, X, ArrowRight } from 'lucide-vue-next'
import { useRoute } from 'vue-router'

const scrolled = ref(false)
const open = ref(false)
const route = useRoute()
const nav = [
  { label: '首页', to: '/' }, { label: '三期侨课', to: '/classes' }, { label: '寻访侨迹', to: '/visit' },
  { label: '实践风采', to: '/practice' }, { label: '数字侨史', to: '/history' }, { label: '学习专区', to: '/resources' },
]
const onScroll = () => { scrolled.value = window.scrollY > 30 }
onMounted(() => { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }) })
onUnmounted(() => window.removeEventListener('scroll', onScroll))
watch(() => route.fullPath, () => { open.value = false })
</script>

<template>
  <header class="navbar" :class="{ scrolled, open, solid: route.path !== '/' }">
    <div class="nav-inner">
      <RouterLink to="/" class="brand" aria-label="青声传薪首页">
        <span class="seal">青<br>声</span>
        <span class="brand-text"><strong>青声传薪</strong><small>数扬侨魂</small></span>
      </RouterLink>
      <nav class="desktop-nav" aria-label="主导航">
        <RouterLink v-for="item in nav" :key="item.to" :to="item.to">{{ item.label }}</RouterLink>
      </nav>
      <div class="nav-actions">
        <RouterLink to="/quiz" class="journey-button">500题知识挑战 <ArrowRight :size="16" /></RouterLink>
        <button class="menu-button" :aria-expanded="open" aria-label="打开导航菜单" @click="open = !open"><component :is="open ? X : Menu" :size="24" /></button>
      </div>
    </div>
    <Transition name="drawer">
      <nav v-if="open" class="mobile-nav" aria-label="移动端导航">
        <RouterLink v-for="item in nav" :key="item.to" :to="item.to">{{ item.label }} <ArrowRight :size="17" /></RouterLink>
        <RouterLink to="/quiz" class="mobile-journey">500题知识挑战</RouterLink>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.navbar { position: fixed; z-index: 50; top: 0; left: 0; width: 100%; height: 76px; color: white; transition: background .3s ease, color .3s ease, box-shadow .3s ease; }
.navbar.scrolled, .navbar.solid { color: var(--color-text); background: rgba(247,242,232,.92); box-shadow: 0 5px 24px rgba(45,35,25,.08); backdrop-filter: blur(14px); }
.nav-inner { display: flex; align-items: center; width: min(calc(100% - 64px), 1320px); height: 100%; margin: auto; }
.brand { display: flex; align-items: center; gap: 10px; flex: none; }
.seal { display: grid; place-content: center; width: 39px; height: 39px; color: #fff7ed; background: var(--color-primary); border: 1px solid rgba(255,255,255,.5); border-radius: 50%; font-family: var(--font-serif); font-size: 12px; font-weight: 700; line-height: 1.05; text-align: center; box-shadow: inset 0 0 0 3px var(--color-primary), inset 0 0 0 4px rgba(255,255,255,.48); }
.brand-text { display: flex; flex-direction: column; line-height: 1.18; }
.brand-text strong { font-family: var(--font-serif); font-size: 17px; letter-spacing: .08em; }
.brand-text small { margin-top: 4px; opacity: .65; font-size: 10px; letter-spacing: .22em; }
.desktop-nav { display: flex; align-items: center; gap: clamp(16px, 2vw, 30px); margin-left: auto; }
.desktop-nav a { position: relative; padding: 28px 0 24px; font-size: 14px; font-weight: 600; }
.desktop-nav a::after { content: ''; position: absolute; left: 50%; bottom: 17px; width: 0; height: 2px; background: var(--color-primary-light); transition: width .25s, left .25s; }
.desktop-nav a:hover::after, .desktop-nav a.router-link-active::after { left: 0; width: 100%; }
.nav-actions { display: flex; align-items: center; gap: 12px; margin-left: 28px; }
.menu-button { display: grid; place-content: center; width: 38px; height: 38px; color: inherit; background: transparent; border: 0; border-radius: 50%; }
.menu-button:hover { background: rgba(139,46,46,.1); }
.journey-button { display: inline-flex; align-items: center; gap: 6px; padding: 11px 17px; color: white; background: var(--color-primary); border-radius: 999px; font-size: 13px; font-weight: 700; }
.menu-button { display: none; }
.mobile-nav { position: fixed; top: 76px; right: 0; display: flex; flex-direction: column; width: min(84vw, 360px); height: calc(100vh - 76px); padding: 28px; color: var(--color-text); background: var(--color-paper-light); box-shadow: -16px 30px 40px rgba(0,0,0,.12); }
.mobile-nav a { display: flex; justify-content: space-between; padding: 17px 4px; border-bottom: 1px solid var(--color-border); font-weight: 700; }
.mobile-nav .mobile-journey { justify-content: center; margin-top: 24px; color: white; background: var(--color-primary); border: 0; border-radius: 999px; }
.drawer-enter-active,.drawer-leave-active { transition: transform .3s ease, opacity .3s ease; }.drawer-enter-from,.drawer-leave-to { opacity: 0; transform: translateX(100%); }
@media (max-width: 1120px) { .desktop-nav, .journey-button { display: none; } .nav-actions { margin-left: auto; } .menu-button { display: grid; } }
@media (max-width: 576px) { .nav-inner { width: calc(100% - 32px); } }
</style>
