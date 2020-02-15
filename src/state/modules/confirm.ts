interface ConfirmState {
  message: string | undefined
  resolve: (() => boolean) | undefined
}

export const state: ConfirmState = {
  message: undefined,
  resolve: undefined,
}

export const getters = {}

export const mutations = {
  SET_RESOLVE(state: ConfirmState, resolve: () => boolean) {
    state.resolve = resolve
  },
  SET_MESSAGE(state: ConfirmState, message: string) {
    state.message = message
  },
  DELETE_MESSAGE(state: ConfirmState) {
    state.message = undefined
  },
}

export const actions = {
  async confirm({ commit }: any, message: string) {
    commit('SET_MESSAGE', message)
    return new Promise((resolve) => {
      commit('SET_RESOLVE', resolve)
    })
  },
  async confirmed({ state, commit }: any, message: string) {
    if (state.resolve) state.resolve(true)
    commit('DELETE_MESSAGE')
  },
  async canceled({ state, commit }: any, message: string) {
    if (state.resolve) state.resolve(false)
    commit('DELETE_MESSAGE')
  },
}
