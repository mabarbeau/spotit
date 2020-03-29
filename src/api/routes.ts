const routes: any = {
  me: '/me',
  csrf: '/sanctum/csrf-cookie',
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
  },
  users: {
    all: '/users',
    find: '/users/:id',
  },
  spots: {
    all: '/spots',
    find: '/spots/:slug',
  },
  updates: '/updates',
  notifications: {
    all: '/notifications',
    count: '/notifications/count',
    create: '/notifications',
    read: '/notifications/:id/read',
    unread: '/notifications/:id/unread',
    delete: '/notifications/:id',
  },
}

export default routes
