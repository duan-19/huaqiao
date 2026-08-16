import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('../views/Home.vue') },
  { path: '/classes', name: 'classes', component: () => import('../views/Classes.vue') },
  { path: '/classes/:id(war|youth|qiaopi)', name: 'course-detail', component: () => import('../views/CourseDetail.vue') },
  { path: '/visit', name: 'visit', component: () => import('../views/Visit.vue') },
  { path: '/practice', name: 'practice', component: () => import('../views/Practice.vue') },
  { path: '/history', name: 'history', component: () => import('../views/History.vue') },
  { path: '/achievements', name: 'achievements', component: () => import('../views/Achievements.vue') },
  { path: '/resources', name: 'resources', component: () => import('../views/Resources.vue') },
  { path: '/quiz', name: 'quiz', component: () => import('../views/Quiz.vue') },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFound.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0, behavior: 'smooth' }
  },
})

export default router
