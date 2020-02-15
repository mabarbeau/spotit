interface NotificationState {
  message: string | undefined
  resolve: (() => boolean) | undefined
}

export const state: NotificationState = {
  message: undefined,
  resolve: undefined,
}

export const getters = {}

export const mutations = {
  SET_RESOLVE(state: NotificationState, resolve: () => boolean) {
    state.resolve = resolve
  },
  SET_MESSAGE(state: NotificationState, message: string) {
    state.message = message
  },
  DELETE_MESSAGE(state: NotificationState) {
    state.message = undefined
  },
}

export const actions = {
  async alert({ commit }: any, message: string) {
    commit('SET_MESSAGE', message)
    return new Promise((resolve) => {
      commit('SET_RESOLVE', resolve)
    })
  },
  async confirmed({ state, commit }: any, message: string) {
    if (state.resolve) state.resolve(true)
    commit('DELETE_MESSAGE')
  },
}
