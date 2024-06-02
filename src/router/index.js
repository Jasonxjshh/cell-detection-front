import { createRouter, createWebHashHistory } from 'vue-router'
import login from '@/pages/login.vue'
import register from '@/pages/register.vue'
import home from '@/pages/home.vue'
import adminHome from "@/components/main/adminHome"
import logManagement from '@/components/main/logManagement.vue'
import doctorManagement from '@/components/main/doctorManagement.vue'
import patientManagement from '@/components/main/patientManagement.vue'
import profile from "@/components/main/profile"




import InquiryFive from '@/components/main/InquiryFive.vue'

import uploadMessage from '@/components/main/uploadMessage.vue'



const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/adminHome',
        name: 'adminHome',
        component: adminHome,
        meta: { requiresAuth: true }
      },


      {
        path: '/uploadMessage',
        name: 'uploadMessage',
        component: uploadMessage,
        meta: { requiresAuth: true }
      },


      {
        path: '/InquiryFive',
        name: 'InquiryFive',
        component: InquiryFive,
        meta: { requiresAuth: true }
      },


      {
        path: '/doctor_management',
        name: 'doctor_management',
        component: doctorManagement,
        meta: { requiresAuth: true }
      },
      {
        path: '/patient_management',
        name: 'patient_management',
        component: patientManagement,
        meta: { requiresAuth: true }
      },
      {
        path: '/log_management',
        name: 'log_management',
        component: logManagement,
        meta: { requiresAuth: true }
      },
      {
        path: '/profile',
        name: 'profile',
        component: profile,
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  }
  /* ,

  {
    path: '/admin',
    name: 'adminDashboard',
    component: adminDashboard,
    meta: { requiresAuth: true, role: "0" }
  },

  {
    path: '/doctor',
    name: 'doctorDashboard',
    component: doctorDashboard,
    meta: { requiresAuth: true, role: "1" }
  },

  {
    path: '/patient',
    name: 'patientDashboard',
    component: patientDashboard,
    meta: { requiresAuth: true, role: "2" }
  } */
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token') // 假设你将 token 存储在 localStorage 中  
  const role = localStorage.getItem('role')
  console.log(role);
  // 这个路由需要认证，检查是否有 token 
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 没有 token，重定向到登录页面
    if (!token) {
      next({
        path: '/login'
      })
    } else {
      // 有 token，继续导航
      next()
    }
  } else {
    next()
  }
})

/* router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token') // 假设你将 token 存储在 localStorage 中  
  const role = localStorage.getItem('role')
  console.log(role);
  if (to.name == 'home') {
    if (!token) {
      next({
        path: '/login'
      })
    } else {
      const newRouterName = getNewRouterNameByRole(role)
      console.log(newRouterName);
      next({
        path: newRouterName
      })
    }
  } else {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // 这个路由需要认证，检查是否有 token  
      if (!token) {
        // 没有 token，重定向到登录页面  
        next({
          path: '/login'
        })
      } else {
        // 有 token，继续导航
        if (to.matched.some(record => record.meta.role === role)) {
          next()
        } else {
          next({
            path: '/login'
          });
        }
        // 如果你需要基于 token 跳转到特定页面，可以在这里添加逻辑  
        // 例如，你可以从 token 中解码出用户 ID，然后基于用户 ID 跳转到对应的页面  
      }
    } else {
      // 不需要认证的路由，直接导航  
      next()
    }
  }

}) */
export default router

function getNewRouterNameByRole(role) {
  console.log("*****************");
  console.log(role);
  switch (role) {
    case "0":
      return 'admin';
    case "1":
      return 'doctor';
    case "2":
      return 'patient';
    default:
      // 如果角色不匹配，可以重定向到默认页面或登录页面  
      return 'login'; // 或者其他默认的路由名称
  }
}