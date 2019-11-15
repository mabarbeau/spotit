import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
    },
    {
      path: '/users',
      name: 'users',
      component: () => import(/* webpackChunkName: "users" */ '@/views/Users.vue'),
    },
    {
      path: '/account',
      name: 'account',
      redirect: () => ({ name: 'login' }),
      component: () => import(/* webpackChunkName: "account" */ '@/views/Account.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import(/* webpackChunkName: "login" */ '@/views/auth/Login.vue'),
        },
        {
          path: 'register',
          name: 'register',
          component: () => import(/* webpackChunkName: "register" */ '@/views/auth/Register.vue'),
        },
      ],
    },
    {
      path: '/spots',
      name: 'spots',
      component: () => import(/* webpackChunkName: "spots" */ '@/views/spots/Index.vue'),
    },
    {
      path: '/spots/:slug',
      name: 'spots show',
      component: () => import(/* webpackChunkName: "login" */ '@/views/spots/Show.vue'),
      props: true,
    },
    {
      path: '*',
      name: '404',
      component: () => import(/* webpackChunkName: "404" */ '@/views/errors/404.vue'),
    },
  ],
})
