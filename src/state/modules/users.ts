import Users from '@/services/UsersService'

interface UserInterface {
  name: string
}

interface UserCollectionInterface {
  // current_page: number
  data: UserInterface[]
  // first_page_url: string
  // from: number
  // last_page: number
  // last_page_url: string
  // next_page_url: string|null
  // path: string
  // per_page: number
  // prev_page_url: string|null
  // to: string
  // total: number
}

interface UserStateInterface {
  users: UserCollectionInterface|Object
}

export const state: UserStateInterface = {
  users: {},
}

export const getters = {}

export const mutations = {
  SET_USERS(state: UserStateInterface, users: UserCollectionInterface) {
    state.users = users
  },
}

export const actions = {
  async loadUsers({ commit }) {
    commit('SET_USERS', await Users.all())
  },
}
