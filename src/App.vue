<script setup>
import Navbar from './components/Navbar.vue'
import SiteFooter from './components/Footer.vue'
import BackToTop from './components/BackToTop.vue'
</script>

<template>
  <Navbar />
  <main>
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
  <SiteFooter />
  <BackToTop />
</template>
