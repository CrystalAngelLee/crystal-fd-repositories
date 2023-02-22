import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './pages/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/react17/',
  },
  {
    path: '/react17/*',
    name: 'react17',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    component: () =>
      import(/* webpackChunkName: "about" */ './pages/About.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
