import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Home from '@/pages/Home.vue'
import Admin from "@/pages/Admin.vue";

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  },
  {
    // 404 페이지 - 잘못된 경로로 접근시 홈으로 리다이렉트
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
