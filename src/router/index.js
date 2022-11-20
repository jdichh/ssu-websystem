//Link Management
import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../firebase'

const Home = () => import('../views/Home.vue')
const Login = () => import('../views/Login.vue')
const Logout = () => import('../views/Login.vue')
const Guards = () => import('../views/Guards.vue')
const GuardsArchive = () => import('../views/GuardsArchive.vue')
const GuardLocation = () => import('../views/GuardLocation.vue')
const Reports = () => import('../views/Reports.vue')
const ReportsArchive = () => import('../views/ReportsArchive.vue')
const ViewReport = () => import('../components/ViewReport.vue')
const ViewReportArchived = () => import('../components/ViewReportArchived.vue')
const Events = () => import('../views/Events.vue')
const DTR = () => import('../views/TimeRecord.vue')
const AddGuards = () => import('../components/AddGuards.vue')
const EditGuards = () => import('../components/EditGuards.vue')
const ViewGuardArchived = () => import('../components/ViewGuardArchived.vue')
const AddEvents = () => import('../components/AddEvents.vue')
const EditEvents = () => import('../components/EditEvents.vue')


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
    path: '/guardsarchive',
    name: 'GuardsArchive',
    component: GuardsArchive,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/guardlocation',
    name: 'GuardLocation',
    component: GuardLocation,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/viewarchivedguard/:id',
    name: 'ViewArchivedGuard',
    component: ViewGuardArchived,
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
    name: 'Reports',
    component: Reports,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/reportsarchive',
    name: 'ReportsArchive',
    component: ReportsArchive,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/view-report/:id',
    name: 'ViewReport',
    component: ViewReport,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/viewarchivedreport/:id',
    name: 'ViewArchivedReport',
    component: ViewReportArchived,
    meta: {
      requiresAuth: true
    }
  },
  
  {
    path: '/events',
    name: 'Events',
    component: Events,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dtr',
    name: 'DailyTimeRecord',
    component: DTR,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/add-event/',
    name: 'AddEvent',
    component: AddEvents,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/edit-event/:id',
    name: 'EditEvent',
    component: EditEvents,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
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
