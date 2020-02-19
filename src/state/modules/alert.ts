import { RootState } from '../store'
import { ActionContext } from 'vuex'

interface Alert {
  id: string
  message: string
}

interface AlertModule {
  messages: string[]
  total: number
}

type ModuleActionContext = ActionContext<AlertModule, RootState>

export const state: AlertModule = {
  messages: [],
  total: 0,
}

export const getters = {}

export const mutations = {
  ADD_ALERT(state: AlertModule, message: string) {
    state.total = state.total + 1
    state.messages.push(message)
  },
  DELETE_ALERT(state: AlertModule) {
    state.messages.pop()
    if (state.messages.length === 0) state.total = 0
  },
}

export const actions = {
  async add({ commit }: ModuleActionContext, message: Alert) {
    commit('ADD_ALERT', message)
  },
  async confirmed({ commit }: ModuleActionContext) {
    commit('DELETE_ALERT')
  },
}
