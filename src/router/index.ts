import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue' // mantengo dashboard como carga inicial porque es la primera pantalla que verá el usuario

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    { // Lazy loading en la carga del resto de paginas
      path: '/production-lines',
      name: 'ProductionLines',
      component: () => import ('../views/ProductionLines.vue')
    },
    {
      path: '/machine/:id',
      name: 'MachineDetail',
      component: () => import('../views/MachineDetail.vue')
    },
    // bug fix: ruta comodin para atrapar urls que no existen
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      redirect: '/'
    }
  ]
})

export default router
