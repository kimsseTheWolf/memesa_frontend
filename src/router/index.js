import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomePage.vue'
// import UserHomeVue from '../views/UserHome.vue'

const routes = [
  {
    path: '/beta',
    name: "Beta testing page",
    component: ()=>import('@/views/Test/TestHome.vue')
  },
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
  {
    path: '/faq',
    name: ' Q&A Section',
    component: ()=>import('@/views/QAndA.vue')
  },
  {
    path: '/moment',
    name: 'User Moments',
    component: ()=>import('@/views/MomentsPage.vue')
  },
  {
    path: '/user/:id',
    name: 'Views for person is viewing others homepage',
    component: ()=>import('@/views/UserHomePreview.vue')
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
