import { createRouter, createWebHistory } from 'vue-router'
import SessionSetup from '../components/SessionSetup.vue'
import MemorizationPhase from '../components/MemorizationPhase.vue'
import ReviewPhase from '../components/ReviewPhase.vue'

const routes = [
  {
    path: '/',
    name: 'Setup',
    component: SessionSetup
  },
  {
    path: '/memorization',
    name: 'Memorization',
    component: MemorizationPhase
  },
  {
    path: '/review',
    name: 'Review',
    component: ReviewPhase
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
