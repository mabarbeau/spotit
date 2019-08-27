import Vue from 'vue';
import Vuex from 'vuex';
import Users from './services/UsersService';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: {},
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    },
  },
  actions: {
    async loadUsers({ commit }) {
      commit('SET_USERS', await Users.all());
    },
  },
});
