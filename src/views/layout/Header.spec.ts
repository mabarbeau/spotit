import { shallowMount, createLocalVue } from '@vue/test-utils'
import Header from './Header.vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Header.vue', () => {
  let auth: any
  let confirm: any
  let notifications: any
  let store: any
  let vuetify: any

  beforeEach(() => {
    vuetify = new Vuetify()
    confirm = {
      namespaced: true,
      state: {
        me: undefined,
        users: [],
      },
      actions: {
        login: jest.fn(),
      },
    }
    notifications = {
      namespaced: true,
      state: {
        notifications: undefined,
      },
      actions: {
        getNotifications: jest.fn(),
      },
      getters: {
        getTotal: jest.fn(),
      },
    }
    auth = {
      namespaced: true,
      state: {
        me: {
          name: 'Test User',
        },
      },
      actions: {
        getMe: jest.fn(),
      },
    }
    store = new Vuex.Store({
      modules: {
        auth,
        confirm,
        notifications,
      },
    })
  })

  it('has a link to about page', () => {
    const msg = 'About'
    const wrapper = shallowMount(Header, {
      localVue,
      vuetify,
      store,
      stubs: ['router-link'],
    })
    expect(wrapper.text()).toContain(msg)
  })

  it('fetches notifications', () => {
    shallowMount(Header, {
      localVue,
      vuetify,
      store,
      stubs: ['router-link'],
    })
    expect(notifications.actions.getNotifications).toBeCalled()
    expect(notifications.getters.getTotal).toBeCalled()
  })
})
