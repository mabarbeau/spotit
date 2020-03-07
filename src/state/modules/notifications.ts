import Api from '@/api'
import { RootState } from '../store'
import { ActionContext } from 'vuex'

interface Notifications {
  message: string
  url?: string
  read?: boolean
  createdAt?: string
  updatedAt?: string
}

interface NotificationsCollection {
  currentPage: number
  data: Notifications[]
  firstPageUrl: string
  from: number
  lastPage: number
  lastPageUrl: string
  nextPageUrl: string | null
  path: string
  perPage: number
  prevPageUrl: string | null
  to: string
  total: number
}

interface NotificationsModule {
  notifications: NotificationsCollection | undefined
  unread: number
}

type ModuleActionContext = ActionContext<NotificationsModule, RootState>

export const state: NotificationsModule = {
  notifications: undefined,
  unread: 0,
}

export const getters = {}

export const mutations = {
  SET_NOTIFICATIONS(
    state: NotificationsModule,
    notifications: NotificationsCollection
  ) {
    state.notifications = notifications
  },
  SET_UNREAD_TOTAL(state: NotificationsModule, total: number) {
    state.unread = total
  },
}

export const actions = {
  async getNotifications({ commit, dispatch }: ModuleActionContext) {
    await Api.get('notifications.all')
      .then((response) => {
        commit('SET_NOTIFICATIONS', response)
      })
      .catch((error: Error) => {
        dispatch('errors/set', error, { root: true })
      })
  },
  async create({ dispatch }: ModuleActionContext, payload: Notifications) {
    await Api.post('notifications.create', { payload })
      .then(() => dispatch('countUnread'))
      .catch((error: Error) => {
        dispatch('errors/set', error, { root: true })
      })
  },
  async read({ dispatch }: ModuleActionContext, id: string) {
    await Api.put('notifications.read', { params: { id } })
      .then(() => {
        dispatch('countUnread')
        dispatch('getNotifications')
      })
      .catch((error: Error) => {
        dispatch('errors/set', error, { root: true })
      })
  },
  async unread({ dispatch }: ModuleActionContext, id: string) {
    await Api.put('notifications.unread', { params: { id } })
      .then(() => dispatch('countUnread'))
      .catch((error: Error) => {
        dispatch('errors/set', error, { root: true })
      })
  },
  async countUnread({ commit, dispatch }: ModuleActionContext) {
    await Api.get('notifications.count')
      .then((response) => {
        commit('SET_UNREAD_TOTAL', response.total)
      })
      .catch((error: Error) => {
        dispatch('errors/set', error, { root: true })
      })
  },
}
