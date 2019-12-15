
import Auth from '@/services/AuthService'

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
  async login({ commit }, params: any) {
    commit('SET_ME', await Auth.login(params))
  },
}
