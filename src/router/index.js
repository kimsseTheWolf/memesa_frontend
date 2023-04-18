import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomePage.vue'
import UserHomePreviewVue from '@/views/UserHomePreview.vue'
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
    component: ()=>import('@/views/SettingsPage.vue'),
    children: [
      {
        path: 'user/basicInfo',
        component: ()=>import('@/views/settings/User/userSettingsBasicInfo.vue')
      },
      {
        path: 'user/logout',
        component: ()=>import('@/views/settings/User/userSettingsLogout.vue')
      },
      {
        path: 'user/agreement',
        component: ()=>import('@/views/settings/User/userSettingsContract.vue')
      },
      {
        path: 'user/sensitiveInformation',
        component: ()=>import('@/views/settings/User/userSettingsPassword.vue')
      },
      {
        path: 'general/language',
        component: ()=>import('@/views/settings/General/generalSettingsLanguage.vue')
      }
    ]
  },
  {
    path: '/faq',
    name: ' Q&A Section',
    component: ()=>import('@/views/QA.vue'),
  },
  {
    path: '/faq/changelog', 
    name: 'changelog',
    component: ()=>import('@/views/qa/changelogPage.vue')
  },
  {
    path: '/moment',
    name: 'User Moments',
    component: ()=>import('@/views/MomentsPage.vue'),
    children: [
      {
        path: 'discover',
        component: ()=>import('@/views/moments/discoverPage.vue')
      },
      {
        path: 'subscribe',
        component: ()=>import('@/views/moments/subscribePage.vue')
      },
      {
        path: 'myMoments',
        component: ()=>import('@/views/moments/myMoments.vue')
      },
      {
        path: 'send',
        component: ()=>import('@/views/moments/sendMoments.vue')
      }
    ]
  },
  {
    path: '/user/:id',
    name: 'Views for person is viewing others homepage',
    component: UserHomePreviewVue,
    children: [
      {
        path: 'video',
        component: ()=>import('@/views/UserHomePreview/videoPage.vue')
      },
      {
        path: 'moments',
        component: ()=>import('@/views/UserHomePreview/momentsPage.vue')
      },
      {
        path: 'resources',
        component: ()=>import('@/views/UserHomePreview/resourcesPage.vue')
      },
    ]
  },
  {
    path: '/user/full',
    name: 'Full list of users on the site, admin only',
    component: ()=>import('@/views/Test/FullUserList.vue')
  },
  {
    path: "/history",
    name: "history",
    component: ()=>import('@/views/HistoryPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
