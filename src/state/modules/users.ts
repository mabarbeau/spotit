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
  nextPageUrl: string|null
  path: string
  perPage: number
  prevPageUrl: string|null
  to: string
  total: number
}

interface UserState {
  user: User|Object
  users: UserCollection|Object
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
  async loadUsers({ commit }: any) {
    commit('SET_USERS', await Api.get({
      name: 'users.all',
      payload: window.location.search,
    }))
  },
  async loadUser({ commit }: any, id: string) {
    commit('SET_USER', await Api.get({
      name: 'users.find',
      params: { id },
    }))
  },
}
