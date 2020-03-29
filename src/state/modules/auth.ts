import Api from '@/api'
import { ActionContext } from 'vuex'
import { RootState } from '../store'

interface User {
  name: string
}

interface AuthModule {
  me: User | null
}

type ModuleActionContext = ActionContext<AuthModule, RootState>

export const state: AuthModule = {
  me: null,
}

export const getters = {
  me(state: AuthModule) {
    const me = localStorage.getItem('me')
    if (me) {
      let data = JSON.parse(me)
      return data
    }
    return state.me
  },
}

export const mutations = {
  SET_ME(state: AuthModule, user: User | null) {
    localStorage.setItem('me', JSON.stringify(user))
    state.me = user
  },
}

export const actions = {
  async init({ dispatch }: ModuleActionContext) {
    return Promise.all([dispatch('fetchCsrfCookie'), dispatch('fetchMe')])
  },
  async fetchCsrfCookie({ dispatch }: ModuleActionContext) {
    await Api.get('csrf').catch((error: Error) => {
      dispatch('errors/set', error, { root: true })
    })
  },
  async fetchMe({ getters, commit, dispatch }: ModuleActionContext) {
    if (getters.me) return commit('SET_ME', getters.me)
    await Api.get('me')
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
  async logout({ commit }: ModuleActionContext) {
    commit('SET_ME', null)
    await Api.put('auth.logout')
  },
}
