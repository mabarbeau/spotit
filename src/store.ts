import Vue from 'vue'
import Vuex from 'vuex'
import Auth from '@/services/AuthService'
import Users from '@/services/UsersService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    me: {},
    users: {},
  },
  mutations: {
    SET_ME(state, user) {
      state.me = user
    },
    SET_USERS(state, users) {
      state.users = users
    },
  },
  actions: {
    async login({ commit }, params: any) {
      commit('SET_ME', await Auth.login(params))
    },
    async loadUsers({ commit }) {
      commit('SET_USERS', await Users.all())
    },
  },
})
