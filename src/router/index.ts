import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    redirect: () => {
      if (localStorage.getItem('token')) return {
        path: '/'
      }
      return {
        path: '/auth'
      }
    }
  },
  {
    path: '/',
    name: 'Index',
    component: () => import(/* webpackChunkName: "Index" */ '../views/Index.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/u/:username?',
    name: 'Chat',
    component: () => import(/* webpackChunkName: "Chat" */ '../views/Chat.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "Auth" */ '../views/Auth.vue'),
    meta: { requiresAuth: false }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
