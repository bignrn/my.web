import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: IndexView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
