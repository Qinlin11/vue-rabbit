//createRouter:创建router实例对象
//createWebHistory：创建history模式的路由

import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //配置path和component对应的配置
  routes: [
    {
      path:'/',
      component: () => import('@/views/Layout/index.vue'),
      children: [
        {
          path:'',
          component: () => import('@/views/Home/index.vue')
        },
        {
          path:'/category/:id',
          component: () => import('@/views/Category/index.vue')
        },
        {
          path:'/category/sub/:id',
          component: () => import('@/views/SubCategory/index.vue')
        }

      ]
    },
    {
      path:'/login',
      component: () => import('@/views/Login/index.vue')
    }
  ],
  scrollBehavior() {
    return {
      top: 0
    }
  }
})

export default router
