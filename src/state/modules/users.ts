import Api from '@/api'
import { ActionContext } from 'vuex'
import { RootState } from '../store'

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

interface UserModule {
  user: User | undefined
  users: UserCollection | undefined
}

type ModuleActionContext = ActionContext<UserModule, RootState>

export const state: UserModule = {
  user: undefined,
  users: undefined,
}

export const getters = {}

export const mutations = {
  SET_USERS(state: UserModule, users: UserCollection) {
    state.users = users
  },
  SET_USER(state: UserModule, user: User) {
    state.user = user
  },
}

export const actions = {
  async loadUsers({ commit, dispatch }: ModuleActionContext) {
    Api.get('users.all', {
      payload: window.location.search,
    })
      .then((users) => {
        commit('SET_USERS', users)
      })
      .catch((error: Error) => {
        dispatch('errors/set', error, { root: true })
      })
  },
  async loadUser({ commit, dispatch }: ModuleActionContext, id: string) {
    Api.get('users.find', {
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
