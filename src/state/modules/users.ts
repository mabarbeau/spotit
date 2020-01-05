import Api from '@/api'

interface User {
  name: string
}

interface UserCollection {
  currentPage: number
  data: User[]
  firstPageUrl: string
  from: number
  lastPage: number
  lastPageUrl: string
  nextPageUrl: string | null
  path: string
  perPage: number
  prevPageUrl: string | null
  to: string
  total: number
}

interface UserState {
  user: User | Object
  users: UserCollection | Object
}

export const state: UserState = {
  user: {},
  users: {},
}

export const getters = {}

export const mutations = {
  SET_USERS(state: UserState, users: UserCollection) {
    state.users = users
  },
  SET_USER(state: UserState, user: User) {
    state.user = user
  },
}

export const actions = {
  async loadUsers({ commit, dispatch }: any) {
    Api.get({
      name: 'users.all',
      payload: window.location.search,
    })
      .then((users) => {
        commit('SET_USERS', users)
      })
      .catch((error: Error) => {
        dispatch('errors/set', error, { root: true })
      })
  },
  async loadUser({ commit, dispatch }: any, id: string) {
    Api.get({
      name: 'users.find',
      params: { id },
    })
      .then((user) => {
        commit('SET_USER', user)
      })
      .catch((error: Error) => {
        dispatch('errors/set', error, { root: true })
      })
  },
}
