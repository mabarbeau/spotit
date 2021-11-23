const routes: any = {
  auth: {
    login: '/auth/login',
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
