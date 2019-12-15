import Spots from '@/services/SpotsService'

interface SpotsInterface {
}

interface SpotsCollectionInterface {
  data: SpotsInterface[]
}

interface SpotsStateInterface {
  spot: SpotsInterface|Object
  spots: SpotsCollectionInterface|Object
}

export const state: SpotsStateInterface = {
  spot: {},
  spots: {},
}

export const getters = {}

export const mutations = {
  SET_SPOTS(
    state: SpotsStateInterface,
    spots: SpotsCollectionInterface
  ) {
    state.spots = spots
  },
  SET_SPOT(state: SpotsStateInterface, spot: SpotsInterface) {
    state.spot = spot
  },
}

export const actions = {
  async loadSpots({ commit }) {
    commit('SET_SPOTS', await Spots.all())
  },
  async loadSpot({ commit }, slug: string) {
    commit('SET_SPOT', await Spots.find(slug))
  },
}
