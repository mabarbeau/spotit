const routes: any = {
  me: '/me',
  auth: {
    login: '/auth/login',
    refresh: '/auth/refresh',
  },
  users: {
    all: '/users',
    find: '/users/:id',
  },
  spots: {
    all: '/spots',
    find: '/spots/:slug',
  },
}

export default routes
