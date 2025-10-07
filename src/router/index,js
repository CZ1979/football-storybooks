import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Create from '@/views/Create.vue'
import Status from '@/views/Status.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/create', name: 'create', component: Create },
  { path: '/status/:formId', name: 'status', component: Status, props: true },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
