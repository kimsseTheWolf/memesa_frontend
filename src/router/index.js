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
  },
  {
    path: '/settings',
    name: 'Settings Page',
    component: ()=>import('@/views/settingsPage.vue'),
    children: [
      {
        path: 'user/basicInfo',
        component: ()=>import('@/views/settings/userSettingsBasicInfo.vue')
      },
      {
        path: 'user/logout',
        component: ()=>import('@/views/settings/userSettingsLogout.vue')
      },
      {
        path: 'user/agreement',
        component: ()=>import('@/views/settings/userSettingsContract.vue')
      },
      {
        path: 'user/sensitiveInformation',
        component: ()=>import('@/views/settings/userSettingsPassword.vue')
      }
    ]
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
