import Router from '@/api/router'

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
  async loadSpots({ commit }: any) {
    commit('SET_SPOTS', await Router.get('spots.all'))
  },
  async loadSpot({ commit }: any, slug: string) {
    commit('SET_SPOT', await Router.get('spots.find', { slug }))
  },
}
