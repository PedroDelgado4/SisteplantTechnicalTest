import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import ProductionLines from '../views/ProductionLines.vue'
import MachineDetail from '../views/MachineDetail.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/production-lines',
      name: 'ProductionLines',
      component: ProductionLines
    },
    {
      path: '/machine/:id',
      name: 'MachineDetail',
      component: MachineDetail
    }
  ]
})

export default router
