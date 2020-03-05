import Api from '@/api'
import { RootState } from '../store'
import { ActionContext } from 'vuex'

interface Notifications {
  message: string
  type: string
  read: boolean
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
}

type ModuleActionContext = ActionContext<NotificationsModule, RootState>

export const state: NotificationsModule = {
  notifications: undefined,
}

export const getters = {
  getTotal(state: NotificationsModule) {
    if (state.notifications) {
      return state.notifications.total
    }
    return 0
  },
}

export const mutations = {
  SET_NOTIFICATIONS(
    state: NotificationsModule,
    notifications: NotificationsCollection
  ) {
    state.notifications = notifications
  },
}

export const actions = {
  async getNotifications({ commit, dispatch }: ModuleActionContext) {
    await Api.get('notifications.all')
      .then((response) => {
        commit('SET_NOTIFICATIONS', response.user)
      })
      .catch((error: Error) => {
        dispatch('errors/set', error, { root: true })
      })
  },
}
