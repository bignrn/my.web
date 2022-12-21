import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView'
import ActivityView from '../views/ActivityView'
import MyHistoryView from '../views/MyHistoryView';

const rootPath = "/my.web";

const routes = [
  {
    path: rootPath + '/home',
    name: 'home',
    component: IndexView
  },
  {
    path: rootPath + '/ice-break',
    name: 'iceBreak',
    component: ActivityView,
  },
  {
    path: rootPath + '/my-profile-page',
    name: 'MyHistory',
    component: MyHistoryView,
  },
  {
    path: rootPath,
    component: IndexView,
    redirect: rootPath + "/home",
  },
  {
    path: '/',
    component: IndexView,
    redirect: rootPath + "/home",
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
