import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/inserir_produtos',
    name: 'inserirProdutos',
    component: () => import('../views/InserirProdutos.vue')
  },
  {
    path: '/inserir_gastos',
    name: 'inserirGastos',
    component: () => import('../views/InserirGastos.vue')
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
