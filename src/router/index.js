import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/lista',
    name: 'lista',
    component: () => import('../views/Lista.vue')
  },
  {
    path: '/gastos',
    name: 'gastos',
    component: () => import('../views/Gastos.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
