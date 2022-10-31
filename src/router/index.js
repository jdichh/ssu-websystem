import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../firebase'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Guards from '../views/Guards.vue'
import Reports from '../views/Reports.vue'
import Schedule from '../views/Schedule.vue'
import AddGuards from '../components/AddGuards.vue'
import EditGuard from '../components/EditGuards.vue'

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
    component: EditGuard,
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
