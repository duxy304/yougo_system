import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/main/HomePage/Home.vue'
import Layout from '@/views/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
        meta: {
          isLogin: true
        }
      },
      {
        path: 'params',
        name: 'Params',
        component: () => import('@/views/main/Params/index.vue'),
        meta: {
          isLogin: true
        }
      },
      {
        path: 'product',
        name: 'Product',
        component: () => import('@/views/main/Product/index.vue'),
        meta: {
          isLogin: true
        }
      },
      {
        path: 'ad',
        name: 'ADcategory',
        component: () => import('@/views/main/ADcategory.vue'),
        meta: {
          isLogin: true
        }
      },
      {
        path: 'details',
        name: 'Details',
        component: () => import('@/views/main/HomePage/sub/Details.vue'),
        children: [
          {
            path: 'openproduct',
            name: 'Openproduct',
            component: () => import('@/views/main/HomePage/sub/openproduct.vue')
          },
          {
            path: 'golife',
            name: 'Golife',
            component: () => import('@/views/main/HomePage/sub/goLife.vue')
          },
          {
            path: 'heigh',
            name: 'Heigh',
            component: () => import('@/views/main/HomePage/sub/heigh.vue')
          },
          {
            path: 'logo',
            name: 'Logo',
            component: () => import('@/views/main/HomePage/sub/logo.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
