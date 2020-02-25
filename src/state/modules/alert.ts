import { RootState } from '../store'
import { ActionContext } from 'vuex'

interface AlertModule {
  messages: App.Alert[]
  total: number
}

type ModuleActionContext = ActionContext<AlertModule, RootState>

export const state: AlertModule = {
  messages: [],
  total: 0,
}

export const getters = {
  alerts(state: AlertModule) {
    return state.messages
  },
}

export const mutations = {
  ADD_ALERT(state: AlertModule, message: App.Alert) {
    state.total = state.total + 1
    state.messages.push(message)
  },
  DELETE_ALERT(state: AlertModule) {
    state.messages.pop()
    if (state.messages.length === 0) state.total = 0
  },
}

export const actions = {
  async success({ commit }: ModuleActionContext, text: string) {
    commit('ADD_ALERT', {
      type: 'success',
      text,
    })
  },
  async info({ commit }: ModuleActionContext, text: string) {
    commit('ADD_ALERT', {
      type: 'info',
      text,
    })
  },
  async warning({ commit }: ModuleActionContext, text: string) {
    commit('ADD_ALERT', {
      type: 'warning',
      text,
    })
  },
  async error({ commit }: ModuleActionContext, text: string) {
    commit('ADD_ALERT', {
      type: 'error',
      text,
    })
  },
  async confirmed({ commit }: ModuleActionContext) {
    commit('DELETE_ALERT')
  },
}
