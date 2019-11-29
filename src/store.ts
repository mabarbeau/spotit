import Vue from 'vue'
import Vuex from 'vuex'
import Auth from '@/services/AuthService'
import Users from '@/services/UsersService'
import Spots from '@/services/SpotsService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    me: {},
    users: {},
    spot: {},
    spots: {},
  },
  mutations: {
    SET_ME(state, user) {
      state.me = user
    },
    SET_USERS(state, users) {
      state.users = users
    },
    SET_SPOTS(state, spots) {
      state.spots = spots
    },
    SET_SPOT(state, spot) {
      state.spot = spot
    },
  },
  actions: {
    async login({ commit }, params: any) {
      commit('SET_ME', await Auth.login(params))
    },
    async loadUsers({ commit }) {
      commit('SET_USERS', await Users.all())
    },
    async loadSpots({ commit }) {
      commit('SET_SPOTS', await Spots.all())
    },
    async loadSpot({ commit }, slug) {
      commit('SET_SPOT', await Spots.find(slug))
    },
  },
})
