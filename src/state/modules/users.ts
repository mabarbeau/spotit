import Router from '@/services/ApiRouter'

interface UserInterface {
  name: string
}

interface UserCollectionInterface {
  currentPage: number
  data: UserInterface[]
  firstPageUrl: string
  from: number
  lastPage: number
  lastPageUrl: string
  nextPageUrl: string|null
  path: string
  perPage: number
  prevPageUrl: string|null
  to: string
  total: number
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
  async loadUsers({ commit }: any) {
    commit('SET_USERS', await Router.get('users.all'))
  },
}
