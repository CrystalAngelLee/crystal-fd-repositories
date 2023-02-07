import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(
    window.__MICRO_APP_BASE_ROUTE__ || process.env.BASE_URL
  ),
  routes: [
    {
      path: '/detail',
      name: 'detail',
      component: () => import('../pages/Detail.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../pages/AboutView.vue'),
    },
  ],
})

export default router
