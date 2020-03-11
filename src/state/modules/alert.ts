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
  SHOW(state: AlertModule, show: boolean) {
    state.show = show
  },
  ADD_ALERT(state: AlertModule, message: App.Alert) {
    state.total = state.total + 1
    state.messages.push(message)
  },
  DELETE_ALERT(state: AlertModule) {
    state.messages.pop()
    if (state.messages.length === 0) {
      state.total = 0
    }
  },
}

export const actions = {
  async create({ commit }: ModuleActionContext, alert: App.Alert) {
    commit('ADD_ALERT', alert)
    setTimeout(function() {
      commit('SHOW', true)
    }, 100)
  },
  async dismiss({ commit }: ModuleActionContext) {
    let time = 0
    if (state.messages.length === 1) {
      commit('SHOW', false)
      time = 300
    }
    setTimeout(function() {
      commit('DELETE_ALERT')
    }, time)
  },
}
