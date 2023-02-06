import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

console.log(
  'import.meta.env.BASE_URL',
  import.meta.env.BASE_URL,
  window.__MICRO_APP_BASE_ROUTE__
)

const router = createRouter({
  history: createWebHistory(
    window.__MICRO_APP_BASE_ROUTE__ || import.meta.env.BASE_URL
  ),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
