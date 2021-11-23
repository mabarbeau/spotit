interface ErrorState {
  error: Error | undefined
}

export const state: ErrorState = {
  error: undefined,
}

export const getters = {}

export const mutations = {
  SET_ERROR(state: ErrorState, error: Error) {
    state.error = error
  },
}

export const actions = {
  set({ commit }: any, error: Error) {
    commit('SET_ERROR', error)
  },
}
