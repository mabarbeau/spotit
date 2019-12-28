
import Router from '@/api/router'

interface UserInterface {
  name: string
}

interface AuthStateInterface {
  me: UserInterface|Object
}

export const state: AuthStateInterface = {
  me: {},
}

export const getters = {}

export const mutations = {
  SET_ME(state: AuthStateInterface, user: UserInterface) {
    state.me = user
  },
}

export const actions = {
  async login({ commit }: any, payload: any) {
    commit('SET_ME', await Router.post({
      name: 'auth.login',
      payload,
    }))
  },
}
