import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomePage.vue'
// import UserHomeVue from '../views/UserHome.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {transition: 'ease'}
  },
  {
    path: '/personHomepage',
    name: 'userHomepage',
    component: ()=>import('@/views/UserHome.vue'),
  },
  {
    path: '/workManager',
    name: 'ArtWorksManageCenter',
    component: ()=>import('@/views/VideoManage.vue')
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: ()=>import('@/views/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'Register Page',
    component: ()=>import('@/views/RegisterPage.vue')
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
