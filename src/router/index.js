import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView'
import ActivityView from '../views/ActivityView'
import MyHistoryView from '../views/MyHistoryView';

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
    path: '/my-profile-page',
    name: 'MyHistory',
    component: MyHistoryView,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
