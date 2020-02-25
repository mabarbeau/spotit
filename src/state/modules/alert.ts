import { RootState } from '../store'
import { ActionContext } from 'vuex'

interface AlertModule {
  messages: App.Alert[]
  total: number
  show: boolean
}

type ModuleActionContext = ActionContext<AlertModule, RootState>

export const state: AlertModule = {
  messages: [],
  total: 0,
  show: false,
}

export const getters = {
  alerts(state: AlertModule) {
    return state.messages
  },
}

export const mutations = {
  ADD_ALERT(state: AlertModule, message: App.Alert) {
    state.show = true
    state.total = state.total + 1
    state.messages.push(message)
  },
  async DELETE_ALERT(state: AlertModule) {
    let time = 0
    if (state.messages.length === 1) {
      state.show = false
      state.total = 0
      time = 1000
    }
    setTimeout(function() {
      state.messages.pop()
    }, time)
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
