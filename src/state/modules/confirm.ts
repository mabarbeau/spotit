import { ActionContext } from 'vuex'
import { RootState } from '../store'

interface Confirm {
  title: string
  text?: string
}
interface ConfirmModule {
  message: Confirm | undefined
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
  SET_MESSAGE(state: ConfirmModule, payload: Confirm | string) {
    if (typeof payload === 'string') state.message = { title: payload }
    else state.message = payload
  },
  DELETE_MESSAGE(state: ConfirmModule) {
    state.message = undefined
  },
}

export const actions = {
  async confirm({ commit }: ModuleActionContext, payload: Confirm | string) {
    commit('SET_MESSAGE', payload)
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
