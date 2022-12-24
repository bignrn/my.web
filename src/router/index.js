import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView'
import ActivityView from '../views/ActivityView'
import MyHistoryView from '../views/MyHistoryView';

const routes = [
  {
    path: '/home',
    name: 'home',
    component: IndexView
  },
  {
    path: '/ice-break',
    name: 'iceBreak',
    component: ActivityView,
  },
  {
    path: '/my-profile-page',
    name: 'MyHistory',
    component: MyHistoryView,
  },
  // {
  //   path: "/my.web",
  //   redirect: "/home",
  // },
  {
    path: "/",
    redirect: "/home",
  }
]

const router = createRouter({
  history: createWebHistory("/my.web"),
  // history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
