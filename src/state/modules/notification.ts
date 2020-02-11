interface NotificationState {
  message: string | undefined
  cancelable: boolean
  resolve: (() => void) | undefined
  reject: (() => void) | undefined
}

export const state: NotificationState = {
  message: undefined,
  cancelable: false,
  resolve: undefined,
  reject: undefined,
}

export const getters = {}

export const mutations = {
  SET_MESSAGE(state: NotificationState, payload: any) {
    state.message = payload.message
    state.cancelable = payload.cancelable || false
  },
  DELETE_MESSAGE(state: NotificationState, payload: any) {
    state.message = undefined
    state.cancelable = false
  },
}

export const actions = {
  async alert({ state, commit }: any, message: string) {
    commit('SET_MESSAGE', { message })
    return new Promise((resolve) => {
      state.resolve = resolve
    })
  },
  async confirm({ state, commit }: any, message: string) {
    commit('SET_MESSAGE', { message, cancelable: true })
    return new Promise((resolve, reject) => {
      state.resolve = resolve
      state.reject = reject
    })
  },
  async confirmed({ state, commit }: any, message: string) {
    if (state.resolve) state.resolve()
    commit('DELETE_MESSAGE')
  },
  async canceled({ state, commit }: any, message: string) {
    if (state.reject) state.reject()
    commit('DELETE_MESSAGE')
  },
}
