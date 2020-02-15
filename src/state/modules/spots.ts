import Api from '@/api'
import { ActionContext } from 'vuex/types/index.d'

interface Spots {}

interface SpotsCollection {
  data: Spots[]
}

interface SpotsModule {
  spot: Spots | undefined
  spots: SpotsCollection | undefined
}

export const state: SpotsModule = {
  spot: undefined,
  spots: undefined,
}

export const getters = {}

export const mutations = {
  SET_SPOTS(state: SpotsModule, spots: SpotsCollection) {
    state.spots = spots
  },
  SET_SPOT(state: SpotsModule, spot: Spots) {
    state.spot = spot
  },
}

export const actions = {
  async loadSpots({ commit, dispatch }: ActionContext<SpotsModule, any>) {
    await Api.get('spots.all', {
      payload: window.location.search,
    })
      .then((spots) => {
        commit('SET_SPOTS', spots)
      })
      .catch((error: Error) => {
        dispatch('errors/set', error, { root: true })
      })
  },
  async loadSpot(
    { commit, dispatch }: ActionContext<SpotsModule, any>,
    slug: string
  ) {
    await Api.get('spots.find', {
      params: { slug },
    })
      .then((spot) => {
        commit('SET_SPOT', spot)
      })
      .catch((error: Error) => {
        dispatch('errors/set', error, { root: true })
      })
  },
}
