//Link Management
import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../firebase'
import { defineAsyncComponent } from 'vue'

const Home = defineAsyncComponent (
  () => import('../views/Home.vue')
)

const Login = defineAsyncComponent (
  () => import('../views/Login.vue')
)

const Guards = defineAsyncComponent (
  () => import('../views/Guards.vue')
)

const Reports = defineAsyncComponent (
  () => import('../views/Reports.vue')
)

const Schedule = defineAsyncComponent (
  () => import('../views/Schedule.vue')
)

const AddGuards = defineAsyncComponent (
  () => import('../components/AddGuards.vue')
)

const EditGuards = defineAsyncComponent (
  () => import('../components/EditGuards.vue')
)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/guards',
    name: 'Guards',
    component: Guards,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/edit-guard/:id',
    name: 'EditGuard',
    component: EditGuards,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/add-guards',
    name: 'AddGuards',
    component: AddGuards,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/reports',
    name: 'Reports & Logs',
    component: Reports,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/schedule',
    name: 'Scheduling',
    component: Schedule,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' && auth.currentUser) {
    next('/')
    return;
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
    next('/login')
    return;
  }

  next();
})

export default router
