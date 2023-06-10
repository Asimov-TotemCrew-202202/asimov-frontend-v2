import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: {
      requiresAuth: false,
      layout: () => import('../layouts/AuthLayaout.vue')
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignupView.vue'),
    meta: {
      layout: () => import('../layouts/AuthLayaout.vue')
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: {
      requiresAuth: true,
      layout: () => import('../layouts/DefaultLayaout.vue')
    }
  },
  {
    path: '/courses',
    name: 'courses',
    component: () => import('../views/CoursesView.vue'),
    meta: {
      requiresAuth: true,
      layout: () => import('../layouts/DefaultLayaout.vue')
    },
  },
  {
    path: '/courses/:id',
    name: 'courses-detail',
    component: () => import('../views/CoursesDetail.vue'),
    meta: {
      requiresAuth: true,
      layout: () => import('../layouts/DefaultLayaout.vue')
    },
  },
  {
    path: '/comunicados',
    name: 'comunicados',
    component: () => import('../views/ComunicadosView.vue'),
    meta: {
      requiresAuth: true,
      layout: () => import('../layouts/DefaultLayaout.vue')
    },
  },
  {
    path: '/competencias',
    name: 'competencias',
    component: () => import('../views/CompetenciasView.vue'),
    meta: {
      layout: () => import('../layouts/DefaultLayaout.vue')
    },
  },
  {
    path: '/profesores',
    name: 'profesores',
    component: () => import('../views/TeachersView.vue'),
    meta: {
      layout: () => import('../layouts/DefaultLayaout.vue')
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue'),
    meta: {
      requiresAuth: true,
      layout: () => import('../layouts/DefaultLayaout.vue')
    },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('user');
  if (to.meta.requiresAuth && !user) {
    next('/');
  } else {
    next();
  }
})

export default router
