import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Index from './Notifications.vue'
import Vuetify from 'vuetify'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Notifications.vue', () => {
  let actions: any
  let notifications: any
  let store: any
  let vuetify: any

  beforeEach(() => {
    vuetify = new Vuetify()
    actions = {
      getNotifications: jest.fn(),
    }
    notifications = {
      namespaced: true,
      state: {
        notifications: {
          currentPage: 1,
          data: [],
          firstPageUrl: '/notifications/?page=1',
          from: 1,
          lastPage: 10,
          lastPageUrl: '/notifications/?page=10',
          nextPageUrl: '/notifications/?page=2',
          path: '/notifications',
          perPage: 10,
          prevPageUrl: null,
          to: '/notifications',
          total: 100,
        },
      },
      actions,
    }
    store = new Vuex.Store({
      modules: {
        notifications,
      },
    })
  })

  it('dispatches "getNotifications" when mounted', () => {
    shallowMount(Index, {
      store,
      localVue,
      vuetify,
    })
    expect(actions.getNotifications).toHaveBeenCalled()
  })
})
