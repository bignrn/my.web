import { createRouter, createWebHistory } from 'vue-router'
import ActivityView from '@/views/ActivityView'
import ExActivityView from '@/views/ExActivityView.vue'
import MyHistoryView from '@/views/MyHistoryView';

const routes = [
  {
    path: '/',
    redirect: "/profile",
  },
  {
    path: '/profile',
    name: 'MyHistory',
    component: MyHistoryView,
  },
  {
    path: '/ice-break',
    name: 'iceBreak',
    component: ActivityView,
  },
  {
    path: '/ice-break-ex',
    name: 'ExActivityView',
    component: ExActivityView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
