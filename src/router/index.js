import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: {
      layout: () => import('../layouts/AuthLayaout.vue')
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: {
      layout: () => import('../layouts/DefaultLayaout.vue')
    }
  },
  {
    path: '/courses',
    name: 'courses',
    component: () => import('../views/CoursesView.vue'),
    meta: {
      layout: () => import('../layouts/DefaultLayaout.vue')
    },
  },
  {
    path: '/courses/:id',
    name: 'courses-detail',
    component: () => import('../views/CoursesDetail.vue'),
    meta: {
      layout: () => import('../layouts/DefaultLayaout.vue')
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
