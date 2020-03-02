import Api from '@/api'
import { ActionContext } from 'vuex'
import { RootState } from '../store'

interface User {
  name: string
}

interface AuthModule {
  me: User | undefined
}

type ModuleActionContext = ActionContext<AuthModule, RootState>

export const state: AuthModule = {
  me: undefined,
}

export const getters = {}

export const mutations = {
  SET_ME(state: AuthModule, user: User) {
    if (user) state.me = user
  },
}

export const actions = {
  async getMe({ commit, dispatch }: ModuleActionContext) {
    await Api.post('auth.me')
      .then((response) => {
        commit('SET_ME', response.user)
      })
      .catch((error: Error) => {
        dispatch('errors/set', error, { root: true })
      })
  },
  async login({ commit, dispatch }: ModuleActionContext, payload: any) {
    await Api.post('auth.login', {
      payload,
    })
      .then((user) => {
        commit('SET_ME', user)
      })
      .catch((error: Error) => {
        dispatch('errors/set', error, { root: true })
      })
  },
}
