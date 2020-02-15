import { ActionContext } from 'vuex'
import { RootState } from '../store'

interface ErrorModule {
  error: Error | undefined
}

export const state: ErrorModule = {
  error: undefined,
}
type ModuleActionContext = ActionContext<ErrorModule, RootState>

export const getters = {}

export const mutations = {
  SET_ERROR(state: ErrorModule, error: Error) {
    state.error = error
  },
}

export const actions = {
  set({ commit }: ModuleActionContext, error: Error) {
    commit('SET_ERROR', error)
  },
  clear({ commit }: ModuleActionContext, error: Error) {
    commit('SET_ERROR', undefined)
  },
}
