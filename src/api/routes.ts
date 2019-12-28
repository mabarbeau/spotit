const routes: any = {
  auth: {
    login: '/auth/login',
  },
  users: {
    all: '/users',
    find: '/users/:id/:name',
  },
  spots: {
    all: '/spots',
    find: '/spots/:slug',
  },
}

export default routes
