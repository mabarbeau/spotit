import { RootState } from '../store'
import { ActionContext } from 'vuex'

interface NotificationModule {
  message: string | undefined
  resolve: ((result: boolean) => void) | undefined
}

type ModuleActionContext = ActionContext<NotificationModule, RootState>

export const state: NotificationModule = {
  message: undefined,
  resolve: undefined,
}

export const getters = {}

export const mutations = {
  SET_RESOLVE(state: NotificationModule, resolve: (result: boolean) => void) {
    state.resolve = resolve
  },
  SET_MESSAGE(state: NotificationModule, message: string) {
    state.message = message
  },
  DELETE_MESSAGE(state: NotificationModule) {
    state.message = undefined
  },
}

export const actions = {
  async alert({ commit }: ModuleActionContext, message: string) {
    commit('SET_MESSAGE', message)
    return new Promise((resolve) => {
      commit('SET_RESOLVE', resolve)
    })
  },
  async confirmed({ state, commit }: ModuleActionContext, message: string) {
    if (state.resolve) state.resolve(true)
    commit('DELETE_MESSAGE')
  },
}
