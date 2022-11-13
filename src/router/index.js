import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView'
import ActivityView from '../views/ActivityView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: IndexView
  },
  {
    path: '/ice-break',
    name: 'iceBreak',
    component: ActivityView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
