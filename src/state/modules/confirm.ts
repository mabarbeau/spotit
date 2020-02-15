import { ActionContext } from 'vuex'
import { RootState } from '../store'

interface ConfirmModule {
  message: string | undefined
  resolve: ((result: boolean) => void) | undefined
}

type ModuleActionContext = ActionContext<ConfirmModule, RootState>

export const state: ConfirmModule = {
  message: undefined,
  resolve: undefined,
}

export const getters = {}

export const mutations = {
  SET_RESOLVE(state: ConfirmModule, resolve: (result: boolean) => void) {
    state.resolve = resolve
  },
  SET_MESSAGE(state: ConfirmModule, message: string) {
    state.message = message
  },
  DELETE_MESSAGE(state: ConfirmModule) {
    state.message = undefined
  },
}

export const actions = {
  async confirm({ commit }: ModuleActionContext, message: string) {
    commit('SET_MESSAGE', message)
    return new Promise((resolve) => {
      commit('SET_RESOLVE', resolve)
    })
  },
  async confirmed({ state, commit }: ModuleActionContext) {
    if (state.resolve) state.resolve(true)
    commit('DELETE_MESSAGE')
  },
  async canceled({ state, commit }: ModuleActionContext) {
    if (state.resolve) state.resolve(false)
    commit('DELETE_MESSAGE')
  },
}
