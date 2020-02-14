interface NotificationState {
  message: string | undefined
  resolve: (() => void) | undefined
}

export const state: NotificationState = {
  message: undefined,
  resolve: undefined,
}

export const getters = {}

export const mutations = {
  SET_MESSAGE(state: NotificationState, message: string) {
    state.message = message
  },
  DELETE_MESSAGE(state: NotificationState) {
    state.message = undefined
  },
}

export const actions = {
  async alert({ state, commit }: any, message: string) {
    commit('SET_MESSAGE', message)
    return new Promise((resolve) => {
      state.resolve = resolve
    })
  },
  async confirmed({ state, commit }: any, message: string) {
    if (state.resolve) state.resolve(true)
    commit('DELETE_MESSAGE')
  },
}
