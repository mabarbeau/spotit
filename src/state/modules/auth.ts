import Api from '@/api'
import { ActionContext } from 'vuex/types/index.d'

interface User {
  name: string
}

interface AuthModule {
  me: User | undefined
}

export const state: AuthModule = {
  me: undefined,
}

export const getters = {}

export const mutations = {
  SET_ME(state: AuthModule, user: User) {
    state.me = user
  },
}

export const actions = {
  async login(
    { commit, dispatch }: any,
    payload: ActionContext<AuthModule, any>
  ) {
    await Api.post({
      name: 'auth.login',
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
