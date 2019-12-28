const routes: any = {
  auth: {
    children: {
      login: '/auth/login',
    },
  },
  users: {
    children: {
      all: '/users',
      find: '/users/:id/:name',
    },
  },
  spots: {
    children: {
      all: '/spots',
      find: '/spots/:slug',
    },
  },
}

export default routes
