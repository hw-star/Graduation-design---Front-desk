import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    // @ts-ignore
    component: () => import('../views/home.vue')
  },
  {
    path: '/404',
    // @ts-ignore
    component: () => import('../views/404.vue'),
    hidden: true
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // @ts-ignore
    component: () => import('../views/about.vue')
  },
  {
    path: '/activity',
    name: 'Activity',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // @ts-ignore
    component: () => import('../views/activity.vue')
  },
  {
    path: '/navigation',
    name: 'Navigation',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // @ts-ignore
    component: () => import('../views/navigation.vue')
  },
  {
    path: '/policy',
    name: 'Policy',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // @ts-ignore
    component: () => import('../views/policy.vue')
  },
  {
    path: '/policydetail',
    name: 'Policydetail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // @ts-ignore
    component: () => import('../views/policydetail.vue'),
    hidden: true
  },
  {
    path: '/userorder',
    name: 'Userorder',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // @ts-ignore
    component: () => import('../views/userorder.vue')
  },

  { path: '*', redirect: '/404', hidden: true }
]

const router = new VueRouter({
  mode: 'history',
  // @ts-ignore
  base: process.env.BASE_URL,
  routes
})

export default router
