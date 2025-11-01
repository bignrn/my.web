import { createRouter, createWebHistory } from 'vue-router'
import ActivityView from '../views/ActivityView'
import MyHistoryView from '../views/MyHistoryView';
import ActivityAmidaView from '@/views/ActivityAmidaView.vue';

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
    path: '/money-amida',
    name: 'ActivityAmidaView',
    component: ActivityAmidaView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
