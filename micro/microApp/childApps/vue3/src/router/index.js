import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(
    window.__MICRO_APP_BASE_ROUTE__ || process.env.BASE_URL
  ),
  routes: [
    {
      path: '/detail',
      name: 'home',
      component: () => import('../pages/Detail.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/AboutView.vue'),
    },
  ],
})

export default router
