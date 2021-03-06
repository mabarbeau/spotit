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
      component: () =>
        import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () =>
        import(/* webpackChunkName: "about" */ '@/views/About.vue'),
    },
    {
      path: '/users',
      name: 'users',
      component: () =>
        import(/* webpackChunkName: "users" */ '@/views/users/Index.vue'),
    },
    {
      path: '/users/:id',
      name: 'users show',
      component: () =>
        import(/* webpackChunkName: "users" */ '@/views/users/Show.vue'),
      props: true,
    },
    {
      path: '/account',
      name: 'account',
      redirect: () => ({ name: 'login' }),
      component: () =>
        import(/* webpackChunkName: "account" */ '@/views/Account.vue'),
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: () =>
        import(
          /* webpackChunkName: "notifications" */ '@/views/Notifications.vue'
        ),
    },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
    },
    {
      path: '/spots',
      name: 'spots',
      component: () =>
        import(/* webpackChunkName: "spots" */ '@/views/spots/Index.vue'),
    },
    {
      path: '/spots/:slug',
      name: 'spots show',
      component: () =>
        import(/* webpackChunkName: "login" */ '@/views/spots/Show.vue'),
      props: true,
    },
    {
      path: '/404',
      alias: '*',
      name: 'page not found',
      component: () =>
        import(/* webpackChunkName: "404" */ '@/views/errors/404.vue'),
    },
  ],
})
