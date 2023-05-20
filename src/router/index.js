import { createRouter, createWebHistory } from 'vue-router'
import ActivityView from '../views/ActivityView'
import MyHistoryView from '../views/MyHistoryView';
import VideoView from '../views/VideoView';

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
    path: '/my-hobby-video',
    name: 'VideoView',
    component: VideoView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
